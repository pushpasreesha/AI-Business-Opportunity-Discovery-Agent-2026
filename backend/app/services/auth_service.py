from datetime import datetime, timezone

from fastapi import HTTPException, status

from app.database.connection import get_database

from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token
)

from google.oauth2 import id_token
from google.auth.transport import requests

from app.config.settings import settings

from app.services.otp_service import (
    generate_otp,
    send_otp_email,
    save_otp,
    get_pending_otp,
    delete_pending_otp
)


# ============================================================
# REGISTER USER
# ============================================================

async def register_user(
    name: str,
    email: str,
    password: str
):
    db = get_database()
    users = db["users"]

    # Check whether email is already registered
    existing = await users.find_one({
        "email": email
    })

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Generate OTP
    otp = generate_otp()

    # Store registration information temporarily
    await save_otp(
        name,
        email,
        password,
        otp
    )

    # Send OTP email
    try:
        await send_otp_email(
            email,
            otp
        )

    except Exception as e:
        # Remove pending registration if email sending fails
        await delete_pending_otp(email)

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send OTP: {str(e)}"
        )

    return {
        "message": "OTP sent successfully",
        "email": email
    }


# ============================================================
# VERIFY OTP
# ============================================================

async def verify_otp(
    email: str,
    otp: str
):
    db = get_database()
    users = db["users"]

    # --------------------------------------------------------
    # Get pending registration
    # --------------------------------------------------------

    pending = await get_pending_otp(email)

    if not pending:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No pending registration found"
        )

    # --------------------------------------------------------
    # Check OTP
    # --------------------------------------------------------

    stored_otp = str(pending["otp"]).strip()
    entered_otp = str(otp).strip()

    if stored_otp != entered_otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OTP"
        )

    # --------------------------------------------------------
    # Check OTP expiration
    # --------------------------------------------------------

    expires_at = pending["expires_at"]

    # MongoDB may return a naive datetime.
    # Convert it to UTC-aware datetime.
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(
            tzinfo=timezone.utc
        )

    current_time = datetime.now(timezone.utc)

    if expires_at < current_time:

        await delete_pending_otp(email)

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP has expired"
        )

    # --------------------------------------------------------
    # Check whether email was registered meanwhile
    # --------------------------------------------------------

    existing = await users.find_one({
        "email": email
    })

    if existing:

        await delete_pending_otp(email)

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # --------------------------------------------------------
    # Hash password
    # --------------------------------------------------------

    hashed_password = hash_password(
        pending["password"]
    )

    # --------------------------------------------------------
    # Create actual user
    # --------------------------------------------------------

    result = await users.insert_one({
        "name": pending["name"],
        "email": pending["email"],
        "password": hashed_password,
        "email_verified": True
    })

    user_id = str(result.inserted_id)

    # --------------------------------------------------------
    # Delete OTP after successful verification
    # --------------------------------------------------------

    await delete_pending_otp(email)

    # --------------------------------------------------------
    # Create JWT token
    # --------------------------------------------------------

    token = create_access_token({
        "sub": user_id
    })

    # --------------------------------------------------------
    # Return login information
    # --------------------------------------------------------

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "name": pending["name"],
            "email": pending["email"]
        }
    }


# ============================================================
# NORMAL LOGIN
# ============================================================

async def login_user(
    email: str,
    password: str
):
    db = get_database()
    users = db["users"]

    # Find user
    user = await users.find_one({
        "email": email
    })

    # Check credentials
    if not user or not verify_password(
        password,
        user["password"]
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Get user ID
    user_id = str(user["_id"])

    # Create JWT
    token = create_access_token({
        "sub": user_id
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "name": user["name"],
            "email": user["email"]
        }
    }


# ============================================================
# GOOGLE LOGIN
# ============================================================

async def google_login(
    token: str
):
    db = get_database()
    users = db["users"]

    try:

        # ----------------------------------------------------
        # Verify Google ID token
        # ----------------------------------------------------

        google_user = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            settings.GOOGLE_CLIENT_ID
        )

        email = google_user.get("email")
        name = google_user.get("name")

        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Google account email not found"
            )

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google token"
        )

    # --------------------------------------------------------
    # Check existing user
    # --------------------------------------------------------

    user = await users.find_one({
        "email": email
    })

    # --------------------------------------------------------
    # Register automatically if first Google login
    # --------------------------------------------------------

    if not user:

        result = await users.insert_one({
            "name": name,
            "email": email,
            "google": True,
            "email_verified": True
        })

        user_id = str(result.inserted_id)

    else:

        user_id = str(user["_id"])
        name = user["name"]

    # --------------------------------------------------------
    # Generate JWT
    # --------------------------------------------------------

    jwt_token = create_access_token({
        "sub": user_id
    })

    return {
        "access_token": jwt_token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "name": name,
            "email": email
        }
    }
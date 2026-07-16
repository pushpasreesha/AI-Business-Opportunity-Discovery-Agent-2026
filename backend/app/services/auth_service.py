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


async def register_user(name: str, email: str, password: str):
    db = get_database()
    users = db["users"]

    existing = await users.find_one({"email": email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed_pw = hash_password(password)

    result = await users.insert_one({
        "name": name,
        "email": email,
        "password": hashed_pw
    })

    user_id = str(result.inserted_id)
    token = create_access_token({"sub": user_id})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "name": name,
            "email": email
        }
    }


async def login_user(email: str, password: str):
    db = get_database()
    users = db["users"]

    user = await users.find_one({"email": email})

    if not user or not verify_password(password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    user_id = str(user["_id"])
    token = create_access_token({"sub": user_id})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "name": user["name"],
            "email": user["email"]
        }
    }


async def google_login(token: str):
    db = get_database()
    users = db["users"]

    try:
        # Verify Google ID token
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

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google token"
        )


    # Check existing user
    user = await users.find_one({"email": email})


    # Register automatically if first Google login
    if not user:
        result = await users.insert_one({
            "name": name,
            "email": email,
            "google": True
        })

        user_id = str(result.inserted_id)

    else:
        user_id = str(user["_id"])
        name = user["name"]


    # Generate JWT (same as normal login)
    jwt_token = create_access_token(
        {"sub": user_id}
    )


    return {
        "access_token": jwt_token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "name": name,
            "email": email
        }
    }
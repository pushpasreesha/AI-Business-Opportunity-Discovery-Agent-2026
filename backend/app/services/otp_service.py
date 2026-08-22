import random
import smtplib
from datetime import datetime, timedelta, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.config.settings import settings
from app.database.connection import get_database


def generate_otp():
    return str(random.randint(100000, 999999))


async def send_otp_email(email: str, otp: str):
    if not settings.SMTP_EMAIL:
        raise Exception("SMTP_EMAIL is not configured")

    if not settings.SMTP_APP_PASSWORD:
        raise Exception("SMTP_APP_PASSWORD is not configured")

    message = MIMEMultipart("alternative")

    message["From"] = f"AI Opportunity Agent <{settings.SMTP_EMAIL}>"
    message["To"] = email
    message["Subject"] = "Your OTP - AI Business Opportunity Agent"

    html = f"""
    <html>
        <body style="font-family: Arial, sans-serif;">
            <h2>Email Verification</h2>

            <p>Your OTP for the AI Business Opportunity Agent is:</p>

            <h1 style="letter-spacing: 5px;">{otp}</h1>

            <p>
                This OTP will expire in
                {settings.OTP_EXPIRE_MINUTES} minutes.
            </p>

            <p>
                If you did not request this OTP, you can ignore this email.
            </p>
        </body>
    </html>
    """

    message.attach(
        MIMEText(html, "html")
    )

    try:
        with smtplib.SMTP(
            settings.SMTP_HOST,
            settings.SMTP_PORT
        ) as server:

            server.starttls()

            server.login(
                settings.SMTP_EMAIL,
                settings.SMTP_APP_PASSWORD
            )

            server.sendmail(
                settings.SMTP_EMAIL,
                email,
                message.as_string()
            )

    except Exception as e:
        raise Exception(
            f"Failed to send OTP email: {str(e)}"
        )

    return True


async def save_otp(
    name: str,
    email: str,
    password: str,
    otp: str
):
    db = get_database()
    pending_otps = db["pending_otps"]

    expires_at = (
        datetime.now(timezone.utc)
        + timedelta(
            minutes=settings.OTP_EXPIRE_MINUTES
        )
    )

    # Remove any previous OTP
    await pending_otps.delete_many({
        "email": email
    })

    await pending_otps.insert_one({
        "name": name,
        "email": email,
        "password": password,
        "otp": otp,
        "expires_at": expires_at,
        "created_at": datetime.now(timezone.utc)
    })


async def get_pending_otp(email: str):
    db = get_database()
    pending_otps = db["pending_otps"]

    return await pending_otps.find_one({
        "email": email
    })


async def delete_pending_otp(email: str):
    db = get_database()
    pending_otps = db["pending_otps"]

    await pending_otps.delete_many({
        "email": email
    })
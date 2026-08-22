from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    GEMINI_API_KEY: str = ""
    GROQ_API_KEY: str = ""
    NEWS_API_KEY: str = ""

    MONGO_URI: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "opportunity_agent_db"

    JWT_SECRET_KEY: str = "change-this-to-a-random-secret-key"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080

    # Google OAuth
    GOOGLE_CLIENT_ID: str = ""

    # Gmail SMTP
    SMTP_EMAIL: str = ""
    SMTP_APP_PASSWORD: str = ""
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587

    # OTP
    OTP_EXPIRE_MINUTES: int = 10

    class Config:
        env_file = ".env"


settings = Settings()
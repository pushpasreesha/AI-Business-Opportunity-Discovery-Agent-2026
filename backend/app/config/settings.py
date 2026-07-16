from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    GEMINI_API_KEY: str = ""
    GROQ_API_KEY: str = ""
    NEWS_API_KEY: str = ""

    MONGO_URI: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "opportunity_agent_db"

    JWT_SECRET_KEY: str = "change-this-to-a-random-secret-key"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days

    # Google OAuth
    GOOGLE_CLIENT_ID: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
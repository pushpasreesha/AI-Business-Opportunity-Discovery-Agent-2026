from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import settings


class Database:
    client: AsyncIOMotorClient = None
    db = None


db_instance = Database()


async def connect_to_mongo():
    db_instance.client = AsyncIOMotorClient(settings.MONGO_URI)
    db_instance.db = db_instance.client[settings.DATABASE_NAME]
    print(f"Connected to MongoDB: {settings.DATABASE_NAME}")


async def close_mongo_connection():
    db_instance.client.close()
    print("Disconnected from MongoDB")


def get_database():
    return db_instance.db
from datetime import datetime, timezone
from bson import ObjectId
from app.database.connection import get_database


async def save_analysis(user_id: str, industry: str, location: str, result: dict):
    db = get_database()
    history = db["history"]

    doc = {
        "user_id": user_id,
        "industry": industry,
        "location": location,
        "result": result,
        "created_at": datetime.now(timezone.utc)
    }

    await history.insert_one(doc)


async def get_user_history(user_id: str):
    db = get_database()
    history = db["history"]

    cursor = history.find({"user_id": user_id}).sort("created_at", -1)
    items = []

    async for doc in cursor:
        items.append({
            "id": str(doc["_id"]),
            "industry": doc["industry"],
            "location": doc["location"],
            "result": doc["result"],
            "created_at": doc["created_at"]
        })

    return items
from pydantic import BaseModel
from typing import Any
from datetime import datetime


class HistoryItem(BaseModel):
    id: str
    industry: str
    location: str
    result: Any
    created_at: datetime
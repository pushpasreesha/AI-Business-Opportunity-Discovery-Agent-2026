from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from app.api.routes import router
from app.api.auth_routes import auth_router
from app.database.connection import connect_to_mongo, close_mongo_connection


app = FastAPI(
    title="AI Business Opportunity Discovery Agent",
    version="1.0.0",
    description="Backend API for AI Business Opportunity Discovery Agent"
)

allowed_origins = [
    "http://localhost:5173",
    os.getenv("FRONTEND_URL", ""),
]
allowed_origins = [origin for origin in allowed_origins if origin]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()


@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()


app.include_router(router)
app.include_router(auth_router)


@app.get("/")
async def root():
    return {
        "message": "AI Business Opportunity Discovery Agent Backend is Running 🚀"
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "AI Business Opportunity Discovery Agent",
        "version": "1.0.0"
    }
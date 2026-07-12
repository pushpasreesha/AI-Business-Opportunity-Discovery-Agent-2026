from fastapi import APIRouter, Depends

from app.schemas.user_schema import UserRegister, UserLogin, Token
from app.services.auth_service import register_user, login_user
from app.utils.deps import get_current_user


auth_router = APIRouter(prefix="/auth", tags=["auth"])


@auth_router.post("/register", response_model=Token)
async def register(request: UserRegister):
    return await register_user(
        request.name, request.email, request.password
    )


@auth_router.post("/login", response_model=Token)
async def login(request: UserLogin):
    return await login_user(request.email, request.password)


@auth_router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
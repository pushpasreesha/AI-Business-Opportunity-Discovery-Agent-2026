from fastapi import APIRouter, Depends

from app.schemas.user_schema import (
    UserRegister,
    UserLogin,
    GoogleLoginRequest,
    Token
)

from app.services.auth_service import (
    register_user,
    login_user,
    google_login,
    verify_otp
)

from app.utils.deps import get_current_user


auth_router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@auth_router.post("/register")
async def register(request: UserRegister):
    return await register_user(
        request.name,
        request.email,
        request.password
    )


@auth_router.post("/verify-otp", response_model=Token)
async def verify_registration_otp(
    email: str,
    otp: str
):
    return await verify_otp(
        email,
        otp
    )


@auth_router.post("/login", response_model=Token)
async def login(request: UserLogin):
    return await login_user(
        request.email,
        request.password
    )


@auth_router.post("/google", response_model=Token)
async def google_auth(request: GoogleLoginRequest):
    return await google_login(
        request.token
    )


@auth_router.get("/me")
async def get_me(
    current_user: dict = Depends(get_current_user)
):
    return current_user
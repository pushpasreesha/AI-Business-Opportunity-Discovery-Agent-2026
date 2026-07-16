from pydantic import BaseModel, EmailStr


# User registration
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str


# Normal email/password login
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Google login request
class GoogleLoginRequest(BaseModel):
    token: str


# User response data
class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr


# JWT token response
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
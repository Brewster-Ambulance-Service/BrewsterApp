# app/auth/schemas.py
from pydantic import BaseModel, EmailStr

# If you're on Pydantic v2 (FastAPI default now), use ConfigDict
try:
    from pydantic import ConfigDict
    _V2 = True
except Exception:
    _V2 = False

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str | None = None

class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str | None = None
    role: str

    # Pydantic v2
    if _V2:
        model_config = ConfigDict(from_attributes=True)
    else:
        # Pydantic v1 fallback
        class Config:
            orm_mode = True

class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

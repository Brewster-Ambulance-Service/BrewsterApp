# app/routers/auth.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# Example request body
class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login_user(data: LoginRequest):
    if data.username == "admin" and data.password == "password123":
        return {"access_token": "fake-jwt-token", "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

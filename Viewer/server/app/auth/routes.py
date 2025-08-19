from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from .db import get_db
from . import models, schemas, security

router = APIRouter(prefix="/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

@router.post("/register", response_model=schemas.UserOut, status_code=201)
def register(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, payload.email.lower()):
        raise HTTPException(status_code=409, detail="Email already exists")
    user = models.User(
        email=payload.email.lower(),
        password=security.hash_password(payload.password),
        full_name=payload.full_name or "",
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/login", response_model=schemas.TokenPair)
def login(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    user = get_user_by_email(db, payload.email.lower())
    if not user or not security.verify_password(payload.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return schemas.TokenPair(
        access_token=security.make_access_token(user.email),
        refresh_token=security.make_refresh_token(user.email),
    )

@router.get("/me", response_model=schemas.UserOut)
def me(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        data = security.parse_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = get_user_by_email(db, data["sub"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

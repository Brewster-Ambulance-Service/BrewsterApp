from fastapi import FastAPI
from app.auth.db import Base, engine
from app.auth import models
from app.auth.routes import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="BrewsterApp API")
app.include_router(auth_router)

@app.get("/")
def root():
    return {"msg": "Hello from BrewsterApp"}

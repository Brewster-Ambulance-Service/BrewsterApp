#data models for the database to speciifcy how to create and get users
from sqlalchemy import Column, Integer, String, Boolean
from .db import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    division = Column(String, nullable=False)
    role = Column(String, default="supervisor")
    
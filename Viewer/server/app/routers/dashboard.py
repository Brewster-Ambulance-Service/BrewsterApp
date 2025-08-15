from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Activity(BaseModel):
    icon: str
    title: str
    time_ago: str

@router.get("/dashboard/activity", response_model=List[Activity])
def recent_activity():
    return [
        {"icon":"🚑","title":"Vehicle 12 dispatched","time_ago":"2 minutes ago"},
        {"icon":"✅","title":"Call completed - Vehicle 8","time_ago":"5 minutes ago"},
        {"icon":"⚠️","title":"Maintenance alert - Vehicle 3","time_ago":"15 minutes ago"},
    ]

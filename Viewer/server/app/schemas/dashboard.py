# app/schemas/dashboard.py
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# ---------- Summary ----------
class SummaryKPI(BaseModel):
    calls_today: int = 0
    active_units: int = 0
    avg_response_minutes: float = 0.0
    open_alerts: int = 0

class SummaryResponse(BaseModel):
    summary: SummaryKPI

# ---------- Recent Activity ----------
class ActivityItem(BaseModel):
    icon: str = Field("🛈", description="emoji/icon")
    title: str
    time_ago: str
    ts: datetime

# ---------- Vehicle Status ----------
class VehicleStatus(BaseModel):
    vehicle_id: str
    label: str
    status: str         # e.g. "available" | "on_call" | "out_of_service"
    last_update: datetime
    location: Optional[str] = None

# ---------- Alerts ----------
class AlertItem(BaseModel):
    id: str
    severity: str       # "info" | "warning" | "critical"
    title: str
    detail: Optional[str] = None
    ts: datetime

# app/main.py
from contextlib import asynccontextmanager
import logging
from uuid import uuid4

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.gzip import GZipMiddleware
from starlette.responses import RedirectResponse, Response

from app.config import settings
from app.routers import auth

# logging to log our problems and everything
logging.basicConfig(
    level=logging.DEBUG if settings.debug else logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s :: %(message)s",
)
logger = logging.getLogger("app")
logger.info("Starting application...")

# app startup and shutdown logic  (lifespan replaces deprecated @app.on_event)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # e.g., await db.connect()
    print("🚀 App starting up...")
    yield
    # e.g., await db.disconnect()
    print("🛑 App shutting down...")

# Iniitates the app instance with a FastAPI
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    docs_url=settings.docs_url,      # uses your computed property
    redoc_url=settings.REDOC_URL,
    lifespan=lifespan
)

# CORS middleware to protect the leakage
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,  # <— lowercase property
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],  # fixed typo
    max_age=300,
)

# Gzip to minimize API calls ro make smaller when sending
app.add_middleware(GZipMiddleware, minimum_size=1024)

# request-id to match tracing calls for logging and debugging
class RequestIDMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        rid = request.headers.get("X-Request-ID", str(uuid4()))
        request.state.request_id = rid
        response = await call_next(request)
        response.headers["X-Request-ID"] = rid
        return response

app.add_middleware(RequestIDMiddleware)

# handles global errors
@app.exception_handler(Exception)
async def unhandled_exception_handler(_req: Request, exc: Exception):
    return JSONResponse(
        status_code=getattr(exc, "status_code", 500),
        content={"ok": False, "error": {"type": exc.__class__.__name__, "message": str(getattr(exc, "detail", exc))}},
    )

# security headers (runs for every response)
@app.middleware("http")
async def security_headers(request: Request, call_next):
    resp: Response = await call_next(request)
    resp.headers.setdefault("X-Content-Type-Options", "nosniff")
    resp.headers.setdefault("X-Frame-Options", "DENY")
    resp.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    return resp

# All auth routes will start with /api/auth
app.include_router(
    auth.router,
    prefix="/api/auth",
    tags=["auth"]
)

# health
@app.get("/health", tags=["System"])
def health_check():
    return {"status": "ok"}

@app.get("/api/version")
def version():
    return {"version": getattr(settings, "APP_VERSION", "0.1.0")}

@app.get("/", include_in_schema=False)
def root():
    # use the computed property; fallback to versioned health if docs are hidden
    return RedirectResponse(url=(settings.docs_url or f"{settings.API_PREFIX}/health"))

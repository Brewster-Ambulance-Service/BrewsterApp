# app/config.py
from __future__ import annotations

from pathlib import Path
from typing import List, Optional

from pydantic import field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# Resolve .../server/.env no matter where the app is launched from
_ENV_PATH = (Path(__file__).resolve().parent.parent / ".env").as_posix()


class Settings(BaseSettings):
    # ----- Pydantic v2 settings -----
    model_config = SettingsConfigDict(
        env_file=_ENV_PATH,            # load server/.env
        env_file_encoding="utf-8",
        case_sensitive=True,           # keep UPPERCASE keys as-is
        extra="allow",                 # don't explode on extra env vars
    )

    # ---- Environment ----
    # One of: development | staging | production
    ENV: str = "development"

    # ---- App meta ----
    APP_NAME: str = "Brewster API"
    APP_VERSION: str = "1.0.0"
    API_PREFIX: str = "/v1"

    # ---- CORS (front-end origins) ----
    WEB_ORIGIN: str = "http://localhost:5173"
    WEB_ORIGINS: str = ""  # CSV: "http://localhost:5173,https://staging.example.com"

    # ---- Debug & Docs ----
    DEBUG: Optional[bool] = None      # auto if None (true for dev, false otherwise)
    DOCS_URL: Optional[str] = None    # auto if None ("/docs" in dev/staging, hidden in prod)
    REDOC_URL: Optional[str] = None   # keep None unless you want ReDoc

    # ---- Optional: DB & Auth (fill when ready) ----
    DATABASE_URL: Optional[str] = None
    JWT_SECRET: Optional[str] = None

    # ---- Snowflake ----
    SNOWFLAKE_ACCOUNT: str | None = None
    SNOWFLAKE_USER: str | None = None
    SNOWFLAKE_PASSWORD: str | None = None
    SNOWFLAKE_ROLE: str | None = None
    SNOWFLAKE_WAREHOUSE: str | None = None
    SNOWFLAKE_DATABASE: str | None = None
    SNOWFLAKE_SCHEMA: str | None = None

    # -------- Derived / Helpers --------
    @property
    def is_dev(self) -> bool:
        return self.ENV.lower() in ("dev", "development")

    @property
    def is_staging(self) -> bool:
        return self.ENV.lower() in ("stage", "staging")

    @property
    def is_prod(self) -> bool:
        return self.ENV.lower() in ("prod", "production")

    @property
    def allowed_origins(self) -> List[str]:
        # prefer WEB_ORIGINS CSV; fallback to single WEB_ORIGIN
        if self.WEB_ORIGINS.strip():
            return [o.strip() for o in self.WEB_ORIGINS.split(",") if o.strip()]
        return [self.WEB_ORIGIN]

    @property
    def docs_url(self) -> Optional[str]:
        # If DOCS_URL explicitly set, honor it.
        if self.DOCS_URL is not None:
            return self.DOCS_URL
        # Default: show docs in dev/staging, hide in prod.
        return "/docs" if (self.is_dev or self.is_staging) else None

    @property
    def debug(self) -> bool:
        # If DEBUG explicitly set, honor it; else true in dev.
        if self.DEBUG is not None:
            return self.DEBUG
        return self.is_dev

    # ---- Validations / guardrails ----
    @field_validator("ENV")
    @classmethod
    def _validate_env(cls, v: str) -> str:
        allowed = {"development", "dev", "staging", "stage", "production", "prod"}
        if v.lower() not in allowed:
            raise ValueError(f"ENV must be one of {sorted(allowed)}")
        return v

    @model_validator(mode="after")
    def _require_jwt_in_prod(self):
        """Fail fast if you deploy prod without a JWT secret."""
        if self.is_prod and not self.JWT_SECRET:
            raise ValueError("JWT_SECRET is required in production")
        return self


settings = Settings()

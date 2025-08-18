# server/app/core/snowflake.py
from contextlib import contextmanager
from typing import Optional, Tuple, List, Dict, Any

import snowflake.connector
from app.config import settings


def _ensure(v: Optional[str], name: str) -> str:
    """Raise a readable error if a required setting is missing."""
    if v is None or str(v).strip() == "":
        raise RuntimeError(f"Missing Snowflake setting: {name}. Check server/.env")
    return v


@contextmanager
def snowflake_conn():
    """
    Open a short-lived Snowflake connection using env-driven settings.
    Always closes, even if the caller raises.
    """
    conn = snowflake.connector.connect(
        account=_ensure(settings.SNOWFLAKE_ACCOUNT,  "SNOWFLAKE_ACCOUNT"),
        user=_ensure(settings.SNOWFLAKE_USER,        "SNOWFLAKE_USER"),
        password=_ensure(settings.SNOWFLAKE_PASSWORD,"SNOWFLAKE_PASSWORD"),
        warehouse=_ensure(settings.SNOWFLAKE_WAREHOUSE, "SNOWFLAKE_WAREHOUSE"),
        database=_ensure(settings.SNOWFLAKE_DATABASE,   "SNOWFLAKE_DATABASE"),
        schema=_ensure(settings.SNOWFLAKE_SCHEMA,       "SNOWFLAKE_SCHEMA"),
        role=settings.SNOWFLAKE_ROLE,  # optional
        client_session_keep_alive=False,
    )
    try:
        yield conn
    finally:
        try:
            conn.close()
        except Exception:
            pass


def fetch_all(sql: str, params: Optional[Tuple] = None) -> List[Dict[str, Any]]:
    """
    Execute a query and return rows as list[dict], with lowercased column names.
    """
    with snowflake_conn() as cn:
        cur = cn.cursor()
        try:
            cur.execute(sql, params or ())
            cols = [d[0].lower() for d in cur.description]
            return [dict(zip(cols, row)) for row in cur.fetchall()]
        finally:
            cur.close()

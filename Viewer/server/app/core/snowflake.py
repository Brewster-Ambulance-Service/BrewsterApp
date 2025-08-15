# app/core/snowflake.py
import snowflake.connector
from contextlib import contextmanager
from app.config import settings

@contextmanager
def snowflake_conn():
    """Short-lived connection per request (safe & simple for a demo)."""
    conn = snowflake.connector.connect(
        account=settings.SNOWFLAKE_ACCOUNT,
        user=settings.SNOWFLAKE_USER,
        password=settings.SNOWFLAKE_PASSWORD,
        role=settings.SNOWFLAKE_ROLE,
        warehouse=settings.SNOWFLAKE_WAREHOUSE,
        database=settings.SNOWFLAKE_DATABASE,
        schema=settings.SNOWFLAKE_SCHEMA,
        client_session_keep_alive=False,
    )
    try:
        yield conn
    finally:
        try:
            conn.close()
        except Exception:
            pass

def fetch_all(sql: str, params: tuple | None = None):
    with snowflake_conn() as cn:
        cur = cn.cursor()
        try:
            cur.execute(sql, params or ())
            cols = [d[0].lower() for d in cur.description]
            rows = [dict(zip(cols, r)) for r in cur.fetchall()]
            return rows
        finally:
            cur.close()

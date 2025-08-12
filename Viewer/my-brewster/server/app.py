# server/app.py
import os
from typing import Any, Dict, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import snowflake.connector
from dotenv import load_dotenv

load_dotenv()  # loads from .env

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev-friendly; tighten for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cache a single connection for dev
_conn = None

def get_conn():
    global _conn
    if _conn is None or _conn.is_closed():
        _conn = snowflake.connector.connect(
            user=os.getenv("SNOWFLAKE_USER"),
            password=os.getenv("SNOWFLAKE_PASSWORD"),
            account=os.getenv("SNOWFLAKE_ACCOUNT"),
            warehouse=os.getenv("SNOWFLAKE_WAREHOUSE"),
            database=os.getenv("SNOWFLAKE_DATABASE"),
            schema=os.getenv("SNOWFLAKE_SCHEMA"),
            role=os.getenv("SNOWFLAKE_ROLE", None),
        )
    return _conn

@app.get("/api/health")
def health():
    try:
        conn = get_conn()
        cur = conn.cursor()
        try:
            cur.execute("SELECT CURRENT_TIMESTAMP() AS now")
            row = cur.fetchone()
            return {"ok": True, "now": str(row[0])}
        finally:
            cur.close()
    except Exception as e:
        return {"ok": False, "error": str(e)}

class QueryBody(BaseModel):
    sql: str

@app.post("/api/query")
def run_query(body: QueryBody) -> Dict[str, Any]:
    sql = body.sql.strip()
    if not sql:
        raise HTTPException(status_code=400, detail="SQL is required")
    try:
        conn = get_conn()
        cur = conn.cursor()
        try:
            cur.execute(sql)
            cols = [c[0] for c in cur.description] if cur.description else []
            rows = cur.fetchall() if cols else []
            return {"columns": cols, "rows": rows}
        finally:
            cur.close()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

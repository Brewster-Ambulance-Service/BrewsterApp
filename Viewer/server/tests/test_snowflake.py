import sys, os
sys.path.append(os.path.abspath(os.path.dirname(__file__) + "/.."))  # adds server/ to path

from app.core.snowflake import fetch_all

if __name__ == "__main__":
    try:
        rows = fetch_all("SELECT CURRENT_TIMESTAMP, CURRENT_USER")
        print("✅ Connection successful!")
        print(rows)
    except Exception as e:
        print("❌ Connection failed:", e)

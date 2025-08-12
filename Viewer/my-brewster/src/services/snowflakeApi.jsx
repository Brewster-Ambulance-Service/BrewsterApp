// src/services/snowflakeApi.js
export async function healthCheck() {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error(`Health check failed: ${res.status}`);
    return res.json();
  }
  
  export async function runQuery(sql) {
    const res = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sql })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || `Query failed: ${res.status}`);
    }
    return res.json();
  }
  
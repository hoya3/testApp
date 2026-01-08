# Flask backend (minimal)

This folder contains a minimal Flask REST API used for local development and testing.

Available endpoints:
- `GET /api/health` — health check
- `POST /api/login` — accepts JSON `{ "username": "...", "password": "..." }`

Quick start (Windows):

```powershell
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

After that the API will be available at `http://127.0.0.1:5000`.

Notes:
- The `/api/login` endpoint currently contains a dummy auth check. Replace with your auth logic.
- For production, use proper secret management and issue tokens securely (HttpOnly cookies or signed JWTs).

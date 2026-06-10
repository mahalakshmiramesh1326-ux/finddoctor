# 🏥 MediFind TN — Full App (Frontend + Backend)

## 📁 Folder Structure
```
medifind-full/
  ├── frontend/          ← React app (what user sees)
  │   ├── src/
  │   ├── public/
  │   └── package.json
  ├── backend/           ← Python server (saves data)
  │   ├── main.py
  │   ├── database.py
  │   ├── routers/
  │   └── requirements.txt
  ├── start.bat          ← Windows: double-click to start BOTH
  └── README.md
```

---

## ▶️ HOW TO RUN — Just 2 steps!

### First time only — install everything:
Open this folder in VS Code → open Terminal → run:
```
cd backend
pip install -r requirements.txt
cd ../frontendn
npm install
```

### Every time you want to run:
**Just double-click `start.bat`** — it starts both frontend and backend automatically!

Or manually open TWO terminals:
```
Terminal 1:   cd backend   → uvicorn main:app --reload
Terminal 2:   cd frontend  → npm start
```

App opens at: http://localhost:3000
Backend runs at: http://localhost:8000/docs

---

## ✏️ How to add your hospital
Open: `backend/database.py` → scroll to `fill_sample_data` → add your hospital block

## 🌐 API Testing
Open: http://localhost:8000/docs — test all APIs visually!

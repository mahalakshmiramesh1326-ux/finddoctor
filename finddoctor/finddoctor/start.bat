@echo off
echo ========================================
echo    MediFind TN - Starting App...
echo ========================================
echo.
echo Starting Python Backend...
start cmd /k "cd backend && uvicorn main:app --reload"
timeout /t 3
echo Starting React Frontend...
start cmd /k "cd frontend && npm start"
echo.
echo ✅ Both servers starting...
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Browser will open automatically in a few seconds!
pause

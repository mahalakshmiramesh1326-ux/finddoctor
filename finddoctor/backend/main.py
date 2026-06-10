from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routers import hospitals, doctors, bookings

app = FastAPI(title="MediFind TN API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(hospitals.router, prefix="/api/hospitals", tags=["Hospitals"])
app.include_router(doctors.router,   prefix="/api/doctors",   tags=["Doctors"])
app.include_router(bookings.router,  prefix="/api/bookings",  tags=["Bookings"])

@app.on_event("startup")
def startup():
    init_db()
    print("✅ MediFind Backend Started!")
    print("📖 API Docs: http://localhost:8000/docs")

@app.get("/")
def home():
    return {"message": "MediFind TN Backend Running! 🏥", "docs": "http://localhost:8000/docs"}

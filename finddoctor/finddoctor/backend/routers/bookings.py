from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_connection
import random, string
from datetime import datetime

router = APIRouter()

class BookingCreate(BaseModel):
    hospital_id: int; hospital_name: str
    doctor_id: int; doctor_name: str; doctor_type: str
    slot: str; fee: int
    patient_name: str; patient_phone: str
    patient_age: int; patient_gender: str; reason: str

def gen_ref():
    r = ''.join(random.choices(string.ascii_uppercase+string.digits, k=6))
    return f"MF-{datetime.now().year}-{r}"

@router.post("/")
def create(data: BookingCreate):
    conn = get_connection(); cursor = conn.cursor()
    ref = gen_ref()
    cursor.execute("""INSERT INTO bookings
        (booking_ref,hospital_id,hospital_name,doctor_id,doctor_name,doctor_type,
         slot,fee,patient_name,patient_phone,patient_age,patient_gender,reason,status)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,'confirmed')""",
        (ref,data.hospital_id,data.hospital_name,data.doctor_id,data.doctor_name,
         data.doctor_type,data.slot,data.fee,data.patient_name,data.patient_phone,
         data.patient_age,data.patient_gender,data.reason))
    conn.commit(); conn.close()
    return {"message":"Booking confirmed! ✅","booking_ref":ref,"hospital":data.hospital_name,
            "doctor":data.doctor_name,"slot":data.slot,"patient":data.patient_name,"fee":data.fee}

@router.get("/")
def get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM bookings ORDER BY created_at DESC").fetchall()
    conn.close(); return [dict(r) for r in rows]

@router.get("/ref/{ref}")
def get_by_ref(ref: str):
    conn = get_connection()
    row = conn.execute("SELECT * FROM bookings WHERE booking_ref=?", (ref,)).fetchone()
    conn.close()
    if not row: raise HTTPException(404, "Booking not found")
    return dict(row)

@router.get("/phone/{phone}")
def get_by_phone(phone: str):
    conn = get_connection()
    rows = conn.execute("SELECT * FROM bookings WHERE patient_phone=? ORDER BY created_at DESC",(phone,)).fetchall()
    conn.close()
    if not rows: raise HTTPException(404, "No bookings found")
    return [dict(r) for r in rows]

@router.put("/{ref}/cancel")
def cancel(ref: str):
    conn = get_connection(); cursor = conn.cursor()
    cursor.execute("UPDATE bookings SET status='cancelled' WHERE booking_ref=?", (ref,))
    if cursor.rowcount == 0: raise HTTPException(404, "Booking not found")
    conn.commit(); conn.close()
    return {"message": f"Booking {ref} cancelled"}

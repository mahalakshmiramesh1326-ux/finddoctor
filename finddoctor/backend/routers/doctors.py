from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from database import get_connection
import json

router = APIRouter()

class DoctorCreate(BaseModel):
    hospital_id: int; name: str; type: str
    experience: int = 5; available_now: bool = False
    slots: list = []; fee: int = 300; image: str = "👨‍⚕️"

class DoctorUpdate(BaseModel):
    name: Optional[str]=None; type: Optional[str]=None
    experience: Optional[int]=None; available_now: Optional[bool]=None
    slots: Optional[list]=None; fee: Optional[int]=None

class AvailUpdate(BaseModel):
    available_now: bool

@router.get("/hospital/{hid}")
def get_doctors(hid: int):
    conn = get_connection()
    rows = conn.execute("SELECT * FROM doctors WHERE hospital_id=?", (hid,)).fetchall()
    conn.close()
    result = []
    for r in rows:
        d = dict(r); d["slots"] = json.loads(d.get("slots") or "[]")
        d["availableNow"] = bool(d.pop("available_now", 0)); result.append(d)
    return result

@router.post("/")
def add(data: DoctorCreate):
    conn = get_connection(); cursor = conn.cursor()
    cursor.execute("""INSERT INTO doctors (hospital_id,name,type,experience,available_now,slots,fee,image)
        VALUES (?,?,?,?,?,?,?,?)""",
        (data.hospital_id,data.name,data.type,data.experience,int(data.available_now),json.dumps(data.slots),data.fee,data.image))
    new_id = cursor.lastrowid; conn.commit(); conn.close()
    return {"message": "Doctor added!", "id": new_id}

@router.patch("/{did}/availability")
def toggle(did: int, data: AvailUpdate):
    conn = get_connection(); cursor = conn.cursor()
    cursor.execute("UPDATE doctors SET available_now=? WHERE id=?", (int(data.available_now), did))
    if cursor.rowcount == 0: raise HTTPException(404, "Doctor not found")
    conn.commit(); conn.close()
    status = "Available 🟢" if data.available_now else "Not Available 🔴"
    return {"message": f"Status: {status}"}

@router.put("/{did}")
def update(did: int, data: DoctorUpdate):
    conn = get_connection(); cursor = conn.cursor()
    updates = data.dict(exclude_none=True)
    if "available_now" in updates: updates["available_now"] = int(updates["available_now"])
    if "slots" in updates: updates["slots"] = json.dumps(updates["slots"])
    if not updates: return {"message": "Nothing to update"}
    set_clause = ", ".join(f"{k}=?" for k in updates)
    cursor.execute(f"UPDATE doctors SET {set_clause} WHERE id=?", list(updates.values())+[did])
    conn.commit(); conn.close()
    return {"message": "Doctor updated!"}

@router.delete("/{did}")
def delete(did: int):
    conn = get_connection(); cursor = conn.cursor()
    cursor.execute("DELETE FROM doctors WHERE id=?", (did,))
    conn.commit(); conn.close()
    return {"message": "Doctor removed!"}

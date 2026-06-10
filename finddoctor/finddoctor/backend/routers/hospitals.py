from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from database import get_connection
import json

router = APIRouter()

class HospitalCreate(BaseModel):
    name: str; district: str; area: str; address: str
    phone: str; emergency: str; rating: float = 4.0
    beds: int = 100; established: int = 2000; image: str = "🏥"
    facilities: list = []; about: str = ""; lat: float = 0.0; lng: float = 0.0

def fmt(row, doctors=[]):
    h = dict(row)
    h["facilities"] = json.loads(h.get("facilities") or "[]")
    h["doctors"] = doctors
    return h

def get_docs(cursor, hid):
    rows = cursor.execute("SELECT * FROM doctors WHERE hospital_id=?", (hid,)).fetchall()
    result = []
    for r in rows:
        d = dict(r)
        d["slots"] = json.loads(d.get("slots") or "[]")
        d["availableNow"] = bool(d.pop("available_now", 0))
        result.append(d)
    return result

@router.get("/")
def get_all(district: str = None, area: str = None, doctor_type: str = None):
    conn = get_connection(); cursor = conn.cursor()
    q = "SELECT * FROM hospitals WHERE 1=1"; params = []
    if district: q += " AND district=?"; params.append(district)
    if area:     q += " AND area=?";     params.append(area)
    rows = cursor.execute(q, params).fetchall()
    result = []
    for row in rows:
        docs = get_docs(cursor, row["id"])
        if doctor_type:
            matched = [d for d in docs if d["type"] == doctor_type]
            if not matched: continue
        result.append(fmt(row, docs))
    conn.close(); return result

@router.get("/search")
def search(q: str):
    conn = get_connection(); cursor = conn.cursor()
    s = f"%{q.lower()}%"
    rows = cursor.execute("""
        SELECT DISTINCT h.* FROM hospitals h LEFT JOIN doctors d ON d.hospital_id=h.id
        WHERE LOWER(h.name) LIKE ? OR LOWER(h.district) LIKE ? OR LOWER(h.area) LIKE ?
           OR LOWER(d.name) LIKE ? OR LOWER(d.type) LIKE ?
    """, (s,s,s,s,s)).fetchall()
    result = [fmt(row, get_docs(cursor, row["id"])) for row in rows]
    conn.close(); return result

@router.get("/{hid}")
def get_one(hid: int):
    conn = get_connection(); cursor = conn.cursor()
    row = cursor.execute("SELECT * FROM hospitals WHERE id=?", (hid,)).fetchone()
    if not row: raise HTTPException(404, "Hospital not found")
    result = fmt(row, get_docs(cursor, hid))
    conn.close(); return result

@router.post("/")
def add(data: HospitalCreate):
    conn = get_connection(); cursor = conn.cursor()
    cursor.execute("""INSERT INTO hospitals
        (name,district,area,address,phone,emergency,rating,beds,established,image,facilities,about,lat,lng)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
        (data.name,data.district,data.area,data.address,data.phone,data.emergency,
         data.rating,data.beds,data.established,data.image,json.dumps(data.facilities),data.about,data.lat,data.lng))
    new_id = cursor.lastrowid; conn.commit(); conn.close()
    return {"message": "Hospital added!", "id": new_id}

@router.put("/{hid}")
def update(hid: int, data: HospitalCreate):
    conn = get_connection(); cursor = conn.cursor()
    cursor.execute("""UPDATE hospitals SET name=?,district=?,area=?,address=?,phone=?,emergency=?,
        rating=?,beds=?,established=?,image=?,facilities=?,about=?,lat=?,lng=? WHERE id=?""",
        (data.name,data.district,data.area,data.address,data.phone,data.emergency,
         data.rating,data.beds,data.established,data.image,json.dumps(data.facilities),data.about,data.lat,data.lng,hid))
    conn.commit(); conn.close()
    return {"message": "Hospital updated!"}

@router.delete("/{hid}")
def delete(hid: int):
    conn = get_connection(); cursor = conn.cursor()
    cursor.execute("DELETE FROM hospitals WHERE id=?", (hid,))
    cursor.execute("DELETE FROM doctors WHERE hospital_id=?", (hid,))
    conn.commit(); conn.close()
    return {"message": "Hospital deleted!"}

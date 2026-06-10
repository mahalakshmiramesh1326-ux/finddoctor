import sqlite3, json

DB_FILE = "medifind.db"

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    c = conn.cursor()

    c.execute("""CREATE TABLE IF NOT EXISTS hospitals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL, district TEXT NOT NULL, area TEXT NOT NULL,
        address TEXT NOT NULL, phone TEXT NOT NULL, emergency TEXT NOT NULL,
        rating REAL DEFAULT 4.0, beds INTEGER DEFAULT 100,
        established INTEGER DEFAULT 2000, image TEXT DEFAULT '🏥',
        facilities TEXT DEFAULT '[]', about TEXT DEFAULT '',
        lat REAL DEFAULT 0.0, lng REAL DEFAULT 0.0
    )""")

    c.execute("""CREATE TABLE IF NOT EXISTS doctors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hospital_id INTEGER NOT NULL, name TEXT NOT NULL, type TEXT NOT NULL,
        experience INTEGER DEFAULT 5, available_now INTEGER DEFAULT 0,
        slots TEXT DEFAULT '[]', fee INTEGER DEFAULT 300, image TEXT DEFAULT '👨‍⚕️',
        FOREIGN KEY (hospital_id) REFERENCES hospitals(id)
    )""")

    c.execute("""CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        booking_ref TEXT NOT NULL, hospital_id INTEGER, hospital_name TEXT,
        doctor_id INTEGER, doctor_name TEXT, doctor_type TEXT,
        slot TEXT, fee INTEGER DEFAULT 0,
        patient_name TEXT, patient_phone TEXT, patient_age INTEGER,
        patient_gender TEXT, reason TEXT,
        status TEXT DEFAULT 'confirmed',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )""")

    conn.commit()

    if c.execute("SELECT COUNT(*) FROM hospitals").fetchone()[0] == 0:
        fill_sample_data(c)
        conn.commit()
        print("✅ Hospital data loaded!")
    conn.close()

def fill_sample_data(c):
    # ================================================================
    # ADD YOUR HOSPITAL HERE — copy any block below and change details
    # ================================================================
    data = [
        # ── CHENNAI ──
        {
            "name": "Apollo Hospitals", "district": "Chennai", "area": "Royapettah",
            "address": "21, Greams Lane, Chennai - 600006",
            "phone": "+91 44 2829 3333", "emergency": "+91 44 2829 0200",
            "rating": 4.8, "beds": 560, "established": 1983, "image": "🏥",
            "facilities": ["ICU","NICU","Emergency 24/7","Pharmacy","Lab","Blood Bank","Ambulance","Dialysis"],
            "about": "Apollo Hospitals Chennai is India's first corporate hospital offering world-class treatments with cutting-edge technology.",
            "lat": 13.0569, "lng": 80.2521,
            "doctors": [
                {"name":"Dr. Rajesh Kumar",  "type":"Cardiologist",     "experience":18,"available_now":1,"slots":["9:00 AM","10:30 AM","3:00 PM","4:30 PM"],"fee":800, "image":"👨‍⚕️"},
                {"name":"Dr. Priya Nair",    "type":"Neurologist",      "experience":14,"available_now":0,"slots":["9:00 AM","12:00 PM","5:00 PM"],           "fee":900, "image":"👩‍⚕️"},
                {"name":"Dr. Suresh Babu",   "type":"General Physician","experience":10,"available_now":1,"slots":["9:30 AM","10:30 AM","2:00 PM","4:00 PM"], "fee":400, "image":"👨‍⚕️"},
                {"name":"Dr. Meena Sundaram","type":"Gynecologist",     "experience":16,"available_now":0,"slots":["11:00 AM","1:00 PM","3:30 PM"],            "fee":700, "image":"👩‍⚕️"},
                {"name":"Dr. Arjun Venkat",  "type":"Oncologist",       "experience":20,"available_now":1,"slots":["10:00 AM","1:00 PM","4:00 PM"],            "fee":1200,"image":"👨‍⚕️"},
            ]
        },
        {
            "name": "MIOT International", "district": "Chennai", "area": "Porur",
            "address": "4/112, Mount Poonamallee Road, Porur, Chennai - 600089",
            "phone": "+91 44 4200 2288", "emergency": "+91 44 4200 2200",
            "rating": 4.7, "beds": 1000, "established": 1999, "image": "🏥",
            "facilities": ["ICU","NICU","Emergency 24/7","Pharmacy","Lab","Radiology","Ambulance","Rehabilitation"],
            "about": "MIOT International is globally recognized for orthopedic and joint replacement surgeries with JCI accreditation.",
            "lat": 13.0358, "lng": 80.1642,
            "doctors": [
                {"name":"Dr. S. Senthilnathan","type":"Orthopedist",  "experience":25,"available_now":1,"slots":["9:00 AM","11:00 AM","2:00 PM"],            "fee":900, "image":"👨‍⚕️"},
                {"name":"Dr. Deepa Krishnan",  "type":"Neurologist",  "experience":17,"available_now":0,"slots":["10:00 AM","1:00 PM","4:00 PM"],             "fee":950, "image":"👩‍⚕️"},
                {"name":"Dr. Karthik Rajan",   "type":"Cardiologist", "experience":15,"available_now":1,"slots":["8:30 AM","11:30 AM","3:30 PM"],             "fee":850, "image":"👨‍⚕️"},
            ]
        },
        {
            "name": "Fortis Malar Hospital", "district": "Chennai", "area": "Adyar",
            "address": "52, 1st Main Road, Gandhi Nagar, Adyar, Chennai - 600020",
            "phone": "+91 44 4289 2222", "emergency": "+91 44 4289 2200",
            "rating": 4.6, "beds": 180, "established": 1992, "image": "🏨",
            "facilities": ["Emergency 24/7","ICU","Pharmacy","Lab","Radiology","Ambulance"],
            "about": "Fortis Malar is a leading multi-specialty hospital in Chennai's Adyar area known for cardiac and orthopedic care.",
            "lat": 13.0012, "lng": 80.2565,
            "doctors": [
                {"name":"Dr. Anil Sharma",   "type":"Orthopedist", "experience":20,"available_now":1,"slots":["9:00 AM","11:00 AM","2:30 PM"],  "fee":750,"image":"👨‍⚕️"},
                {"name":"Dr. Kavitha Rajan", "type":"Pediatrician","experience":12,"available_now":1,"slots":["10:00 AM","12:30 PM","4:00 PM"], "fee":500,"image":"👩‍⚕️"},
            ]
        },
        # ── NAGAPATTINAM ──
        {
            "name": "Nagapattinam Government District Hospital", "district": "Nagapattinam", "area": "Nagapattinam Town",
            "address": "Hospital Road, Nagapattinam - 611001",
            "phone": "+91 4365 242 100", "emergency": "+91 4365 242 108",
            "rating": 4.0, "beds": 550, "established": 1958, "image": "🏥",
            "facilities": ["ICU","Emergency 24/7","Pharmacy","Lab","Blood Bank","Ambulance","Trauma Center"],
            "about": "The Nagapattinam Government District Hospital is a major public healthcare facility serving the coastal districts.",
            "lat": 10.7672, "lng": 79.8449,
            "doctors": [
                {"name":"Dr. Balamurugan N",   "type":"General Physician","experience":15,"available_now":1,"slots":["8:00 AM","9:00 AM","10:00 AM","11:00 AM"],"fee":0,"image":"👨‍⚕️"},
                {"name":"Dr. Selvi Muthukumar","type":"Pediatrician",     "experience":11,"available_now":1,"slots":["8:00 AM","10:00 AM","12:00 PM","2:00 PM"], "fee":0,"image":"👩‍⚕️"},
                {"name":"Dr. Eswaran K",        "type":"Orthopedist",      "experience":14,"available_now":0,"slots":["2:00 PM","3:00 PM","4:00 PM"],             "fee":0,"image":"👨‍⚕️"},
            ]
        },
        {
            "name": "Srivaris Hospital", "district": "Nagapattinam", "area": "Nagapattinam Town",
            "address": "No 58, Perumal North Street, Melakottaivasal, Nagapattinam - 611001",
            "phone": "+91 7010364990", "emergency": "04365-224212",
            "rating": 4.1, "beds": 10, "established": 1990, "image": "🏥",
            "facilities": ["Emergency 24/7","Lab","Comprehensive Diabetes Care","Wheelchair Access"],
            "about": "A highly rated multi specialty healthcare facility established in Nagapattinam offering diabetes and general care.",
            "lat": 10.7680, "lng": 79.8460,
            "doctors": [
                {"name":"Dr. Ramesh Babu K", "type":"Pediatrician", "experience":10,"available_now":1,"slots":["9:00 AM","11:00 AM","2:00 PM","4:00 PM"],"fee":300,"image":"👨‍⚕️"},
                {"name":"Dr. Yajur Adhithya","type":"Diabetologist", "experience":8, "available_now":1,"slots":["9:00 AM","11:00 AM","2:00 PM","4:00 PM"],"fee":300,"image":"👨‍⚕️"},
            ]
        },
        {
            "name": "Annai Velankanni Hospital", "district": "Nagapattinam", "area": "Nagapattinam Town",
            "address": "Velankanni Road, Nagapattinam - 611001",
            "phone": "+91 4365 264 200", "emergency": "+91 4365 264 108",
            "rating": 4.2, "beds": 120, "established": 2001, "image": "🏨",
            "facilities": ["Emergency 24/7","ICU","Pharmacy","Lab","Ambulance"],
            "about": "Annai Velankanni Hospital provides quality private healthcare to the Nagapattinam coastal community.",
            "lat": 10.7685, "lng": 79.8455,
            "doctors": [
                {"name":"Dr. Xavier Raj",  "type":"General Physician","experience":10,"available_now":1,"slots":["9:00 AM","10:30 AM","3:00 PM","5:00 PM"],"fee":200,"image":"👨‍⚕️"},
                {"name":"Dr. Jancy Malar", "type":"Gynecologist",     "experience":12,"available_now":0,"slots":["10:00 AM","1:00 PM","4:00 PM"],           "fee":400,"image":"👩‍⚕️"},
            ]
        },
        {
            "name": "Mayiladuthurai Government Hospital", "district": "Nagapattinam", "area": "Mayiladuthurai",
            "address": "Hospital Road, Mayiladuthurai - 609001",
            "phone": "+91 4364 222 444", "emergency": "+91 4364 222 108",
            "rating": 4.1, "beds": 300, "established": 1965, "image": "🏥",
            "facilities": ["Emergency 24/7","ICU","Pharmacy","Lab","Blood Bank","Ambulance"],
            "about": "A major government hospital serving Mayiladuthurai and surrounding areas with free healthcare.",
            "lat": 11.1015, "lng": 79.6519,
            "doctors": [
                {"name":"Dr. Murugan S",   "type":"General Physician","experience":18,"available_now":1,"slots":["8:00 AM","9:00 AM","10:00 AM","11:00 AM"],"fee":0,"image":"👨‍⚕️"},
                {"name":"Dr. Thenmozhi R", "type":"Pediatrician",     "experience":9, "available_now":1,"slots":["9:00 AM","11:00 AM","2:00 PM"],            "fee":0,"image":"👩‍⚕️"},
            ]
        },
        # ── COIMBATORE ──
        {
            "name": "PSG Hospitals", "district": "Coimbatore", "area": "Peelamedu",
            "address": "Peelamedu, Coimbatore - 641004",
            "phone": "+91 422 257 3833", "emergency": "+91 422 257 3999",
            "rating": 4.7, "beds": 800, "established": 1986, "image": "🏥",
            "facilities": ["ICU","NICU","Emergency 24/7","Pharmacy","Lab","Blood Bank","Ambulance","Dialysis"],
            "about": "PSG Hospitals is one of Coimbatore's premier multi-specialty hospitals attached to PSG Medical College.",
            "lat": 11.0238, "lng": 77.0066,
            "doctors": [
                {"name":"Dr. Ramesh Patel",  "type":"General Physician","experience":8, "available_now":1,"slots":["9:00 AM","10:00 AM","11:00 AM","2:00 PM"],"fee":350,"image":"👨‍⚕️"},
                {"name":"Dr. Lakshmi Devi",  "type":"Dermatologist",    "experience":11,"available_now":0,"slots":["2:00 PM","3:30 PM","5:00 PM"],             "fee":600,"image":"👩‍⚕️"},
                {"name":"Dr. Arjun Krishnan","type":"ENT Specialist",   "experience":15,"available_now":1,"slots":["10:30 AM","12:00 PM","4:30 PM"],           "fee":550,"image":"👨‍⚕️"},
                {"name":"Dr. Preethi S",     "type":"Pediatrician",     "experience":9, "available_now":1,"slots":["9:00 AM","11:00 AM","1:00 PM","4:00 PM"],  "fee":450,"image":"👩‍⚕️"},
            ]
        },
        # ── MADURAI ──
        {
            "name": "Meenakshi Mission Hospital", "district": "Madurai", "area": "Madurai East",
            "address": "Lake Area, Melur Road, Madurai - 625107",
            "phone": "+91 452 235 8888", "emergency": "+91 452 235 8900",
            "rating": 4.5, "beds": 650, "established": 1990, "image": "🏥",
            "facilities": ["ICU","Emergency 24/7","Pharmacy","Lab","Radiology","Blood Bank","Ambulance"],
            "about": "Meenakshi Mission Hospital is a premier multi-specialty hospital in Madurai known for cardiac and neuro care.",
            "lat": 9.9252, "lng": 78.1198,
            "doctors": [
                {"name":"Dr. Senthil Kumar","type":"Cardiologist","experience":19,"available_now":1,"slots":["9:00 AM","11:30 AM","2:00 PM","4:00 PM"],"fee":850,"image":"👨‍⚕️"},
                {"name":"Dr. Vimala Suresh","type":"Gynecologist","experience":14,"available_now":0,"slots":["10:00 AM","1:30 PM","4:00 PM"],           "fee":650,"image":"👩‍⚕️"},
                {"name":"Dr. Muthu Raj",    "type":"Neurologist", "experience":13,"available_now":1,"slots":["8:30 AM","12:00 PM","3:30 PM","5:00 PM"], "fee":800,"image":"👨‍⚕️"},
            ]
        },
        # ── VELLORE ──
        {
            "name": "Christian Medical College (CMC)", "district": "Vellore", "area": "Vellore City",
            "address": "Ida Scudder Road, Vellore - 632004",
            "phone": "+91 416 228 2010", "emergency": "+91 416 228 2000",
            "rating": 4.9, "beds": 2600, "established": 1900, "image": "🏥",
            "facilities": ["ICU","NICU","Emergency 24/7","Pharmacy","Lab","Blood Bank","Ambulance","Trauma Center","Bone Marrow Transplant"],
            "about": "CMC Vellore is one of the world's finest hospitals and a global centre of excellence in medicine.",
            "lat": 12.9249, "lng": 79.1325,
            "doctors": [
                {"name":"Dr. Thomas Varghese","type":"Cardiologist", "experience":28,"available_now":1,"slots":["9:00 AM","11:00 AM","2:00 PM"],  "fee":1000,"image":"👨‍⚕️"},
                {"name":"Dr. Anitha George",  "type":"Neurologist",  "experience":22,"available_now":0,"slots":["10:00 AM","1:00 PM","4:00 PM"],  "fee":1100,"image":"👩‍⚕️"},
                {"name":"Dr. Samuel John",    "type":"Orthopedist",  "experience":20,"available_now":1,"slots":["8:30 AM","11:30 AM","3:30 PM"],  "fee":900, "image":"👨‍⚕️"},
                {"name":"Dr. Mary Mathew",    "type":"Gynecologist", "experience":18,"available_now":1,"slots":["9:00 AM","12:00 PM","3:00 PM"],  "fee":800, "image":"👩‍⚕️"},
                {"name":"Dr. Rajan Philip",   "type":"Oncologist",   "experience":24,"available_now":0,"slots":["10:00 AM","2:00 PM","5:00 PM"],  "fee":1500,"image":"👨‍⚕️"},
            ]
        },
        # ── THANJAVUR ──
        {
            "name": "Thanjavur Medical College Hospital", "district": "Thanjavur", "area": "Thanjavur City",
            "address": "Medical College Road, Thanjavur - 613004",
            "phone": "+91 4362 227 701", "emergency": "+91 4362 227 108",
            "rating": 4.3, "beds": 2000, "established": 1959, "image": "🏥",
            "facilities": ["ICU","NICU","Emergency 24/7","Pharmacy","Lab","Blood Bank","Ambulance","Trauma Center"],
            "about": "Thanjavur Medical College Hospital is one of Tamil Nadu's largest government hospitals.",
            "lat": 10.7905, "lng": 79.1397,
            "doctors": [
                {"name":"Dr. Periyasamy K","type":"General Physician","experience":20,"available_now":1,"slots":["8:00 AM","9:00 AM","10:00 AM","2:00 PM"],"fee":0,"image":"👨‍⚕️"},
                {"name":"Dr. Vanitha Devi","type":"Gynecologist",     "experience":16,"available_now":1,"slots":["9:00 AM","11:00 AM","2:00 PM","4:00 PM"], "fee":0,"image":"👩‍⚕️"},
                {"name":"Dr. Revathi N",   "type":"Pediatrician",    "experience":11,"available_now":1,"slots":["9:00 AM","11:00 AM","1:00 PM"],            "fee":0,"image":"👩‍⚕️"},
            ]
        },
        # ── TIRUNELVELI ──
        {
            "name": "GVMCH Tirunelveli", "district": "Tirunelveli", "area": "Tirunelveli City",
            "address": "High Ground Road, Tirunelveli - 627011",
            "phone": "+91 462 257 2933", "emergency": "+91 462 257 2100",
            "rating": 4.3, "beds": 1200, "established": 1966, "image": "🏥",
            "facilities": ["ICU","NICU","Emergency 24/7","Pharmacy","Lab","Blood Bank","Ambulance"],
            "about": "Government Medical College Hospital Tirunelveli is the major tertiary care referral hospital for south Tamil Nadu.",
            "lat": 8.7139, "lng": 77.7567,
            "doctors": [
                {"name":"Dr. Ganesh Kumar",  "type":"General Physician","experience":17,"available_now":1,"slots":["8:00 AM","9:00 AM","10:00 AM","2:00 PM"],"fee":0,"image":"👨‍⚕️"},
                {"name":"Dr. Radha Krishnan","type":"Cardiologist",     "experience":20,"available_now":0,"slots":["10:00 AM","2:00 PM","4:00 PM"],            "fee":0,"image":"👨‍⚕️"},
                {"name":"Dr. Sumathi P",     "type":"Pediatrician",    "experience":13,"available_now":1,"slots":["9:00 AM","11:00 AM","1:00 PM"],             "fee":0,"image":"👩‍⚕️"},
            ]
        },
        # ── SALEM ──
        {
            "name": "Salem Government Hospital", "district": "Salem", "area": "Salem City",
            "address": "Sarada College Road, Salem - 636016",
            "phone": "+91 427 233 6000", "emergency": "+91 427 233 6001",
            "rating": 4.2, "beds": 1200, "established": 1960, "image": "🏥",
            "facilities": ["ICU","Emergency 24/7","Pharmacy","Lab","Blood Bank","Ambulance","Trauma Center"],
            "about": "Salem Government Hospital provides affordable quality healthcare to the Salem region.",
            "lat": 11.6643, "lng": 78.1460,
            "doctors": [
                {"name":"Dr. Balamurugan S","type":"General Physician","experience":20,"available_now":1,"slots":["8:00 AM","9:00 AM","10:00 AM","11:00 AM"],"fee":0,"image":"👨‍⚕️"},
                {"name":"Dr. Selvi Rajan",  "type":"Pediatrician",    "experience":16,"available_now":1,"slots":["8:00 AM","9:30 AM","11:00 AM","2:00 PM"],  "fee":0,"image":"👩‍⚕️"},
                {"name":"Dr. Manikandan P", "type":"Orthopedist",     "experience":12,"available_now":0,"slots":["2:00 PM","3:00 PM","4:00 PM"],              "fee":0,"image":"👨‍⚕️"},
            ]
        },
        # ── KANYAKUMARI ──
        {
            "name": "Kanyakumari Govt Medical College", "district": "Kanyakumari", "area": "Nagercoil",
            "address": "Asaripallam Road, Nagercoil - 629001",
            "phone": "+91 4652 222 300", "emergency": "+91 4652 222 108",
            "rating": 4.2, "beds": 850, "established": 1966, "image": "🏥",
            "facilities": ["ICU","NICU","Emergency 24/7","Pharmacy","Lab","Blood Bank","Ambulance"],
            "about": "Kanyakumari Government Medical College Hospital is the apex government facility at the southern tip of India.",
            "lat": 8.1780, "lng": 77.4207,
            "doctors": [
                {"name":"Dr. Sundarajan M","type":"General Physician","experience":19,"available_now":1,"slots":["8:00 AM","9:00 AM","10:00 AM","2:00 PM"],"fee":0,"image":"👨‍⚕️"},
                {"name":"Dr. Ponmani K",   "type":"Pediatrician",    "experience":12,"available_now":1,"slots":["9:00 AM","11:00 AM","1:00 PM"],            "fee":0,"image":"👩‍⚕️"},
            ]
        },
        # ── YOUR HOSPITAL HERE ──
        # Copy the block above and add your hospital details
    ]

    for h in data:
        doctors = h.pop("doctors")
        h["facilities"] = json.dumps(h["facilities"])
        c.execute("""INSERT INTO hospitals
            (name,district,area,address,phone,emergency,rating,beds,established,image,facilities,about,lat,lng)
            VALUES (:name,:district,:area,:address,:phone,:emergency,:rating,:beds,:established,:image,:facilities,:about,:lat,:lng)""", h)
        hid = c.lastrowid
        for d in doctors:
            d["hospital_id"] = hid
            d["slots"] = json.dumps(d["slots"])
            c.execute("""INSERT INTO doctors (hospital_id,name,type,experience,available_now,slots,fee,image)
                VALUES (:hospital_id,:name,:type,:experience,:available_now,:slots,:fee,:image)""", d)

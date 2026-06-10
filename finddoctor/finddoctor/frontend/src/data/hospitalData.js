// ============================================================
// src/data/hospitalData.js
// ============================================================
// HOW TO UPDATE THIS FILE — READ CAREFULLY
// ============================================================
//
// 1. ADD A NEW DISTRICT → add to the `districts` array (line ~15)
// 2. ADD AREAS FOR A DISTRICT → add to `districtAreas` object (line ~50)
// 3. ADD A HOSPITAL → add a new object inside `hospitals` array (line ~120)
//    - Copy an existing hospital block, change the values
//    - Make sure `district` matches exactly a name in `districts`
//    - Make sure `area` matches exactly a name in `districtAreas`
//    - Give a unique `id` (just use the next number)
// 4. ADD A DOCTOR → inside a hospital's `doctors` array
//    - Copy an existing doctor object, change the values
//    - Give a unique `id` (e.g. hospital id * 100 + doctor number)
// 5. UPDATE AVAILABILITY → change `availableNow: true` or `false`
// 6. UPDATE TIME SLOTS → edit the `slots` array for that doctor
//
// ============================================================

export const doctorTypes = [
  "General Physician", "Cardiologist", "Neurologist",
  "Orthopedist", "Pediatrician", "Gynecologist",
  "Dermatologist", "ENT Specialist", "Ophthalmologist",
  "Psychiatrist", "Urologist", "Gastroenterologist",
  "Pulmonologist", "Oncologist", "Diabetologist"
];

// ── ALL 38 TAMIL NADU DISTRICTS ──────────────────────────────
export const districts = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram",
  "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam",
  "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram",
  "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur",
  "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur",
  "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore",
  "Villupuram", "Virudhunagar", "Kanyakumari"
];

// ── AREAS / TALUKS PER DISTRICT ──────────────────────────────
export const districtAreas = {
  "Chennai": [
    "Adyar", "Anna Nagar", "Chromepet", "Egmore", "Guindy",
    "Kilpauk", "Kodambakkam", "Mylapore", "Perambur", "Porur",
    "Royapettah", "T.Nagar", "Tambaram", "Tondiarpet", "Velachery", "Vyasarpadi"
  ],
  "Coimbatore": [
    "Gandhipuram", "Kuniyamuthur", "Mettupalayam", "Peelamedu",
    "Pollachi", "RS Puram", "Singanallur", "Sulur", "Thudiyalur", "Vadavalli"
  ],
  "Madurai": [
    "Avaniyapuram", "Koodal Nagar", "Madurai East", "Madurai North",
    "Madurai South", "Madurai West", "Melur", "Sholavandan", "Tirumangalam", "Usilampatti"
  ],
  "Salem": [
    "Attur", "Edappadi", "Gangavalli", "Mettur", "Omalur",
    "Salem City", "Sankagiri", "Valapady", "Yercaud"
  ],
  "Tiruchirappalli": [
    "Golden Rock", "Kattur", "Lalgudi", "Manachanallur", "Musiri",
    "Srirangam", "Thiruverumbur", "Thottiyam", "Tiruchirappalli City", "Woraiyur"
  ],
  "Nagapattinam": [
    "Kilvelur", "Kuthalam", "Mayiladuthurai", "Nagapattinam Town",
    "Sirkazhi", "Tharangambadi", "Thillaisthanam", "Vedaranyam"
  ],
  "Thanjavur": [
    "Kumbakonam", "Orathanadu", "Papanasam", "Pattukkottai",
    "Peravurani", "Thanjavur City", "Thiruvaiyaru", "Thiruvidaimarudur"
  ],
  "Tirunelveli": [
    "Ambasamudram", "Cheranmahadevi", "Manur", "Nanguneri",
    "Palayamkottai", "Radhapuram", "Sankarankovil", "Tirunelveli City", "Tenkasi"
  ],
  "Vellore": [
    "Ambur", "Anaicut", "Gudiyatham", "Jolarpet", "Katpadi",
    "Pernambut", "Vaniyambadi", "Vellore City", "Walajah"
  ],
  "Erode": [
    "Anthiyur", "Bhavani", "Erode City", "Gobichettipalayam",
    "Kodumudi", "Modakkurichi", "Perundurai", "Sathyamangalam"
  ],
  "Dindigul": [
    "Batlagundu", "Dindigul Town", "Kodaikanal", "Natham",
    "Nilakottai", "Oddanchatram", "Palani", "Vedasandur"
  ],
  "Kancheepuram": [
    "Kancheepuram Town", "Kundrathur", "Sriperumbudur",
    "Uthiramerur", "Walajabad"
  ],
  "Chengalpattu": [
    "Chengalpattu Town", "Cheyyur", "Maduranthakam",
    "Maraimalai Nagar", "Tambaram", "Vandalur"
  ],
  "Villupuram": [
    "Gingee", "Kallakurichi", "Marakkanam", "Tindivanam",
    "Ulundurpet", "Villupuram Town", "Vikravandi"
  ],
  "Thoothukudi": [
    "Ettayapuram", "Kovilpatti", "Ottapidaram", "Thoothukudi Town",
    "Tiruchendur", "Vilathikulam"
  ],
  "Virudhunagar": [
    "Aruppukottai", "Rajapalayam", "Sivakasi",
    "Srivilliputhur", "Virudhunagar Town", "Watrap"
  ],
  "Ramanathapuram": [
    "Kadaladi", "Mudukulathur", "Paramakudi",
    "Ramanathapuram Town", "Rameswaram", "Tiruvadanai"
  ],
  "Sivaganga": [
    "Devakottai", "Ilayangudi", "Kalayarkoil",
    "Karaikudi", "Manamadurai", "Sivaganga Town"
  ],
  "Pudukkottai": [
    "Alangudi", "Aranthangi", "Avudaiyarkoil",
    "Gandarvakottai", "Iluppur", "Karambakudi", "Pudukkottai Town"
  ],
  "Tiruvannamalai": [
    "Arni", "Chengam", "Cheyyar", "Kilpennathur",
    "Polur", "Tiruvannamalai Town", "Vandavasi"
  ],
  "Nilgiris": [
    "Coonoor", "Gudalur", "Kotagiri", "Ooty", "Pandalur", "Udhagamandalam"
  ],
  "Theni": [
    "Andipatti", "Bodinayakanur", "Periyakulam",
    "Theni Town", "Uthamapalayam"
  ],
  "Namakkal": [
    "Kolli Hills", "Kumarapalayam", "Mohanur",
    "Namakkal Town", "Paramathi", "Rasipuram", "Tiruchengode"
  ],
  "Karur": [
    "Aravakurichi", "Karur Town", "Krishnarayapuram",
    "Kulithalai", "Manmangalam"
  ],
  "Ariyalur": ["Ariyalur Town", "Jayankondam", "Sendurai", "Udayarpalayam"],
  "Perambalur": ["Alathur", "Kunnam", "Perambalur Town", "Veppanthattai"],
  "Cuddalore": ["Bhuvanagiri", "Chidambaram", "Cuddalore Town", "Panruti", "Virudhachalam"],
  "Dharmapuri": ["Dharmapuri Town", "Harur", "Nallampalli", "Palacode", "Pennagaram"],
  "Krishnagiri": ["Bargur", "Denkanikottai", "Hosur", "Krishnagiri Town", "Pochampalli", "Uthangarai"],
  "Kallakurichi": ["Chinnasalem", "Kallakurichi Town", "Sankarapuram", "Ulundurpet"],
  "Mayiladuthurai": ["Kuthalam", "Mayiladuthurai Town", "Sirkali", "Tharangambadi"],
  "Ranipet": ["Arcot", "Arakkonam", "Nemili", "Ranipet Town", "Sholinghur", "Walajah"],
  "Tirupathur": ["Ambur", "Natrampalli", "Tirupathur Town", "Vaniyambadi"],
  "Tiruppur": ["Avinashi", "Dharapuram", "Kangeyam", "Palladam", "Tiruppur City", "Udumalaipettai"],
  "Tiruvallur": ["Ambattur", "Avadi", "Ponneri", "Tiruvallur Town", "Tiruttani", "Gummidipoondi"],
  "Tiruvarur": ["Kodavasal", "Mannargudi", "Nannilam", "Papanasam", "Tiruvarur Town"],
  "Kanyakumari": ["Agasteeswaram", "Kalkulam", "Killiyoor", "Nagercoil", "Thovalai", "Vilavancode"]
};

// ── HOSPITALS DATA ───────────────────────────────────────────
// TO ADD YOUR OWN HOSPITAL: copy one block below and fill in your details
// TO UPDATE: find the hospital by name and edit the fields you want to change
// ────────────────────────────────────────────────────────────
export const hospitals = [

  // ═══════════════════════════════════════
  // CHENNAI
  // ═══════════════════════════════════════
  {
    id: 1,
    name: "Apollo Hospitals",
    district: "Chennai",
    area: "Royapettah",
    address: "21, Greams Lane, Off Greams Road, Royapettah, Chennai - 600006",
    phone: "+91 44 2829 3333",
    emergency: "+91 44 2829 0200",
    rating: 4.8,
    beds: 560,
    established: 1983,
    image: "🏥",
    facilities: ["ICU", "NICU", "Emergency 24/7", "Pharmacy", "Lab", "Radiology", "Blood Bank", "Ambulance", "Cafeteria", "Dialysis"],
    about: "Apollo Hospitals Chennai is India's first corporate hospital and a pioneer in modern healthcare. It offers world-class treatments with cutting-edge technology and over 560 beds.",
    doctors: [
      { id: 101, name: "Dr. Rajesh Kumar", type: "Cardiologist", experience: 18, availableNow: true, slots: ["9:00 AM","10:30 AM","12:00 PM","3:00 PM","4:30 PM"], fee: 800, image: "👨‍⚕️" },
      { id: 102, name: "Dr. Priya Nair", type: "Neurologist", experience: 14, availableNow: false, slots: ["9:00 AM","12:00 PM","3:00 PM","5:00 PM"], fee: 900, image: "👩‍⚕️" },
      { id: 103, name: "Dr. Suresh Babu", type: "General Physician", experience: 10, availableNow: true, slots: ["9:30 AM","10:30 AM","11:30 AM","2:00 PM","4:00 PM"], fee: 400, image: "👨‍⚕️" },
      { id: 104, name: "Dr. Meena Sundaram", type: "Gynecologist", experience: 16, availableNow: false, slots: ["11:00 AM","1:00 PM","3:30 PM"], fee: 700, image: "👩‍⚕️" },
      { id: 105, name: "Dr. Arjun Venkat", type: "Oncologist", experience: 20, availableNow: true, slots: ["10:00 AM","1:00 PM","4:00 PM"], fee: 1200, image: "👨‍⚕️" }
    ],
    lat: 13.0569, lng: 80.2521
  },
  {
    id: 2,
    name: "Fortis Malar Hospital",
    district: "Chennai",
    area: "Adyar",
    address: "52, 1st Main Road, Gandhi Nagar, Adyar, Chennai - 600020",
    phone: "+91 44 4289 2222",
    emergency: "+91 44 4289 2200",
    rating: 4.6,
    beds: 180,
    established: 1992,
    image: "🏨",
    facilities: ["Emergency 24/7", "ICU", "Pharmacy", "Lab", "Radiology", "Ambulance", "Cafeteria"],
    about: "Fortis Malar is a leading multi-specialty hospital in Chennai's Adyar area, known for cardiac and orthopedic care.",
    doctors: [
      { id: 201, name: "Dr. Anil Sharma", type: "Orthopedist", experience: 20, availableNow: true, slots: ["9:00 AM","11:00 AM","2:30 PM","4:00 PM"], fee: 750, image: "👨‍⚕️" },
      { id: 202, name: "Dr. Kavitha Rajan", type: "Pediatrician", experience: 12, availableNow: true, slots: ["10:00 AM","12:30 PM","3:00 PM","4:30 PM"], fee: 500, image: "👩‍⚕️" },
      { id: 203, name: "Dr. Vijay Mohan", type: "Cardiologist", experience: 22, availableNow: false, slots: ["8:00 AM","1:00 PM","5:30 PM"], fee: 1000, image: "👨‍⚕️" }
    ],
    lat: 13.0012, lng: 80.2565
  },
  {
    id: 3,
    name: "MIOT International Hospital",
    district: "Chennai",
    area: "Porur",
    address: "4/112, Mount Poonamallee Road, Porur, Chennai - 600089",
    phone: "+91 44 4200 2288",
    emergency: "+91 44 4200 2200",
    rating: 4.7,
    beds: 1000,
    established: 1999,
    image: "🏥",
    facilities: ["ICU", "NICU", "Emergency 24/7", "Pharmacy", "Lab", "Radiology", "Blood Bank", "Ambulance", "Dialysis", "Rehabilitation"],
    about: "MIOT International is one of Chennai's largest hospitals, globally recognized for orthopedic and joint replacement surgeries with JCI accreditation.",
    doctors: [
      { id: 301, name: "Dr. S. Senthilnathan", type: "Orthopedist", experience: 25, availableNow: true, slots: ["9:00 AM","11:00 AM","2:00 PM"], fee: 900, image: "👨‍⚕️" },
      { id: 302, name: "Dr. Deepa Krishnan", type: "Neurologist", experience: 17, availableNow: false, slots: ["10:00 AM","1:00 PM","4:00 PM"], fee: 950, image: "👩‍⚕️" },
      { id: 303, name: "Dr. Karthik Rajan", type: "Cardiologist", experience: 15, availableNow: true, slots: ["8:30 AM","11:30 AM","3:30 PM"], fee: 850, image: "👨‍⚕️" }
    ],
    lat: 13.0358, lng: 80.1642
  },
  {
    id: 4,
    name: "Vijaya Hospital",
    district: "Chennai",
    area: "Mylapore",
    address: "434/1, NSK Salai, Vadapalani, Chennai - 600026",
    phone: "+91 44 2365 4321",
    emergency: "+91 44 2365 4300",
    rating: 4.5,
    beds: 350,
    established: 1975,
    image: "🏨",
    facilities: ["ICU", "Emergency 24/7", "Pharmacy", "Lab", "Blood Bank", "Ambulance", "Dialysis"],
    about: "Vijaya Hospital is a trusted name in Chennai healthcare for nearly 50 years, providing comprehensive medical care across all specialties.",
    doctors: [
      { id: 401, name: "Dr. R. Balakrishnan", type: "General Physician", experience: 22, availableNow: true, slots: ["8:00 AM","9:00 AM","10:00 AM","11:00 AM","2:00 PM"], fee: 350, image: "👨‍⚕️" },
      { id: 402, name: "Dr. Usha Venkatesh", type: "Gynecologist", experience: 18, availableNow: false, slots: ["10:00 AM","12:00 PM","3:00 PM"], fee: 600, image: "👩‍⚕️" },
      { id: 403, name: "Dr. Murugesan T", type: "Diabetologist", experience: 14, availableNow: true, slots: ["9:30 AM","11:30 AM","2:30 PM","4:30 PM"], fee: 500, image: "👨‍⚕️" }
    ],
    lat: 13.0524, lng: 80.2116
  },

  // ═══════════════════════════════════════
  // COIMBATORE
  // ═══════════════════════════════════════
  {
    id: 5,
    name: "PSG Hospitals",
    district: "Coimbatore",
    area: "Peelamedu",
    address: "Peelamedu, Coimbatore - 641004",
    phone: "+91 422 257 3833",
    emergency: "+91 422 257 3999",
    rating: 4.7,
    beds: 800,
    established: 1986,
    image: "🏥",
    facilities: ["ICU", "NICU", "Emergency 24/7", "Pharmacy", "Lab", "Blood Bank", "Ambulance", "Dialysis", "Radiology"],
    about: "PSG Hospitals is one of Coimbatore's premier multi-specialty hospitals. Attached to PSG Medical College, it offers advanced tertiary care.",
    doctors: [
      { id: 501, name: "Dr. Ramesh Patel", type: "General Physician", experience: 8, availableNow: true, slots: ["9:00 AM","10:00 AM","11:00 AM","2:00 PM","3:00 PM"], fee: 350, image: "👨‍⚕️" },
      { id: 502, name: "Dr. Lakshmi Devi", type: "Dermatologist", experience: 11, availableNow: false, slots: ["2:00 PM","3:30 PM","5:00 PM"], fee: 600, image: "👩‍⚕️" },
      { id: 503, name: "Dr. Arjun Krishnan", type: "ENT Specialist", experience: 15, availableNow: true, slots: ["10:30 AM","12:00 PM","3:00 PM","4:30 PM"], fee: 550, image: "👨‍⚕️" },
      { id: 504, name: "Dr. Preethi S", type: "Pediatrician", experience: 9, availableNow: true, slots: ["9:00 AM","11:00 AM","1:00 PM","4:00 PM"], fee: 450, image: "👩‍⚕️" }
    ],
    lat: 11.0238, lng: 77.0066
  },
  {
    id: 6,
    name: "Kovai Medical Center",
    district: "Coimbatore",
    area: "Gandhipuram",
    address: "Post Box No.3209, Avanashi Road, Coimbatore - 641014",
    phone: "+91 422 244 2000",
    emergency: "+91 422 244 2100",
    rating: 4.6,
    beds: 600,
    established: 1990,
    image: "🏨",
    facilities: ["ICU", "Emergency 24/7", "Pharmacy", "Lab", "Radiology", "Blood Bank", "Ambulance", "Dialysis"],
    about: "Kovai Medical Center (KMCH) is a NABH-accredited multi-specialty hospital in Coimbatore known for cardiac, neuro, and cancer care.",
    doctors: [
      { id: 601, name: "Dr. K. Soundarapandian", type: "Cardiologist", experience: 24, availableNow: true, slots: ["9:00 AM","11:00 AM","3:00 PM"], fee: 900, image: "👨‍⚕️" },
      { id: 602, name: "Dr. Meena Gopal", type: "Neurologist", experience: 16, availableNow: false, slots: ["10:00 AM","12:00 PM","4:00 PM"], fee: 850, image: "👩‍⚕️" },
      { id: 603, name: "Dr. Sugumar R", type: "Orthopedist", experience: 19, availableNow: true, slots: ["8:30 AM","10:30 AM","2:30 PM"], fee: 700, image: "👨‍⚕️" }
    ],
    lat: 11.0168, lng: 77.0165
  },

  // ═══════════════════════════════════════
  // MADURAI
  // ═══════════════════════════════════════
  {
    id: 7,
    name: "Meenakshi Mission Hospital",
    district: "Madurai",
    area: "Madurai East",
    address: "Lake Area, Melur Road, Madurai - 625107",
    phone: "+91 452 235 8888",
    emergency: "+91 452 235 8900",
    rating: 4.5,
    beds: 650,
    established: 1990,
    image: "🏥",
    facilities: ["ICU", "Emergency 24/7", "Pharmacy", "Lab", "Radiology", "Blood Bank", "Ambulance", "Dialysis"],
    about: "Meenakshi Mission Hospital is a premier multi-specialty hospital in Madurai, known for advanced cardiac, neuro, and cancer care.",
    doctors: [
      { id: 701, name: "Dr. Senthil Kumar", type: "Cardiologist", experience: 19, availableNow: true, slots: ["9:00 AM","11:30 AM","2:00 PM","4:00 PM"], fee: 850, image: "👨‍⚕️" },
      { id: 702, name: "Dr. Vimala Suresh", type: "Gynecologist", experience: 14, availableNow: false, slots: ["10:00 AM","1:30 PM","4:00 PM"], fee: 650, image: "👩‍⚕️" },
      { id: 703, name: "Dr. Muthu Raj", type: "Neurologist", experience: 13, availableNow: true, slots: ["8:30 AM","12:00 PM","3:30 PM","5:00 PM"], fee: 800, image: "👨‍⚕️" }
    ],
    lat: 9.9252, lng: 78.1198
  },
  {
    id: 8,
    name: "Apollo Hospitals Madurai",
    district: "Madurai",
    area: "Madurai North",
    address: "Lake View Road, KK Nagar, Madurai - 625020",
    phone: "+91 452 266 8800",
    emergency: "+91 452 266 8900",
    rating: 4.6,
    beds: 300,
    established: 2008,
    image: "🏨",
    facilities: ["ICU", "Emergency 24/7", "Pharmacy", "Lab", "Radiology", "Blood Bank", "Ambulance"],
    about: "Apollo Hospitals Madurai delivers world-class healthcare to southern Tamil Nadu with modern technology and experienced specialists.",
    doctors: [
      { id: 801, name: "Dr. Panneerselvam", type: "General Physician", experience: 12, availableNow: true, slots: ["8:00 AM","9:30 AM","11:00 AM","2:00 PM"], fee: 400, image: "👨‍⚕️" },
      { id: 802, name: "Dr. Saranya Devi", type: "Dermatologist", experience: 8, availableNow: true, slots: ["10:00 AM","12:00 PM","3:00 PM","5:00 PM"], fee: 500, image: "👩‍⚕️" },
      { id: 803, name: "Dr. Balasubramanian", type: "Orthopedist", experience: 20, availableNow: false, slots: ["9:00 AM","1:00 PM","4:30 PM"], fee: 750, image: "👨‍⚕️" }
    ],
    lat: 9.9195, lng: 78.1180
  },

  // ═══════════════════════════════════════
  // NAGAPATTINAM
  // ═══════════════════════════════════════
  {
    id: 9,
    name: "Nagapattinam Government District Hospital",
    district: "Nagapattinam",
    area: "Nagapattinam Town",
    address: "Hospital Road, Nagapattinam - 611001",
    phone: "+91 4365 242 100",
    emergency: "+91 4365 242 108",
    rating: 4.0,
    beds: 550,
    established: 1958,
    image: "🏥",
    facilities: ["ICU", "Emergency 24/7", "Pharmacy", "Lab", "Blood Bank", "Ambulance", "Trauma Center", "Radiology"],
    about: "The Nagapattinam Government District Hospital is a major public healthcare facility serving the coastal districts of Tamil Nadu, offering free and affordable treatment.",
    doctors: [
      { id: 901, name: "Dr. Balamurugan N", type: "General Physician", experience: 15, availableNow: true, slots: ["8:00 AM","9:00 AM","10:00 AM","11:00 AM","2:00 PM"], fee: 0, image: "👨‍⚕️" },
      { id: 902, name: "Dr. Selvi Muthukumar", type: "Pediatrician", experience: 11, availableNow: true, slots: ["8:00 AM","10:00 AM","12:00 PM","2:00 PM"], fee: 0, image: "👩‍⚕️" },
      { id: 903, name: "Dr. Eswaran K", type: "Orthopedist", experience: 14, availableNow: false, slots: ["2:00 PM","3:00 PM","4:00 PM"], fee: 0, image: "👨‍⚕️" }
    ],
    lat: 10.7672, lng: 79.8449
  },
  {
    id: 10,
    name: "Annai Velankanni Hospital",
    district: "Nagapattinam",
    area: "Nagapattinam Town",
    address: "Velankanni Road, Nagapattinam - 611001",
    phone: "+91 4365 264 200",
    emergency: "+91 4365 264 108",
    rating: 4.2,
    beds: 120,
    established: 2001,
    image: "🏨",
    facilities: ["Emergency 24/7", "ICU", "Pharmacy", "Lab", "Ambulance", "Radiology"],
    about: "Annai Velankanni Hospital provides quality private healthcare to the Nagapattinam coastal community with modern diagnostic facilities.",
    doctors: [
      { id: 1001, name: "Dr. Xavier Raj", type: "General Physician", experience: 10, availableNow: true, slots: ["9:00 AM","10:30 AM","12:00 PM","3:00 PM","5:00 PM"], fee: 200, image: "👨‍⚕️" },
      { id: 1002, name: "Dr. Jancy Malar", type: "Gynecologist", experience: 12, availableNow: false, slots: ["10:00 AM","1:00 PM","4:00 PM"], fee: 400, image: "👩‍⚕️" }
    ],
    lat: 10.7680, lng: 79.8460
  },
  {
    id: 11,
    name: "Mayiladuthurai Government Hospital",
    district: "Nagapattinam",
    area: "Mayiladuthurai",
    address: "Hospital Road, Mayiladuthurai - 609001",
    phone: "+91 4364 222 444",
    emergency: "+91 4364 222 108",
    rating: 4.1,
    beds: 300,
    established: 1965,
    image: "🏥",
    facilities: ["Emergency 24/7", "ICU", "Pharmacy", "Lab", "Blood Bank", "Ambulance"],
    about: "A major government hospital serving Mayiladuthurai and surrounding areas with free healthcare services.",
    doctors: [
      { id: 1101, name: "Dr. Murugan S", type: "General Physician", experience: 18, availableNow: true, slots: ["8:00 AM","9:00 AM","10:00 AM","11:00 AM"], fee: 0, image: "👨‍⚕️" },
      { id: 1102, name: "Dr. Thenmozhi R", type: "Pediatrician", experience: 9, availableNow: true, slots: ["9:00 AM","11:00 AM","2:00 PM"], fee: 0, image: "👩‍⚕️" }
    ],
    lat: 11.1015, lng: 79.6519
  },

  // ═══════════════════════════════════════
  // THANJAVUR
  // ═══════════════════════════════════════
  {
    id: 12,
    name: "Thanjavur Medical College Hospital",
    district: "Thanjavur",
    area: "Thanjavur City",
    address: "Medical College Road, Thanjavur - 613004",
    phone: "+91 4362 227 701",
    emergency: "+91 4362 227 108",
    rating: 4.3,
    beds: 2000,
    established: 1959,
    image: "🏥",
    facilities: ["ICU", "NICU", "Emergency 24/7", "Pharmacy", "Lab", "Blood Bank", "Ambulance", "Trauma Center", "Radiology", "Dialysis"],
    about: "Thanjavur Medical College Hospital is one of Tamil Nadu's largest government hospitals, a major referral center for the delta districts.",
    doctors: [
      { id: 1201, name: "Dr. Periyasamy K", type: "General Physician", experience: 20, availableNow: true, slots: ["8:00 AM","9:00 AM","10:00 AM","2:00 PM"], fee: 0, image: "👨‍⚕️" },
      { id: 1202, name: "Dr. Vanitha Devi", type: "Gynecologist", experience: 16, availableNow: true, slots: ["9:00 AM","11:00 AM","2:00 PM","4:00 PM"], fee: 0, image: "👩‍⚕️" },
      { id: 1203, name: "Dr. Karthikeyan P", type: "Orthopedist", experience: 14, availableNow: false, slots: ["2:00 PM","3:00 PM","5:00 PM"], fee: 0, image: "👨‍⚕️" },
      { id: 1204, name: "Dr. Revathi N", type: "Pediatrician", experience: 11, availableNow: true, slots: ["9:00 AM","11:00 AM","1:00 PM"], fee: 0, image: "👩‍⚕️" }
    ],
    lat: 10.7905, lng: 79.1397
  },
  {
    id: 13,
    name: "Kumbakonam City Hospital",
    district: "Thanjavur",
    area: "Kumbakonam",
    address: "TSR Big Street, Kumbakonam - 612001",
    phone: "+91 435 240 1234",
    emergency: "+91 435 240 1200",
    rating: 4.2,
    beds: 150,
    established: 1998,
    image: "🏨",
    facilities: ["Emergency 24/7", "ICU", "Pharmacy", "Lab", "Ambulance", "Radiology"],
    about: "Kumbakonam City Hospital serves the heritage town and surrounding villages with quality private healthcare at affordable rates.",
    doctors: [
      { id: 1301, name: "Dr. Suresh Anand", type: "General Physician", experience: 13, availableNow: true, slots: ["9:00 AM","10:30 AM","12:00 PM","3:00 PM"], fee: 250, image: "👨‍⚕️" },
      { id: 1302, name: "Dr. Malathi P", type: "Gynecologist", experience: 10, availableNow: false, slots: ["11:00 AM","2:00 PM","4:30 PM"], fee: 400, image: "👩‍⚕️" }
    ],
    lat: 10.9602, lng: 79.3845
  },

  // ═══════════════════════════════════════
  // TIRUCHIRAPPALLI
  // ═══════════════════════════════════════
  {
    id: 14,
    name: "Kavery Medical Centre",
    district: "Tiruchirappalli",
    area: "Tiruchirappalli City",
    address: "No.1, Tennur High Road, Tiruchirappalli - 620017",
    phone: "+91 431 270 0000",
    emergency: "+91 431 270 0001",
    rating: 4.4,
    beds: 300,
    established: 1995,
    image: "🏨",
    facilities: ["ICU", "Emergency 24/7", "Pharmacy", "Lab", "Radiology", "Blood Bank", "Ambulance"],
    about: "Kavery Medical Centre is a trusted multi-specialty hospital in Trichy offering patient-centred care and advanced diagnostics.",
    doctors: [
      { id: 1401, name: "Dr. Prakash Menon", type: "Ophthalmologist", experience: 17, availableNow: false, slots: ["9:00 AM","11:00 AM","3:00 PM"], fee: 600, image: "👨‍⚕️" },
      { id: 1402, name: "Dr. Chitra Pandian", type: "Dermatologist", experience: 9, availableNow: true, slots: ["10:00 AM","1:00 PM","4:30 PM"], fee: 500, image: "👩‍⚕️" },
      { id: 1403, name: "Dr. Eswaran T", type: "Psychiatrist", experience: 15, availableNow: true, slots: ["2:00 PM","3:00 PM","5:00 PM"], fee: 700, image: "👨‍⚕️" }
    ],
    lat: 10.8142, lng: 78.7060
  },

  // ═══════════════════════════════════════
  // VELLORE
  // ═══════════════════════════════════════
  {
    id: 15,
    name: "Christian Medical College (CMC)",
    district: "Vellore",
    area: "Vellore City",
    address: "Ida Scudder Road, Vellore - 632004",
    phone: "+91 416 228 2010",
    emergency: "+91 416 228 2000",
    rating: 4.9,
    beds: 2600,
    established: 1900,
    image: "🏥",
    facilities: ["ICU", "NICU", "Emergency 24/7", "Pharmacy", "Lab", "Blood Bank", "Ambulance", "Trauma Center", "Radiology", "Dialysis", "Rehabilitation", "Bone Marrow Transplant"],
    about: "CMC Vellore is one of the world's finest hospitals and a global centre of excellence in medicine, nursing, and allied health sciences.",
    doctors: [
      { id: 1501, name: "Dr. Thomas Varghese", type: "Cardiologist", experience: 28, availableNow: true, slots: ["9:00 AM","11:00 AM","2:00 PM"], fee: 1000, image: "👨‍⚕️" },
      { id: 1502, name: "Dr. Anitha George", type: "Neurologist", experience: 22, availableNow: false, slots: ["10:00 AM","1:00 PM","4:00 PM"], fee: 1100, image: "👩‍⚕️" },
      { id: 1503, name: "Dr. Samuel John", type: "Orthopedist", experience: 20, availableNow: true, slots: ["8:30 AM","11:30 AM","3:30 PM"], fee: 900, image: "👨‍⚕️" },
      { id: 1504, name: "Dr. Mary Mathew", type: "Gynecologist", experience: 18, availableNow: true, slots: ["9:00 AM","12:00 PM","3:00 PM"], fee: 800, image: "👩‍⚕️" },
      { id: 1505, name: "Dr. Rajan Philip", type: "Oncologist", experience: 24, availableNow: false, slots: ["10:00 AM","2:00 PM","5:00 PM"], fee: 1500, image: "👨‍⚕️" }
    ],
    lat: 12.9249, lng: 79.1325
  },

  // ═══════════════════════════════════════
  // TIRUNELVELI
  // ═══════════════════════════════════════
  {
    id: 16,
    name: "GVMCH Tirunelveli",
    district: "Tirunelveli",
    area: "Tirunelveli City",
    address: "High Ground Road, Tirunelveli - 627011",
    phone: "+91 462 257 2933",
    emergency: "+91 462 257 2100",
    rating: 4.3,
    beds: 1200,
    established: 1966,
    image: "🏥",
    facilities: ["ICU", "NICU", "Emergency 24/7", "Pharmacy", "Lab", "Blood Bank", "Ambulance", "Trauma Center", "Radiology"],
    about: "Government Medical College Hospital Tirunelveli is the major tertiary care referral hospital for south Tamil Nadu.",
    doctors: [
      { id: 1601, name: "Dr. Ganesh Kumar", type: "General Physician", experience: 17, availableNow: true, slots: ["8:00 AM","9:00 AM","10:00 AM","2:00 PM"], fee: 0, image: "👨‍⚕️" },
      { id: 1602, name: "Dr. Radha Krishnan", type: "Cardiologist", experience: 20, availableNow: false, slots: ["10:00 AM","2:00 PM","4:00 PM"], fee: 0, image: "👨‍⚕️" },
      { id: 1603, name: "Dr. Sumathi P", type: "Pediatrician", experience: 13, availableNow: true, slots: ["9:00 AM","11:00 AM","1:00 PM"], fee: 0, image: "👩‍⚕️" }
    ],
    lat: 8.7139, lng: 77.7567
  },

  // ═══════════════════════════════════════
  // SALEM
  // ═══════════════════════════════════════
  {
    id: 17,
    name: "Salem Government Hospital",
    district: "Salem",
    area: "Salem City",
    address: "Sarada College Road, Salem - 636016",
    phone: "+91 427 233 6000",
    emergency: "+91 427 233 6001",
    rating: 4.2,
    beds: 1200,
    established: 1960,
    image: "🏥",
    facilities: ["ICU", "Emergency 24/7", "Pharmacy", "Lab", "Blood Bank", "Ambulance", "Trauma Center"],
    about: "Salem Government Hospital is a large public hospital providing affordable and quality healthcare to people of the Salem region.",
    doctors: [
      { id: 1701, name: "Dr. Balamurugan S", type: "General Physician", experience: 20, availableNow: true, slots: ["8:00 AM","9:00 AM","10:00 AM","11:00 AM"], fee: 0, image: "👨‍⚕️" },
      { id: 1702, name: "Dr. Selvi Rajan", type: "Pediatrician", experience: 16, availableNow: true, slots: ["8:00 AM","9:30 AM","11:00 AM","2:00 PM"], fee: 0, image: "👩‍⚕️" },
      { id: 1703, name: "Dr. Manikandan P", type: "Orthopedist", experience: 12, availableNow: false, slots: ["2:00 PM","3:00 PM","4:00 PM"], fee: 0, image: "👨‍⚕️" }
    ],
    lat: 11.6643, lng: 78.1460
  },

  // ═══════════════════════════════════════
  // ERODE
  // ═══════════════════════════════════════
  {
    id: 18,
    name: "Erode Government Hospital",
    district: "Erode",
    area: "Erode City",
    address: "Hospital Road, Erode - 638011",
    phone: "+91 424 222 5500",
    emergency: "+91 424 222 5108",
    rating: 4.1,
    beds: 700,
    established: 1962,
    image: "🏥",
    facilities: ["ICU", "Emergency 24/7", "Pharmacy", "Lab", "Blood Bank", "Ambulance"],
    about: "Erode Government Hospital is the main public healthcare facility for the Erode district, offering free services.",
    doctors: [
      { id: 1801, name: "Dr. Kannan R", type: "General Physician", experience: 16, availableNow: true, slots: ["8:00 AM","9:00 AM","10:00 AM","2:00 PM"], fee: 0, image: "👨‍⚕️" },
      { id: 1802, name: "Dr. Vijayalakshmi", type: "Gynecologist", experience: 14, availableNow: false, slots: ["9:00 AM","11:00 AM","2:00 PM"], fee: 0, image: "👩‍⚕️" }
    ],
    lat: 11.3410, lng: 77.7172
  },

  // ═══════════════════════════════════════
  // KANYAKUMARI
  // ═══════════════════════════════════════
  {
    id: 19,
    name: "Kanyakumari Government Medical College Hospital",
    district: "Kanyakumari",
    area: "Nagercoil",
    address: "Asaripallam Road, Nagercoil - 629001",
    phone: "+91 4652 222 300",
    emergency: "+91 4652 222 108",
    rating: 4.2,
    beds: 850,
    established: 1966,
    image: "🏥",
    facilities: ["ICU", "NICU", "Emergency 24/7", "Pharmacy", "Lab", "Blood Bank", "Ambulance", "Radiology"],
    about: "Kanyakumari Government Medical College Hospital is the apex government healthcare facility at the southern tip of India.",
    doctors: [
      { id: 1901, name: "Dr. Sundarajan M", type: "General Physician", experience: 19, availableNow: true, slots: ["8:00 AM","9:00 AM","10:00 AM","2:00 PM"], fee: 0, image: "👨‍⚕️" },
      { id: 1902, name: "Dr. Ponmani K", type: "Pediatrician", experience: 12, availableNow: true, slots: ["9:00 AM","11:00 AM","1:00 PM"], fee: 0, image: "👩‍⚕️" }
    ],
    lat: 8.1780, lng: 77.4207
  },

  // ═══════════════════════════════════════
  // DINDIGUL
  // ═══════════════════════════════════════
  {
    id: 20,
    name: "Dindigul Government Hospital",
    district: "Dindigul",
    area: "Dindigul Town",
    address: "Hospital Road, Dindigul - 624001",
    phone: "+91 451 242 1234",
    emergency: "+91 451 242 1200",
    rating: 4.0,
    beds: 500,
    established: 1955,
    image: "🏥",
    facilities: ["ICU", "Emergency 24/7", "Pharmacy", "Lab", "Blood Bank", "Ambulance"],
    about: "Dindigul Government Hospital is the district headquarters hospital serving the people of Dindigul district.",
    doctors: [
      { id: 2001, name: "Dr. Prabhu S", type: "General Physician", experience: 14, availableNow: true, slots: ["8:00 AM","9:00 AM","10:00 AM","2:00 PM"], fee: 0, image: "👨‍⚕️" },
      { id: 2002, name: "Dr. Anandhi M", type: "Gynecologist", experience: 11, availableNow: false, slots: ["9:00 AM","11:00 AM","2:00 PM"], fee: 0, image: "👩‍⚕️" }
    ],
    lat: 10.3673, lng: 77.9803
  }

  // ────────────────────────────────────────────────────
  // ➕ ADD YOUR HOSPITAL HERE — copy the block above
  //    and fill in your own details
  // ────────────────────────────────────────────────────
];

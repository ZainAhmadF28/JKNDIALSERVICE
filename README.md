# 🏥 JKN DIAL SERVICE SIMULATOR

Aplikasi simulasi USSD JKN berbasis **Expo Go (React Native)** dan **Node.js Backend** dengan Prisma ORM.

## ⚠️ CATATAN PENTING: Prototipe vs Implementasi Nyata

### 🧪 **Prototipe Ini (Simulasi)**
Ini adalah **prototipe simulasi** USSD yang berjalan melalui WiFi/Internet:
- ❌ **Bukan USSD resmi** - tidak terhubung dengan jaringan GSM operator
- ✅ Menggunakan **Expo Go app** untuk simulasi USSD
- ✅ User dial `*354#` → kirim request via **WiFi/HTTP** ke backend
- ✅ Backend meniru **USSD Gateway** dengan Node.js
- ✅ Untuk **testing, development, dan demo** konsep

### 🚀 **Implementasi USSD Asli (Production)**
Ketika direalisasikan, USSD JKN yang sesungguhnya:
- ✅ **TIDAK PERLU APLIKASI** - user dial `*354#` di **telepon bawaan** HP
- ✅ Berjalan di **jaringan GSM** semua operator (Telkomsel, XL, Indosat, dll)
- ✅ BPJS **mendaftar shortcode** `*354#` ke operator seluler
- ✅ Perlu **USSD Gateway** untuk integrasi telco (SMPP/SS7/HTTP)
- ✅ User dapat **pop-up USSD otomatis** tanpa download aplikasi apapun
- ✅ **Tidak pakai WiFi/Internet** - murni jaringan GSM operator

### 📋 **Roadmap ke Production**
1. ✅ **Prototipe selesai** (Anda di sini - proof of concept)
2. ⏳ BPJS ajukan **shortcode `*354#`** ke operator (Telkomsel, Indosat, XL, dll)
3. ⏳ Setup **USSD Gateway** (Kannel/Jasmin/vendor telco)
4. ⏳ Integrasi backend dengan **gateway telco** (protocol SMPP/SS7)
5. ⏳ Testing dengan operator & go-live bertahap

**💡 Prototipe ini membuktikan konsep dan siap dikembangkan ke USSD operator resmi.**

---

## 📋 Fitur Lengkap

### Menu USSD JKN Mobile

1. **Info Kepesertaan** - Cek status, kelas, FKTP
2. **Tagihan & Iuran** - Lihat tagihan bulanan dan tunggakan
3. **Riwayat Pelayanan** - Riwayat kunjungan FKTP, rujukan, rawat inap
4. **Info Faskes** - Daftar FKTP, RS, Klinik
5. **Perubahan Data** - Update no HP, email, alamat, FKTP
6. **Pengaduan** - Kirim keluhan (max 160 karakter)
7. **SOS** - Nomor darurat, callback request, panduan P3K
8. **Daftar Peserta Baru** - Prapendaftaran peserta JKN
9. **Antrian Faskes** - Ambil nomor antrian, cek status
10. **Konsultasi** - Kirim pertanyaan ke tim JKN

---

## 🛠️ Tech Stack

### Backend
- **Node.js** + Express.js v4.18
- **Prisma ORM** v5.22 (SQLite for dev, PostgreSQL for production)
- **Swagger UI** (API Documentation)
- USSD Session Engine (custom logic)
- Modular API Shoot System

### Frontend (Mobile - Prototipe)
- **Expo Go SDK 54** (React Native)
- **React** v19.1 + React Native v0.81
- Dialpad UI Component
- USSD Popup Modal
- Axios HTTP Client

### Web Dashboard (React)
- **Vite** v7.2 + React v19.2
- **React Router** v6.26 (SPA routing)
- **Axios** (API integration)
- Modern UI with JKN/BPJS color scheme
- Real-time data fetching dari backend

---

## 📁 Struktur Proyek

```
JKNDIALSERVICE/
├── backend/                    # Node.js Backend
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema (10 models)
│   │   ├── seed.js            # Dummy data seeder
│   │   └── migrations/        # Database migrations
│   ├── public/
│   │   └── dashboard.html     # Static dashboard (legacy)
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js          # Prisma client singleton
│   │   │   └── swagger.js     # Swagger config
│   │   ├── controllers/
│   │   │   └── ussdController.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── ussdRoutes.js
│   │   │   └── dataRoutes.js  # Dashboard API routes
│   │   ├── services/
│   │   │   └── ussdEngine.js  # Core USSD logic
│   │   ├── shoot/             # API Shoot System
│   │   │   └── index.js
│   │   └── index.js           # Express app entry
│   ├── .env
│   └── package.json
│
├── mobile/                     # Expo Go App (Prototipe)
│   ├── components/
│   │   ├── Dialpad.js         # Telephone dialpad UI
│   │   └── UssdPopup.js       # USSD modal popup
│   ├── services/
│   │   └── ussdService.js     # API communication
│   ├── App.js                 # Main React Native app
│   ├── config.js              # Backend URL config
│   ├── app.json               # Expo configuration
│   └── package.json
│
└── dashboard/                  # Web Dashboard (React)
    ├── src/
    │   ├── pages/             # Dashboard pages
    │   │   ├── Dashboard.jsx  # Stats overview
    │   │   ├── Peserta.jsx    # Peserta data table
    │   │   ├── Tagihan.jsx    # Tagihan & iuran
    │   │   ├── Riwayat.jsx    # Riwayat pelayanan
    │   │   ├── Faskes.jsx     # Fasilitas kesehatan
    │   │   ├── Pengaduan.jsx  # Pengaduan peserta
    │   │   └── Antrian.jsx    # Antrian online
    │   ├── App.jsx            # Main React app with routing
    │   ├── App.css            # Global styles
    │   └── main.jsx           # Entry point
    ├── vite.config.js         # Vite config + proxy
    └── package.json
```

---

## 🚀 Cara Menjalankan Proyek

### Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org))
- **npm** atau **yarn**
- **Expo Go** app di smartphone ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))
- Komputer dan smartphone terhubung ke **WiFi yang sama**

---

### 1️⃣ Setup Backend

```bash
# Masuk ke folder backend
cd backend

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Jalankan migration database
npx prisma migrate dev --name init

# Seed database dengan data dummy
npm run prisma:seed

# Jalankan server
npm run dev
```

Server akan berjalan di:
- **Local**: `http://localhost:3000`
- **Network**: `http://0.0.0.0:3000`
- **API Docs**: `http://localhost:3000/api/docs`
- **Web Dashboard**: `http://localhost:3000/dashboard.html` (HTML static - legacy)

#### Dashboard API Endpoints
Backend menyediakan API untuk web dashboard:
- `GET /api/dashboard/data/stats` - Statistik overview
- `GET /api/dashboard/data/peserta` - List peserta
- `GET /api/dashboard/data/tagihan` - List tagihan
- `GET /api/dashboard/data/riwayat` - Riwayat pelayanan
- `GET /api/dashboard/data/faskes` - Fasilitas kesehatan
- `GET /api/dashboard/data/pengaduan` - Pengaduan peserta
- `GET /api/dashboard/data/antrian` - Antrian online

#### Cek IP Komputer Anda

**Windows:**
```bash
ipconfig
```
Cari `IPv4 Address` di adapter WiFi (contoh: `192.168.1.100`)

**Mac/Linux:**
```bash
ifconfig
# atau
ip addr
```

---

### 3️⃣ Setup Web Dashboard (Opsional)

Dashboard React untuk melihat database secara real-time:

```bash
# Masuk ke folder dashboard
cd dashboard

# Install dependencies
npm install

# Jalankan dashboard
npm run dev
```

Dashboard akan berjalan di `http://localhost:5173`

**Fitur Dashboard:**
- 📊 **Dashboard** - Statistik peserta, tunggakan, faskes
- 👥 **Peserta** - List semua peserta dengan search
- 💰 **Tagihan** - Monitor tagihan & tunggakan
- 📋 **Riwayat** - Riwayat pelayanan kesehatan
- 🏥 **Faskes** - Daftar fasilitas kesehatan
- 📢 **Pengaduan** - Kelola pengaduan peserta
- 🎫 **Antrian** - Monitor antrian online

**Note:** Dashboard perlu backend running di port 3000 (proxy otomatis via Vite).

---

### 2️⃣ Setup Mobile App

```bash
# Masuk ke folder mobile
cd mobile

# Install dependencies
npm install
```

#### ⚠️ PENTING: Update IP Backend

Edit file `mobile/config.js`:

```javascript
const API_BASE_URL = 'http://192.168.1.100:3000'; // GANTI dengan IP komputer Anda
```

#### Jalankan Expo

```bash
npm start
# atau
npx expo start
```

#### Scan QR Code

1. Buka **Expo Go** di smartphone
2. Scan QR code yang muncul di terminal/browser
3. Tunggu app loading
4. App siap digunakan!

---

## 📱 Cara Menggunakan App

1. Ketik `*354#` di dialpad
2. Tekan tombol **CALL**
3. Popup USSD akan muncul dengan menu utama
4. Pilih menu dengan mengetik angka (1-10)
5. Ikuti instruksi di setiap menu
6. Popup akan otomatis menutup jika menerima response `END`

### Contoh Flow

```
Dial: *354#
↓
Menu Utama
1. Info Kepesertaan
2. Tagihan & Iuran
...
↓
Input: 1
↓
Masukkan NIK: 3201234567890001
↓
Response:
Nama: Budi Santoso
Status: Aktif
Kelas: Kelas III
FKTP: Puskesmas Cibinong
```

---

## 🗄️ Database & Dashboard

### View Database dengan Prisma Studio

```bash
cd backend
npm run prisma:studio
```

Buka browser: `http://localhost:5555` - GUI untuk edit database

### View Database via Web Dashboard

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Dashboard
cd dashboard
npm run dev
```

Buka browser: `http://localhost:5173` - Modern React dashboard dengan:
- Real-time data dari database
- Search & filter functionality
- Statistics cards
- Responsive UI dengan tema BPJS/JKN

### Database Dummy Data

Database di-seed dengan data contoh:

### Peserta
- **NIK**: `3201234567890001` - Budi Santoso (Aktif)
- **NIK**: `3201234567890002` - Siti Aminah (Aktif)
- **NIK**: `3201234567890003` - Ahmad Hidayat (NonAktif)
- **NIK**: `1671122812030001` - Zain Ahmad Fahrezi (Aktif)

### Faskes
- Puskesmas Cibinong (PKM-BGR-001)
- Puskesmas Ciawi (PKM-BGR-002)
- RS PMI Bogor (RS-BGR-001)
- RSUD Kota Bogor (RS-BGR-002)
- Klinik Pratama Sehat (KLN-BGR-001)
- Klinik Opina (KLN-OPI-001)

---

## 📚 API Documentation (Swagger)

Buka browser: `http://localhost:3000/api/docs`

### Endpoints

#### POST `/api/ussd`
**Request Body:**
```json
{
  "sessionId": "session_123456",
  "serviceCode": "*354#",
  "phoneNumber": "081234567890",
  "text": "1*3201234567890001"
}
```

**Response:**
```json
{
  "sessionId": "session_123456",
  "response": "END Nama: Budi Santoso\nStatus: Aktif\nKelas: Kelas III"
}
```

#### GET `/api/ussd/test`
Test endpoint untuk cek API status.

---

## 🔧 Troubleshooting

### 1. **Error: Cannot connect to server**

**Solusi:**
- Pastikan backend sudah running (`npm run dev`)
- Cek IP di `mobile/config.js` sudah benar
- Pastikan komputer dan smartphone terhubung WiFi yang sama
- Matikan firewall/antivirus yang block port 3000

### 2. **Prisma Error: Database not found**

**Solusi:**
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
npm run prisma:seed
```

### 3. **Expo Error: Metro bundler failed**

**Solusi:**
```bash
cd mobile
rm -rf node_modules
npm install
npx expo start --clear
```

### 4. **USSD Popup tidak muncul**

**Solusi:**
- Check console di Expo untuk error message
- Pastikan input dimulai dengan `*` (USSD code)
- Cek network request di browser DevTools

---

## 🚀 Roadmap Implementasi USSD Operator Resmi

Untuk menjadikan prototipe ini menjadi **USSD resmi yang dial langsung dari telepon bawaan**:

### 1. **Daftarkan Shortcode ke Operator Seluler**
**Pihak BPJS** perlu mendaftar ke operator:
- Hubungi **operator seluler** (Telkomsel, Indosat, XL, Smartfren, 3, dll)
- Ajukan **shortcode USSD** `*354#` 
- Negosiasi **biaya setup** + **sewa bulanan** per operator
- Kontrak & legal agreement dengan setiap operator
- **Tidak perlu daftar aplikasi ke BPJS**, karena BPJS sendiri yang akan implementasi

### 2. **Setup USSD Gateway**
Gunakan **USSD Gateway** untuk menerima request dari operator:
- Install gateway: **Kannel**, **Jasmin**, atau vendor telco (Infobip, Nexmo/Vonage)
- Konfigurasi koneksi ke operator via protocol telco:
  - **SMPP** (Short Message Peer-to-Peer)
  - **SS7** (Signaling System 7)
  - **HTTP USSD API** (tergantung operator)
- Mapping shortcode `*354#` ke IP server BPJS

### 3. **Integrasi Backend dengan Gateway**
Update backend untuk terima request dari USSD Gateway:
```javascript
// Request dari gateway operator (format berbeda dari HTTP biasa)
// Gateway → Backend: { msisdn, sessionId, ussdString, ... }
// Backend → Gateway: { responseString, continueSession: true/false }
```
- Replace dummy data dengan **API JKN resmi**
- Implementasi session management di **Redis** (untuk high traffic)
- Rate limiting & load balancing

### 4. **Integrasi API JKN Resmi**
**Jika ini proyek pihak ketiga**, perlu registrasi ke BPJS:
- Daftarkan aplikasi ke **BPJS Kesehatan** (portal developer)
- Dapatkan **API Key** & **Secret** untuk akses data peserta
- Implementasi **OAuth2** authentication
- Ganti dummy data dengan real-time API call ke sistem JKN
- Handle error & fallback jika API JKN down

**Jika ini proyek internal BPJS**, langsung integrasikan dengan database internal.

### 5. **Security & Compliance**
- **SSL/TLS** untuk semua komunikasi
- **Enkripsi data sensitif** (NIK, No HP, data kesehatan)
- **Audit logging** semua transaksi USSD
- Compliance dengan **UU Perlindungan Data Pribadi (UU PDP)**
- **Penetration testing** sebelum go-live

### 6. **Scalability & High Availability**
- Deploy ke cloud: **AWS**, **Azure**, atau **GCP**
- **Load balancer** untuk distribusi traffic
- **Redis cluster** untuk session management
- Database migration ke **PostgreSQL** atau **MySQL** (production-grade)
- **Monitoring**: Prometheus, Grafana, ELK Stack
- **Auto-scaling** untuk handle jutaan user concurrent

### 7. **Testing & Go-Live**
- **Internal testing** dengan nomor test operator
- **Load testing** (simulasi jutaan request concurrent)
- **User Acceptance Test (UAT)** dengan sample peserta JKN
- **Soft launch** per operator (Telkomsel dulu, lalu yang lain)
- **Monitoring 24/7** selama fase awal
- **Hotfix** team standby

---

## 🎯 **Hasil Akhir (Production)**

Ketika sudah live:
1. ✅ User **dial `*354#`** dari **telepon bawaan** (Phone/Dialer HP)
2. ✅ Pop-up USSD muncul **otomatis** dari jaringan GSM
3. ✅ **Tidak perlu download aplikasi** apapun
4. ✅ **Gratis untuk user** (biaya ditanggung BPJS ke operator)
5. ✅ Bekerja di **semua HP GSM**, termasuk HP jadul (feature phone)
6. ✅ **Tidak perlu internet/WiFi** - murni sinyal operator

---

## 📝 Catatan Developer

### Session Management
- Session ID di-generate di client
- Backend stateless (tidak simpan session di memory)
- Session log tersimpan di database untuk tracking

### USSD Response Format
- `CON <message>` = Continue session (butuh input user)
- `END <message>` = End session (close popup)

### Input Format
- User input dipisahkan dengan `*`
- Contoh: `1*3201234567890001` = menu 1, NIK 3201234567890001

---

## 🤝 Kontribusi

Proyek ini adalah prototipe simulasi untuk tujuan pembelajaran dan development.

Untuk kontribusi:
1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📄 License

MIT License - Bebas digunakan untuk keperluan edukasi dan development.

---

## 📞 Support

Untuk pertanyaan dan issue:
- Buka **Issues** di GitHub repository
- Email: support@jkn.go.id (simulasi)

---

## ✅ Checklist Deployment

### Backend
- [ ] Backend running di `http://0.0.0.0:3000`
- [ ] Database ter-seed dengan data dummy
- [ ] Prisma Studio accessible di `http://localhost:5555`
- [ ] Swagger docs accessible di `http://localhost:3000/api/docs`
- [ ] Dashboard API endpoints working (`/api/dashboard/data/*`)

### Mobile App (Prototipe USSD)
- [ ] IP komputer sudah diupdate di `mobile/config.js`
- [ ] Komputer dan smartphone terhubung WiFi yang sama
- [ ] Expo Go terinstall di smartphone
- [ ] QR code berhasil di-scan
- [ ] App berjalan dan bisa dial `*354#`
- [ ] Popup USSD muncul dan responsif

### Web Dashboard (Opsional)
- [ ] Dashboard running di `http://localhost:5173`
- [ ] Backend proxy working (Vite → port 3000)
- [ ] Data berhasil di-fetch dari API
- [ ] Semua halaman accessible (Peserta, Tagihan, dll)
- [ ] Search & filter functionality working

---

**Selamat mencoba! 🎉**

*JKN Dial Service Simulator v1.0*
*Prototipe Simulasi USSD - Future-Ready untuk Operator & API JKN*

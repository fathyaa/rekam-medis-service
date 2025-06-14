
# 🏥 Rekam Medis Service

Layanan ini merupakan bagian dari sistem manajemen layanan kesehatan yang menangani data **rekam medis pasien**, termasuk integrasi dengan layanan lain seperti **kunjungan**, **rawat jalan**, dan **rawat inap** menggunakan **GraphQL** sebagai antarmuka API utama.

---

## 📁 Struktur Proyek

```
rekam-medis-service/
├── Dockerfile
├── index.js
├── package.json
├── graphql/
│   ├── schema.js         # Definisi schema GraphQL
│   └── resolvers.js      # Resolver untuk schema
├── models/
│   ├── index.js          # Setup koneksi dan asosiasi Sequelize
│   ├── rekamMedis.js     # Model Rekam Medis
│   └── kunjungan.js      # Model Kunjungan
├── public/
│   ├── index_rm.html     # Halaman utama daftar rekam medis
│   ├── tambah_rm.html    # Form tambah rekam medis
│   └── index_kunjungan.html
├── routes/
│   ├── rekamMedisAPI.js  # (Opsional) API konvensional
│   └── kunjunganAPI.js
```

---

## 🚀 Cara Menjalankan

### 1. Clone Repository

```bash
git clone https://github.com/fathyaa/rekam-medis-service.git
cd rekam-medis-service
```

### 2. Install Dependency

```bash
npm install
```

### 3. Jalankan Server

```bash
npm start
```

Secara default akan berjalan di: `http://localhost:8000`

---

## 🧠 Fitur Utama

- 🔎 Lihat daftar rekam medis
- ➕ Tambah rekam medis baru
- ✏️ Edit dan hapus rekam medis
- 🔍 Pencarian berdasarkan nama pasien
- 📡 Integrasi data kunjungan, rawat jalan, rawat inap (via service eksternal)
- 🧬 GraphQL API untuk akses data dinamis

---

## 📊 GraphQL Endpoint

- **URL:** `http://localhost:8000/graphql`

### Contoh Query:

```graphql
query {
  getAllRekamMedis {
    id
    status
    pasien {
      nama
    }
    kunjungan {
      tanggal_kunjungan
      rawatJalan {
        keluhan
        diagnosa {
          nama_diagnosa
          kode_icd10
        }
      }
    }
  }
}
```

---

## 🛠 Konfigurasi Environment

Buat file `.env` jika diperlukan:

```env
PORT=8000
DATABASE_URL=postgres://user:password@host:port/dbname
RAWATJALAN_URL=http://rawat-jalan-service:8004/graphql
RAWATINAP_URL=http://rawat-inap-service:8005/graphql
KUNJUNGAN_URL=http://kunjungan-service:8003/graphql
PASIEN_URL=http://data-individu-service:8002/graphql
```

---

## 🧪 Teknologi yang Digunakan

- **Node.js**
- **Express.js**
- **Apollo Server + GraphQL**
- **Sequelize (PostgreSQL)**
- **Docker (optional for deployment)**

---

## 📄 Lisensi

MIT License. © 2025 [Fathya Ariyani](https://github.com/fathyaa)

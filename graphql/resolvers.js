const fetch = require('node-fetch');
const db = require('../models');

const resolvers = {
  Query: {
    getAllRekamMedis: async (_, __, { db }) => {
      return db.RekamMedis.findAll({ include: { model: db.Kunjungan, as: 'kunjungan' } });
    },
    getRekamMedisById: async (_, { id }, { db }) => {
      return db.RekamMedis.findByPk(id, { include: { model: db.Kunjungan, as: 'kunjungan' } });
    },
    getAllKunjunganByRekamMedisId: async (_, { id_rekam_medis }, { db }) => {
      return db.Kunjungan.findAll({ where: { id_rekam_medis } });
    },
    getAllKunjungan: async (_, __, { db }) => {
      return db.Kunjungan.findAll();
    },
    getAllPasien: async () => {
      const response = await fetch("http://data-individu-service:8000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              getAllPasien {
                id
                nama
                tanggal_lahir
                nik
              }
            }
          `,
        }),
      });

      const json = await response.json();
      return json.data.getAllPasien;
    }
  },

  Mutation: {
    tambahRekamMedis: async (_, { input }, { db }) => {
      return db.RekamMedis.create(input);
    },
    tambahKunjungan: async (_, { input }, { db }) => {
      return db.Kunjungan.create(input);
    },
    hapusRekamMedis: async (_, { id }, { db }) => {
      const rm = await db.RekamMedis.findByPk(id);
      if (!rm) return "Data tidak ditemukan";
      await rm.destroy();
      return "Rekam medis berhasil dihapus";
    },
   updateRekamMedis: async (_, { input }, { db }) => { // <--- PERUBAHAN DI SINI
      const { id, tanggal_dibuat, golongan_darah, alergi, riwayat_penyakit, catatan_dokter, status } = input; // <--- DESTRUKTURISASI DARI OBJEK 'input'

      const rekamMedis = await db.RekamMedis.findByPk(id);
      if (!rekamMedis) {
        throw new Error("Rekam medis tidak ditemukan"); // Pesan error ini sudah benar
      }

      // Update hanya field yang disediakan (opsional: bisa lebih selektif)
      // Ini akan mengupdate semua field yang ada di objek 'input'
      await rekamMedis.update({
        tanggal_dibuat,
        golongan_darah,
        alergi,
        riwayat_penyakit,
        catatan_dokter,
        status
      });

      return rekamMedis;
    },
   updateKunjungan: async (_, { input }, { db }) => { // <--- PERUBAHAN DI SINI
      const { id_kunjungan, tanggal_kunjungan, keluhan, tekanan_darah, berat_badan } // <--- DESTRUKTURISASI DARI OBJEK 'input'
            = input;

      const kunjungan = await db.Kunjungan.findByPk(id_kunjungan);
      if (!kunjungan) {
        throw new Error("Kunjungan tidak ditemukan"); // Pesan error ini sudah benar
      }

      // Melakukan update ke database hanya untuk field yang ada di 'input'
      await kunjungan.update({
        tanggal_kunjungan,
        keluhan,
        tekanan_darah,
        berat_badan
      });

      return kunjungan;
    },
    hapusKunjungan: async (_, { id_kunjungan }, { db }) => {
      const kunjungan = await db.Kunjungan.findByPk(id_kunjungan);
      if (!kunjungan) throw new Error("Kunjungan tidak ditemukan");
      await kunjungan.destroy();
      return true;
    },
  },

  Kunjungan: {
    rawatInap: async (parent) => {
      const query = `
        query($id_kunjungan: Int!) {
          rawatInapByKunjungan(id_kunjungan: $id_kunjungan) {
            id_rawat_inap
            id_kamar
            tanggal_masuk
            tanggal_keluar
            diagnosa {
              id_diagnosa_inap
              nama_diagnosa
              kode_icd10
            }
          }
        }
      `;

      const response = await fetch(process.env.RAWATINAP_URL || 'http://rawat-inap-service:8003/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables: { id_kunjungan: parent.id_kunjungan }
        })
      });

      const result = await response.json();
      return result.data?.rawatInapByKunjungan || null;
    },

    rawatJalan: async (parent) => {
      const query = `
        query($id_kunjungan: Int!) {
          rawatJalanByKunjungan(id_kunjungan: $id_kunjungan) {
            id_rawat_jalan
            tanggal_kunjungan
            keluhan
            catatan_dokter
            status
            diagnosa {
              id_diagnosa_jalan
              nama_diagnosa
              kode_icd10
            }
          }
        }
      `;

      const response = await fetch(process.env.RAWATJALAN_URL || 'http://rawat-jalan-service:8004/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables: { id_kunjungan: parent.id_kunjungan }
        })
      });

      const result = await response.json();
      console.log("id_kunjungan", parent.id_kunjungan);
      console.log("response", result);
      return result.data?.rawatJalanByKunjungan || null;
    }
  },

  RekamMedis: {
    pasien: async (parent) => {
      try {
        const res = await fetch('http://data-individu-service:8000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query PasienById($id: Int!) {
                pasien(id: $id) {
                  id
                  nama
                  tanggal_lahir
                }
              }
            `,
            variables: { id: parent.id_pasien },
          }),
        });

        const json = await res.json();
        return json.data.pasien;
      } catch (err) {
        console.error("Gagal fetch pasien:", err);
        return null;
      }
    }
  }
};

module.exports = resolvers;

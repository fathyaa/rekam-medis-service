const fetch = require('node-fetch');

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
    // getRekamMedisDanPasien: async (_, { id_pasien }) => {
    //   const [rekamMedisRes, pasienRes] = await Promise.all([
    //     fetch('http://localhost:8001/graphql', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         query: `query {
    //           getAllRekamMedis {
    //             id id_pasien tanggal_dibuat golongan_darah alergi
    //             riwayat_penyakit catatan_dokter status
    //           }
    //         }`
    //       })
    //     }).then(res => res.json()),

    //     fetch('http://localhost:8002/graphql', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         query: `query getPasienById($id: Int!) {
    //           getPasien(id: $id) {
    //             id nama nik jenis_kelamin alamat tanggal_lahir
    //           }
    //         }`,
    //         variables: { id: id_pasien }
    //       })
    //     }).then(res => res.json())
    //   ]);

    //   const rekamMedis = rekamMedisRes.data?.getAllRekamMedis?.filter(rm => rm.id_pasien === id_pasien) || [];
    //   const pasien = pasienRes.data?.getPasien || null;

    //   return { rekamMedis, pasien };
    // },
    getDiagnosaById: async (_, { id }) => {
      const diagnosaQuery = `
        query($id: Int!) {
          diagnosaInap(id: $id) {
            id_diagnosa_inap
            id_rawat_inap
            id_kunjungan
            nama_diagnosa
            kode_icd10
          }
        }
      `;
      const rawatInapUrl = process.env.RAWATINAP_URL || 'http://rawat-inap-service:8003/graphql';
      const response = await fetch(rawatInapUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: diagnosaQuery,
          variables: { id }
        })
      });

      const result = await response.json();
      return result.data?.diagnosaInap || null;
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
    updateRekamMedis: async (_, { id, ...args }, { db }) => {
      const rekamMedis = await db.RekamMedis.findByPk(id);
      if (!rekamMedis) throw new Error("Rekam medis tidak ditemukan");
      await rekamMedis.update(args);
      return rekamMedis;
    },
    updateKunjungan: async (_, { id_kunjungan, ...args }, { db }) => {
      const kunjungan = await db.Kunjungan.findByPk(id_kunjungan);
      if (!kunjungan) throw new Error("Kunjungan tidak ditemukan");
      await kunjungan.update(args);
      return kunjungan;
    },
    hapusKunjungan: async (_, { id_kunjungan }, { db }) => {
      const kunjungan = await db.Kunjungan.findByPk(id_kunjungan);
      if (!kunjungan) throw new Error("Kunjungan tidak ditemukan");
      await kunjungan.destroy();
      return true;
    }
  },

  Kunjungan: {
    diagnosa: async (parent) => {
      if (!parent.id_kunjungan) return null;

      const diagnosaQuery = `
        query($id_kunjungan: Int!) {
          diagnosaInap(id_kunjungan: $id_kunjungan) {
            id_diagnosa_inap
            id_rawat_inap
            id_kunjungan
            nama_diagnosa
            kode_icd10
          }
        }
      `;

      const rawatInapUrl = process.env.RAWATINAP_URL || 'http://rawat-inap-service:8003/graphql';
      const response = await fetch(rawatInapUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: diagnosaQuery,
          variables: { id_kunjungan: parent.id_kunjungan }
        })
      });

      const result = await response.json();
      return result.data?.diagnosaInap || null;
    }
  }
};

module.exports = resolvers;

const resolvers = {
  Query: {
    getAllRekamMedis: async (_, __, { db }) => {
      return db.RekamMedis.findAll({ include: { model: db.Kunjungan, as: 'kunjungan' } });
    },
    getRekamMedisById: async (_, { id }, { db }) => {
      return db.RekamMedis.findByPk(id, { include: { model: db.Kunjungan, as: 'kunjungan' } });
    },
    getAllKunjunganByRekamMedisId: async (_, { id_rekam_medis }, { db }) => {
      return db.Kunjungan.findAll({
        where: { id_rekam_medis }
      });
    },
    getAllKunjungan: async (_, __, { db }) => {
      return db.Kunjungan.findAll();
    }
  },
  Mutation: {
  tambahRekamMedis: async (_, { input }, { db }) => {
  const newRM = await db.RekamMedis.create(input);
  return newRM;
  },

  tambahKunjungan: async (_, { input }, { db }) => {
    const newKunjungan = await db.Kunjungan.create(input);
    return newKunjungan;
  },
  
  hapusRekamMedis: async (_, { id }, { db }) => {
      const rm = await db.RekamMedis.findByPk(id);
      if (!rm) return "Data tidak ditemukan";
      await rm.destroy();
      return "Rekam medis berhasil dihapus";
    },

  updateRekamMedis: async (_, { id, ...args }, { db }) => {
    const rekamMedis = await db.RekamMedis.findByPk(id);
    if (!rekamMedis) {
      throw new Error("Rekam medis tidak ditemukan");
    }

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
}

};

module.exports = resolvers;

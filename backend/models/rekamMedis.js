module.exports = (sequelize, DataTypes) => {
  const RekamMedis = sequelize.define('RekamMedis', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_pasien: DataTypes.INTEGER,
    tanggal_dibuat: DataTypes.DATEONLY,
    golongan_darah: DataTypes.STRING(3),
    alergi: DataTypes.TEXT,
    riwayat_penyakit: DataTypes.TEXT,
    catatan_dokter: DataTypes.TEXT,
    status: DataTypes.STRING(50)
  }, {
    tableName: 'rekam_medis',
    timestamps: false
  });

  RekamMedis.associate = (models) => {
    RekamMedis.hasMany(models.Kunjungan, {
      foreignKey: 'id_rekam_medis',
      as: 'kunjungan'
    });
  };

  return RekamMedis;
};

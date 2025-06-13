module.exports = (sequelize, DataTypes) => {
  const Kunjungan = sequelize.define('Kunjungan', {
    id_kunjungan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_rekam_medis: DataTypes.INTEGER,
    id_dokter: DataTypes.INTEGER,
    id_diagnosa: DataTypes.INTEGER,
    tanggal_kunjungan: DataTypes.DATEONLY,
    keluhan: DataTypes.TEXT,
    tekanan_darah: DataTypes.STRING(20),
    berat_badan: DataTypes.DECIMAL(5,2)
  }, {
    tableName: 'kunjungan',
    timestamps: false
  });

  Kunjungan.associate = (models) => {
    Kunjungan.belongsTo(models.RekamMedis, {
      foreignKey: 'id_rekam_medis',
      as: 'rekamMedis'
    });
  };

  return Kunjungan;
};

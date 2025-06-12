require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// Inisialisasi koneksi database
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Inisialisasi objek db kosong
const db = {};

// Import semua model
db.RekamMedis = require('./rekamMedis')(sequelize, DataTypes);
db.Kunjungan = require('./kunjungan')(sequelize, DataTypes);

// Jalankan associate jika ada
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Tambahkan sequelize instance dan class Sequelize ke objek db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export objek db
module.exports = db;

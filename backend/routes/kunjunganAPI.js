const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Ambil semua kunjungan
  router.get('/', async (req, res) => {
    try {
      const kunjungan = await db.Kunjungan.findAll();
      res.json(kunjungan);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Tambah kunjungan baru
  router.post('/', async (req, res) => {
    try {
      const newKunjungan = await db.Kunjungan.create(req.body);
      res.status(201).json(newKunjungan);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Dapatkan kunjungan berdasarkan ID rekam medis
  router.get('/rekam/:id_rekam_medis', async (req, res) => {
    try {
      const list = await db.Kunjungan.findAll({
        where: { id_rekam_medis: req.params.id_rekam_medis },
      });
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Update kunjungan
  router.put('/:id', async (req, res) => {
    try {
      const updated = await db.Kunjungan.update(req.body, {
        where: { id_kunjungan: req.params.id },
      });
      res.json({ updated });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Hapus kunjungan
  router.delete('/:id', async (req, res) => {
    try {
      await db.Kunjungan.destroy({ where: { id_kunjungan: req.params.id } });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};

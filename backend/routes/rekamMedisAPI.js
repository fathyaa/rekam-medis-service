const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // ✅ Get all rekam medis
  router.get('/', async (req, res) => {
    try {
      const data = await db.RekamMedis.findAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ✅ Get rekam medis by id
  router.get('/:id', async (req, res) => {
    try {
      const data = await db.RekamMedis.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: 'Not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ✅ Create rekam medis
  router.post('/', async (req, res) => {
    try {
      const newRM = await db.RekamMedis.create(req.body);
      res.status(201).json(newRM);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // ✅ Delete rekam medis
  router.delete('/:id', async (req, res) => {
    try {
      const result = await db.RekamMedis.destroy({ where: { id: req.params.id } });
      if (result === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};

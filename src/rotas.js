import express from 'express';
import { promises } from 'fs';
const { readFile, writeFile } = promises;
import { v4 as uuidv4 } from 'uuid';

import Recados from './models/data.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const recado = await Recados.create({
      title: req.body.title,
      description: req.body.description,
    });

    return res.json(recado);
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const recados = await Recados.find();
    res.send(recados);
  } catch (err) {
    res.status(400).send({ err: err });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const recados = await Recados.findById(req.params.id);
    await recados.remove();
    res.send({ ok: 'ok' });
    res.end();
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

export default router;

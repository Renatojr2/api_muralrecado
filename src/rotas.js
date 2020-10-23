import express from 'express';
import { promises } from 'fs';
const { readFile, writeFile } = promises;

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let recado = req.body;

    const data = JSON.parse(await readFile('recados.json'));

    recado = { id: data.nextId++, ...recado };

    data.recados.push(recado);

    await writeFile('recados.json', JSON.stringify(data, null, 2));

    res.json(data);

    res.end();
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile('recados.json'));
    res.send(data);
  } catch (err) {
    res.status(400).send({ err: err });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile('recados.json'));
    data.recados = data.recados.filter((recado) => {
      return recado.id !== parseInt(req.params.id);
    });
    await writeFile('recados.json', JSON.stringify(data, null, 2));

    res.end();
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

export default router;

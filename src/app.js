import express from 'express';
import { promises } from 'fs';
import cors from 'cors';
const { readFile, writeFile } = promises;

import router from './rotas.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/recados', router);

app.listen(process.env.PORT || 3333, async () => {
  try {
    await readFile('recados.json');
  } catch (err) {
    const recados = {
      nextId: 1,
      recados: [],
    };
    await writeFile('recados.json', JSON.stringify(recados));
  }
});

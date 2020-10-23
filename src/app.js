import express from 'express';
import { promises } from 'fs';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config.js';
const { readFile, writeFile } = promises;

import router from './rotas.js';

mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.wlot6.azure.mongodb.net/mural?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => console.log('conectado'))
  .catch((err) => console.log('error de conecção' + err));

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

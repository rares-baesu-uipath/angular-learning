import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 3000;

const readData = () => {
  return fs.promises.readFile(
    path.join(__dirname, "data.json"),
  )
}

const writeData = (data: Object) => {
  return fs.promises.writeFile(
    path.join(__dirname, "data.json"),
    JSON.stringify(data),
  )
}

app.use(cors())

app.get('/orders', (req, res) => {
  readData()
    .then(data => JSON.parse(data.toString()))
    .then(data => res.send(data.orders))
    .catch(() => res.send('ERROR'));
});

app.get('/sculptures', (req, res) => {
  readData()
    .then(data => JSON.parse(data.toString()))
    .then(data => res.send(data.sculptures))
    .catch(() => res.send('ERROR'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
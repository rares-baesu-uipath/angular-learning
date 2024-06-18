import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import {v4} from 'uuid';
import bodyParser from 'body-parser';

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

app.use(cors());
app.use(bodyParser.json());

app.get('/orders', (req, res) => {
  readData()
    .then(data => JSON.parse(data.toString()))
    .then(data => res.send(data.orders))
    .catch(() => res.send('ERROR'));
});

app.get('/orders/:id', (req, res) => {
  readData()
    .then(data => JSON.parse(data.toString()))
    .then(data => res.send(data.orders.find((s: any) => s.id === req.params.id)))
    .catch(() => res.send('ERROR'));
})

app.put('/orders/:id', (req, res) => {
  readData()
  .then(data => JSON.parse(data.toString()))
  .then(data => {
    const idx = data.orders.findIndex((s: any) => s.id === req.params.id);
    data.orders[idx] = req.body;
    writeData(data).then(() => res.send({status: 'ok'}));
  })
  .catch(() => res.send('ERROR'));
})

app.post('/orders', (req, res) => {
  readData()
  .then(data => JSON.parse(data.toString()))
  .then(data => {
    const newData = {...req.body, id: v4() }
    data.orders.push(newData);
    writeData(data).then(() => res.send({status: 'ok'}));
  })
  .catch((err) => res.send('ERROR' + err));
})





















app.get('/sculptures', (req, res) => {
  readData()
    .then(data => JSON.parse(data.toString()))
    .then(data => res.send(data.sculptures))
    .catch(() => res.send('ERROR'));
});

app.get('/sculptures/:id', (req, res) => {
  readData()
    .then(data => JSON.parse(data.toString()))
    .then(data => res.send(data.sculptures.find((s: any) => s.id === req.params.id)))
    .catch(() => res.send('ERROR'));
})

app.put('/sculptures/:id', (req, res) => {
  readData()
  .then(data => JSON.parse(data.toString()))
  .then(data => {
    const idx = data.sculptures.findIndex((s: any) => s.id === req.params.id);
    data.sculptures[idx] = req.body;
    writeData(data).then(() => res.send({status: 'ok'}));
  })
  .catch(() => res.send('ERROR'));
})

app.post('/sculptures', (req, res) => {
  readData()
  .then(data => JSON.parse(data.toString()))
  .then(data => {
    const newData = {...req.body, id: v4() }
    data.sculptures.push(newData);
    writeData(data).then(() => res.send({status: 'ok'}));
  })
  .catch((err) => res.send('ERROR' + err));
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
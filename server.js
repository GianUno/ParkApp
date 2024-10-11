const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io')

const config = require('./config/configs');


mongoose.Promise = global.Promise;

mongoose.connect(config.db);

let db = mongoose.connection;

db.on('open', () => {
  console.log('Conectado com o banco.')
})

db.on('error', (err) => {
  console.log(`Erro na conexão ao banco: ${err}`);
});

const app = express();

app.enable('trust proxy');

app.use(express.static('public'));

app.use(bodyParser.json());

if (process.env.CORS) {
  app.use(cors());
}

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});

const io = socket(server, {
  cors: {
    origin: config.react_app_url,
  }
});

let online = 0;
io.on('connection', (socket) => {
  online++;
  console.log(`Socket ${socket.id} conectado.`);
  console.log(`Online: ${online}`);
  io.emit('Acesso', online);

  socket.on('add', data => socket.broadcast.emit('add', data));
  socket.on('update', data => socket.broadcast.emit('update', data));
  socket.on('delete', data => socket.broadcast.emit('delete', data));

  socket.on('disconnect', () => {
    online--;
    console.log(`Socket ${socket.id} desconectou.`);
    console.log(`Online: ${online}`);
    io.emit('visitante saiu', online);
  });
});
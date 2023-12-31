require('dotenv').config();

const { PORT = 4000 } = process.env;
const express = require('express');
const server = express();

const client  = require('./db');
client.connect();

server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
});

const apiRouter = require('./api');
server.use('/api', apiRouter);

const morgan = require('morgan');
server.use(morgan('dev'));

server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });

  const bodyParser = require('body-parser');
server.use(bodyParser.json());

server.use(express.json())


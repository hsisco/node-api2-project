const express = require('express');
const postRouter = require('./routes/postRouter');
const server = express();

server.use(express.json());
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Node II API Project</h>
    <p>Hysen Sisco</p>
  `);
});

module.exports = server;
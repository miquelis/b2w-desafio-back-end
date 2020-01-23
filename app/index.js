"use strict";

const server = require("./server");
const port = process.env.PORT;
const host = process.env.HOST;

server.listen(port, host, () => {
  console.log(`API rodando em http://${host}:${port}`);
});

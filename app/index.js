"use strict";

const server = require("./server");
const { port } = require("config");

server.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});

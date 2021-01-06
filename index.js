const mocks = require('./mocks.json');
const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("API saúde is running.");
});

server.get("/prontuario/:cpf", (req, res) => {

  const { cpf } = req.params;

  if (cpf === "12345678901") {
    return res.status(200).send(mocks)
  } else {
    return res.status(404).json({
        "error": "search-0002",
        "message": "Dados nāo encontrados, por favor tente novamente.",
        "detail": "Parece que houve um erro com a sua busca",
        "help": ""
    })
  }
});

server.listen(3032);
const mocks = require('./mocks.json');
const express = require("express");

const server = express();

server.use(express.json());

/**
 * Prometheus config
 */
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ timeout: 5000 });

const counter = new client.Counter({
  name: 'node_request_operations_total',
  help: 'The total number of processed requests'
});

/**
 * Prometheus endpoint
 */
server.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(client.register.metrics())
})

/**
 * Global Middleware for logging
 */
server.use((req, res, next) => {
  counter.inc();
  return next();
});

/**
 * Conferir status da API
 */
server.get("/", (req, res) => {
  res.send("API saúde is running.");
});

/**
 * Recupera prontuario a partir do cpf
 */
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
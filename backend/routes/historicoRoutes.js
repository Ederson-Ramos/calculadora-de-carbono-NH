const express = require("express");
const rota = express.Router();
const historicoControllers = require("../controllers/historicoControllers");

rota.get("/emissoes", historicoControllers.buscarHistorico);

module.exports = rota;

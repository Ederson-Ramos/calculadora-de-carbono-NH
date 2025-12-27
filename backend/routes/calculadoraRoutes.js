const express = require("express");
const rota = express.Router();
const calculadoraControllers = require("../controllers/calculadoraControllers");

rota.post("/emissao", calculadoraControllers.inserirDadosNoBanco);

module.exports = rota

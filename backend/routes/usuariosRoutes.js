const express = require("express");
const rota = express.Router();
const usuarioControllers = require("../controllers/usuarioControllers");

rota.post("/cadastrar", usuarioControllers.cadastrar);

module.exports = rota;

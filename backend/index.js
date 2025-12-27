require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/usuarios", require("./routes/usuariosRoutes"));

app.use("/calculadora", require("./routes/calculadoraRoutes"));

app.listen(3000, () => {
    console.log("✅ Servidor rodando na porta 3000");
});

require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

db.connect((err) => {
    if(err) {
        console.log("Erro ao conectar no banco:", err);
        return;
    }

    console.log("✅ Banco de Dados conectado com sucesso!");
});

app.use("/usuarios", require("./routes/usuariosRoutes"))

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

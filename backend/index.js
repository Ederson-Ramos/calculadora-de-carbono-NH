require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/usuarios", require("./routes/usuariosRoutes"));

app.use("/calculadora", require("./routes/calculadoraRoutes"));

app.use("/historico", require("./routes/historicoRoutes"));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
});

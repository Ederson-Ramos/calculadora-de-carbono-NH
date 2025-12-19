const db = require("../config/db");

async function criarUsuario(email, senha) {
    const sql = "INSERT INTO usuarios (email, senha) VALUES (?, ?)";
    await db.query(sql, [email, senha]);
}

module.exports = {
    criarUsuario
}

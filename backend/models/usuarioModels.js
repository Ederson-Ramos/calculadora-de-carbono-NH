const db = require("../config/db");

async function criarUsuario(email, senha) {
    const sql = "INSERT INTO usuarios (email, senha) VALUES (?, ?)";
    await db.query(sql, [email, senha]);
}

async function buscarUsuario(email) {
    const sql = "SELECT email FROM usuarios WHERE email = ?;";
    const result = await db.query(sql, [email]);

    return result;
}

module.exports = {
    criarUsuario,
    buscarUsuario
}

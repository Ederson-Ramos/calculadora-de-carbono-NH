const pool = require("../config/db");

async function criarUsuario(email, senha) {
    const sql = "INSERT INTO usuarios (email, senha) VALUES ($1, $2) RETURNING id;";
    const {rows} = await pool.query(sql, [email, senha]);

    return rows[0];
}

async function buscarUsuario(email) {
    const sql = "SELECT id, email, senha FROM usuarios WHERE email = $1;";
    const {rows} = await pool.query(sql, [email]);

    return rows;
}

module.exports = {
    criarUsuario,
    buscarUsuario
}

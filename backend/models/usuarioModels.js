const db = require("../config/db");

function criarUsuario(email, senha) {
    const sql = "INSERT INTO usuarios (email, senha) VALUES (?, ?)";
    db.query(sql, [email, senha]);
}

module.exports = {
    criarUsuario
}

const db = require("../config/db");

async function criarRegistroEmissao(idUsuario, tipoVeiculo, kmsRodados, carbonoEmitido) {
    const sql = "INSERT INTO emissoes(usuario_id, tipo, km_rodados, co2_emitido) VALUES (?, ?, ?, ?);";

    await db.query(sql, [idUsuario, tipoVeiculo,kmsRodados, carbonoEmitido]);
}

module.exports = {criarRegistroEmissao}

const pool = require("../config/db");

async function criarRegistroEmissao(idUsuario, tipoVeiculo, kmsRodados, carbonoEmitido) {
    const sql = "INSERT INTO emissoes(usuario_id, tipo, km_rodados, co2_emitido) VALUES ($1, $2, $3, $4);";

    await pool.query(sql, [idUsuario, tipoVeiculo,kmsRodados, carbonoEmitido]);
}

module.exports = {criarRegistroEmissao}

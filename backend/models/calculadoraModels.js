const pool = require("../config/db");

async function criarRegistroEmissao(idUsuario, tipoVeiculo, kmsRodados, carbonoEmitido, classeEmissao) {
    const sql = "INSERT INTO emissoes(usuario_id, tipo, km_rodados, co2_emitido, classe_emissao) VALUES ($1, $2, $3, $4, $5);";

    await pool.query(sql, [idUsuario, tipoVeiculo, kmsRodados, carbonoEmitido, classeEmissao]);
}

module.exports = {criarRegistroEmissao}

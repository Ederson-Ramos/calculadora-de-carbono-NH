const pool = require("../config/db");

async function buscarHistoricoPorUsuario(idUsuario) {
    const sql = "SELECT tipo, km_rodados, co2_emitido, data_emissao FROM emissoes WHERE usuario_id = $1 ORDER BY data_emissao DESC";
    const {rows} = await pool.query(sql, [idUsuario]);

    return rows;
}

module.exports = {buscarHistoricoPorUsuario};

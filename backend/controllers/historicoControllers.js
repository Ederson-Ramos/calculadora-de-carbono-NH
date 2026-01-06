const historicoModels = require("../models/historicoModels");

async function buscarHistorico(req, res) {
    try {
        const idUsuario = req.body.idUsuario;

        if(idUsuario) {
            const historico = await historicoModels.buscarHistoricoPorUsuario(idUsuario);

            return res.status(200).json({historico});
        }

        return res.status(400).json({erro: "Usuário não informado"});
    } catch (err) {
        return res.status(500).json({erro: "Erro ao buscar histórico"});
    }
}

module.exports = {buscarHistorico}

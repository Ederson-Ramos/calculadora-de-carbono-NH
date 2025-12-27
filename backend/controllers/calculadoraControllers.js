const calculadoraModels = require("../models/calculadoraModels");
const calculoCarbono = require("../services/calculoCarbono");

async function inserirDadosNoBanco(req, res) {
    const {idUsuario, tipoVeiculo, kmsRodados} = req.body;
    const carbonoEmitido = await calculoCarbono.calculo(tipoVeiculo, kmsRodados);

    if(!tipoVeiculo || kmsRodados == undefined || kmsRodados == null) {
        return res.status(400).json({erro: "Por favor, preencha e selecione todos os campos."});
    }

    if(kmsRodados < 0) {
        return res.status(400).json({erro: "O campo da distância percorrida não pode ser um número negativo."});
    }

    if(carbonoEmitido == null) {
        return res.status(400).json({erro: "Veículo inválido."});
    }

    try {
        await calculadoraModels.criarRegistroEmissao(idUsuario, tipoVeiculo, kmsRodados, carbonoEmitido);

        return res.status(201).json({
            mensagem: "Emissão enviada com sucesso!",
            co2Emitido: carbonoEmitido
        });
    } catch(err) {
        return res.status(500).json({erro: "Erro ao enviar emissão."});
    }
}

module.exports = {inserirDadosNoBanco}

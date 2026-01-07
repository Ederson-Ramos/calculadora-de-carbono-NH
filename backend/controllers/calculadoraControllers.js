const calculadoraModels = require("../models/calculadoraModels");
const calculoCarbono = require("../services/calculoCarbono");
const classificarEmissao = require("../services/classificarEmissao");

async function inserirDadosNoBanco(req, res) {
    const {idUsuario, tipoVeiculo, kmsRodados} = req.body;
    const kmsRodadosNumero = Number(kmsRodados);

    if(!tipoVeiculo || kmsRodados == undefined || kmsRodados == null || kmsRodados === "") {
        return res.status(400).json({erro: "Por favor, preencha e selecione todos os campos."});
    }

    if(kmsRodados < 0) {
        return res.status(400).json({erro: "O campo da distância percorrida não pode ser um número negativo."});
    }

    const carbonoEmitido = await calculoCarbono.calculo(tipoVeiculo, kmsRodados);

    if(carbonoEmitido == null) {
        return res.status(400).json({erro: "Veículo inválido."});
    }

    const classeEmissao = await classificarEmissao.classificarEmissao(tipoVeiculo, carbonoEmitido);

    try {
        await calculadoraModels.criarRegistroEmissao(idUsuario, tipoVeiculo, kmsRodadosNumero, carbonoEmitido, classeEmissao);

        return res.status(201).json({
            mensagem: "Emissão enviada com sucesso!",
            co2Emitido: carbonoEmitido,
            nivel: classeEmissao
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({erro: "Erro ao enviar emissão."});
    }
}

module.exports = {inserirDadosNoBanco}

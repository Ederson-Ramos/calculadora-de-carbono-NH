const usuarioModels = require("../models/usuarioModels");
const bcrypt = require("bcrypt");

async function cadastrar(req, res) {
    const {valorEmail, valorSenha} = req.body;

    const usuarioExistente = await usuarioModels.buscarUsuario(valorEmail);

    if(!valorEmail || !valorSenha) {
        return res.status(400).json({erro: "Por favor, preencha todos os campos."});
    }

    if (valorSenha.length < 8) {
        return res.status(400).json({erro: "A senha deve ter no mínimo 8 caracteres."});
    }

    if (usuarioExistente[0].length > 0) {
        return res.status(409).json({erro: "Usuário já cadastrado. Cadastre outro email."});
    }

    try {
        const senhaHash = await bcrypt.hash(valorSenha, 10);

        await usuarioModels.criarUsuario(valorEmail, senhaHash);

        return res.status(201).json({mensagem: "Usuário cadastrado com sucesso. Entre na sua conta!"});
    } catch(err) {
        return res.status(500).json({erro: "Erro ao cadastrar usuário."});
    }
}

module.exports = {
    cadastrar
}

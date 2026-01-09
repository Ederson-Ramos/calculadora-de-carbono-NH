const usuarioModels = require("../models/usuarioModels");
const bcrypt = require("bcrypt");

async function cadastrar(req, res) {
    const {valorEmail, valorSenha} = req.body;

    if (!valorEmail || !valorSenha) {
        return res.status(400).json({erro: "Por favor, preencha todos os campos."});
    }

    if (valorSenha.length < 8) {
        return res.status(400).json({erro: "A senha deve ter no mínimo 8 caracteres."});
    }

    const usuarioExistente = await usuarioModels.buscarUsuario(valorEmail);

    if (usuarioExistente.length > 0) {
        return res.status(409).json({erro: "Usuário já cadastrado. Cadastre outro email."});
    }

    try {
        const senhaHash = await bcrypt.hash(valorSenha, 10);

        const novoUsuario = await usuarioModels.criarUsuario(valorEmail, senhaHash);

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso.",
            idUsuario: novoUsuario.id
        });
    } catch(err) {
        return res.status(500).json({erro: "Erro ao cadastrar usuário."});
    }
}

async function entrar(req, res) {
    const {valorEmail, valorSenha} = req.body;

    if (!valorEmail || !valorSenha) {
        return res.status(400).json({erro: "Por favor, preencha todos os campos."});
    }

    if (valorSenha.length < 8) {
        return res.status(400).json({erro: "A senha deve ter no mínimo 8 caracteres."});
    }

    const usuarioExistente = await usuarioModels.buscarUsuario(valorEmail);

    if (usuarioExistente.length == 0) {
        return res.status(409).json({erro: "Usuário não existe. Cadastre o email para o usuário."});
    }

    try {
        const senhaECorreta = await bcrypt.compare(valorSenha, usuarioExistente[0].senha);

        if(senhaECorreta) {
            return res.status(200).json({
                mensagem: "Entrada liberada com sucesso.",
                idUsuario: usuarioExistente[0].id
            });
        }

        return res.status(401).json({erro: "Email ou senha inválidos."})
    } catch(err) {
        return res.status(500).json({erro: "Erro ao realizar login"});
    }
}

module.exports = {
    cadastrar,
    entrar
}

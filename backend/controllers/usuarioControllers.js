const usuarioModels = require("../models/usuarioModels");

async function cadastrar(req, res) {
    const {email, senha} = req.body;

    if(!email || !senha) {
        return res.status(400).json({erro: "Por favor, preencha todos os campos"});
    } 

    try {
        await usuarioModels.criarUsuario(email, senha);

        return res.status(201).json({mensagem: "Usuário cadastrado com sucesso"});
    } catch(err) {
        return res.status(500).json({erro: "Erro ao cadastrar usuário"});
    }
}

module.exports = {
    cadastrar
}

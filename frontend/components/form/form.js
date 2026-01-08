import {carregarHistorico} from "../../assets/js/utils.js";

$(document).ready(() => {
    function trocarForm() {
        $(".trocar1").click(() => {
            $(".fomulario-cadastrar").show();
            $(".fomulario-entrar").hide();
        });

        $(".trocar2").click(() => {
            $(".fomulario-cadastrar").hide();
            $(".fomulario-entrar").show();
        });
    }

    function EntrarCadastrarUsuario(formulario, inputEmail, inputSenha, rota) {
        const form = $(formulario);

        form.submit(async (e) => {
            e.preventDefault();

            const valorEmail = $(inputEmail).val();
            const valorSenha = $(inputSenha).val();

            try {
                const resposta = await fetch(`https://backend-carbono.onrender.com/usuarios/${rota}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ valorEmail, valorSenha })
                });

                const data = await resposta.json();

                if (!resposta.ok) {
                    $(".mensagem-erro__texto").text(data.erro);

                    $(".msg-erro").show();

                    setTimeout(() => {
                        $(".msg-erro").hide();
                    }, 5000);

                    return;
                }

                sessionStorage.setItem("usuario_id", data.idUsuario);

                $(".form-none").slideUp(900);
                $(".content-under").slideDown(900);

                carregarHistorico();

                $(".mensagem-sucesso__texto").text(data.mensagem);
                $(".msg-sucesso").show();

                setTimeout(() => {
                    $(".msg-sucesso").hide();
                }, 5000);

                // Inputs
                const email = $(inputEmail);
                const senha = $(inputSenha);

                email.val("");
                senha.val("");

            } catch(err) {
                console.log("Erro ao cadastrar usuário:", err);
            }
        });
    }

    function validarForm(formulario) {
        $(formulario).validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                senha: {
                    required: true,
                    minlength: 8
                }
            },
            errorPlacement: function(error, element) {
                error.insertAfter(element.closest(".input-group"));
            }
        });
    }

    // Validações Front formulário
    validarForm("#form-cadastro");
    validarForm("#form-entrar");

    trocarForm();

    // Reutilização da mesma função/lógica para o formulário do usuário
    EntrarCadastrarUsuario("#form-cadastro", "#emailCadastro", "#senhaCadastro", "cadastrar");
    EntrarCadastrarUsuario("#form-entrar", "#emailEntrar", "#senhaEntrar", "entrar");
});

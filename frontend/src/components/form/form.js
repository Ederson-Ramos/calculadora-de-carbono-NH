$(document).ready(() => {

    function trocarForm() {
        $(".trocar1").click(() => {
            $(".fomulario-cadastrar").css({ display: "block" });
            $(".fomulario-entrar").css({ display: "none" });
        });

        $(".trocar2").click(() => {
            $(".fomulario-cadastrar").css({ display: "none" });
            $(".fomulario-entrar").css({ display: "block" });
        });
    }

    function cadastrarUsuario() {
        const formularioCadastro = $("#form-cadastro");

        formularioCadastro.submit(async (e) => {
            e.preventDefault();

            const valorEmail = $("#emailCadastro").val();
            const valorSenha = $("#senhaCadastro").val();

            try {
                const resposta = await fetch("http://localhost:3000/usuarios/cadastrar", {
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
                    }, 3000);

                    return;
                }

                $(".mensagem-sucesso__texto").text(data.mensagem);

                $(".msg-sucesso").show();

                setTimeout(() => {
                    $(".msg-sucesso").hide();
                }, 5000);

                // Inputs
                const email = $("#emailCadastro");
                const senha = $("#senhaCadastro");

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
    cadastrarUsuario();
});

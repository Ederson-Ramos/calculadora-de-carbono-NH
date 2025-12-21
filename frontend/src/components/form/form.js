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

            const email = $("#emailCadastro").val();
            const senha = $("#senhaCadastro").val();

            try {
                const resposta = await fetch("http://localhost:3000/usuarios/cadastrar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, senha })
                });

                const data = await resposta.json();

                if (!resposta.ok) {
                    console.log(data.erro);
                    return;
                }

                console.log(data.mensagem);

            } catch(err) {
                console.log("Erro ao cadastrar usuário:", err);
            }
        });
    }

    trocarForm();
    cadastrarUsuario();
});

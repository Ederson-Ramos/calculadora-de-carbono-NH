$(document).ready(() => {
    $(".calculadora").submit(async (e) => {
        e.preventDefault();

        const idUsuario = sessionStorage.getItem("usuario_id");
        const tipoVeiculo = $("input[name='veiculo']:checked").val();
        const kmsRodados = $("#km").val();

        try {
            const resposta = await fetch("http://localhost:3000/calculadora/emissao", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({idUsuario, tipoVeiculo, kmsRodados})
            });

            const data = await resposta.json();

            if(!resposta.ok) {
                $(".mensagem-erro__texto").text(data.erro);

                $(".msg-erro").show();

                setTimeout(() => {
                    $(".msg-erro").hide();
                }, 5000);

                return;
            }

            // Mostrar mensagem de sucesso do Back-End
            $(".mensagem-sucesso__texto").text(data.mensagem);

            $(".msg-sucesso").show();

            setTimeout(() => {
                $(".msg-sucesso").hide();
            }, 5000);

            // Mostrar mensagem de retorno da quantidade de carbono emitida na semana
            $(".emissao").text(data.co2Emitido + " kg");

            switch(data.nivel) {
                case "verde":
                    mostrarMensagemDeEmissao("verde", "#dcf9e7", "#26aa57", "#22c35d1a");

                    break;
                case "laranja":
                    mostrarMensagemDeEmissao("laranja", "#fdeed8", "#f2930d", "#f2930d1a");

                    break;
                case "vermelho":
                    mostrarMensagemDeEmissao("vermelho", "#f9dcdc", "#dd3c3c", "#dd3c3c1a");

                    break;
            }
        } catch(err) {
            console.log("Erro ao calcular emissão:", err);
        }
    });

    $(".calculadora").validate({
        rules: {
            kmsRodados: {
                required: true,
                digits: true
            }
        }
    });

    function mostrarMensagemDeEmissao(nivel, corFundoContainer, corDefault, corFundoIcone) {
        // Mensagem
        switch(nivel) {
            case "verde":
                $(".resposta-emissao__msg-retorno").text("Excelente! Você está mantendo suas emissões baixas. Parabéns por ajudar o meio ambiente e nossa cidade! 🌱");

                break;
            case "laranja":
                $(".resposta-emissao__msg-retorno").text("Bom trabalho! Considere usar o transporte público de Novo Hamburgo quando possível para reduzir suas emissões. 🌍");

                break;
            case "vermelho":
                $(".resposta-emissao__msg-retorno").text("Suas emissões desta semana foram altas. Considere carona solidária ou o Trensurb para reduzir suas emissões. 💚");

                break;
        }

        $(".resposta-emissao").slideDown(500);

        // Container Resposta
        $(".resposta-emissao").css("background-color", `${corFundoContainer}`);
        $(".resposta-emissao").css("border", `1px solid ${corDefault}`);

        // Icone
        $(".resposta-emissao__i").css("background-color", `${corFundoIcone}`);
        $(".resposta-emissao__i").css("color", `${corDefault}`);

        $(".emissao").css("color", `${corDefault}`);
    }
});

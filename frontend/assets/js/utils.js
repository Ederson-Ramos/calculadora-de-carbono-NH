export async function carregarHistorico() {
    const idUsuario = sessionStorage.getItem("usuario_id");
    if(!idUsuario) return;

    try {
        const resposta = await fetch(
            `https://backend-carbono.onrender.com/historico/emissoes?idUsuario=${idUsuario}`
        );

        const data = await resposta.json();

        if (data.length > 0) {
            $(".inicio").show();
            $(".loading").hide();

            let totalEmissao = 0;

            data.forEach(i => {
                const tipoVeiculo = i.tipo == "carro" ? "<i class='bi bi-car-front'></i>" : "<i class='bi bi-bicycle'></i>";

                const dataEmissao = i.data_emissao.split("T")[0];
                const dataEmissaoFiltrada = dataEmissao.split("-").reverse().join("/");

                let corCarbono = "";

                switch (i.classe_emissao) {
                    case "verde":
                        corCarbono = "#26aa57";

                        break;
                    case "laranja":
                        corCarbono = "#f2930d";

                        break;
                    case "vermelho":
                        corCarbono = "#dd3c3c";

                        break;
                }

                $(".emissoes").append(`
                    <div class="emissao">
                        <div>
                            <div class="veiculo">
                                <span class="veiculo__icone">
                                    ${tipoVeiculo}
                                </span>

                                <p class="veiculo__tipo">${i.tipo}</p>
                            </div>

                            <div class="distancia">
                                <p class="distancia__label">Distância</p>

                                <p class="distancia__valor">${i.km_rodados} km</p>
                            </div>
                        </div>

                        <div>
                            <p class="data-emissao">${dataEmissaoFiltrada}</p>

                            <div class="carbono">
                                <p class="carbono__label">CO₂ Emitido</p>

                                <p class="carbono__valor" style="color: ${corCarbono};">${i.co2_emitido} kg</p>
                            </div>
                        </div>
                    </div>
                `);

                totalEmissao += Number(i.co2_emitido);
            });

            // Evolução semanal do usuário
            evolucaoUsuario(data, totalEmissao);
        } else {
            $(".inicio").show();
            $(".sem-emissao").show();
            $(".loading").hide();
        } 
    } catch (err) {
        console.log("Erro ao exibir histórico:", err);
    }
}

function evolucaoUsuario(data, totalEmissao) {
    if (data.length >= 2) {
        $(".emissoes").prepend(`
            <div class="card-evolucao">
                <div class="card-evolucao__topo">
                    <div class="card-evolucao__icone"></div>

                    <div>
                        <p class="card-evolucao__valor">${totalEmissao} kg CO₂</p>
                        <p class="card-evolucao__label">Total de emissões registradas</p>
                    </div>
                </div>

                <hr></hr>

                <p class="card-evolucao__mensagem"></p>
            </div>
        `);

        const diferenca = data[0].co2_emitido - data[1].co2_emitido;
        const valorAbs = Math.abs(diferenca.toFixed(1));

        if (diferenca <= -1) {
            $(".card-evolucao__mensagem").text(`Você emitiu ${valorAbs} kg a menos de CO₂ do que na semana passada.`);

            $(".card-evolucao__icone").append(`<i class="bi bi-arrow-up-right-circle bi-evo"></i>`);

            $(".card-evolucao").css({
                "background-color": "#dcf9e7",
                "border": "1px solid #26aa57"
            });

            $(".bi-evo").css({
                "background-color": "#22c35d1a",
                "color": "#26aa57"
            });
        } else if (diferenca > -1 && diferenca < 1) {
            $(".card-evolucao__mensagem").text("Suas emissões ficaram próximas da semana passada.");

            $(".card-evolucao__icone").append(`<i class="bi bi-arrow-repeat bi-evo"></i>`);

            $(".card-evolucao").css({
                "background-color": "#fdeed8",
                "border": "1px solid #f2930d"
            });

            $(".bi-evo").css({
                "background-color": "#f2930d1a",
                "color": "#f2930d"
            });
        } else {
            $(".card-evolucao__mensagem").text(`Você emitiu ${valorAbs} kg a mais de CO₂ do que na semana passada.`);

            $(".card-evolucao__icone").append(`<i class="bi bi-arrow-down-right-circle bi-evo"></i>`);

            $(".card-evolucao").css({
                "background-color": "#f9dcdc",
                "border": "1px solid #dd3c3c"
            });

            $(".bi-evo").css({
                "background-color": "#dd3c3c1a",
                "color": "#dd3c3c"
            });
        }
    }
}
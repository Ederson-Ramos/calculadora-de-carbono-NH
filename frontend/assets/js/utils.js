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
            });
        } else {
            $(".inicio").show();
            $(".sem-emissao").show();
            $(".loading").hide();
        } 
    } catch (err) {
        console.log("Erro ao exibir histórico:", err);
    }
}

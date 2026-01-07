$(document).ready(async() => {
    const idUsuario = sessionStorage.getItem("usuario_id");

    if(idUsuario) {
        $(".form-none").css("display", "none");
        $(".content-under").css("display", "block");
    }

    try {
        const resposta = await fetch(`http://localhost:3000/historico/emissoes?idUsuario=${idUsuario}`);

        const data = await resposta.json();

        if(data.length > 0) {
            $(".sem-emissao").css("display", "none");

            for(let i = 0; i < data.length; i++) {
                const tipoVeiculo = data[i].tipo == "carro" ? "<i class='bi bi-car-front'></i>" : "<i class='bi bi-bicycle'></i>";

                const dataEmissao = data[i].data_emissao.split("T")[0];
                const dataEmissaoFiltrada = dataEmissao.split("-").reverse().join("/");

                let corCarbono = "";

                switch (data[i].classe_emissao) {
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

                                <p class="veiculo__tipo">${data[i].tipo}</p>
                            </div>

                            <div class="distancia">
                                <p class="distancia__label">Distância</p>

                                <p class="distancia__valor">${data[i].km_rodados} km</p>
                            </div>
                        </div>

                        <div>
                            <p class="data-emissao">${dataEmissaoFiltrada}</p>

                            <div class="carbono">
                                <p class="carbono__label">CO₂ Emitido</p>

                                <p class="carbono__valor" style="color: ${corCarbono};">${data[i].co2_emitido} kg</p>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    } catch(err) {
        console.log("Erro ao exibir histórico:", err);
    }
});

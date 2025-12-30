// Esses valores são baseados na media que as pessoas rodam em uma semana (250km / semana) para cada tipo de veiculo.
function classificarEmissao(veiculo, emissao) {
    switch(veiculo) {
        case "carro":
            if(emissao <= 30) {
                return "verde";
            }

            if(emissao <= 45) {
                return "laranja";
            }

            return "vermelho";
        case "moto":
            if(emissao <= 12) {
                return "verde";
            }
            if(emissao <= 22) {
                return "laranja";
            }

            return "vermelho";
        default:
            return "indefinido";
    }
}

module.exports = {classificarEmissao};

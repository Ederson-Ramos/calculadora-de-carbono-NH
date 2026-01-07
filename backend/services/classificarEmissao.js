//Valores baseados na média semanal de emissões de CO₂(kg)
//estimada para veículos a combustão no Brasil

function classificarEmissao(veiculo, emissao) {
    switch(veiculo) {
        case "carro":
            if(emissao <= 30) {
                return "verde";
            }

            if(emissao > 30 && emissao <= 55) {
                return "laranja";
            }

            return "vermelho";
        case "moto":
            if(emissao <= 7) {
                return "verde";
            }
            if(emissao > 7 && emissao <= 12) {
                return "laranja";
            }

            return "vermelho";
        default:
            return "indefinido";
    }
}

module.exports = {classificarEmissao};

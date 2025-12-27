function calculo(veiculo, km) {
    switch(veiculo) {
        case "moto":
            const emissaoMoto = km * 0.09;

            return Number(emissaoMoto.toFixed(2));
        case "carro":
            const emissaoCarro = km * 0.19;

            return Number(emissaoCarro.toFixed(2));
        default:
            return null;
    }
}

module.exports = {calculo}

const calc = require("../services/calculoCarbono");

describe("Calculos Moto", () => {
    it("Calcula corretamente com poucos km", () => {
        expect(calc.calculo("moto", 20)).toBeCloseTo(1.8, 2);
    });

    it("Calcula corretamente com muitos km", () => {
        expect(calc.calculo("moto", 250)).toBeCloseTo(22.5, 2);
    });
});

describe("Calculos Carro", () => {
    it("Calcula corretamente com poucos km", () => {
        expect(calc.calculo("carro", 80)).toBeCloseTo(15.2, 2);
    });

    it("Calcula corretamente com muitos km", () => {
        expect(calc.calculo("carro", 300)).toBeCloseTo(57, 2);
    });
});

describe("Casos Inválidos", () => {
    it("Retorna null para veiculo inválido", () => {
        expect(calc.calculo("bicicleta", 50)).toBeNull();
    });
});

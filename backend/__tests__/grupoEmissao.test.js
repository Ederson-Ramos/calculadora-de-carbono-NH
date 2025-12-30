const calc = require("../services/calculoCarbono");
const classificacao = require("../services/classificarEmissao");

describe("Classificação De Moto", () => {
    it("Classifica corretamente emissão sendo BAIXA em moto", () => {
        const emissao = calc.calculo("moto", 80);

        expect(emissao).toBeCloseTo(7.2, 2);
        expect(classificacao.classificarEmissao("moto", emissao)).toBe("verde");
    });

    it("Classifica corretamente emissão sendo MEDIA em moto", () => {
        const emissao = calc.calculo("moto", 150);

        expect(emissao).toBeCloseTo(13.5, 2);
        expect(classificacao.classificarEmissao("moto", emissao)).toBe("laranja");
    });

    it("Classifica corretamente emissão sendo ALTA em moto", () => {
        const emissao = calc.calculo("moto", 278);

        expect(emissao).toBeCloseTo(25.02, 2);
        expect(classificacao.classificarEmissao("moto", emissao)).toBe("vermelho");
    });
});

describe("Classificação De Carro", () => {
    it("Classifica corretamente emissão sendo BAIXA em carro", () => {
        const emissao = calc.calculo("carro", 120);

        expect(emissao).toBeCloseTo(22.8, 2);
        expect(classificacao.classificarEmissao("carro", emissao)).toBe("verde");
    });

    it("Classifica corretamente emissão sendo MEDIA em carro", () => {
        const emissao = calc.calculo("carro", 200);

        expect(emissao).toBeCloseTo(38, 2);
        expect(classificacao.classificarEmissao("carro", emissao)).toBe("laranja");
    });

    it("Classifica corretamente emissão sendo ALTA em carro", () => {
        const emissao = calc.calculo("carro", 300);

        expect(emissao).toBeCloseTo(57, 2);
        expect(classificacao.classificarEmissao("carro", emissao)).toBe("vermelho");
    });
});

describe("Casos Inválidos", () => {
    it("Retorna indefinido para veiculo inválido", () => {
        const emissao = calc.calculo("avião", 500);

        expect(emissao).toBeNull();
        expect(classificacao.classificarEmissao("avião", emissao)).toBe("indefinido");
    });
});

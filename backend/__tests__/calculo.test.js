const calc = require( "../services/calculo");

it("testando função de calculo", () => {
    const res = calc(4, 2);

    expect(res).toBe(2);
});

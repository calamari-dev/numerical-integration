import { getLegendrePolynomial } from "./getLegendrePolynomial";

describe("getLegendrePolynomial", () => {
  it("3 degree", () => {
    const poly = getLegendrePolynomial(3);
    const coefs = poly.coefs;
    expect(coefs.length).toBe(4);
    expect(coefs[0]).toBeCloseTo(0, 3);
    expect(coefs[1]).toBeCloseTo(-1.5, 3);
    expect(coefs[2]).toBeCloseTo(0, 3);
    expect(coefs[3]).toBeCloseTo(2.5, 3);
  });
});

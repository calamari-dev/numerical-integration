import { GaussLegendre } from "./GaussLegendre";

describe("Gauss-Legendre Rules", () => {
  it("N = 3", () => {
    const gl = new GaussLegendre({ sample: 3 });
    gl.interval = [-3, 1];
    const s = gl.integrate(Math.exp);
    expect(s).toBeCloseTo(2.6651, 3);
  });
});

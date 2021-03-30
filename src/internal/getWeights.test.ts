import { getWeights } from "./getWeights";

describe("getWeights", () => {
  it("Trapezoidal Rule", () => {
    const weights = getWeights([-1, 1], [-1, 1]);
    expect(weights.length).toBe(2);
    expect(weights[0]).toBeCloseTo(1, 6);
    expect(weights[1]).toBeCloseTo(1, 6);
  });

  it("Simpson's Rule", () => {
    const weights = getWeights([-1, 1], [-1, 0, 1]);
    expect(weights.length).toBe(3);
    expect(weights[0]).toBeCloseTo(1 / 3, 3);
    expect(weights[1]).toBeCloseTo(4 / 3, 3);
    expect(weights[2]).toBeCloseTo(1 / 3, 3);
  });

  it("3 points' Gaussian Quadrature", () => {
    const tmp = Math.sqrt(3 / 5);
    const weights = getWeights([-1, 1], [-tmp, 0, tmp]);
    expect(weights.length).toBe(3);
    expect(weights[0]).toBeCloseTo(5 / 9, 3);
    expect(weights[1]).toBeCloseTo(8 / 9, 3);
    expect(weights[2]).toBeCloseTo(5 / 9, 3);
  });
});

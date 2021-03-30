import { NewtonCotes } from "./NewtonCotes";

describe("Newton-Cotes Rules", () => {
  it("Trapezoidal Rules", () => {
    const nc = new NewtonCotes();
    nc.interval = [-3, 1];
    const s = nc.integrate(Math.exp);
    expect(s).toBeCloseTo(5.5361, 3);
  });

  it("Simpson's Rules", () => {
    const nc = new NewtonCotes();
    nc.sample = 3;
    nc.interval = [-3, 1];
    const s = nc.integrate(Math.exp);
    expect(s).toBeCloseTo(2.8263, 3);
  });
});

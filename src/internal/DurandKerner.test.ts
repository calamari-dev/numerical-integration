import { DurandKerner } from "./DurandKerner";
import { Polynomial } from "./Polynomial";

describe("DurandKerner", () => {
  it("Failed To Solve", () => {
    const durandKerner = new DurandKerner({ maxIteration: 2 });
    const poly = new Polynomial(-1, 0, 1);
    const roots = [-100, 100];
    const convereged = durandKerner.getRoots(poly, roots);
    expect(convereged).toBe(false);
  });

  it("Zero", () => {
    const durandKerner = new DurandKerner();
    const zero = new Polynomial();
    const roots = [1, 2, 3, 4];
    const convereged = durandKerner.getRoots(zero, roots);

    expect(convereged).toBe(true);
    expect(roots).toEqual([1, 2, 3, 4]);
  });

  it("Non-zero Constant", () => {
    const durandKerner = new DurandKerner();
    const one = new Polynomial(1);
    const roots = [1, 2, 3, 4];
    const convereged = durandKerner.getRoots(one, roots);

    expect(convereged).toBe(false);
    expect(roots).toEqual([]);
  });

  it("x-2", () => {
    const durandKerner = new DurandKerner();
    const poly = Polynomial.fromRoots(2);
    const roots = [1];
    const convereged = durandKerner.getRoots(poly, roots);

    expect(convereged).toBe(true);
    expect(roots).toEqual([2]);
  });

  it("(x-0.5)(x+0.5)", () => {
    const durandKerner = new DurandKerner();
    const poly = Polynomial.fromRoots(-0.5, 0.5);
    const roots = [-1, 1];
    const convereged = durandKerner.getRoots(poly, roots);
    roots.sort((x, y) => (x < y ? -1 : 1));

    expect(convereged).toBe(true);
    expect(roots.length).toBe(2);
    expect(roots[0]).toBeCloseTo(-0.5, 3);
    expect(roots[1]).toBeCloseTo(0.5, 3);
  });

  it("3 degree's Legendre Polynomial", () => {
    const durandKerner = new DurandKerner();
    const poly = new Polynomial(0, -3, 0, 5);
    const roots = [-1, 0, 1];
    const convereged = durandKerner.getRoots(poly, roots);
    roots.sort((x, y) => (x < y ? -1 : 1));

    const root = Math.sqrt(3 / 5);
    expect(convereged).toBe(true);
    expect(roots.length).toBe(3);
    expect(roots[0]).toBeCloseTo(-root, 3);
    expect(roots[1]).toBeCloseTo(0, 3);
    expect(roots[2]).toBeCloseTo(root, 3);
  });
});

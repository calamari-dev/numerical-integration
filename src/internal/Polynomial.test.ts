import { Polynomial } from "./Polynomial";

describe("Polynomial", () => {
  it("constructor", () => {
    const p1 = new Polynomial();
    expect(p1.coefs).toEqual([0]);
  });

  it("copy", () => {
    const p1 = new Polynomial(1, 2, 3);
    const p2 = Polynomial.copy(p1);
    expect(p2.coefs).toEqual([1, 2, 3]);
  });

  it("fromRoots", () => {
    const p1 = Polynomial.fromRoots();
    const p2 = Polynomial.fromRoots(1);
    const p3 = Polynomial.fromRoots(1, 2, 3);
    expect(p1.coefs).toEqual([0]);
    expect(p2.coefs).toEqual([-1, 1]);
    expect(p3.coefs).toEqual([-6, 11, -6, 1]);
  });

  it("isZero", () => {
    const p1 = new Polynomial(1);
    const p2 = new Polynomial(0);
    expect(Polynomial.isZero(p1)).toBe(false);
    expect(Polynomial.isZero(p2)).toBe(true);
  });

  it("deg", () => {
    const p1 = new Polynomial(0);
    const p2 = new Polynomial(1, 3, 2);
    expect(p1.deg).toBe(-Infinity);
    expect(p2.deg).toBe(2);
  });

  it("setCoef", () => {
    const p1 = new Polynomial(1);
    const p2 = new Polynomial(1, 2, 3);
    p1.setCoef(3, 2);
    p2.setCoef(1, 4);
    expect(p1.coefs).toEqual([1, 0, 0, 2]);
    expect(p2.coefs).toEqual([1, 4, 3]);
  });

  it("add (rhs: number)", () => {
    const lhs = new Polynomial(1, 2);
    lhs.add(3);
    expect(lhs.coefs).toEqual([4, 2]);
  });

  it("add (rhs: Polynomial)", () => {
    const lhs1 = new Polynomial(1, 4, 3, 2);
    const rhs1 = new Polynomial(1, 3, 2);
    lhs1.add(rhs1);
    expect(lhs1.coefs).toEqual([2, 7, 5, 2]);

    const lhs2 = new Polynomial(1, 3, 2);
    const rhs2 = new Polynomial(1, 4, 3, 2);
    lhs2.add(rhs2);
    expect(lhs2.coefs).toEqual([2, 7, 5, 2]);

    const lhs3 = new Polynomial(1, 3, 2);
    const rhs3 = new Polynomial(1, 4, -2);
    lhs3.add(rhs3);
    expect(lhs3.coefs).toEqual([2, 7]);
  });

  it("sub (rhs: number)", () => {
    const lhs = new Polynomial(1, 2);
    lhs.sub(3);
    expect(lhs.coefs).toEqual([-2, 2]);
  });

  it("sub (rhs: Polynomial)", () => {
    const lhs1 = new Polynomial(1, 4, 3, 2);
    const rhs1 = new Polynomial(1, 3, 2);
    lhs1.sub(rhs1);
    expect(lhs1.coefs).toEqual([0, 1, 1, 2]);

    const lhs2 = new Polynomial(1, 3, 2);
    const rhs2 = new Polynomial(1, 4, 3, 2);
    lhs2.sub(rhs2);
    expect(lhs2.coefs).toEqual([0, -1, -1, -2]);

    const lhs3 = new Polynomial(1, 3, 2);
    const rhs3 = new Polynomial(1, 4, 2);
    lhs3.sub(rhs3);
    expect(lhs3.coefs).toEqual([0, -1]);
  });

  it("mul (rhs: number)", () => {
    const lhs = new Polynomial(1, 2);
    lhs.mul(2);
    expect(lhs.coefs).toEqual([2, 4]);
    lhs.mul(0);
    expect(lhs.coefs).toEqual([0]);
  });

  it("mul (rhs: Polynomial)", () => {
    const lhs1 = new Polynomial(1, 2);
    const rhs1 = new Polynomial(0);
    lhs1.mul(rhs1);
    expect(Polynomial.isZero(lhs1));

    const lhs2 = new Polynomial(1, 4, 3, 2);
    const rhs2 = new Polynomial(1, 3, 2);
    lhs2.mul(rhs2);
    expect(lhs2.coefs).toEqual([1, 7, 17, 19, 12, 4]);

    const lhs3 = new Polynomial(1, 3, 2);
    const rhs3 = new Polynomial(1, 4, 3, 2);
    lhs3.mul(rhs3);
    expect(lhs3.coefs).toEqual([1, 7, 17, 19, 12, 4]);
  });

  it("at", () => {
    const p1 = new Polynomial(1);
    const p2 = new Polynomial(1, 2, 3);
    expect(p1.at(2)).toBe(1);
    expect(p2.at(2)).toBe(17);
  });

  it("differentiate", () => {
    const p1 = new Polynomial(2);
    const p2 = new Polynomial(1, 2, 3);
    p1.differentiate();
    p2.differentiate();
    expect(p1.coefs).toEqual([0]);
    expect(p2.coefs).toEqual([2, 6]);
  });

  it("integrate", () => {
    const p1 = new Polynomial(0);
    const p2 = new Polynomial(1, 2, 3);
    p1.integrate();
    p2.integrate();
    expect(p1.coefs).toEqual([0]);
    expect(p2.coefs).toEqual([0, 1, 1, 1]);
  });
});

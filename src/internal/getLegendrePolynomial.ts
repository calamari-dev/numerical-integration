import { Polynomial } from "./Polynomial";

const x = new Polynomial(0, 1);

export const getLegendrePolynomial = (deg: number): Polynomial => {
  switch (deg) {
    case 0: {
      return new Polynomial(1);
    }
    case 1: {
      return new Polynomial(0, 1);
    }
  }

  let p0 = new Polynomial(1);
  let p1 = new Polynomial(0, 1);

  for (let i = 2; i <= deg; i++) {
    const p2 = Polynomial.copy(p1);
    p2.mul(x).mul(2 * i - 1);
    p0.mul(i - 1);
    p2.sub(p0).mul(1 / i);
    [p1, p0] = [p2, p1];
  }

  return p1;
};

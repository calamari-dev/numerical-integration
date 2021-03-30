export class Polynomial {
  private _coefs: number[];

  constructor(...coefs: number[]) {
    this._coefs = coefs.length === 0 ? [0] : coefs;
  }

  static copy(from: Polynomial): Polynomial {
    const poly = new Polynomial(...from.coefs);
    return poly;
  }

  static fromRoots(...roots: number[]): Polynomial {
    const coefs: number[] = Array(roots.length + 1).fill(0);

    if (roots.length === 0) {
      return new Polynomial();
    }

    coefs[1] = 1;
    coefs[0] = -roots[0];

    for (let i = 1; i < roots.length; i++) {
      coefs[i + 1] = 1;

      for (let deg = i; deg > 0; deg--) {
        coefs[deg] *= -roots[i];
        coefs[deg] += coefs[deg - 1];
      }

      coefs[0] *= -roots[i];
    }

    return new Polynomial(...coefs);
  }

  static isZero(poly: Polynomial): boolean {
    const coefs = poly.coefs;
    return coefs.length === 1 && coefs[0] === 0;
  }

  get deg(): number {
    return Polynomial.isZero(this) ? -Infinity : this._coefs.length - 1;
  }

  get coefs(): readonly number[] {
    return this._coefs;
  }

  setCoef(deg: number, value: number): Polynomial {
    const coefs = this._coefs;

    if (coefs.length >= deg) {
      coefs[deg] = value;
      return this;
    }

    for (let i = coefs.length; i < deg; i++) {
      coefs[i] = 0;
    }

    coefs[deg] = value;
    return this;
  }

  add(rhs: Polynomial | number): Polynomial {
    if (typeof rhs === "number") {
      this._coefs[0] += rhs;
      return this;
    }

    const lcoefs = this._coefs;
    const rcoefs = rhs.coefs;

    for (let deg = lcoefs.length; deg < rcoefs.length; deg++) {
      lcoefs.push(0);
    }

    for (let deg = 0; deg < rcoefs.length; deg++) {
      lcoefs[deg] += rcoefs[deg];
    }

    for (let deg = lcoefs.length - 1; lcoefs[deg] === 0; deg--) {
      lcoefs.pop();
    }

    return this;
  }

  sub(rhs: Polynomial | number): Polynomial {
    if (typeof rhs === "number") {
      this._coefs[0] -= rhs;
      return this;
    }

    const lcoefs = this._coefs;
    const rcoefs = rhs.coefs;

    for (let deg = lcoefs.length; deg < rcoefs.length; deg++) {
      lcoefs.push(0);
    }

    for (let deg = 0; deg < rcoefs.length; deg++) {
      lcoefs[deg] -= rcoefs[deg];
    }

    for (let deg = lcoefs.length - 1; lcoefs[deg] === 0; deg--) {
      lcoefs.pop();
    }

    return this;
  }

  mul(rhs: Polynomial | number): Polynomial {
    if (rhs === 0) {
      this._coefs.length = 1;
      this._coefs[0] = 0;
      return this;
    }

    if (typeof rhs === "number") {
      const lcoefs = this._coefs;

      for (let deg = 0; deg < lcoefs.length; deg++) {
        lcoefs[deg] *= rhs;
      }

      return this;
    }

    const lcoefs = this._coefs;
    const rcoefs = rhs.coefs;

    if (Polynomial.isZero(this) || Polynomial.isZero(rhs)) {
      this._coefs.length = 1;
      this._coefs[0] = 0;
      return this;
    }

    for (let i = 1; i < rcoefs.length; i++) {
      lcoefs.push(0);
    }

    for (let ldeg = lcoefs.length - 1; ldeg >= 0; ldeg--) {
      lcoefs[ldeg] *= rcoefs[0];

      for (let rdeg = 1; rdeg < rcoefs.length && rdeg <= ldeg; rdeg++) {
        lcoefs[ldeg] += rcoefs[rdeg] * lcoefs[ldeg - rdeg];
      }
    }

    return this;
  }

  at(x: number): number {
    const coefs = this._coefs;
    let y = coefs[coefs.length - 1];

    if (coefs.length === 1) {
      return y;
    }

    for (let deg = coefs.length - 2; deg >= 0; deg--) {
      y *= x;
      y += coefs[deg];
    }

    return y;
  }

  integrate(): Polynomial {
    const coefs = this._coefs;

    if (coefs.length === 1 && coefs[0] === 0) {
      return this;
    }

    for (let deg = coefs.length; deg > 0; deg--) {
      coefs[deg] = coefs[deg - 1] / deg;
    }

    coefs[0] = 0;
    return this;
  }

  differentiate(): Polynomial {
    const coefs = this._coefs;

    if (coefs.length === 1) {
      coefs[0] = 0;
      return this;
    }

    for (let deg = 0; deg < coefs.length; deg++) {
      coefs[deg] = coefs[deg + 1] * (deg + 1);
    }

    coefs.length -= 1;
    return this;
  }
}

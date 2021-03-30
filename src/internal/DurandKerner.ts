import { Polynomial } from "./Polynomial";

interface Config {
  convergence?: number;
  maxIteration?: number;
}

export class DurandKerner {
  convergence: number;
  maxIteration: number;

  constructor({ convergence, maxIteration }: Config = {}) {
    this.convergence = convergence ?? 0.001;
    this.maxIteration = maxIteration ?? 1000;
  }

  getRoots(poly: Polynomial, roots: number[]): boolean {
    const coefs = poly.coefs;
    const deg = poly.deg;
    const convergence = this.convergence;
    const maxIteration = this.maxIteration;

    switch (deg) {
      case -Infinity: {
        return true;
      }

      case 0: {
        roots.length = 0;
        return false;
      }

      case 1: {
        roots.length = 1;
        roots[0] = -coefs[0] / coefs[1];
        return true;
      }
    }

    if (roots.length !== deg) {
      roots.length = deg;

      for (let i = 0; i < deg; i++) {
        roots[i] = -1 + (2 * i) / (deg - 1);
      }
    }

    const prevs = [...roots];

    for (let i = 0; i < maxIteration; i++) {
      let convereged = true;

      for (let i = 0; i < deg; i++) {
        let denom = coefs[deg];

        for (let k = 0; k < deg; k++) {
          if (k !== i) {
            denom *= prevs[i] - prevs[k];
          }
        }

        const delta = -poly.at(prevs[i]) / denom;
        roots[i] = prevs[i] + delta;

        if (Math.abs(delta) > convergence) {
          convereged = false;
        }
      }

      if (convereged) {
        return true;
      }

      for (let i = 0; i < deg; i++) {
        prevs[i] = roots[i];
      }
    }

    return false;
  }
}

import { DurandKerner } from "./internal/DurandKerner";
import { getLegendrePolynomial } from "./internal/getLegendrePolynomial";
import { getWeights } from "./internal/getWeights";

interface Config {
  sample?: number;
  interval?: [number, number];
}

const durandKerner = new DurandKerner({
  convergence: 1e-6,
  maxIteration: 1000,
});

export class GaussLegendre {
  public interval: [number, number];
  private samples: number[];
  private weights: number[];

  constructor({ sample = 2, interval = [-1, 1] }: Config = {}) {
    const w1 = Math.sqrt(1 / 3);
    this.interval = interval;
    this.samples = [-w1, w1];
    this.weights = [1, 1];

    if (sample !== 2) {
      this.sample = sample;
    }
  }

  get sample(): number {
    return this.samples.length;
  }

  set sample(sample: number) {
    if (this.samples.length === sample) {
      return;
    }

    const legendre = getLegendrePolynomial(sample);
    const roots = this.samples;
    roots.length = sample;

    for (let i = 0; i < sample; i++) {
      roots[i] = -1 + (2 * i) / (sample - 1);
    }

    durandKerner.getRoots(legendre, roots);
    this.weights = getWeights([-1, 1], roots);
  }

  integrate(fn: (x: number) => number): number {
    const [from, by] = this.interval;
    const samples = this.samples;
    const weights = this.weights;
    let sum = 0;

    for (let i = 0; i < samples.length; i++) {
      const r = 0.5 * (samples[i] + 1);
      const x = (1 - r) * from + r * by;
      sum += weights[i] * fn(x);
    }

    sum *= 0.5 * (by - from);
    return sum;
  }
}

import { Polynomial } from "./Polynomial";

export const getWeights = (
  interval: [number, number],
  samples: number[]
): number[] => {
  const weights: number[] = [];
  const size = samples.length;

  for (let i = 0; i < size; i++) {
    const roots = [...samples];
    roots.splice(i, 1);
    const poly = Polynomial.fromRoots(...roots);
    const denom = poly.at(samples[i]);
    poly.integrate();
    weights[i] = (poly.at(interval[1]) - poly.at(interval[0])) / denom;
  }

  return weights;
};

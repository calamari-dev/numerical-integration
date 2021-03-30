import "tslib";
import type { NewtonCotes } from "./NewtonCotes";
export { NewtonCotes } from "./NewtonCotes";
export { GaussLegendre } from "./GaussLegendre";

if (process.env.NODE_ENV === "development") {
  const { NewtonCotes } = require("./NewtonCotes");
  const newtonCotes: NewtonCotes = new NewtonCotes({ sample: 4 });
  const approx = newtonCotes.integrate(Math.exp);
  console.log(approx);
}

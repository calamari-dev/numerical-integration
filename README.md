# numerical-integration

This is an implementation of numerical-integration, especially (closed) newton-cotes rules and Gauss-Legendre rules.

## Examples

### Newton-Cotes Rules

```typescript
import { NewtonCotes } from "numerical-integration";
const nc = new NewtonCotes(); // By default, we set sample = 2, interval = [-1, 1].
nc.sample = 3; // Simpson's Rules.
nc.interval = [-3, 1];
const s = nc.integrate(Math.exp);
```

### Gauss-Legendre Rules

```typescript
import { GaussLegendre } from "numerical-integration";
const gl = new GaussLegendre({ sample: 3 }); // By default, we set interval = [-1, 1].
gl.interval = [-3, 1];
const s = gl.integrate(Math.exp);
```

## How does this work?

This program consists of 2 parts: getting Legendre polynomial's roots and polynomial integration. I used the Durand-Kerner method and a Legendre polynomial's difference equation to solve the first part. The second part is only an algebraic operation.
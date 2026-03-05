# PredictionResult Explained (Rendering + Probability Bars)

The purpose of `PredictionResult` is:

- display the prediction label (low risk / high risk)
- display probabilities in a visual way
- optionally show the inputs used

This component is intentionally “dumb”:

- it does not call the API
- it does not manage form state
- it only displays data it receives

---

## 1. Props

```ts
type Props = {
  result: PredictionResponse;
};
```

This means:

- the parent gives us the backend result
- we render it

---

## 2. Extracting values

```ts
const p0 = result.probability.class_0;
const p1 = result.probability.class_1;
```

This is just pulling out values for readability.

Instead of writing:

- `result.probability.class_0` everywhere

we store it in a shorter variable.

---

## 3. Converting numeric prediction into a human label

```ts
const label =
  result.prediction === 1 ? "Higher default risk" : "Lower default risk";
```

The model returns:

- 0 or 1

But humans prefer:

- “Higher risk” / “Lower risk”

So we translate it.

This is a common UI pattern:

> model output → user-friendly text

---

## 4. Probability bars

We used a simple progress bar approach:

- outer div is the “background”
- inner div width depends on probability

Example:

```ts
<div className="h-3 rounded bg-gray-100 overflow-hidden">
  <div className="h-3 bg-gray-900" style={{ width: `${p0 * 100}%` }} />
</div>
```

If `p0 = 0.96`:

- `p0 * 100` = 96
- width becomes `"96%"`

So the bar fills up visually based on the probability.

Why this is good:

- no chart library yet
- easy to understand
- still looks like a “dashboard”

---

## 5. Converting probabilities to percentages

```ts
{(p0 * 100).toFixed(2)}%
```

`p0` is between 0 and 1.
To display nicely:

- multiply by 100
- keep 2 decimal places

---

## 6. Showing inputs used (helpful for trust)

We used a `<details>` element:

```ts
<details>
  <summary>Inputs used</summary>
  <pre>
    {JSON.stringify(result.inputs, null, 2)}
  </pre>
</details>
```

Why this matters:

- users can see what the model received
- helps debug if a value was wrong
- builds trust (it isn’t a black box)

`JSON.stringify(..., null, 2)` formats it nicely with indentation.

## Summary

PredictionResult is a “display-only” component:

- it takes `result`
- turns numbers into readable labels
- visualizes probabilities with simple bars
- optionally shows the raw input values

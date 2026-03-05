# DashboardPage Explained (Wiring Form + Result)

DashboardPage is the “glue” layer.

Its job is to:

- hold the shared state (the latest prediction result)
- render the form
- render the result panel

This follows a key React idea:

> Put shared state in the closest common parent.

---

## 1. Why DashboardPage owns the result state

We did:

```ts
const [result, setResult] = useState<PredictionResponse | null>(null);
```

Why here?
Because:

- PredictionForm needs to produce the result
- PredictionResult needs to consume the result

So the “shared state” should live in the parent that contains both.

If the state lived in PredictionForm:

- PredictionResult wouldn’t know about it

If the state lived in PredictionResult:

- PredictionForm couldn’t update it

So DashboardPage is the correct place.

---

## 2. How the form sends results up to the parent

We render:

```ts
<PredictionForm onResult={setResult} />
```

This is important:

- setResult is a React state setter function.
- It matches the type (result: PredictionResponse) => void.
- So we pass it directly as onResult.

Meaning:
When PredictionForm finishes, it calls:

```ts
onResult(result);
```

And because `onResult` is `setResult`,
DashboardPage updates its `result` state.

This is called:

> “lifting state up”

The form “lifts” the result to the parent.

---

## 3. Conditional rendering: show result only when it exists

We wrote:

```ts
{result ? (
  <PredictionResult result={result} />
) : (
  <div>Submit the form to see prediction results here.</div>
)}
```

Why?
Because at the start:

- result is null (we haven’t predicted yet)

So we show a placeholder.

After prediction:

- result becomes a real object
- React re-renders
- now we show PredictionResult

This is a simple and common pattern:

> If we have data, show the data component. Otherwise show empty state.

---

## 4. Layout reason (why grid)

We used:

```ts
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
```

Meaning:

- on small screens: 1 column (stacked)
- on large screens: 2 columns (form left, result right)

This makes it responsive without extra work.

---

## Summary: full page flow

1. DashboardPage starts with result = null
2. user fills form and submits
3. PredictionForm calls API
4. PredictionForm calls onResult(result)
5. DashboardPage updates result
6. DashboardPage re-renders
7. PredictionResult renders with the new data

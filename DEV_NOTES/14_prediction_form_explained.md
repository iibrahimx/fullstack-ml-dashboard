# PredictionForm Explained (State + Form Flow)

This note explains how `PredictionForm` works in simple terms.

The purpose of `PredictionForm` is:

1. collect user inputs
2. keep them in React state
3. submit them to the backend
4. send the backend result back to the parent component (`DashboardPage`)

---

## 1. The props: why `onResult` exists

In the form component we used:

```ts
type PredictionFormProps = {
  onResult: (result: PredictionResponse) => void;
};
```

This is destructuring props:

- Instead of writing props.onResult, we directly grab onResult.

---

## 2. initialForm: why we keep a default object

```ts
const initialForm: PredictionInput = {
  monthly_income: 0,
  monthly_expense: 0,
  age: 0,
  has_smartphone: 1,
  has_wallet: 1,
  avg_wallet_balance: 0,
  on_time_payment_ratio: 0.8,
  num_loans_taken: 0,
};
```

Why this is useful:

- React state needs an initial value
- this matches the backend fields exactly
- it also acts like a “schema” for what the form must contain

So even before the user types anything:

- `form` already has all required keys
- you won’t accidentally submit missing fields

---

## 3. The state variables (this is the core concept)

We used three state variables:

```ts
const [form, setForm] = useState<PredictionInput>(initialForm);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### A. `form`

- holds the current values the user is typing
- this is the “single source of truth” for the form

### B. `loading`

- tracks whether we are waiting for the backend response
- used to disable the button and show “Predicting…”

### C. `error`

- stores an error message if API call fails
- if there’s no error, it is `null`

Think of state as:

> “Memory for the component.”

Any time state changes, React re-renders the UI so the screen matches the latest values.

---

## 4. Controlled inputs: the reason form state matters

Example:

```ts
<input
  type="number"
  value={form.monthly_income}
  onChange={(e) => updateField("monthly_income", Number(e.target.value))}
/>
```

This is called a controlled input because:

- the input’s value comes from React state (`form.monthly_income`)
- when you type, it calls `onChange`
- `onChange` updates state
- state updates cause re-render
- the input displays the updated state

So the input is “controlled” by React, not by the browser.

Why we like this:

- we always know the current value of the form
- we can validate, reset, or submit easily
- we can send `form` directly to the backend

---

## 5. Why we use `Number(...)`

HTML input values come as strings.

So even if you type `27`, the value is `"27"`.

But our backend expects integers/floats.

So we do:

```ts
Number(e.target.value);
```

That ensures:

- values in state are numbers
- JSON sent to Django is numeric
- Django doesn’t have to guess types

We already learned this lesson on the backend too (casting types).

---

## 6. updateField: the clean way to update one field

```ts
function updateField<K extends keyof PredictionInput>(
  key: K,
  value: PredictionInput[K],
) {
  setForm((prev) => ({ ...prev, [key]: value }));
}
```

This function looks scary, but the idea is simple:
`key` is the field name we want to change (like "age")

- `value` is the new value for that field
- we update only that one field while keeping the rest the same

The important part:

```ts
setForm((prev) => ({ ...prev, [key]: value }));
```

- `prev` is the old form state
- `{ ...prev }` copies all old fields
  `[key]: value` overrides one field

This is the safe way because React state should be treated as immutable:

- don’t mutate the old object
- create a new object

---

## 7. Submitting the form

```ts
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    const result = await predictLoanRisk(form);
    onResult(result);
  } catch (err) {
    setError("Could not get prediction. Check backend is running.");
  } finally {
    setLoading(false);
  }
}
```

### Why `e.preventDefault()`?

Without it, the browser will refresh the page on submit.
We don’t want that in a React app.

### Why reset error before request?

Because if the last request failed, we don’t want the old error message showing during a new attempt.

### Why set loading true before request?

So UI can show:

- disabled button
- “Predicting...” text

### try / catch / finally logic:

- `try`: if request works
- `catch`: if request fails (server down, CORS, network)
- `finally`: runs no matter what, used to set loading back to false

### Most important part:

```ts
const result = await predictLoanRisk(form);
onResult(result);
```

- call backend
- get PredictionResponse
- send to parent via onResult

The form does not store the result.
That’s the parent’s job.

---

## 8. Rendering error + disabling button

```ts
{error && <p>{error}</p>}
```

This means:

- only show error UI if error is not null

And:

```ts
<button disabled={loading}>
  {loading ? "Predicting..." : "Predict risk"}
</button>
```

So the user can’t spam submit while request is still running.

---

## Summary: the full flow

1. inputs show values from `form`
2. user types → `onChange` → `updateField` → state updates
3. submit → `handleSubmit` runs
4. API call → `predictLoanRisk(form)`
5. success → `onResult(result)` sends result to DashboardPage
6. DashboardPage shows PredictionResult

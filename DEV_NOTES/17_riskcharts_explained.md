# RiskCharts Explained (History → Chart Data → Recharts)

This note explains the `RiskCharts` component in a simple way:

- what problem it solves
- how it turns prediction history into chart-friendly data
- how Line/Bar/Pie charts work with the data
- why each small decision was made

---

## 1. What RiskCharts is supposed to do

When you make a prediction, the backend returns something like:

- `prediction` (0 or 1)
- `probability` (`class_0` and `class_1`)
- `inputs` (the values you sent)

On the dashboard we keep a `history` array, so instead of one result, we now have:

- `history[0]` → prediction #1
- `history[1]` → prediction #2
- `history[2]` → prediction #3
- ...

`RiskCharts` takes that history and shows it visually:

- Line chart: risk over time (per submission)
- Bar chart: risk per submission
- Pie chart: split of probabilities for the latest submission

---

## 2. The Props (what RiskCharts receives)

```ts
type Props = {
  history: PredictionResponse[];
};
```

Meaning:

- The parent (DashboardPage) owns the history state
- RiskCharts only displays it
- RiskCharts does not call the API and does not update history

This keeps components clean and reusable.

---

## 3. The guard: why we return null when history is small

```ts
if (history.length < 2) return null;
```

Why:

- With only 1 prediction, charts don’t really show “trends”
- It also prevents edge cases like trying to read the "last item" too early

Returning `null` means:

- “Render nothing”
- (It is not an error; it’s a normal React pattern)

---

## 4. Turning history into chartData (the most important idea)

Recharts expects a simple array of objects like:

```ts
[
  { attempt: 1, risk: 0.2 },
  { attempt: 2, risk: 0.65 },
];
```

But our `history` items are bigger objects with nested structure.

So we transform them:

```ts
const chartData = history.map((item, index) => {
  const risk = Number(item.probability.class_1);
  return {
    attempt: index + 1,
    risk,
  };
});
```

### What `map` is doing here

- `map` loops through every element in history
- for each element, we create a new object (a “chart point”)
- the result is a new array with the same length

#### Why `attempt: index + 1`

`index` starts from 0, but humans count from 1.
So we make attempt numbers:

- 1, 2, 3, 4...

This becomes the X-axis value.

### Why `risk = class_1`

Our model is binary classification:

- `class_0` → probability of NOT defaulting
- `class_1` → probability of defaulting (risk)

So plotting `class_1` is basically plotting:

> “How risky is this user?”

### Why `Number(...)`

Even though values usually come as numbers already, using `Number(...)` makes it explicit:

- ensures it’s numeric for charts
- avoids weird string/number issues later

---

## 5. Creating pieData (latest prediction split)

Pie chart is not “over time”.
It’s a snapshot of the latest prediction’s probabilities.

So we pick the last result:

```ts
const last = history[history.length - 1];
```

Then format it into pie data:

```ts
const pieData = [
  { name: "No default (class 0)", value: Number(last.probability.class_0) },
  { name: "Default (class 1)", value: Number(last.probability.class_1) },
];
```

Now the pie has two slices:

- how much probability goes to class_0
- how much probability goes to class_1

---

## 6. toPercent: why we made a helper function

The model gives probabilities as decimals:

- 0.73 means 73%

UI is clearer in percentages, so we made:

```ts
function toPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}
```

What it does:

- multiply by 100
- keep 1 decimal place
- return a nice string like "73.2%"

We reuse this function in:

- Y-axis ticks
- tooltips
- pie labels

This avoids repeating the same formatting code everywhere.

---

## 7. Line chart: how Recharts reads our data

Line chart:

```ts
<LineChart width={520} height={260} data={chartData}>
  <XAxis dataKey="attempt" />
  <YAxis domain={[0, 1]} tickFormatter={toPercent} />
  <Line dataKey="risk" />
</LineChart>
```

Key idea: `dataKey`

- `XAxis dataKey="attempt"` means:
  “Use attempt from each chartData object for the X axis.”
- `Line dataKey="risk"` means:
  “Use `risk` from each chartData object for the line’s Y values.”

So if chartData is:

```ts
{ attempt: 2, risk: 0.65 }
```

Then that point is plotted at:

- x = 2
- y = 0.65

### Why `domain={[0, 1]}`

Risk is a probability, so it must be between 0 and 1.
This keeps the Y-axis stable.

### Why we added `CartesianGrid`

It makes charts easier to read.

### Why `isAnimationActive={false}`

Animations can sometimes cause weird visual glitches or extra re-renders.
Turning it off keeps it stable and simple.

---

## 8. Bar chart: same data, different shape

Bar chart uses the same chartData:

```ts
<BarChart data={chartData}>
  <XAxis dataKey="attempt" />
  <YAxis domain={[0, 1]} tickFormatter={toPercent} />
  <Bar dataKey="risk" />
</BarChart>
```

Same dataKey rules:

- X axis uses attempt
- bars use risk

Line chart shows trend smoothly.
Bar chart makes each submission easier to compare.

---

## 9. Pie chart: snapshot of the latest probabilities

Pie uses pieData (only two items):

```ts
<Pie data={pieData} dataKey="value" nameKey="name" />
```

Meaning:

- `value` determines slice size
- `name` is label text

We also used:

```ts
label={(entry) => `${entry.name}: ${toPercent(entry.value)}`}
```

This builds labels like:

- "Default (class 1): 34.1%"

---

## 10. Why charts are fixed-size (520x260)

We used fixed chart sizes:

```ts
width={520} height={260}
```

Because:

- chart libraries sometimes crash when they can’t measure container size reliably
- fixed size is predictable and stable
- later we can reintroduce responsiveness once everything is solid

We still make it usable on small screens by wrapping in:

```ts
<div className="overflow-x-auto">
```

Meaning:

- on small screens, you can scroll sideways instead of breaking layout

---

## Summary (mental model to remember)

1. `history` is big, nested data
2. charts need small, flat arrays
3. we transform with `map` → `chartData`
4. line/bar charts read `attempt` and `risk` using `dataKey`
5. pie chart uses `pieData` from the latest result
6. formatting helpers (toPercent) keep UI consistent

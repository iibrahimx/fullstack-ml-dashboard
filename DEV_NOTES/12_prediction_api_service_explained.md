# Understanding `predictionApi.ts` (Reasoning + Logic)

This note explains the thinking behind the frontend API service function:

`predictLoanRisk(data)`

---

## The real problem this file solves

In our app, React needs to talk to Django to get a prediction.

That means we need a safe and repeatable way to:

1. send user inputs (features) to the backend
2. handle success vs failure responses
3. return clean data back to the UI code

The service layer exists so our UI components stay focused on UI concerns (forms, loading state, displaying results) while the service handles HTTP details.

---

## Why we use a “service layer” instead of fetch inside components

If we write `fetch(...)` directly inside components, we end up repeating the same code in many places:

- URL strings
- HTTP method (POST)
- headers
- JSON stringify
- error handling
- JSON parsing

This quickly becomes messy.

A service function gives us:

- one single place to change the API URL
- one single place to handle errors consistently
- simple, clean component code

Instead of a component doing everything, the component can do:

`predictLoanRisk(formData)`

---

## The code we wrote (for reference)

```ts
import { PredictionInput, PredictionResponse } from "../types/prediction";

const API_URL = "http://127.0.0.1:8000/api/predict/";

export async function predictLoanRisk(
  data: PredictionInput,
): Promise<PredictionResponse> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Prediction request failed");
  }

  return response.json();
}
```

---

## Breaking the code down

### 1. Importing types

```ts
import { PredictionInput, PredictionResponse } from "../types/prediction";
```

Why?

- We want TypeScript to enforce the “contract” between frontend and backend.
- The backend expects certain keys (monthly_income, age, etc.)
- The backend returns a known structure (prediction + probability + inputs)

So these types protect us from mistakes like:

- forgetting a required field
- using the wrong field name
- expecting a response field that doesn’t exist

This is similar to how the backend uses validation to protect itself from bad input.

---

### 2. API_URL constant

```ts
const API_URL = "http://127.0.0.1:8000/api/predict/";
```

Why?

- It centralizes the endpoint location.
- If the endpoint changes later, we change it in one place.

It also makes code easier to read:

- `fetch(API_URL, ...)` is clearer than repeating the string everywhere.

It could be improved by using environment variables (like `.env`) so dev and production URLs can differ without code changes.

---

### 3. The async function signature

```ts
export async function predictLoanRisk(
  data: PredictionInput,
): Promise<PredictionResponse>;
```

Why async?

- HTTP requests take time.
- JavaScript handles waiting using Promises.
- `async/await` is the cleanest way to write “wait for the result”.

Why `data: PredictionInput`?

- We are saying: “This function only accepts input that matches the expected model features.”
  -That keeps our UI consistent with the backend and model.

Why `Promise<PredictionResponse>`?

- The function returns a Promise because it’s async.
- It resolves to the exact response structure the backend returns.
- So when we use it in React, TypeScript knows what fields exist (prediction, probability, inputs).

---

### 4. Calling fetch

```ts
const response = await fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
```

This is the actual HTTP request.

Why POST?

- We are sending data to be processed.
- Prediction is not a “static resource”, it’s a computation based on input.

Why headers?

- `Content-Type: application/json` tells Django:
  “I am sending JSON.”

Without it, Django/DRF may not parse the body as JSON.

Why `JSON.stringify(data)`?

- `fetch` sends strings over HTTP.
  Our form data is a JavaScript object.
  So we convert it into JSON text.

This matches what we tested earlier with curl.

---

### 5. Checking response.ok

```ts
if (!response.ok) {
  throw new Error("Prediction request failed");
}
```

This is a very important piece of reasoning.

`fetch` does NOT automatically throw an error on HTTP 400/500.

So even if Django returns:

- 400 Bad Request
- 500 Server Error

`fetch` still “succeeds” at the network level and gives you a `response`.

So we manually check:

- if status is in the 200–299 range (`response.ok` is true)
- otherwise, treat it as an error

Why throw?

- Throwing forces the caller (React component) to handle it using try/catch.
- This is cleaner than returning weird error objects.

Later, we can improve the error message by reading the response JSON, but this simple version is perfect for learning and building.

---

### 6. Returning JSON

```ts
return response.json();
```

Why?

- The backend responds with JSON.
- `response.json()` parses the JSON text into a JavaScript object.

Also, this matches our return type:
`PredictionResponse`

So React will receive an object like:

- prediction
- probability
- inputs

---

Fetch vs Axios — is fetch “better”?

It’s not really “better”. It’s mostly a choice and depends on the team/project.

Why fetch is great here

- It’s built into the browser (no extra dependency)
- Works perfectly for simple requests
- Keeps the project lightweight
- Good for learning because you understand the HTTP basics

Why some teams prefer Axios
Axios adds convenience features:

- automatic JSON parsing in some cases
- better defaults for timeouts
- request/response interceptors (useful for auth tokens)
- easier progress tracking for uploads
- consistent behavior across older environments

Our decision here
We use `fetch` because:

- our API calls are simple (just POST JSON)
- we don’t need advanced features yet
- fewer dependencies = less confusion while learning

If later we add authentication, token refresh, or many endpoints, Axios can become more attractive — but it’s not mandatory.

---

The reusable thinking you should keep

Whenever you build a frontend service for an API:

1. define the input shape (types)
2. define the response shape (types)
3. centralize the endpoint URL
4. make the function async
5. send JSON with headers
6. check response.ok
7. return parsed JSON
8. let UI handle errors cleanly

That’s the same mindset as building backend endpoints:

- strict contracts
- validation
- predictable behavior

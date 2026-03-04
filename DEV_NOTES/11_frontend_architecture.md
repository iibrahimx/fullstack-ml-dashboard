# Frontend Architecture for ML Dashboard

The frontend is responsible for collecting user inputs, sending them to the backend API, and displaying prediction results.

We separated the frontend into logical layers:

## Components

`components/`
Reusable UI elements.

Examples:

- `PredictionForm.tsx`
- `PredictionResult.tsx`

## Pages

`pages/`
Top-level screens of the application.

Example:

- `DashboardPage.tsx`

## Services

`services/`
Handles API communication.

Instead of calling fetch inside components, we created a service function:
`predictLoanRisk()` in `predictionApi.ts`

This keeps UI code clean and reusable.

## Types

`types/`
Defines the data structures returned by the backend.

Example:
PredictionInput
PredictionResponse

Using TypeScript interfaces ensures that the frontend matches the backend API contract.

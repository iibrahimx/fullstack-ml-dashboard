# Prediction UI Flow (React → API → Result)

## What we built

A simple dashboard page with:

- a form to collect inputs
- an API call to Django
- a result panel showing prediction + probabilities

## Key idea: separation of concerns

- components/PredictionForm:
  - manages form state
  - sends request
  - reports the result to parent via onResult
- components/PredictionResult:
  - purely displays the returned result
- pages/DashboardPage:
  - holds the result state
  - arranges the layout

## Why this structure is helpful

- The form can be reused elsewhere
- The result component stays simple
- The page is responsible for wiring things together

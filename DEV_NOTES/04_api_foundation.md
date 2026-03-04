# API Foundation Notes

## What we added

- Enabled Django REST Framework (DRF) so we can easily return JSON responses.
- Enabled CORS so a separate frontend (React) can call our backend during development.
- Created two starter endpoints:
  - GET /api/health/ → quick check that backend is running
  - GET /api/features/ → placeholder for model input fields (it’ll be filled later)

## Why we added a health endpoint

It’s a small “confidence check”.
Before building complex prediction logic, we confirm:

- URLs are wired correctly
- the server returns JSON
- our API app is connected to the project

## Why we added a features endpoint early

Later the frontend needs to know what input fields to show.
Instead of hardcoding inputs in React, we can let the backend describe them.
This makes the frontend easier to change if the model features change.

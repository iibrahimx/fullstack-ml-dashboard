# Serving the ML Model in Django

## Goal

Expose the trained ML pipeline through an API endpoint so the frontend can request predictions.

## What we added

- backend/model_artifacts/ (local model storage)
- api/ml_model.py (loads the model once and reuses it)
- POST /api/predict/ endpoint

## Why we load the model once

Loading a joblib file on every request is slow.
We load it once and keep it in memory for faster predictions.

## What /api/predict/ does

1. Receives JSON input from the client
2. Validates required fields
3. Converts input types (int/float)
4. Builds a 1-row pandas DataFrame
5. Calls:
   - predict()
   - predict_proba()
6. Returns prediction + probabilities as JSON

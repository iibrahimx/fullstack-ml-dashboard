# Backend Setup Notes

## What we did

1. Created and activated a Python virtual environment for the backend.
2. Installed core backend packages:
   - Django (web framework)
   - Django REST Framework (API building)
   - CORS headers (frontend can call backend during dev)
   - python-dotenv (use .env for settings later)
   - joblib (load exported ML model pipeline later)
3. Created the Django project inside the `backend/` folder.
4. Created an `api` app where prediction endpoints will live.

## Why we did it this way

- Keeping Django inside `backend/` makes the repo easier to understand.
- Using DRF early makes it easier to create clean endpoints like:
  - POST /api/predict
  - GET /api/features
- We’re preparing for the ML pipeline export step later.

## How Django fits in the big picture

React (frontend) will eventually send user inputs to Django.
Django will run the ML model prediction and return JSON.
React will display the prediction + charts.

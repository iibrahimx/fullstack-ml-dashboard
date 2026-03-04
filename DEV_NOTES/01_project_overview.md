# Project Overview (Fullstack ML Dashboard)

## What we are building

A full-stack web app that predicts loan default risk using a trained machine learning model.

The project has 3 main parts:

- `ml/` → notebooks for data cleaning, EDA, feature engineering, training, and exporting the model
- `backend/` → Django API that loads the exported model and returns predictions
- `frontend/` → React app that collects inputs and displays predictions + charts

## Why we are building it

I want to practice building something “end-to-end”:

- take a real dataset
- train a model properly (not just “fit and forget”)
- export the model so it can be used outside the notebook
- serve it from a backend endpoint
- consume it from a frontend UI and visualize the result

## The data + model idea

Dataset: Kaggle loan default dataset (tabular data)
Goal: predict if a loan is likely to default (risk classification)

## How data flows in this app (big picture)

1. User enters values in the React form (example: income, loan amount, etc.)
2. React sends the values to the backend (`POST /api/predict`)
3. Django loads the trained model pipeline and runs prediction
4. Django returns JSON response (prediction + probability)
5. React displays the result and charts

## Important rule for this repo

Raw datasets and large generated files should NOT be committed to GitHub.
We will keep data local and only commit code + small samples if needed.

## Commit style we will use

- `chore:` setup and housekeeping
- `ml:` notebooks, training code, exported model pipeline
- `api:` backend endpoints and server logic
- `ui:` frontend pages/components
- `docs:` documentation and DEV_NOTES updates

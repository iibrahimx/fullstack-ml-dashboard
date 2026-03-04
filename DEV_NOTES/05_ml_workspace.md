# ML Workspace Notes

## Goal of the ML folder

The `ml/` folder is our "data science workspace".
It is separate from the backend so we can:

- explore the dataset
- do EDA and feature engineering
- train a model
- export the trained pipeline for the backend to use

## Folder meanings

- ml/notebooks: where experiments and step-by-step analysis happens
- ml/src: helper python code we can reuse later
- ml/reports: saved charts/figures (optional)
- ml/model_artifacts: exported model files (kept local for now)

## Why model artifacts are ignored

Model files can be large and change often.
We don't want GitHub commits to become heavy and messy.
When we reach deployment, we will decide the best way to store and ship the model.

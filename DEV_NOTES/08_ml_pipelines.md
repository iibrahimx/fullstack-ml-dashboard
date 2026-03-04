# ML Pipelines

## What a pipeline is

A pipeline is a single object that bundles:

- preprocessing steps (like scaling)
- the ML model

So the same transformations used in training are always applied during prediction.

## Why we use a pipeline

Without a pipeline, it is easy to make mistakes like:

- training with scaled data but predicting with unscaled data
- applying preprocessing in the wrong order

With a pipeline:

- pipeline.fit(X_train, y_train) trains everything
- pipeline.predict(new_data) predicts correctly using the same preprocessing

## What our pipeline contains

1. StandardScaler
   - makes numeric features roughly comparable in scale
2. LogisticRegression
   - baseline classification model

## Why this helps with Django API later

The backend can load one exported file:
loan_default_pipeline.joblib

Then it can accept user input, convert it to a dataframe, and call:

- pipeline.predict()
- pipeline.predict_proba()

This is the bridge between ML notebooks and real applications.

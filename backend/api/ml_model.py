import os
import joblib

MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "model_artifacts",
    "loan_default_pipeline.joblib",
)

_model = None


def get_model():
    global _model
    if _model is None:
        _model = joblib.load(MODEL_PATH)
    return _model


# NB:
# This part: os.path.dirname(__file__)
# Means: "Where is this current file?"
# Returns: "full_path_name/fullstack-ml-dashboard/backend"

# Then: os.path.dirname(...) again
# Means: "Go up one folder from backend"
# Returns: "full_path_name/fullstack-ml-dashboard"

# Then add: "model_artifacts" + "loan_default_pipeline.joblib"
# Final path: "full_path_name/fullstack-ml-dashboard/model_artifacts/loan_default_pipeline.joblib"

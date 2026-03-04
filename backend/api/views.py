from rest_framework.decorators import api_view
from rest_framework.response import Response
from .ml_model import get_model


# Create your views here.
@api_view(["GET"])
def health_check(request):
    return Response({"status": "ok"})


@api_view(["GET"])
def features(request):
    # Placeholder
    return Response(
        {
            "model": "loan_default_baseline",
            "features": [],
        }
    )


# Create the predict endpoint
@api_view(["POST"])
def predict(request):
    required_fields = [
        "monthly_income",
        "monthly_expense",
        "age",
        "has_smartphone",
        "has_wallet",
        "avg_wallet_balance",
        "on_time_payment_ratio",
        "num_loans_taken",
    ]

    data = request.data

    # Simple validation
    missing = [f for f in required_fields if f not in data]
    if missing:
        return Response(
            {
                "error": "Missing fields",
                "missing": missing,
            },
            status=400,
        )

    # Convert to correct types
    row = {
        "monthly_income": int(data["monthly_income"]),
        "monthly_expense": int(data["monthly_expense"]),
        "age": int(data["age"]),
        "has_smartphone": int(data["has_smartphone"]),
        "has_wallet": int(data["has_wallet"]),
        "avg_wallet_balance": int(data["avg_wallet_balance"]),
        "on_time_payment_ratio": float(data["on_time_payment_ratio"]),
        "num_loans_taken": int(data["num_loans_taken"]),
    }

    # Load saved model
    model = get_model()

    import pandas as pd

    X = pd.DataFrame([row])
    pred = int(model.predict(X)[0])
    proba = model.predict_proba(X)[0].tolist()

    return Response(
        {
            "prediction": pred,
            "probability": {
                "class_0": proba[0],
                "class_1": proba[1],
            },
            "inputs": row,
        }
    )

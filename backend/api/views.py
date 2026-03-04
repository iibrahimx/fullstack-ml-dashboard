from rest_framework.decorators import api_view
from rest_framework.response import Response


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

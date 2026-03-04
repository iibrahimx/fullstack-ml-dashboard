from django.urls import path
from .views import health_check, features, predict

urlpatterns = [
    path("health/", health_check),
    path("features/", features),

    # Register predict route
    path("predict/", predict),
]

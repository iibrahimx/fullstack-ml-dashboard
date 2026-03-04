from django.urls import path
from .views import health_check, features

urlpatterns = [
    path("health/", health_check),
    path("features/", features),
]

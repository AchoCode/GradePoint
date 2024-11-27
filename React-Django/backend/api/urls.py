from django.urls import path
from .views import CalculationAPI

urlpatterns = [
    path('calculate/', CalculationAPI.as_view(), name='calculate'),
]

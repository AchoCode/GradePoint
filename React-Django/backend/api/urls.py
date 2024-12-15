from django.urls import path
from .views import NurseryCalculationAPI, PrimaryCalculationAPI, SecondaryCalculationAPI, CreateCommentView

urlpatterns = [
    path('calculate/nursery', NurseryCalculationAPI.as_view(), name='Nursery'),
    path('calculate/primary', PrimaryCalculationAPI.as_view(), name='primary'),
    path('calculate/secondary', SecondaryCalculationAPI.as_view(), name='secondary'),
    path('create-comments', CreateCommentView.as_view(), name='comment')
]

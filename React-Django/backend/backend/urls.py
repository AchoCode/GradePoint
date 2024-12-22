from django.contrib import admin
from django.urls import path, include
from api.views import UserRegistration,AdminRegistration
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

def index(response):
    return JsonResponse({'msg': 'Welcome to gradepoint api'})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('api/', include('api.urls')),
    path('register-user/', UserRegistration.as_view(), name='register'),
    path('register-admin/', AdminRegistration.as_view(), name='admin'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('api-auth/', include('rest_framework.urls')),

]

from django.contrib import admin
from django.urls import path, include
from api.views import UserRegistration
from django.http import JsonResponse

def index(response):
    return JsonResponse({'msg': 'Welcome to gradepoint api'})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('api/', include('api.urls')),
    path('register-user/', UserRegistration.as_view(), name='register')
]

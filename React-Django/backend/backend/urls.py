from django.contrib import admin
from django.urls import path, include
from api.views import UserRegistration
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('register-user/', UserRegistration.as_view(), name='register')
]

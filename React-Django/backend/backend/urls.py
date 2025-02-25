from django.contrib import admin
from django.urls import path, include
from api.views import UserRegistration
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
import sqlite3
import os
DB_PATH = os.getenv("DB_PATH", "db.sqlite3")

def ping_db(request):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT 1;")  # Simple query
        cursor.close()
        conn.close()
        print('''
        =============================
        CRON-JOB EXECUTED
        =============================
        ''')
        return JsonResponse({"status": "Database pinged successfully"}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
def index(response):
    return JsonResponse({'msg': 'Welcome to gradepoint api'})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('api/', include('api.urls')),
    path('register-user/', UserRegistration.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('api-auth/', include('rest_framework.urls')),
    path('ping-db', ping_db, name='ping')

]

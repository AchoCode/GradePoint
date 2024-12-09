from django.contrib import admin
from .models import course, UserProfile
# Register your models here.
admin.site.register(course)
admin.site.register(UserProfile)
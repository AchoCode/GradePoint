from django.contrib import admin
from .models import Course, UserProfile, Comments, Student, ScratchCard
# Register your models here.
admin.site.register(Course)
admin.site.register(UserProfile)
admin.site.register(Comments)
admin.site.register(Student)
admin.site.register(ScratchCard)
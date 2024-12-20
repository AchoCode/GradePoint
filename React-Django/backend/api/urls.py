from django.urls import path
from .views import (
    CreateStudentView, 
    NurseryCalculationAPI, 
    PrimaryCalculationAPI, 
    SecondaryCalculationAPI, 
    CreateCommentView,
    StudentListAPI,
    DeleteStudentView
    )

urlpatterns = [
    path('calculate/nursery', NurseryCalculationAPI.as_view(), name='Nursery'),
    path('calculate/primary', PrimaryCalculationAPI.as_view(), name='primary'),
    path('calculate/secondary', SecondaryCalculationAPI.as_view(), name='secondary'),
    path('create-comments', CreateCommentView.as_view(), name='comment'),
    path('create-student', CreateStudentView.as_view(), name='student'),
    path('fetch-students', StudentListAPI.as_view(), name='student-list'),
    path('delete-student/<int:student_id>', DeleteStudentView.as_view(), name='delete'),

]

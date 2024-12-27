from django.urls import path
from .views import (
    CreateStudentView, 
    NurseryCalculationAPI, 
    PrimaryCalculationAPI, 
    SecondaryCalculationAPI, 
    CreateCommentView,
    StudentListAPI,
    DeleteStudentView,
    CreateScratchCardView,
    DeleteCardView,
    ScratchCardListAPI,
    CreateUserSettingsView,
    DeleteCourseView,
    SettingsListAPI
    )

urlpatterns = [
    path('calculate/nursery', NurseryCalculationAPI.as_view(), name='Nursery'),
    path('calculate/primary', PrimaryCalculationAPI.as_view(), name='primary'),
    path('calculate/secondary', SecondaryCalculationAPI.as_view(), name='secondary'),
    path('create-comments', CreateCommentView.as_view(), name='comment'),
    path('create-student', CreateStudentView.as_view(), name='student'),
    path('fetch-students', StudentListAPI.as_view(), name='student-list'),
    path('fetch-cards', ScratchCardListAPI.as_view(), name='card-list'),
    path('generate-cards', CreateScratchCardView.as_view(), name='create'),
    path('settings', SettingsListAPI.as_view(), name='settings'),
    path('add-settings', CreateUserSettingsView.as_view(), name='settings'),
    path('delete-student/<int:student_id>', DeleteStudentView.as_view(), name='delete'),
    path('delete-card/<int:card_id>', DeleteCardView.as_view(), name='delete'),
    path('delete-course/<int:course_id>', DeleteCourseView.as_view(), name='delete'),

]

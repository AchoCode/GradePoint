from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone_number = models.CharField(max_length=15, null=True)
    address = models.TextField(blank=True, null=True)
    no_of_students = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.user.username

class Student(models.Model):
    name = models.CharField(max_length=100)
    level = models.CharField(max_length=100,blank=True, null=True)
    reg_no = models.CharField(max_length=100, blank=True, null=True)
    average = models.FloatField(default=0.0)
    overall_total = models.IntegerField(default=0)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='students', null=True)
    def __str__(self):
        return f'{self.name} {self.reg_no}'


class Course(models.Model):
    subject = models.CharField(max_length=100)
    test_score = models.CharField(max_length=100)
    exam_score = models.CharField(max_length=100)
    total_score = models.CharField(max_length=100)
    grade = models.CharField(max_length=100)
    student_user = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='courses', null=True)

    def __str__(self):
        return self.subject

class Comments(models.Model):
    usr_email = models.EmailField()
    usr_comment = models.TextField()

    def __str__(self):
        return self.usr_email
    

class Scratch_card(models.Model):
    card_number = models.CharField(max_length=100)
    is_valid = models.BooleanField(default=True)
    
    def __str__(self):
        return self.card_number
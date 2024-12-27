from django.contrib.auth.models import User
from django.db import models
from datetime import timedelta
from django.utils.timezone import now

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

    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'
        
    def __str__(self):
        return self.usr_email
    

class ScratchCard(models.Model):
    card_number = models.CharField(max_length=100)
    is_valid = models.BooleanField(default=True)
    card_usr = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='cards', null=True)
    valid_period = models.DateField()  
    no_of_times_used = models.IntegerField(default=0)  
    card_creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cards', null=True)

    def __str__(self):
        return f'Card number: {self.card_number}:  Used: {self.no_of_times_used}:  Created by: {self.card_creator}'

    def check_expiry(self):
        """Check if the card is expired and update is_valid."""
        if self.valid_period and now().date() > self.valid_period:
            self.is_valid = False
            self.save()
            
    def get_valid_period(self):
        """Method to calculate the valid period (7 days from creation)."""
        return now().date() + timedelta(days=7)

    def save(self, *args, **kwargs):
        """Override save method to set valid_period automatically."""
        if not self.valid_period:
            self.valid_period = self.get_valid_period()
        super().save(*args, **kwargs)  # Call the original save method

class CourseSettings(models.Model):
    course_name = models.CharField(max_length=100)
    course_level = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='settings', null=True)
    
    class Meta:
        verbose_name = 'CourseSetting'
        verbose_name_plural = 'CourseSettings'

    def __str__(self):
        return f'{self.user} settings: {self.course_name}'
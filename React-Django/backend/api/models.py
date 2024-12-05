from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.user.username

class course(models.Model):
    subject = models.CharField(max_length=100)
    test_score = models.CharField(max_length=100)
    exam_score = models.CharField(max_length=100)
    total_score = models.CharField(max_length=100)
    grade = models.CharField(max_length=100)

    def __str__(self):
        return self.subject


class Scratch_card(models.Model):
    card_number = models.CharField(max_length=100)
    is_valid = models.BooleanField(default=True)
    
    def __str__(self):
        return self.card_number
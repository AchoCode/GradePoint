# Generated by Django 5.1.3 on 2024-12-20 22:27

from django.db import migrations
import os

def create_superuser(apps, schema_editor):
    User = apps.get_model('auth', 'User')
    UserProfile = apps.get_model('api', 'UserProfile')  # Adjust the import path
    username = os.getenv('DJANGO_ADMIN_USERNAME')
    email = os.getenv('DJANGO_ADMIN_EMAIL')
    password = os.getenv('DJANGO_ADMIN_PASSWORD')

    if not all([username, email, password]):
        raise ValueError(
            "One or more environment variables (DJANGO_ADMIN_USERNAME, DJANGO_ADMIN_EMAIL, DJANGO_ADMIN_PASSWORD) are missing."
        )

    # Delete any existing superuser with the same username or email
    User.objects.filter(username=username).delete()
    User.objects.filter(email=email).delete()

    # Create the new superuser
    user = User.objects.create_superuser(
        username=username,
        email=email,
        password=password
    )

    # Ensure a UserProfile is created for the superuser
    UserProfile.objects.get_or_create(user=user)

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0012_alter_course_student_user'),
    ]

    operations = [
        migrations.RunPython(create_superuser),
    ]

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
    profile, created = UserProfile.objects.get_or_create(user=user)

    # Optional: If you need to populate default values for the UserProfile
    if created:
        profile.address = "Default Address"  # Set default values if necessary
        profile.phone_number = "0000000000"  # Set default values if necessary
        profile.save()

    print(f"Superuser {username} created with UserProfile.")

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0012_alter_course_student_user'),
    ]

    operations = [
        migrations.RunPython(create_superuser),
    ]

# Generated by Django 5.1.3 on 2024-12-15 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_userprofile_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('usr_email', models.EmailField(max_length=254)),
                ('usr_comment', models.TextField()),
            ],
        ),
    ]
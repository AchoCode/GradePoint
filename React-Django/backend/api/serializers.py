from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile, Comments, Student
from datetime import datetime
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['phone_number', 'address', 'no_of_students']

    
class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'profile']
        extra_kwargs = {'password': {'write_only': True}}
    
    def validate(self, data):
        # Ensure password and confirm_password match
        if data.get('password') != self.initial_data.get('confirm_password'):
            raise serializers.ValidationError({'error': 'Passwords do not match.'})
        return data

    def create(self, validated_data):
        # Checks if user already exists
        if User.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError({'error': 'user already exists'})

        profile_data = validated_data.pop('profile', {})
        password = validated_data.pop('password')

        # Create the User
        user = User.objects.create_user(**validated_data, password=password)

        # Create or update the UserProfile
        UserProfile.objects.update_or_create(user=user, defaults=profile_data)

        return user

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id', 'usr_email', 'usr_comment']
    def create(self, validated_data):
       return Comments.objects.create(**validated_data)
    
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id','name','level','reg_no']
    def validate(self, data):
        student_name = data.get('name')
        if Student.objects.filter(name=student_name).exists():
            raise serializers.ValidationError({'error': 'Student already exists'})
        return data
    
    def generate_registration_number(self):
        """
        Generates a unique registration number for the student.
        """
        current_year = datetime.now().year
        last_student = Student.objects.last()  # Get the most recently added student
        next_id = last_student.id + 1 if last_student else 1  # Determine the next ID
        return f"LPMA/{current_year}/{next_id:04d}"  # Format: "2024-0001"

    def create(self, validated_data):
        """
        Overriding the create method to set the teacher and generate a registration number.
        """
        request = self.context['request']  # Get the request object from the serializer context
        validated_data['teacher'] = request.user  # Set the teacher to the logged-in user

        # Create the student instance
        student = super().create(validated_data)

        # Generate and set the registration number
        student.reg_no = self.generate_registration_number()
        student.save()  # Save the student instance with the new registration number

        return student

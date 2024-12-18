from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile, Comments

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['phone_number', 'address', 'no_of_students']

    
class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

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
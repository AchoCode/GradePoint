from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile

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
            raise serializers.ValidationError({'password': 'Passwords do not match.'})
        return data

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})
        password = validated_data.pop('password')

        # Create the User
        user = User.objects.create_user(**validated_data, password=password)

        # Create or update the UserProfile
        UserProfile.objects.update_or_create(user=user, defaults=profile_data)

        return user

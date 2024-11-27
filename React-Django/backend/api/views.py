# from django.shortcuts import render
# from django.contrib.auth.models import User
# from rest_framework import generics
# from .serializers import UserSerializer
# from rest_framework.permissions import IsAuthenticated, AllowAny
# # Create your views here.

# class CreateUserView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class CalculationAPI(APIView):
    def post(self, request):
        try:
            input_data = request.data.get("dataToSend", "")
            # Perform your calculations here
            result = 'communication successful'  # Example: calculating the length of the input string
            return Response({"data": result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



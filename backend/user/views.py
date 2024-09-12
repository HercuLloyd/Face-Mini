from django.shortcuts import render
from user.models import Profile
from event.models import Event
from django.contrib.auth.models import User
from user.serializer import CreateUserSerializer, ProfileSerializer, ProfileFormSerializer, UserSeralizer
from event.serializers import EventSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser, FormParser


# Create your views here.

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

#Register User
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]

#Retrieve User
class UserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSeralizer

#Retrieve Profile
class ProfileView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

#Update Profile
class ProfileUpdateView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, pk, format= None):
        profile = Profile.objects.get(pk=pk)
        serializer = ProfileFormSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Get Profile Associated With User ID
class GetProfileByUserIDView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'user'

# Add event to profile page
# Get user
# Get event id
# Add event id to
@csrf_exempt
def editMemories(request, pk1, pk2):
    profile = Profile.objects.get(pk=pk1) 
    if request.method == 'PUT':
        profile.user_memories.add(Event.objects.get(id=pk2))
        return HttpResponse('Memory Sucessfully Added')
    if request.method == 'DELETE':
        profile.user_memories.remove(Event.objects.get(id=pk2))
        return HttpResponse('Memory Sucessfully Deleted')
    
@csrf_exempt
def memoriesList(request, pk1):
    profile = Profile.objects.get(pk=pk1)
    events = profile.user_memories.all()
    if request.method == 'GET':
        serializer = EventSerializer(events, many = True)
        return JsonResponse(serializer.data, safe=False)

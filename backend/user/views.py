from django.shortcuts import render
from user.models import Profile 
from event.models import Event, ProfileMemories
from django.contrib.auth.models import User
from user.serializer import CreateUserSerializer, ProfileSerializer, ProfileFormSerializer, UserSeralizer
from event.serializers import EventSerializer, ProfileMemoriesSerializer
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


@csrf_exempt
def addMemories(request, pk1, pk2):
    profile = Profile.objects.get(pk=pk1) 
    eventData = Event.objects.get(pk=pk2)
    profileMem = ProfileMemories(user = profile, event = eventData)
    profileMem.save()
    return HttpResponse('okay good')

#delete memories
@csrf_exempt
def deleteMemory(request, pk):
    memory = ProfileMemories.objects.get(pk=pk)
    memory.delete()
    return HttpResponse('Profile Memory ' + pk + ' deleted')

def memoriesList(request, pk1):
    profile = Profile.objects.get(pk=pk1)
    memList = profile.user_profile_memories.all()
    serializer = ProfileMemoriesSerializer(memList, many=True)
    return JsonResponse(serializer.data, safe=False)

# create a profile memories object with associated event
# add that profile memory to the profile memories list in profile

from django.shortcuts import render
from rest_framework import generics, status
from .serializers import EventSerializer, EventPostSerializer, MemoriesSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Event, EventPost, EventMemories
from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.
class EventList(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Event.objects.all()
    
# Create Event
class CreateEventView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse(serializer.data, status= status.HTTP_200_OK)
        else:
            return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteEvent(generics.DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class UpdateEvent(APIView):
    parser_classes = [MultiPartParser, FormParser]
    
    def put(self, request, pk, format= None):
        event = Event.objects.get(pk=pk)
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class RetrieveEvent(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventPostList(generics.ListCreateAPIView):
    serializer_class = EventPostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        event = self.kwargs['event']
        return EventPost.objects.filter(event = event)
    
class CreateEventPostView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        serializer = EventPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse(serializer.data, status= status.HTTP_200_OK)
        else:
            return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UpdateEventPost(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, pk, format= None):
        post = EventPost.objects.get(pk=pk)
        serializer = EventPostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteEventPost(generics.DestroyAPIView):
    queryset = EventPost.objects.all()
    serializer_class = EventPostSerializer
    
        
class MemoriesList(generics.ListAPIView):
    serializer_class = MemoriesSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        event = self.kwargs['event']
        return EventMemories.objects.filter(event = event)
    

class MemoriesPostView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        serializer = MemoriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK)
        else:
            return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class DeleteMemoriesPost(generics.DestroyAPIView):
    queryset = EventMemories.objects.all()
    serializer_class = MemoriesSerializer
        
class UpdateMemoriesPost(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, pk, format= None):
        post = EventMemories.objects.get(pk=pk)
        serializer = MemoriesSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from .models import Event, EventPost, EventMemories, ProfileMemories
from user.models import Profile
from rest_framework import serializers

class EventSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(required=False)
    class Meta: 
        model = Event
        fields = ['id', 'host', 'event_title', 'event_description', 'time', 'location', 'image', 'display_name',]


class EventPostSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(required=False)
    class Meta:
        model = EventPost
        fields = ['id', 'user', 'message', 'image', 'created_at', 'event', 'display_name']

class MemoriesSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(required=False)
    class Meta:
        model = EventMemories
        fields = ['id', 'user', 'message', 'image', 'created_at', 'event', 'display_name']

class ProfileMemoriesSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    event = serializers.PrimaryKeyRelatedField(read_only=True)
    image = serializers.ImageField(required=False)
    profile_picture = serializers.ImageField(required=False)
    class Meta:
        model = ProfileMemories
        fields = ['id','user', 'event', 'host_name', 'location', 'event_title', 'image', 'created_at', 'profile_picture']
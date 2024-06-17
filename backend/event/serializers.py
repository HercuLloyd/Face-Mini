from .models import Event, EventPost, EventMemories
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
from .models import Event, EventPost, EventMemories, ProfileMemories, EventUser, JourneyPoint, JourneyRoute
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

class EventUserSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    event = serializers.PrimaryKeyRelatedField(read_only=True)
    profile_picture = serializers.ImageField(read_only=True, required=False)
    class Meta:
        model = EventUser
        fields = ['id', 'user', 'event', 'extra_info', 'display_name', 'profile_picture', 'event_title', 'location', 'time',]

class JourneyPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = JourneyPoint
        fields = ['id','event', 'type', 'title', 'location', 'start_date', 'end_date',]

class JourneyRouteSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = JourneyRoute
        fields = ['id', 'event', 'type', 'title', 'start_location', 'end_location', 'start_date', 'end_date',]

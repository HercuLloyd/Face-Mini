from django.db import models
from user.models import Profile

def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)


# Event
class Event(models.Model):
    host = models.ForeignKey(Profile, on_delete=models.CASCADE)
    event_title = models.CharField(max_length=50)
    event_description = models.CharField(max_length=200)
    location = models.CharField(max_length=50)
    time = models.DateTimeField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to=upload_to)

    @property
    def display_name(self):
        return self.host.display_name
    
    def __str__(self):
        return self.event_title
    

# Post made inside of the event
class EventPost(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='post_user')
    message = models.CharField(max_length=200)
    image = models.ImageField(null=True, blank=True, upload_to=upload_to)
    created_at = models.DateTimeField(auto_now_add=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='event', null=True, blank=True)
    
    @property
    def display_name(self):
        return self.user.display_name
    
    def __str__(self):
        return self.message + ' - ' + self.user.display_name 
    
# Post made inside of the event to be saved with event
class EventMemories(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="user_created")
    message = models.CharField(max_length=50)
    image = models.ImageField(null=True, blank=True, upload_to=upload_to)
    created_at = models.DateTimeField(auto_now_add=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="memories", null=True, blank=True)
    
    @property
    def display_name(self):
        return self.user.display_name

    def __str__(self):
        return self.message + ' - ' + self.user.display_name
    
class ProfileMemories(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="user_profile_memories", null=True, blank=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='profile_events')
    @property
    def host_name(self):
        return self.event.display_name
    @property
    def location(self):
        return self.event.location
    @property
    def event_title(self):
        return self.event.event_title
    @property
    def image(self):
        return self.event.image
    @property 
    def created_at(self):
        return self.event.time
    @property
    def profile_picture(self):
        return self.user.profile_picture
    
    

class ProfileMemoriesComments(models.Model):
    event = models.ForeignKey(ProfileMemories, on_delete=models.CASCADE, related_name='profile_event_comments')
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="host_of_comment")
    message = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class EventUser(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="user_attending")
    event = models.ForeignKey(Event,on_delete=models.CASCADE, related_name ="event_user_attending")
    extra_info = models.CharField(max_length=200, blank=True)
    
    @property
    def display_name(self):
        return self.user.display_name
    @property
    def profile_picture(self):
        return self.user.profile_picture
    @property
    def event_title(self):
        return self.event.event_title
    @property
    def location(self):
        return self.event.location
    @property
    def time(self):
        return self.event.time
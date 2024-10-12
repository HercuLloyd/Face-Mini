from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid
# from event.models import Event

# Create your models here.

# models.UUIDField(primary_key=True, default=uuid.uuid4, editable= False)
# User has a collection of memories saved per event
    
# class User(AbstractUser):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable= False)
#     username = models.CharField(max_length=20, unique=True)
#     password = models.CharField(max_length=100)
#     USERNAME_FIELD = 'username'
#     REQUIRED_FIELDS = ['password']

#     def __str__(self):
#         return str(self.username)


def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)    

class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    display_name = models.CharField(max_length=20, blank=True, null=True)
    bio = models.CharField(max_length=200, blank=True, null=True)
    profile_picture = models.ImageField(blank=True, null=True, upload_to=upload_to)
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.display_name or self.user.username
    
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        user_profile = Profile(user=instance)
        user_profile.save()


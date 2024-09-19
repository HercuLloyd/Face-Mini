from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group, User
from .models import Profile
from event.models import ProfileMemories
# Register your models here.


class ProfileInline(admin.StackedInline):
    model = Profile
    readonly_fields = ('id',)
    fields = ['id', 'display_name']

class UserAdmin(admin.ModelAdmin):
    model = User
    readonly_fields = ('id',)
    fields = ['id', 'username', 'password', 'email']
    inlines = [ProfileInline]

class ProfileAdmin (admin.ModelAdmin):
    model = Profile
    readonly_fields = ('id',)
    fields = ['id', 'display_name', 'bio', 'profile_picture'] 

class ProfileMemoriesAdmin (admin.ModelAdmin):
    model = ProfileMemories
    fields = ['user', 'event']

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.unregister(Group)
admin.site.register(ProfileMemories, ProfileMemoriesAdmin)
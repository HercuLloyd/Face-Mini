from django.contrib import admin
from .models import Event, EventPost, EventMemories, EventUser, JourneyPoint, JourneyRoute
# Register your models here.


class EventPostInline (admin.StackedInline):
    model= EventPost
    readonly_fields = ('id', 'created_at')
    fields = ['id', 'user', 'created_at', 'message', 'image']

class EventUserInline (admin.StackedInline):
    model = EventUser
    readonly_fields = ('id',)
    fields = ['id', 'user', 'event', 'extra_info']

class EventMemoriesInline (admin.StackedInline):
    model = EventMemories
    readonly_fields = ('id','created_at')
    fields = ['id', 'user', 'event', 'message', 'image', 'created_at',]

class EventAdmin (admin.ModelAdmin):
    model = Event
    readonly_fields = ('id',)
    fields = ['id', 'host', 'event_title', 'event_description', 'location', 'time', 'image']
    inlines = [EventPostInline, EventUserInline, EventMemoriesInline]

class EventPostAdmin(admin.ModelAdmin):
    model = EventPost
    readonly_fields = ('id',)
    fields = ['id', 'message', 'image', 'event']

class JourneyPointAdmin(admin.ModelAdmin):
    model = JourneyPoint
    readonly_fields = ('id', 'type')
    fields = ['id', 'event', 'type', 'title', 'location', 'start_date', 'end_date']
    
# admin.site.unregister(EventPost)
admin.site.register(EventPost, EventPostAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(EventMemories)
admin.site.register(JourneyPoint, JourneyPointAdmin)
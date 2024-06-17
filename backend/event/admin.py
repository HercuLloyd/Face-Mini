from django.contrib import admin
from .models import Event, EventPost, EventMemories
# Register your models here.


class EventPostInline (admin.StackedInline):
    model= EventPost
    readonly_fields = ('id', 'created_at')
    fields = ['id', 'user', 'created_at', 'message', 'image']

#Event Admin
class EventAdmin (admin.ModelAdmin):
    model = Event
    readonly_fields = ('id',)
    fields = ['id', 'host', 'event_title', 'event_description', 'location', 'time', 'image']
    inlines = [EventPostInline]

class EventPostAdmin(admin.ModelAdmin):
    model = EventPost
    readonly_fields = ('id',)
    fields = ['id', 'message', 'image', 'event']
    
# admin.site.unregister(EventPost)
admin.site.register(EventPost, EventPostAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(EventMemories)
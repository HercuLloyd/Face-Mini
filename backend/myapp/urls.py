from django.urls import path
from .views import index, profile, event
urlpatterns = [
    path("", index, name="index"),
    path('sign-in', index, name='sign-in'),
    path('sign-up', index, name='sign-up'),
    path('profile/<slug:slug>', profile, name='profile'),
    path('event/<slug:slug>', event, name='event')
]
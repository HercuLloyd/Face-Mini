from django.urls import path
from event import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("event-list/", views.EventList.as_view(), name='event_list'),
    path("post/", views.CreateEventView.as_view(), name='event_post'),
    path("post/delete/<pk>/", views.DeleteEvent.as_view(), name='delete_event'),
    path("post/update/<pk>/", views.UpdateEvent.as_view(), name='update_event'),
    path("post/get/<pk>/", views.RetrieveEvent.as_view(), name='retrieve_post'),

    path("event-posts/<event>/", views.EventPostList.as_view(), name='in_event_posts'),
    path('create-event-post/', views.CreateEventPostView.as_view(), name='create_event_post'),
    path('event-post/update/<pk>/', views.UpdateEventPost.as_view(), name='update_event_post'),
    path('event-post/delete/<pk>/', views.DeleteEventPost.as_view(), name='delete_event_post'),
    
    path('event-user/create/<profileId>/<eventId>/', views.createEventUser, name= 'create_event_user'),
    path('event-user/delete/<user>/', views.deleteEventUser, name= 'delete_event_user'),
    path('event-user/list/<event>/', views.eventUserList, name='event_user_list'),

    path('memories-list/<event>/', views.MemoriesList.as_view(), name='memories_list'),
    path('memories-post/', views.MemoriesPostView.as_view(), name='memories-post'),
    path('memories-post/delete/<pk>/', views.DeleteMemoriesPost.as_view(), name='delete_memories_post'),
    path('memories-post/update/<pk>/', views.UpdateMemoriesPost.as_view(), name='update_memories_post')
]
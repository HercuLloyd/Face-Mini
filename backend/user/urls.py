from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from django.urls import path
from user import views

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name="register"),
    path('profile/<pk>/', views.ProfileView.as_view()),
    path('retrieve/<pk>/', views.UserView.as_view()),
    path('profile/update/<pk>/', views.ProfileUpdateView.as_view()),
    path('get-profile/<user>/', views.GetProfileByUserIDView.as_view()),
    
    path('profile-memories/add/<pk1>/<pk2>/', views.addMemories, name='add-profile-memories'),
    path('profile-memories/delete/<pk>/', views.deleteMemory, name='delete-profile-memories'),
    path('profile-memories/list/<pk1>/', views.memoriesList, name = 'profile-memories-list' ),
    path('profile-memories/get/<pk>/', views.getMemories, name = 'get-profile-memories' )
]
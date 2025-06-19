from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('members/', include('team_members.urls')),  # Asegúrate de crear este archivo
]
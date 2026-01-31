from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Room(models.Model):
    name = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='room')
    admins = models.ManyToManyField(User, related_name="admin_rooms", blank=True)
    members = models.ManyToManyField(User, related_name="member_rooms", blank=True)
    

class Message (models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages')

    def __str__(self):
        return self.content


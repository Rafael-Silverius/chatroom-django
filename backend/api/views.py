from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,MessageSerializer,RoomSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Message,Room



#User Creation
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


#Room Creation
class RoomListCreate(generics.ListCreateAPIView):
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

    #Display all rooms
    def get_queryset(self):
       return Room.objects.all()
    
    #Create a new room with the auth-user as the owner
    def perform_create(self,serializer):
       room = serializer.save(owner=self.request.user)

       #make the user which creates the room also an admin and member
       room.members.add(self.request.user)
       room.admins.add(self.request.user)

#Join Room
class JoinRoomView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, room_id):
        room = get_object_or_404(Room, id=room_id)

        if request.user in room.members.all():
            return Response({"detail": "You are already a member of this room."})

        room.members.add(request.user)
        return Response({"detail": f"{request.user.username} joined {room.name}"})

#Leave Room
class LeaveRoomView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, room_id):
        room = get_object_or_404(Room, id=room_id)
        room.members.remove(request.user)
        return Response({"detail": f"{request.user.username} left {room.name}"})




#Message Creation
class MessageListCreate(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    
    #Display all messages of a user in a room 
    def get_queryset(self):
        room_id = self.kwargs.get("room_id")
        return Message.objects.filter(room_id=room_id).order_by("created_at")

    #Create a new message
    def perform_create(self,serializer):
        room_id = self.kwargs.get("room_id")
        room = get_object_or_404(Room, id=room_id)

        if self.request.user not in room.members.all():
            raise PermissionError("You must be a member of this room to send messages")

        serializer.save(author=self.request.user, room=room)

#Message Deletion
class MessageDelete(generics.DestroyAPIView):
    serializer_class= MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        room_id = self.kwargs.get("room_id")
        
        #if user is not admin delete only his messages
        qs = Message.objects.filter(author=user, room_id=room_id)
        room= Room.objects.get(id=room_id)

        #if auth-user is admin
        if room.owner == user or user in room.admins.all():
            #delete each message he wants
            qs = Message.objects.filter(room_id=room_id)
        
        return qs


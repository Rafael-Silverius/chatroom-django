from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,MessageSerializer,RoomSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from .models import Message,Room



#User Creation
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

#Get Current User
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "id": request.user.id,
            "username": request.user.username,
        })


#Room Creation
class RoomListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RoomSerializer

    def get_queryset(self):
        #Display my registered rooms
        return Room.objects.filter(members=self.request.user)
  
    def get_serializer_context(self):
        return {"request":self.request}

    #Create a new room with the auth-user as the owner
    def perform_create(self,serializer):
       room = serializer.save(owner=self.request.user)

       # Creator becomes admin + member
       room.members.add(self.request.user)
       room.admins.add(self.request.user)

#Discoverable Rooms
class DiscoverRoomsView(generics.ListAPIView):
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Rooms I am NOT a member of
        return Room.objects.exclude(members=self.request.user)

    def get_serializer_context(self):
        return {"request": self.request}

#Join Room
class JoinRoomView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, room_id):
        room = get_object_or_404(Room, id=room_id)

        if request.user in room.members.all():
            return Response({"detail": "You are already a member of this room."},status=400)

        room.members.add(request.user)
        return Response({"detail": f"{request.user.username} joined {room.name}"})

#Leave Room
class LeaveRoomView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, room_id):

        room = get_object_or_404(Room, id=room_id)

        if not room.members.filter(id=request.user.id).exists():
            return Response(
                {
                    "success": False,
                    "detail": "You are not a member"
                },
                status=400
            )

        room.members.remove(request.user)

        return Response(
            {
                "success": True,
                "detail": f"You left {room.name}"
            },
            status=200
        )

#Room Details
class RoomDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RoomSerializer
    queryset = Room.objects.all()

    def get_serializer_context(self):
        return {"request": self.request}

    def get_object(self):
        room = super().get_object()

        # Only members can see room profile
        if self.request.user not in room.members.all():
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("You are not a member of this room")

        return room


#Create New Messages
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
            raise PermissionDenied("You must be a member of this room to send messages")

        serializer.save(author=self.request.user, room=room)


#Edit Delete Update Messages
class MessageDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = "message_id"  # matches <int:message_id> in URL

    def get_queryset(self):
        # Only allow messages in the room
        room_id = self.kwargs.get("room_id")
        return Message.objects.filter(room_id=room_id).order_by("created_at")

    # Edit/update a message
    def perform_update(self, serializer):
        if self.request.user != serializer.instance.author:
            raise PermissionDenied("You can only edit your own messages.")
        serializer.save()

    # Delete a message
    def perform_destroy(self, instance):
        user = self.request.user
        room = instance.room
        # Only author or room owner/admin can delete
        if instance.author != user and user != room.owner and user not in room.admins.all():
            raise PermissionDenied("You cannot delete this message.")
        instance.delete()
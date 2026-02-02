from django.urls import path
from . import views


urlpatterns = [
    #Rooms
    path('rooms/',views.RoomListCreate.as_view() , name='room-List'),
    path('rooms/discover/',views.DiscoverRoomsView.as_view() , name='discover-rooms'),
    path('rooms/<int:room_id>/join/',views.JoinRoomView.as_view() , name='join-room'),
    path('rooms/<int:room_id>/leave/',views.LeaveRoomView.as_view() , name='leave-room'),
     #Messages
    path('rooms/<int:room_id>/messages/', views.MessageListCreate.as_view() , name='room-messages'),
    path('rooms/<int:room_id>/messages/<int:message_id>/', views.MessageDetail.as_view(), name='message-detail'),
    #user
    path('auth/me/', views.MeView.as_view() , name='me'),
    ]
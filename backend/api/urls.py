from django.urls import path
from . import views


urlpatterns = [
    #Rooms
    path('rooms/',views.RoomListCreate.as_view() , name='room-List'),
    path('rooms/<int:room_id>/join/',views.JoinRoomView.as_view() , name='join-room'),
    path('rooms/<int:room_id>/leave/',views.LeaveRoomView.as_view() , name='leave-room'),
     #Messages
    path('rooms/<int:room_id>/messages/', views.MessageListCreate.as_view() , name='room-messages'),
    path('rooms/<int:room_id>/messages/delete/<int:pk>/', views.MessageDelete.as_view() , name='message-delete'),
]
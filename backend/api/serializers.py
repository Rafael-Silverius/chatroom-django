from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Message , Room

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=["id","username","password"]
        extra_kwargs = {"password":{"write_only":True}}

    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields= ['id','username']

class MessageSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    class Meta:
        model = Message
        fields = ['id','content','created_at','room','author']
        read_only_fields = ['author', 'room', 'created_at']

class RoomSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    admins = UserSerializer(many=True, read_only=True)
    members = UserSerializer(many=True, read_only=True)
    
    class Meta: 
        model = Room
        fields = ['id','name','created_at','owner','admins','members']
        
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields= ['id','username']

from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/token/' , TokenObtainPairView.as_view() , name='get_token'),
    path('api/token/refresh/' , TokenRefreshView.as_view() , name='refresh'),
    path('api-auth/', include("rest_framework.urls")),
    path('api/',include("api.urls")),
]

#eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY5ODUwMzQ3LCJpYXQiOjE3Njk4NDg1NDcsImp0aSI6ImRlNzY2ZGRkMThmZDQzZjg4MTc1NDg2MmUxZjI1ODU2IiwidXNlcl9pZCI6IjEifQ.-TM9g4sdBpL3AoBc4nW5kJwgmx7xHFyYBFYFrYk-4To
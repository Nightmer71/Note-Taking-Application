from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, CategorySerlializer
from .models import Note, Category
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied

class CreateUserView(generics.CreateAPIView):
        queryset = User.objects.all
        serializer_class = UserSerializer
        permission_classes = [AllowAny]

class NoteListCreate(generics.ListCreateAPIView):
        serializer_class = NoteSerializer
        permission_classes = [IsAuthenticated]

        def get_queryset(self):
                user = self.request.user
                return Note.objects.filter(author=user)
        
        def perform_create(self, serializer):
                category = serializer.validated_data.get("category")
                if category.owner != self.request.user:
                        raise PermissionDenied("You may only assign your own categories to notes")
                serializer.save(author=self.request.user)

class NoteDelete(generics.DestroyAPIView):
        serializer_class = NoteSerializer
        permission_classes = [IsAuthenticated]

        def get_queryset(self):
                user = self.request.user
                return Note.objects.filter(author=user)
        
class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
        serializer_class = NoteSerializer
        permission_classes = [IsAuthenticated]

        def get_queryset(self):
                user = self.request.user
                return Note.objects.filter(author=user)

class CategoryListCreate(generics.ListCreateAPIView):
        serializer_class = CategorySerlializer
        permission_classes = [IsAuthenticated] 

        def get_queryset(self):
                user = self.request.user
                return Category.objects.filter(owner=user)
        
        def perform_create(self, serializer):
                serializer.save(owner=self.request.user)

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
        serializer_class = CategorySerlializer
        permission_classes = [IsAuthenticated]

        def get_queryset(self):
            user = self.request.user
            return Category.objects.filter(owner=user)
        
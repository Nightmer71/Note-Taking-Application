from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Category

class UserSerializer(serializers.ModelSerializer):
        class Meta:
                model = User
                fields = ["id", "username", "password"]
                extra_kwargs = {"password": {"write_only": True}} # No one can read the password, only write one

        def create(self, validated_data):
                user = User.objects.create_user(**validated_data)
                return user
        
class NoteSerializer(serializers.ModelSerializer):
        class Meta:
                model = Note
                fields = ["id", "title", "content", "created_at", "author", "category", "category_name"]
                extra_kwargs = {
                        "author": {"read_only": True},
                        "created_at": {"format": None}
                }

        category_name = serializers.CharField(source="category.name", read_only=True)

class CategorySerlializer(serializers.ModelSerializer):
        class Meta:
                model = Category
                fields = ["id", "name", "owner"]
                extra_kwargs = {"owner": {"read_only": True}}

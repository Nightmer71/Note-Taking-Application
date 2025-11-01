from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
        title = models.CharField(max_length=100)
        content = models.TextField
        created_at = models.DateTimeField(auto_now_add=True)
        author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
        category = models.ForeignKey("Category", on_delete=models.PROTECT, related_name="notes", null=True, blank=True)

        def __str__(self):
                return self.title

class Category(models.Model):
        name = models.CharField(max_length=100)
        owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="categories")

        def __str__(self):
                return self.name
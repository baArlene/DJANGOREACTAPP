from django.db import models

# Create your models here.
class ProjectManager(models.Model):
    name = models.CharField(unique=True, max_length=100)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class Project(models.Model):
    projectmanager = models.ForeignKey(ProjectManager, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(unique=True, max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    comments = models.CharField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=100)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    def __str__(self) -> str:
        return self.name





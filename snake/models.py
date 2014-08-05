from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Player(AbstractUser):
    age = models.PositiveIntegerField(null=True)

class Score(models.Model):
    SNAKE = "SN"
    MEMORY = "ME"
    game_choices = (
        (SNAKE, 'Snake'),
        (MEMORY, 'Memory'),
    )
    scores = models.PositiveSmallIntegerField()
    user = models.ForeignKey(Player)
    which_game = models.CharField(max_length=10, choices=game_choices)
    stamp = models.DateTimeField(auto_now_add=True)

   




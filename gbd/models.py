from django.db import models

# Create your models here.

class Square(models.Model):
    lat = models.IntegerField()
    lng = models.IntegerField()
    terrainchoices = (
        ('P', 'Plains'),
        ('D', 'Desert'),
        ('W', 'Water'),
        ('H', 'Hills'),
        ('M', 'Mountains')
    )
    terrain = models.CharField(max_length=1, choices=terrainchoices)
    cityname = models.CharField(max_length=64, null=True, blank=True)
    playername = models.CharField(max_length=128)

class City(models.Model):
    

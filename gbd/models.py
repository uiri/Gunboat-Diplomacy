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
    player = models.ForeignKey(User)

class City(models.Model):
    square = models.OneToOneField(Square)
    cityname = models.CharField(max_length=64)
    population = models.IntegerField()
    food = models.IntegerField()
    fuel = models.IntegerField()
    metal = models.IntegerField()
    foodworkers = models.IntegerField()
    fuelworkers = models.IntegerField()
    production = models.IntegerField()
    productionmodifier = models.IntegerField()
    loyalty = models.IntegerField()
    

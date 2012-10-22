from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

class Player(AbstractUser):
    politicschoices = (
        ('A', 'Autocracy'),
        ('C', 'Constitution'),
        ('D', 'Democracy')
    )
    societychoices = (
        ('L', 'Libertarian'),
        ('T', 'Tolerant'),
        ('C', 'Conservative')
    )
    capitalchoices = (
        ('S', 'Syndicalist'),
        ('D', 'Decentralized'),
        ('C', 'Capitalist')
    )
    economychoices = (
        ('P', 'Planned'),
        ('X', 'Mixed'),
        ('M', 'Market')
    )
    religionchoices = (
        ('F', 'Free Religion'),
        ('T', 'Theocracy'),
        ('A', 'State Atheism')
    )
    politics = models.CharField(max_length=1, choices=politicschoices)
    society = models.CharField(max_length=1, choices=societychoices)
    capital = models.CharField(max_length=1, choices=capitalchoices)
    economy = models.CharField(max_length=1, choices=economychoices)
    religion = models.CharField(max_length=1, choices=religionchoices)

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
    improvementchoices = (
        ('Q', 'Quarry'),
        ('C', 'Coal Mine'),
        ('M', 'Mine'),
        ('P', 'Pasture'),
        ('O', 'Oil Well'),
        ('A', 'Farm'),
        ('I', 'Fishery')
        ('N', 'None')
    )
    improvement = models.CharField(max_length=1, choices=improvementchoices)
    level = models.IntegerField()
    player = models.ForeignKey(Player)

    def clean(self):
        if self.improvement != 'N':
            if self.terrain == 'W' and self.improvement != 'I':
                raise ValidationError('Water square improvement must be none or fishery')
            if self.terrain == 'H' or self.terrain == 'M':
                if self.improvement != 'M' and self.improvement != 'C':
                    raise ValidationError('Hills or Mountain square improvement must be none, mine or coal mine')
            if self.terrain == 'D' and self.improvement != 'P' and self.improvement != 'O':
                raise ValidationError('Desert square improvement must be none, pasture or oil well')
            if self.terrain == 'P' and self.improvement != 'A' and self.improvement != 'Q':
                raise ValidationError('Pasture square improvement must be none, farm or quarry')

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
    

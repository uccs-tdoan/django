from __future__ import unicode_literals
from time import time
from django.db import models
from django import forms
def get_upload_file_name(instance, filename):
    return "uploaded_file/%s_%s"%(str(time()).replace('.','_').filename)

# Create your models here.
class ridermaster(models.Model):
    riderNo = models.CharField(max_length=10)

    def __unicode__(self):
        return self.riderNo

class riderride(models.Model):
    riderNo = models.CharField(max_length=30)
    rideNo = models.CharField(max_length=30)
    secs = models.IntegerField()
    watts = models.IntegerField()
    heartRate = models.IntegerField()
    speed = models.FloatField()
    elevation = models.FloatField()

class limitwattsrider(models.Model):
    riderNo=models.CharField(max_length=20)
    tSec5=models.IntegerField(default=0)
    tSec10=models.IntegerField(default=0)
    tSec30=models.IntegerField(default=0)
    tSec60=models.IntegerField(default=0)
    tSec120=models.IntegerField(default=0)
    tSec300=models.IntegerField(default=0)
    tSec600=models.IntegerField(default=0)
    tSec900=models.IntegerField(default=0)
    tSec1200=models.IntegerField(default=0)
    tSec1800=models.IntegerField(default=0)
    tSec3600=models.IntegerField(default=0)
    tSec5200=models.IntegerField(default=0)

class Document(models.Model):
    docfile = models.FileField(upload_to='documents/')

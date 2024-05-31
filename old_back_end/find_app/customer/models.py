from django.db import models

class Candidate_register(models.Model):
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)  
    ftname = models.CharField(max_length=100,null=True)
    lname = models.CharField(max_length=100,null=True)
    qualification = models.CharField(max_length=100,null=True)
    cv = models.FileField(upload_to='cv_uploads/%Y/%m/%d/',null=True) 
    experience = models.IntegerField(null=True)
    phone =models.BigIntegerField(default = 0,null=True)
    






   


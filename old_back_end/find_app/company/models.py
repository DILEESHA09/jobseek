from django.db import models

from customer.models import Candidate_register

# Create your models here.
class Company_register(models.Model):
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    

class JobOpening(models.Model):
    title = models.CharField(max_length=100)
    company = models.ForeignKey(Company_register, on_delete = models.CASCADE)
    description = models.TextField()
    requirement = models.TextField()
    education_qualification = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class JobApplications(models.Model):
    job_id = models.ForeignKey(JobOpening, on_delete = models.CASCADE)
    candidate_id = models.ForeignKey(Candidate_register, on_delete = models.CASCADE)
    company_id =  models.ForeignKey(Company_register, on_delete = models.CASCADE)
     # Define the path to upload CVs

    def __str__(self):
        return self.name

from rest_framework import serializers
from .models import Company_register, JobApplications, JobOpening

class Company_serializer(serializers.ModelSerializer):
    class Meta:
        model = Company_register
        fields = '__all__'  # You can specify fields you want to include here
        
class Job_serializer(serializers.ModelSerializer):
     class Meta:
        model = JobOpening
        fields = '__all__'

class myprofile_serializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplications
        fields = '__all__'
    


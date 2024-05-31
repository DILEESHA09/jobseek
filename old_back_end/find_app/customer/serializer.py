from rest_framework import serializers
from customer.models import Candidate_register


class Candidate_serializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate_register
        fields = '__all__'
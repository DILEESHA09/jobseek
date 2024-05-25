from rest_framework import serializers
from customer.models import Canidate_register


class Canidate_serializer(serializers.ModelSerializer):
    class Meta:
        model = Canidate_register
        fields = '__all__'
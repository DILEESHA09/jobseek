from rest_framework import serializers
from candidate.models import Canidate_register


class Canidate_serializer(serializers.ModelSerializer):
    cv_url = serializers.SerializerMethodField()
    class Meta:
        model = Canidate_register
        fields = ['id','email','password','ftname','lname','qualification','cv','experience','phone','apply_status','cv_url']
    
    def get_cv_url(self, obj):
        request = self.context.get('request')
        if obj.cv:
            return request.build_absolute_uri(obj.cv.url)
        return None
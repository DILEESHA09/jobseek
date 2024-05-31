from django.shortcuts import render
from customer.serializer import Candidate_serializer
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status
from .models import Candidate_register

# Create your views here.
class Candidate_registerview(APIView):
    def post(self,request):
        serializer = Candidate_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response({'result':'register success'})
        
    
        return Response ({'result':'register failed'})
    def patch(self, request):
        # Assuming request.data contains the data to update and a primary key for the object
        candidate_id = request.query_params.get('id', None)
        if candidate_id:
            try:
                candidate_instance = Candidate_register.objects.get(pk=candidate_id)
                serializer = Candidate_serializer(candidate_instance, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'result': 'profile updated successfully'})
                else:
                    return Response({'result': 'Invalid data for update'}, status=400)
            except Candidate_register.DoesNotExist:
                return Response({'result': 'Job does not exist'}, status=404)
        else:
            return Response({'result': 'Job ID not provided'}, status=400)
   
    
class CandidateLogin(APIView):
   def post(self, request):
        serializer = Candidate_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            try:
                user = Candidate_register.objects.filter(email=email, password=password)

                if user.exists():
                    request.session['candidate_id'] = user[0].id
                    request.session['caniddate_email'] = user[0].email
                    if not request.session.session_key:
                        request.session.create()  # Create the session if it doesn't exist
                        session_id = request.session.session_key  # Get the session ID
                        print(session_id)
                        print(request.session['candidate_email'])
                    return Response({'message': 'User logged in successfully','session_id':session_id}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            except Candidate_register.DoesNotExist:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

    
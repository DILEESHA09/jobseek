from django.shortcuts import render
from candidate.serializer import Canidate_serializer
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status
from .models import Canidate_register



# Create your views here.
class Canidate_registerview(APIView):

    def post(self,request):
        serializer = Canidate_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response({'result':'register success'})
        return Response ({'result':'register failed'})
    
    def get(self, request):
        # Retrieve all JobOpening objects from the database
        canidate = Canidate_register.objects.all()
        # Serialize the queryset of JobOpening objects
        serializer = Canidate_serializer(canidate, many=True)
        # Return the serialized data as a response
        return Response(serializer.data)
    
   

        
    
    def patch(self, request):
        # Assuming request.data contains the data to update and a primary key for the object
        candidate_id = request.query_params.get('id', None)
        if candidate_id:
            try:
                candidate_instance = Canidate_register.objects.get(pk=candidate_id)
                serializer = Canidate_serializer(candidate_instance, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'result': 'profile updated successfully'})
                else:
                    return Response({'result': 'Invalid data for update'}, status=400)
            except Canidate_register.DoesNotExist:
                return Response({'result': 'candidate does not exist'}, status=404)
        else:
            return Response({'result': 'candidate ID not provided'}, status=400)
        
class Candidate_profile(APIView):
    def get(self,request,id):

        user_profile=Canidate_register.objects.get(pk=id)
        
        if user_profile:
            serializer = Canidate_serializer(user_profile)
            return Response(serializer.data)
        else:
            return Response({'result': 'candidate does not exist'}, status=404)

   
    
class CandidateLogin(APIView):
   def post(self, request):
        serializer = Canidate_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            try:
                user = Canidate_register.objects.filter(email=email, password=password)

                if user.exists():
                    request.session['candidate_id'] = user[0].id
                    request.session['candidate_email'] = user[0].email
                    if not request.session.session_key:
                        request.session.create()  # Create the session if it doesn't exist
                        session_id = request.session.session_key  # Get the session ID
                        print(session_id)
                        print(request.session['candidate_email'])
                    return Response({'message': 'User logged in successfully','session_id':session_id,'candidate_id':user[0].id}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            except Canidate_register.DoesNotExist:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CandidateLogout(APIView):
    def post(self, request):
        session_key = request.data.get('sessionKey')

        if not session_key:
            return Response({'error': 'Session key not provided'}, status=status.HTTP_400_BAD_REQUEST)

        # if session_key == request.session.session_key:
        #     # Remove specific session data
        #     request.session.pop('candidate_id', None)
        #     request.session.pop('candidate_email', None)

        request.session.flush()    
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
        # else:
        #     return Response({'error': 'Invalid session key'}, status=status.HTTP_400_BAD_REQUEST)

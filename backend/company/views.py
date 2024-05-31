from django.shortcuts import render

from candidate.models import Canidate_register 
from.models import Company_register, JobApplications,JobOpening
from rest_framework.response import Response
from rest_framework.views import APIView 
from .serializers import Company_serializer, Job_serializer, myprofile_serializer
from django.contrib.auth import authenticate
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.http import JsonResponse






# Create your views here.
class company_register(APIView):
    def post(self,request):
        serializer = Company_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response({'result':'register success'})
        
    
        return Response ({'result':'register failed'})
    
    
class CompanyLoginView(APIView):
   def post(self, request):
        serializer = Company_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            try:
                user = Company_register.objects.filter(email=email, password=password)

                if user.exists():
                    request.session['company_id'] = user[0].id
                    request.session['company_email'] = user[0].email
                    if not request.session.session_key:
                        request.session.create()  # Create the session if it doesn't exist
                        session_id = request.session.session_key  # Get the session ID
                        print(session_id)
                        print(request.session['company_email'])

                    return Response({'message': 'User logged in successfully','session_id':session_id}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            except Company_register.DoesNotExist:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
        



# class Jobopen(APIView):
#     def post(self,request):
#         serializer = Job_serializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()  
#             return Response({'result':'Job added successfully'})
#         return Response ({'result':'Job adding failed'})
#     def get(self, request):
#         # Retrieve all JobOpening objects from the database
#         job_openings = JobOpening.objects.all()
#         # Serialize the queryset of JobOpening objects
#         serializer = Job_serializer(job_openings, many=True)
#         # Return the serialized data as a response
#         return Response(serializer.data)
#     from rest_framework.response import Response


class Jobopen(APIView):
    def post(self, request):
        serializer = Job_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'result': 'Job added successfully'})
        return Response({'result': 'Job adding failed'})

    def get(self, request):
        # Retrieve all JobOpening objects from the database
        job_openings = JobOpening.objects.all()
        # Serialize the queryset of JobOpening objects
        serializer = Job_serializer(job_openings, many=True)
        # Return the serialized data as a response
        return Response(serializer.data)

    def delete(self, request):
        print("reached here..")
        job_id = request.query_params.get('id', None)
        if job_id:
            try:
                job_instance = JobOpening.objects.get(pk=job_id)
                job_instance.delete()
                return Response({'result': f'Job with ID {job_id} deleted successfully'})
            except JobOpening.DoesNotExist:
                return Response({'result': 'Job does not exist'}, status=404)
        else:
            return Response({'result': 'Job ID not provided'}, status=400)

    def patch(self, request):
        # Assuming request.data contains the data to update and a primary key for the object
        job_id = request.query_params.get('id', None)
        if job_id:
            try:
                job_instance = JobOpening.objects.get(pk=job_id)
                serializer = Job_serializer(job_instance, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'result': 'Job updated successfully'})
                else:
                    return Response({'result': 'Invalid data for update'}, status=400)
            except JobOpening.DoesNotExist:
                return Response({'result': 'Job does not exist'}, status=404)
        else:
            return Response({'result': 'Job ID not provided'}, status=400)
        
# class jobapplicationApi(APIView):
#     def post(self,request):
#         serializer = myprofile_serializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()  
#             return Response({'result':'job applied successfully'},status=200)
        
    
#         return Response ({'result':'job application failed'},status=400)
#     def get(self, request):
#         # Retrieve all JobOpening objects from the database
#         job_application = Canidate_register.objects.all()
#         # Serialize the queryset of JobOpening objects
#         serializer = myprofile_serializer(job_application, many=True)
#         # Return the serialized data as a response
#         return Response(serializer.data)
    
# # Example of Django view to handle fetching applied candidates


class AppliedCandidatesView(APIView):
    def get(self, request, job_id):
        job = get_object_or_404(JobOpening, id=job_id)
        applications = JobApplications.objects.filter(job_id=job).select_related('canidate_id')
        data = [{
            'name': app.canidate_id.ftname,
            'email': app.canidate_id.email,
            'phone': app.canidate_id.phone,
            'qualification': app.canidate_id.qualification,
        } for app in applications]
        return Response(data, status=status.HTTP_200_OK)
    
class jobapplicationApi(APIView):
    def post(self, request):
        job_id = request.data.get('job_id')
        canidate_id = request.data.get('canidate_id')
        company_id = request.data.get('company_id')

        if not job_id or not canidate_id or not company_id:
            return Response({"error": "Missing job_id, candidate_id, or company_id"}, status=status.HTTP_400_BAD_REQUEST)

        job = get_object_or_404(JobOpening, id=job_id)
        canidate = get_object_or_404(Canidate_register, id=canidate_id)
        company = get_object_or_404(Company_register, id=company_id)

        application = JobApplications.objects.create(job_id=job, canidate_id=canidate, company_id=company)
        return Response({"message": "Application submitted successfully"}, status=status.HTTP_201_CREATED)





    
        

from django.urls import path
from . import views

urlpatterns = [
        path('candidate/register/<int:pk>',views.Candidate_registerview.as_view() ,name='candidate_register' ),
        path('candidate/login/',views.CaniddateLogin.as_view(), name='CandidateLogin'),
        
      
    

    ]
from django.urls import path
from . import views

urlpatterns = [
        path('candidate/register/',views.Canidate_registerview.as_view() ,name='candidate_register' ),
        path('candidate/login/',views.CandidateLogin.as_view(), name='CandidateLogin'),
        path('candidate/logout/',views.CandidateLogout.as_view(), name='CandidateLogout'),
        path('candidateProfile/<int:id>',views.Candidate_profile.as_view(),name='candidateProfile')


    ]
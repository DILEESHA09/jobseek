from django.urls import path
from . import views

urlpatterns = [
        path('api/',views.company_register.as_view() ,name='company_register' ),
        path('company/login/',views.CompanyLoginView.as_view(), name='companylogin'),
         path('company/logout/',views.CompanyLogout.as_view(), name='companyLogout'),
        path('company/open_job/',views.Jobopen.as_view(), name= 'job_open'),
        path('singleCompany/open_job/',views.JobOpeningCompanyView.as_view(), name= 'JobOpeningCompanyView'),
        path('company/jobapplication/',views.jobapplicationApi.as_view(),name='jobapplication'),
          path('company/applied_candidates/<int:job_id>/', views.AppliedCandidatesView.as_view(), name='applied_candidates'),
]

    
    
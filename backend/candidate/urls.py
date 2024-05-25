from django.urls import path
from . import views

urlpatterns = [
        path('canidate/register/',views.Canidate_registerview.as_view() ,name='canidate_register' ),
        path('canidate/update/<int:id>',views.Canidate_registerview.as_view() ,name='canidate_register' ),
        path('canidate/login/',views.CanidateLogin.as_view(), name='CanidateLogin'),
        path('candidate/logout/',views.CanidateLogout.as_view(), name='CanidateLogin'),

    

    ]
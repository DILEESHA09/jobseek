from django.urls import path
from . import views

urlpatterns = [
        path('canidate/register/<int:pk>',views.Canidate_registerview.as_view() ,name='canidate_register' ),
        path('canidate/login/',views.CanidateLogin.as_view(), name='CanidateLogin'),
        
      
    

    ]
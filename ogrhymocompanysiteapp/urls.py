from django.urls import path
from . import views

urlpatterns=[
	path('', views.home, name='home'),
	path('about/', views.about, name='about'),
	path('contact/', views.contact, name='contact'),
	path('loginpage/', views.loginpage, name='loginpage'),
	path('logout/', views.logoutuser, name='logout'),
	path('dashboard/', views.dashboard, name='dashboard'),
	path('account_settings/', views.accountSettings, name='account_settings'),
]
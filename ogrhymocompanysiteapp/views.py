from django.shortcuts import render, redirect

from django.contrib.auth import authenticate, login, logout

from django.http import HttpResponse

from django.contrib import messages

from .forms import *
# Create your views here.

def home(request):
	return render(request, 'ogrhymocompanysiteapp/home.html')

def about(request):
	return render(request, 'ogrhymocompanysiteapp/about.html')

def contact(request):
	return render(request, 'ogrhymocompanysiteapp/contact.html')

def loginpage(request):

	if request.user.is_authenticated:
		return redirect('/')

	else:
		if request.method == "POST":
			username= request.POST.get('username')
			password= request.POST.get('password')

			user= authenticate(request, username=username, password=password)

			if user is not None:
				login(request, user)
				return redirect('dashboard')

			else:
				messages.error(request, "username or password is incorrect")


		context={}

		return render(request, "ogrhymocompanysiteapp/login.html", context)

def accountSettings(request):
	customer= request.user.customer

	form=CustomerForm(instance=customer)

	if request.method=='POST':
		form= CustomerForm(request.POST, request.FILES, instance=customer)
		if form.is_valid():
			form.save()

	context= {"form":form}

	return render(request, 'ogrhymocompanysiteapp/account_settings.html', context)


def logoutuser(request):
	logout(request)
	return redirect('login')

def dashboard(request):
	if request.user.is_authenticated:
		print('I am logged in.')

		customer= request.user.customer
		customer.save()
		investments= customer.investment_set.all()

	else:
		return HttpResponse('You are not logged in!')
	context={'customer': customer,'investments': investments }
	return render(request, 'ogrhymocompanysiteapp/dashboard.html', context)
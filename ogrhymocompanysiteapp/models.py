from django.db import models

from django.contrib.auth.models import User

# Create your models here.

class Customer(models.Model):
	user= models.OneToOneField(User, null=True, on_delete=models.CASCADE)
	firstname= models.CharField(max_length=200, null=True, blank=True)
	lastname= models.CharField(max_length=200, null=True, blank=True)
	phone= models.CharField(max_length=200, null=True)
	email= models.CharField(max_length=200, null=True)
	profile_pic= models.ImageField(default='secret.jpg',null=True, blank=True)
	referal= models.CharField(max_length=200, null=True, blank=True)
	wallet_address= models.CharField(max_length=200, null=True, blank=True)
	account_number= models.CharField(max_length=200, null=True, blank=True)
	date_created= models.DateTimeField(auto_now_add=True, null=True)

	def __str__(self):
		return self.firstname

	@property
	def profile_picUrl(self):
		try:
			url= self.profile_pic.url
		except:
			url=''
		return url

class Investment(models.Model):
	customer= models.ForeignKey(Customer, null=True, blank=True, on_delete=models.SET_NULL)
	totaldeposite= models.FloatField(default=0, null=True, blank=True)
	deposite= models.FloatField(default=0, null=True)
	balance= models.FloatField(default=0,null=True)
	withdrawal= models.FloatField(default=0,null=True)
	profit= models.FloatField(default=0,null=True)
	Your_investment= models.CharField(max_length=200, null=True, blank=True)
	def __str__(self):
		return self.customer.firstname


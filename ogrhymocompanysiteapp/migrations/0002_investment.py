# Generated by Django 3.2 on 2021-06-08 21:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ogrhymocompanysiteapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Investment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('totaldeposite', models.FloatField(blank=True, default=0, null=True)),
                ('deposite', models.FloatField(default=0, null=True)),
                ('balance', models.FloatField(default=0, null=True)),
                ('withdrawal', models.FloatField(default=0, null=True)),
                ('profit', models.FloatField(default=0, null=True)),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='ogrhymocompanysiteapp.customer')),
            ],
        ),
    ]

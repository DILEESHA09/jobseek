# Generated by Django 5.0.6 on 2024-05-20 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Canidate_register',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('ftname', models.CharField(max_length=100, null=True)),
                ('lname', models.CharField(max_length=100, null=True)),
                ('qualification', models.CharField(max_length=100, null=True)),
                ('cv', models.FileField(null=True, upload_to='cv_uploads/%Y/%m/%d/')),
                ('experience', models.IntegerField(null=True)),
                ('phone', models.BigIntegerField(default=0, null=True)),
            ],
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-07 20:49
from __future__ import unicode_literals

from django.db import migrations, models
import webapp.models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='fitfilemasterupload',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('docfile', models.FileField(upload_to=webapp.models.get_upload_file_name)),
            ],
        ),
    ]

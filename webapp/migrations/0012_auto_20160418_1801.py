# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-18 18:01
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0011_auto_20160418_1752'),
    ]

    operations = [
        migrations.AlterField(
            model_name='riderride',
            name='riderNo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='webapp.ridermaster'),
        ),
        migrations.AlterField(
            model_name='riderride',
            name='speed',
            field=models.FloatField(),
        ),
    ]

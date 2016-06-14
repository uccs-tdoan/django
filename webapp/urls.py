from django.conf.urls import patterns, url, include
from django.views.generic import ListView, DetailView
from webapp.models import riderride
from webapp.models import ridermaster
from . import views

urlpatterns=[
url(r'^$', views.upload_file),
url(r'^riderlist$', views.riderlist),
url(r'^readcsv$', views.readcsv),
url(r'^list$', views.list),
url(r'^ridelist', views.ridelist, name='urlname'),
url(r'^ridechart', views.ridechart, name='urlname'),
url(r'^ridebar', views.ridebar, name='urlname'),
url(r'^charts', views.charts),
url(r'^uploadfitfile/', views.upload_file),
url(r'^ride/$', ListView.as_view(queryset=riderride.objects.all().order_by("secs"),template_name="html/list.html"))
]

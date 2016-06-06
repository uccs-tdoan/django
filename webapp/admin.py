from django.contrib import admin
from webapp.models import riderride
from webapp.models import ridermaster
from webapp.models import limitwattsrider
from webapp.models import Document
# Register your models here.
admin.site.register(ridermaster)
admin.site.register(riderride)
admin.site.register(Document)
admin.site.register(limitwattsrider)

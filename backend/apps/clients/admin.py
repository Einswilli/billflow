from django.contrib import admin

from apps.clients.models import (
    Client,
)

# Register your models here.

LIMIT_PER_PAGE = 100


####
##      CLIENTS ADMIN SITE
#####
@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    ''' Admin site configs for Clients Model. '''
    
    list_display = [
        'code','first_name','last_name',
        'email','phone','address','city',
        'postal_code','created'
    ]
    search_fields = [
        'code','first_name','last_name',
        'email','phone','address','city',
        'postal_code',
    ]
    list_per_page = LIMIT_PER_PAGE
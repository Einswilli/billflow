from django.contrib import admin
from apps.accounts.models import (
    User,
)

# Register your models here.
LIMIT_PER_PAGE = 100

####
##      GENERIC USER ADMIN CLASS
#####
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    ''' Admin site configurations for User model '''
    
    list_display = (
        'code','first_name','last_name','email',
        'phone_number','is_verified','is_active',
        'is_staff','date_joined'
    )
    list_filter = (
        'is_verified',
        'is_staff','is_active',
    )
    search_fields = (
        'code','first_name','last_name',
        'email','phone_number'
    )
    list_per_page = LIMIT_PER_PAGE
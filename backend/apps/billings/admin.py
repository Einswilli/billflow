from django.contrib import admin

from apps.billings.models import (
    Bill
)

# Register your models here.

LIMIT_PER_PAGE = 100


####
##      BILLS ADMIN SITE
#####
@admin.register(Bill)
class ProductAdmin(admin.ModelAdmin):
    ''' Admin site configs for Bills Model. '''
    
    list_display = [
        'code','client','is_validated',
        'is_paid','created'
    ]
    list_filter = [
        'is_validated','is_paid',
    ]
    search_fields = [
        'code','client','articles'
    ]
    list_per_page = LIMIT_PER_PAGE
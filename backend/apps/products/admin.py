from django.contrib import admin

from apps.products.models import (
    Product
)

# Register your models here.

LIMIT_PER_PAGE = 100


####
##      PRODUCTS ADMIN SITE
#####
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    ''' Admin site configs for Products Model. '''
    
    list_display = [
        'code','name','category',
        'price','tva','created'
    ]
    list_filter = [
        'category'
    ]
    search_fields = [
        'code','name','description'
    ]
    list_per_page = LIMIT_PER_PAGE
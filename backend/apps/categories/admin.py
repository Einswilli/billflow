from django.contrib import admin

from apps.categories.models import (
    Category,
)

# Register your models here.

LIMIT_PER_PAGE = 100


####
##      CATEGORIES ADMIN SITE
#####
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    ''' Admin site configs for Category Model. '''
    
    list_display = [
        'code','name','description','created'
    ]
    search_fields = [
        'code','name','description'
    ]
    list_per_page = LIMIT_PER_PAGE
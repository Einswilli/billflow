from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from apps.utils.models import TimeStampedUUIDModel
from apps.categories.models import (
    Category,
)

# Create your models here.

####
##      PRODUCTS MODEL
#####
class Product(TimeStampedUUIDModel):
    ''' Store information about Products. '''
    
    name = models.CharField(max_length = 150)
    brand = models.CharField(max_length = 150)
    description = models.TextField(
        default = 'No description yet!'
    )
    category = models.ForeignKey(
        Category, on_delete = models.CASCADE,
        related_name = 'products', null = False,
        blank = False
    )
    price = models.IntegerField(default = 0)
    tva = models.IntegerField(default = 0)
    
    # META CLASS
    class Meta:
        ''' Meta class for Product Model '''
        
        verbose_name = _('Product')
        verbose_name_plural = _('Products')
        ordering=['created']
    
    def __str__(self):
        return self.name
    
        
    def get_id_prefix(self):
        ''' Return a specific ID prefix for Product Model Objects '''
        return 'PRD'
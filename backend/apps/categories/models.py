import simplejson as Json
from bson import ObjectId
from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from apps.utils.models import TimeStampedUUIDModel

# Create your models here.

####
##      CATEGORIES MODEL
#####
class Category(TimeStampedUUIDModel):
    ''' Store informations about Shop categories. '''
    
    name = models.CharField(max_length=50,null=False,blank=False)
    description = models.TextField(
        null=True, blank=True,
        default='No description Yet.'
    )
    icon = models.ImageField(
        upload_to='Categories/icons/',
        null=True,blank=True
    )
    image = models.ImageField(upload_to='Categories/images/',null=True,blank=True)
    parent = models.ForeignKey(
        'self', on_delete = models.CASCADE,
        null = True, blank = True,
        related_name = 'children'
    )
    
    # META CLASS
    class Meta:
        ''' Meta class for category Model '''
        
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')
        ordering=['-created']
    
    def __str__(self):
        return self.name
    
        
    def get_id_prefix(self):
        ''' Return a specific ID prefix for category Model Objects '''
        return 'CAT'
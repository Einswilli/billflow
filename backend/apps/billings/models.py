from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from apps.utils.models import TimeStampedUUIDModel
from apps.products.models import (
    Product,
)
from apps.clients.models import (
    Client,
)

# Create your models here.


####
##      BILLING PRODUCTS MODEL
#####
class Article(TimeStampedUUIDModel):
    ''' Store information about Billing Articles. '''
    
    product = models.ForeignKey(
        Product, on_delete = models.CASCADE,
        related_name = 'articles',
        null = False, blank = False
    )
    selling_price = models.IntegerField(default = 0)
    # quantity = models.IntegerField(default=1)         # WOULD LIKE TO ADD QUANTITY.
    
    # META CLASS
    class Meta:
        ''' Meta class for Billing Article Model '''
        
        verbose_name = _('Article')
        verbose_name_plural = _('Articles')
        ordering = ['created']
    
    def __str__(self):
        return self.product.name
    
        
    def get_id_prefix(self):
        ''' Return a specific ID prefix for Articles Model Objects. '''
        return 'ART'
    
    def total(self):
        ''' Return the article total price. '''
        
        # NORMALY WILL RETURN A REULT OF (selling_prince * quantity)
        return self.selling_price
    
    
####
##      BILL MODEL
#####
class Bill(TimeStampedUUIDModel):
    ''' Store information about Bill. '''
    
    articles = models.ManyToManyField(
        Article, related_name = 'bills'
    )
    client = models.ForeignKey(
        Client, on_delete = models.CASCADE,
        null = False, blank = False,
        related_name = 'bills'
    )
    is_validated = models.BooleanField(default = False)
    is_paid = models.BooleanField(default = False)
    
    # META CLASS
    class Meta:
        ''' Meta class for Bill Model '''
        
        verbose_name = _('Bill')
        verbose_name_plural = _('Bills')
        ordering = ['-created']
    
    def __str__(self):
        return self.code
    
        
    def get_id_prefix(self):
        ''' Return a specific ID prefix for Articles Model Objects. '''
        return 'BILL'
    
    def total(self):
        ''' Return the bill total price. '''
        
        # NORMALY WILL RETURN A REULT OF (selling_prince * quantity)
        return sum([a.total() for a in self.articles.all()])
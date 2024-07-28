from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField

from apps.utils.models import TimeStampedUUIDModel

# Create your models here.


####
##      CLIENTS MODEL
#####
class Client(TimeStampedUUIDModel):
    ''' Store informations about Clients. '''
    
    first_name = models.CharField(
        max_length = 150, null = True,
        blank = True
    )
    last_name = models.CharField(
        max_length = 150, null = True,
        blank = True
    )
    email = models.EmailField(max_length=120)
    phone = PhoneNumberField(
        _('phone number'), 
        unique = True, 
        null = True
    )
    address = models.CharField(max_length = 300)
    postal_code =models.CharField(
        max_length = 150, null = True,
        blank = True
    )
    city = models.CharField(
        max_length = 150, null = True,
        blank = True
    )
    
    # META CLASS
    class Meta:
        """ Meta class for Client Model. """

        verbose_name = _("Client")
        verbose_name_plural = _("Clients")
        ordering = ['-created']
        
    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'
         
    def get_id_prefix(self):
        ''' Return a specific ID prefix for Client Model Objects '''
        return 'CLT'
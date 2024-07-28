import simplejson as Json
from django.db import models
from datetime import timedelta
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.utils.text import slugify
from django.contrib.auth.models import (
    AbstractBaseUser, 
    PermissionsMixin
)
from phonenumber_field.modelfields import PhoneNumberField

from apps.accounts.managers import UserManager
from apps.utils.models import TimeStampedUUIDModel

# Create your models here.

####
##      USER MODEL
#####
class User(AbstractBaseUser, PermissionsMixin, TimeStampedUUIDModel):
    """ Store information about registered users. """
    
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, blank=True,unique=True)
    first_name = models.CharField(
        max_length = 30, blank = True,
        validators = [
            RegexValidator(r'[a-zA-Z][a-zA-Z]+')
        ]
    )
    last_name = models.CharField(
        max_length = 30, blank = True,
        validators = [
            RegexValidator(r'[a-zA-Z][a-zA-Z]+')
        ]
    )
    phone_number = PhoneNumberField(
        _('phone number'), 
        unique = True, 
        null = True
    )
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)        # IF USER 'S PHONE NUMBER IS VERIFIED
    is_staff = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    # SET OBJECT MANAGER CLASS
    objects = UserManager()

    # SET EMAIL AND USER NAME FIELD FOR AUTHENTICATION
    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    
    # REQUIRED FIELDS FOR CREATIONG A SUPPERUSER
    REQUIRED_FIELDS = ['email','phone_number']
    
    
    # META CLASS
    class Meta:
        """ Meta class for User. """

        verbose_name = _("User")
        verbose_name_plural = _("Users")
        ordering = ['-created']
        
    def __str__(self):
        return self.full_name
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    def get_id_prefix(self):
        '''Returns the id prefix for User model. '''
        return 'USR'
    
    def generate_username(self):
        """ Generate a username for user """
        
        return f'{slugify(self.first_name)[:5]}{str(self.id).split("-")[-1]}'
    
    def clean(self):
        """ Is used to clean informations before calling save method """

        super().clean()
        
        # GENERATE UNIQUE CODE FOR USER IF THERE IS NO ONE
        if self.code in ('',' ',None):
            self.code=self.generate_code()
            
        # GENERATE ALSO USER NAME IF THERE IS NO ONE 
        if self.username in ('',' ',None):
            self.username = self.generate_username()
        
        # ENSURE USER PHONE NUMBER IS NOT NONE
        if self.phone_number in ('',' ',None):
            raise ValidationError(_('Phone number cannot be empty'))
        
    def activate(self):
        ''' Activate User Account '''
        
        self.is_active=True
        self.save()
        
    def deactivate(self):
        ''' Deactivate User Account '''
        
        self.is_active=False
        self.save()
        
    def mark_as_verified(self):
        ''' Mark user as verified '''
        
        self.is_verified = True
        self.save()
        
    def revok_verification(self):
        '''Change user phone number verification status to False.'''

        self.is_verified = True
        self.save()
        
    def mark_as_deleted(self):
        ''' Mark user as deleted. '''
        
        # UPDATE UNIQUE FIELDS VALUES TO 
        # ALLOW NEW USER WITH SAME INFORMATIONS TO REGISTER
        self.email = f'deleted-{self.email}'
        self.username = f'deleted-{self.username}-{self.phone_number}'
        self.phone_number = f'deleted-{self.phone_number}'
        self.is_active = False
        
        self.is_deleted = True
        self.save()
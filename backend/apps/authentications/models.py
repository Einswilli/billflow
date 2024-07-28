from django.db import models
from datetime import timedelta
from django.utils import timezone

from apps.accounts.models import(
    User
)
from apps.utils.models import TimeStampedUUIDModel

# Create your models here.

####
##      OTP MODEL
#####
class Otp(TimeStampedUUIDModel):
    ''' Store informations about User Verification Codes. '''
    
    digits = models.IntegerField()
    user = models.ForeignKey(
        User, on_delete = models.CASCADE,
        related_name = 'otps'
    )
    
    def __str__(self):
        return f'Otp for {self.user}'
    
    def save(self, *args, **kwargs):
        ''' Save Method override to genate code before saving. '''

        # CLEAN FIRST
        self.clean()
        
        #  GENERATE OTP DIGITS
        self.digits = self.generate_otp()
        return super().save(*args, **kwargs)
        
    def generate_otp(self):
        ''' Generate Otp code using random events. '''
        
        import random
        return random.randint(100000,999999)
    
    def is_valid(self):
        ''' Check that code has expired. '''
        
        # IT MUST RESPECT 10 MINUTES OF DELAY
        if timezone.now() - self.created <= timedelta(minutes=10):
            # THEN IT IS VALID
            return True
        return False
    
    def check_otp_code(self,code):
        ''' Check code. '''
        
        return self.digits == int(code)
    
    def clean(self):
        ''' Is used to clean data before saving. '''
        
        try:
            # CHECK IF USER ALREADY HAS OTP OBJECT AND DELETE THEM
            Otp.objects.filter(user = self.user).delete()
        except:
            pass
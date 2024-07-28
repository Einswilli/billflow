import uuid
from bson import ObjectId
from django.conf import settings
from django.db import models
from django_extensions.db.models import TimeStampedModel
# from server.storage import PrivateStorage


####
##      ABSTRACT TIMESTAMP AND UUID FIELDS MODEL
#####
class TimeStampedUUIDModel(TimeStampedModel):
    """ Provide created, updated_at and uuid field to models """
    
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    code = models.CharField(max_length=50,null=False,blank=True)

    # META CLASS
    class Meta:
        abstract = True
        
    def generate_code(self):
        """ Generate unique code for Model Object. """
        
        return f'{self.get_id_prefix()}-{str(ObjectId())}'
    
    def get_id_prefix(self):
        ''' Returns a unique prefix to use for a model objects identifier code. '''
        
        return 'OBJ'
    
    def save(self, *args, **kwargs):
        ''' Save Method override to clean Model instance data before saving. '''

        #  CLEAN 
        self.clean()
        super().save(*args, **kwargs)
        
    def clean(self):
        ''' Clean data before saving '''
        
        # GENERATE UNIQUE CODE IF THRE IS NO ONE
        if self.code in ('',' ',None):
            self.code = self.generate_code()


####
##      ABSTRACT MEDIA MODEL
#####
class Media(TimeStampedUUIDModel):
    ''' Base Model for all Medias. '''
    
    title = models.CharField(max_length = 255,default = 'No title yet.')
    description = models.TextField(default = 'No Description Yet.')
    file = models.FileField(upload_to = "medias")
    
    class Meta:
        abstract = True
        
    def get_id_prefix(self):
        return 'MED'

# class PrivateFileField(models.FileField):
#     def __init__(
#         self, verbose_name=None, name=None, upload_to="", storage=None, **kwargs
#     ):
#         storage = None
#         if hasattr(settings, "AWS_PRIVATE_MEDIA_LOCATION"):
#             storage = PrivateStorage()
#         super().__init__(verbose_name, name, upload_to, storage, **kwargs)
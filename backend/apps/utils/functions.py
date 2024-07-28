""" This module contains all utils functions """

from django.core.exceptions import ObjectDoesNotExist

####    GET OBJECT OR NONE
def get_object_or_None(model,**kvargs):
    """ Return a specific query marched Model objects. """

    try:
        return model.objects.get(**kvargs)
    except ObjectDoesNotExist:
        return None
    
    
####    GET HOST URL
# def get_host_url():
#     """ Get the host url from Learnia settings. """

#     from apps.settings.models import DmIASettings
#     return DmIASettings.objects.all().first().get_host_url()


####    GET OLLAMA HOST URL
# def get_ollama_host_url():
#     """ Get the host url from Learnia settings. """

#     from apps.settings.models import DmIASettings
#     return DmIASettings.objects.all().first().get_ollama_host_url()


##      GET DEFAULT AI MODEL
# def get_default_ai_model():
#     ''' Get the default AI model'''
    
#     from apps.settings.models import DmIASettings
#     return DmIASettings.objects.all().first().get_default_ai_model()


##      GET AI MODELS
# def get_ai_models():
#     ''' Get the available AI models'''
    
#     from apps.settings.models import DmIASettings
#     return DmIASettings.objects.all().first().__class__.AIMODELS


####    SEND SIMPLE NOTIFICATION
def send_simple_notfication(msg,_to):
    ''' Send dirrect notification to a phone number. '''
    
    from core.infobip import MessageManager
    
    sms = MessageManager().send_sms(
        msg,_to
    )
    return sms
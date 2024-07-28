from rest_framework import serializers

from apps.clients.models import (
    Client,
)


####
##      CLIENT SERIALIZER
#####
class ClientSerializer(serializers.ModelSerializer):
    ''' Serializer class for Client model. '''
    
    # META CLASS
    class Meta:
        ''' Meta class for ClientSerializer. '''
        model = Client
        fields = '__all__'
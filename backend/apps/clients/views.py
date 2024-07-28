from django.shortcuts import render
from rest_framework import filters
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import (
    IsAuthenticated,IsAdminUser,AllowAny
)

from apps.clients.serializers import (
    ClientSerializer
)

# Create your views here.


####
##      CLIENTS VIEWSET CLASS
#####
class ClientViewSet(ModelViewSet):
    ''' ViewSet class for Categories Model. '''
    
    queryset = ClientSerializer.Meta.model.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = [
        'code','first_name','last_name',
        'email','phone','address','city',
        'postal_code',
    ]
    lookup_field = 'id'
    
    def get_permissions(self):
        ''' Retrun permissions to use based on action '''
        
        # PERMISSIONS FOR LIST ACTION
        if self.action in ('list','retieve','update','partial_update'):
            self.permission_classes = [IsAuthenticated]
            
        # PERMISSIONS FOR PERFORMING CREATE AND DESTROY ACTIONS
        if self.action in ('create','destroy'):
            self.permission_classes = [
                IsAuthenticated,IsAdminUser
            ]
            
        return [
            permission() for permission in self.permission_classes
        ]
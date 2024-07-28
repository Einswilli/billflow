from django.shortcuts import render
from rest_framework import filters
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import (
    IsAuthenticated,IsAdminUser,AllowAny
)
from rest_framework.parsers import (
    MultiPartParser, FormParser, JSONParser
)

from apps.categories.serializers import (
    CategorySerializer
)

# Create your views here.


####
##      CATEGORIES VIEWSET CLASS
#####
class CategoryViewSet(ModelViewSet):
    ''' ViewSet class for Categories Model. '''
    
    queryset = CategorySerializer.Meta.model.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    parser_classes = [ MultiPartParser, FormParser, JSONParser]
    filter_backends = [filters.SearchFilter]
    search_fields = [
        'code','name','description'
    ]
    lookup_field = 'id'
    
    def get_permissions(self):
        ''' Retrun permissions to use based on action '''
        
        # PERMISSIONS FOR LIST ACTION
        if self.action in ('list','retieve'):
            self.permission_classes = [AllowAny]
            
        # PERMISSIONS FOR PERFORMING CREATE AND UPDATE ACTIONS
        if self.action in ('create','update','destroy'):
            self.permission_classes = [IsAuthenticated,IsAdminUser]
            
        return [
            permission() for permission in self.permission_classes
        ]
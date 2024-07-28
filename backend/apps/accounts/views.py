from django.shortcuts import render
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import (
    IsAuthenticated,IsAdminUser,AllowAny
)

from apps.accounts.permissions import (
    IsAccountOwner,
)
from apps.accounts.serializers import (
    UserSerializer, 
)
from apps.utils.functions import get_object_or_None

# Create your views here.


####
##      USERS VIEWSET CLASS
#####
class UserViewSet(ModelViewSet):
    """ User viewset class """
    
    queryset = UserSerializer.Meta.model.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = [
        'is_verified',
        'is_active','is_staff','is_superuser'
    ]
    search_fields = [
        'first_name','last_name','email',
        'username','phone_number'
    ]
    lookup_field = 'id'
    
    def get_permissions(self):
        ''' return a list of permissions needed according to an action nature '''
        
        # THE REQUESTING USER MUST BE THE OWNER
        if self.action in (
            'update','partial_update',
            'destroy','mark_as_deleted'
        ):
            self.permission_classes = [
                IsAuthenticated,IsAccountOwner
            ]
            
        # ONLY ADMINS AND STTAFF USERS CAN REQUEST USERS LIST
        if self.action == 'list':
            self.permission_classes = [
                IsAuthenticated,IsAdminUser
            ]
            
        # OLNLY SUPERUSERS AND DEPARTMENT ADMINS 
        if self.action in ('activate','deactivate'):
            self.permission_classes = [
                IsAuthenticated,IsAdminUser
            ]
            
        return [ permission() for permission in self.permission_classes ]
    
    @action(methods=['PUT'],detail=True)
    def activate(self,request,pk):
        ''' Set User account active status to True '''
        
        # ENSURE ACCOUNT WITH UUID "pk" EXISTS
        obj = get_object_or_None(self.serializer_class.Meta.model,id=pk)
        
        if obj is not None:
            # SET ACTIVE TO TRUE
            obj.activate()
            return Response(
                {
                    "status":"success",
                    "message":{
                        'en': f"{obj.full_name} has been activated",
                        'fr': f'{obj.full_name} a été activé.'
                    }
                },
                status = 201
            )
            
        # USER OBJECT DOES NOT EXIST
        return Response(
            {
                'status':'error',
                'message':{
                    'en': 'This user does not exist.',
                    'fr': 'Cet utilisateur n\'existe pas.'
                }
            },
            status = 404
        )
        
    @action(methods=['PUT'],detail=True)
    def deactivate(self,request,pk):
        ''' Set User account active status to False '''
        
        # ENSURE ACCOUNT WITH UUID "pk" EXISTS
        obj = get_object_or_None(
            self.serializer_class.Meta.model, id = pk
        )
        
        if obj is not None:
            # SET ACTIVE TO FALSE
            obj.activate()
            return Response(
                {
                    "status":"success",
                    "message":{
                        'en': f"{obj.full_name} has been deactivated",
                        'fr': f"{obj.full_name} a été désactivé."
                    }
                },
                status = 201
            )
            
        # USER OBJECT DOES NOT EXIST
        return Response(
            {
                'status':'error',
                'message':{
                    'en': 'This user does not exist.',
                    'fr': 'Cet utilisateur n\'existe pas.'
                }
            },
            status = 404
        )
        
    @action(methods=['DELETE'],detail=True)
    def mark_as_deleted(self,request,id):
        ''' Mark User account as deleted '''
        
        # ENSURE ACCOUNT WITH UUID "id" EXISTS
        obj = get_object_or_None(
            self.serializer_class.Meta.model,id=id
        )
        if obj is not None:
            # THEN SET DELETED TO TRUE
            obj.mark_as_deleted()
            return Response(
                {
                    'status':'success',
                    'message':{
                        'en': f'Account deleted successfully.',
                        'fr': 'Compte suprimé avec succès.'
                    }
                },
                status=200
            )
        
        # USER OBJECT DOES NOT EXIST
        return Response(
            {
                'status':'error',
                'message':{
                    'en': 'This user does not exist.',
                    'fr': 'Cet utilisateur n\'existe pas.'
                }
            },
            status = 404
        )

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import (
    IsAuthenticated,IsAdminUser,AllowAny
)

from apps.billings.serializers import (
    BillSerializer,
)


####
##      BILLS VIEWSET
#####
class BillViewSet(ModelViewSet):
    ''' ViewSet class for Products Model. '''
    
    queryset = BillSerializer.Meta.model.objects.all()
    serializer_class = BillSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = [
        'client','is_paid','is_validated'
    ]
    search_fields = [
        'client__first_name','client__last_name',
        'client__address','articles__product__name',
        'articles__product__category__name',
        'articles__product__category__description',
        'articles__product__description',
        'client__id','client__code'
    ]
    lookup_field = 'id'
    
    def get_permissions(self):
        ''' Define a way to use permissions based on requesting user. '''
        
        # USER MUST BE AN ADMIN BEFORE REQUESTING DELETE OR UPDATE ACTION
        if self.action in ('destroy','update'):
            self.permission_classes = [IsAuthenticated,IsAdminUser]
            
        return super().get_permissions()
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import (
    IsAuthenticated,IsAdminUser,AllowAny
)

from apps.products.serializers import (
    ProductSerializer,
)


####
##      PRODUCTS VIEWSET
#####
class ProductsViewSet(ModelViewSet):
    ''' ViewSet class for Products Model. '''
    
    queryset = ProductSerializer.Meta.model.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['category','brand']
    search_fields = [
        'name','description','brand',
        'category__name','category__description',
        'category__code','category__id'
    ]
    lookup_field = 'id'
    
    def get_permissions(self):
        ''' Define a way to use permissions based on requesting user. '''
        
        # USER MUST BE AN ADMIN BEFORE REQUESTING DELETE OR UPDATE ACTION
        if self.action in ('destroy','update'):
            self.permission_classes = [IsAuthenticated,IsAdminUser]
            
        return super().get_permissions()
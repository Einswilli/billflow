from rest_framework import serializers

from apps.products.models import (
    Product
)

####
##      PRODUCT SERIALIZER
#####
class ProductSerializer(serializers.ModelSerializer):
    ''' Serializer class for Products Model. '''
    
    # META CLASS
    class Meta:
        ''' Meta class for Product Serializer. '''
        model = Product
        fields ="__all__"
        
    def to_representation(self, instance:Product):
        ''' Override Instance reprensentation method to customize fields. '''
        
        # GET INSTANCE REPRESENTATION FIRST
        rep = super().to_representation(instance)
        
        rep['category'] = {
            'id': str(instance.category.id),
            'code': instance.category.code,
            'name': instance.category.name
        }
        
        return rep
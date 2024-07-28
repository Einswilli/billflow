from rest_framework import serializers

from apps.categories.models import (
    Category,
)


####
##      CATEGORY SERIALIZER
#####
class CategorySerializer(serializers.ModelSerializer):
    ''' Serializer class for Category model. '''
    
    # META CLASS
    class Meta:
        ''' Meta class for CategorySerializer. '''
        model = Category
        fields = '__all__'
        
    def to_representation(self, instance:Category):
        ''' Override to representation method to add customizations. '''
        
        # GET INSTANCE REPRESENTATION FIRST
        rep = super().to_representation(instance)
        
        # ADD CHILDREN TO FINAL REPRESENTATION.
        rep['children'] = CategorySerializer(
            instance = instance.children.all(), 
            many=True
        ).data
        
        return rep
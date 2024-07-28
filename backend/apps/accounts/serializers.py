from rest_framework import serializers

from apps.accounts.models import (
    User, 
)


####
##      USER SERIALIZER
#####
class UserSerializer(serializers.ModelSerializer):
    ''' Serializer for User Model '''
    
    # META CLASS
    class Meta:
        ''' Meta class for User Serializer '''
        
        model = User
        exclude = ('groups','user_permissions')
        extra_kwargs = {
            'password':{
                'write_only':True,
                'min_length':8
            },
            'username':{
                'read_only':True
            },
            'fcm_token':{
                'write_only':True
            },
            'phone_number':{
                'required':True
            }
        }
        # fields='__all__'
        
    def to_representation(self,instance:User):
        ''' Define how to represent User Model Object as Json '''
        
        # RETURN USER REPRESENTATION BASED ON USER PROFILE
        
        return super().to_representation(
            instance = instance
        )
        
    def create(self, validated_data):
        
        # POP PASSWORD FROM VALIDATED DATA
        password = validated_data.pop("password")
        data = validated_data

        instance = self.Meta.model.objects.create(
            **data
        )
        # HASHING PASSWORD 
        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance
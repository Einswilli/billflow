from rest_framework import serializers

from apps.billings.models import (
    Article, Bill
)
from apps.products.serializers import (
    ProductSerializer
)
from apps.clients.serializers import ClientSerializer

####
##      ARTICLES SERIALIZER
#####
class ArticleSerializer(serializers.ModelSerializer):
    ''' Serializer class for Articles Model. '''
    
    # META CLASS
    class Meta:
        ''' Meta class for Article Serializer. '''
        model = Article
        fields ="__all__"
        
    def to_representation(self, instance:Article):
        ''' Override Instance reprensentation method to customize fields. '''
        
        # GET INSTANCE REPRESENTATION FIRST
        rep = super().to_representation(instance)
        
        rep['product'] = ProductSerializer(
            instance = instance.product
        ).data
        
        rep['total'] = instance.total()
        
        return rep
    
    
####
##      BILL SERIALIZER
#####
class BillSerializer(serializers.ModelSerializer):
    ''' Serializer class for Bills Model. '''
    
    articles = ArticleSerializer(many = True)
    
    # META CLASS
    class Meta:
        ''' Meta class for Bill Serializer. '''
        model = Bill
        fields ="__all__"
        extra_kwargs = {
            'articles':{
                'read_only': True
            }
        }
        
    def to_representation(self, instance:Bill):
        ''' Override Instance reprensentation method to customize fields. '''
        
        # GET INSTANCE REPRESENTATION FIRST
        rep = super().to_representation(instance)
        
        # ADD CLIENT REPRESENTATION 
        rep['client'] = ClientSerializer(
            instance = instance.client
        ).data
        
        # ADD ARTICLES TO REPRESENTATION
        rep['articles'] = ArticleSerializer(
            instance = instance.articles,
            many = True
        ).data
        
        # ADD TOTAL TOO
        rep['total'] = instance.total()
        
        return rep
    
    def create(self, validated_data):
        ''' Override create method to auto create articles. '''
        
        # GET ARTICLES FIRST
        articles = validated_data.pop('articles')
        # THEN CREATE THE BILL OBJECT
        bill= Bill.objects.create(**validated_data)
        
        # NOW ADD EACH CREATED ARTICLE TO THE BILL
        for article in articles :
            a = Article.objects.create(**article)
            bill.articles.add(a)

        return bill
from rest_framework.permissions import BasePermission


####
##      IS ACCOUNT OWNER PERMISSION CLASS
#####
class IsAccountOwner(BasePermission):
    """ 
    Custom permission class that checks if request user Owned or has permission 
    access User object
    """

    def has_permission(self, request, view):
        ''' Check if requesting user is account owner '''
        return self.has_object_permission(
            request, view, view.get_object()
        )
    
    def has_object_permission(self, request, view,obj):
        ''' Check if requesting user is account owner '''
        
        return request.user.id == obj.id
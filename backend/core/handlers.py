''' This module contains all custom status handlers. '''
from django.http import JsonResponse

## HANDLER 404
def custom_404(request, exception):
    print(type(exception, exception))
    return JsonResponse(
        {
            "error": "Not found"
        }, 
        status = 404
    )
    
## HANDLER 403
def custom_403(request,exception):
    print(type(exception, exception))
    return JsonResponse(
        {
            "error": "Forbidden"
        }, 
        status = 403
    )
    
## HANDLER 400
def custom_400(request,exception):
    print(type(exception, exception))
    return JsonResponse(
        {
            "error": "Bad request"
        }, 
        status = 400
    )
    
## HANDLER 500
def custom_500(exception):
    print(type(exception),exception)
    return JsonResponse(
        {
            "error": "Internal server error"
        }, 
        status = 500
    )
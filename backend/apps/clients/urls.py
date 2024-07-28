from rest_framework import routers

from apps.clients.views import (
    ClientViewSet,
)

# INSTANCIATE DEFAULT ROUTER
router = routers.DefaultRouter(trailing_slash = False)

# CLIENTS URLS
router.register(
    '', ClientViewSet
)

urlpatterns = router.urls
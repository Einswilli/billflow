from rest_framework import routers

from apps.products.views import (
    ProductsViewSet,
)

# INSTANCIATE DEFAULT ROUTER
router = routers.DefaultRouter(trailing_slash = False)

# PRODUCTS URLS
router.register(
    '', ProductsViewSet
)

urlpatterns = router.urls
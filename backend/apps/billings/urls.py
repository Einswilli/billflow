from rest_framework import routers

from apps.billings.views import (
    BillViewSet,
)

# INSTANCIATE DEFAULT ROUTER
router = routers.DefaultRouter(trailing_slash = False)

# BILLS URLS
router.register(
    '', BillViewSet
)

urlpatterns = router.urls
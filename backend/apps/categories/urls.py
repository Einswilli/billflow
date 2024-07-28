from rest_framework import routers

from apps.categories.views import (
    CategoryViewSet,
)

# INSTANCIATE DEFAULT ROUTER
router = routers.DefaultRouter(trailing_slash = False)

# CATEGORIES URLS
router.register(
    '', CategoryViewSet
)

urlpatterns = router.urls
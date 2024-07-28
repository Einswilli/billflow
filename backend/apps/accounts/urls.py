from rest_framework import routers

from apps.accounts.views import (
    UserViewSet,
)

# INSTANCIATE DEFAULT ROUTER
router = routers.DefaultRouter(trailing_slash = False)

# USERS URLS
router.register(
    'users', UserViewSet
)

urlpatterns = router.urls
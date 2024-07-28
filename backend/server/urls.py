"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.conf.urls import (
    handler404, handler403, handler400,
    handler500,
)
from core.handlers import (
    custom_404, custom_403, 
    custom_400, custom_500
)

# handler404 = custom_404
# handler500 = 'rest_framework.exceptions.server_error'

admin.site.site_header = 'DREAMMORE'
admin.site.index_title = "Welcome to DREAMMORE ADMIN PANEL"
admin.site.site_title = 'DREAMMORE'

urlpatterns = [
    path("admin/", admin.site.urls),
    path('auth/',include('apps.authentications.urls')),
    path('accounts/',include('apps.accounts.urls')),
    path('clients/',include('apps.clients.urls')),
    path('categories/',include('apps.categories.urls')),
    path('products/',include('apps.products.urls')),
    path('billings/',include('apps.billings.urls')),
]\
+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)\
+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

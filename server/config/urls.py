from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from app.views import ExampleViewSet


api_router = routers.DefaultRouter()
api_router.register("example", ExampleViewSet)


urlpatterns = [
    path("api/", include(api_router.urls)),
    path("admin/", admin.site.urls),
]

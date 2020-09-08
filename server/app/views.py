from rest_framework import viewsets

from .models import Example
from .serializers import ExampleSerializer


class ExampleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Example.objects.all()
    serializer_class = ExampleSerializer

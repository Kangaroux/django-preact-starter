from django.db import models


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    message = models.TextField(null=False, blank=False)

    class Meta:
        abstract = True


class Example(BaseModel):
    pass

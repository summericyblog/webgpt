from django.urls import path
from . import views

urlpatterns = [
    path("", views.polish, name="polish"),
    path("latex", views.polish_latex, name="polish-latex"),
]

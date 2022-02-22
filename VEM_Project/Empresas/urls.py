from django.urls import path

# Views
from empresas import views

urlpatterns = [
    path(
        route='perfil/',
        view=views.perfil,
        name='perfil'
    ),

]
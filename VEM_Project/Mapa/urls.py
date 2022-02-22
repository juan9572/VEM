from django.urls import path

# Views
from mapa import views

urlpatterns = [
    path(
        route='home/',
        view=views.home,
        name='home'
    ),

    path(
        route='vistaMapa',
        view=views.vistaMapa,
        name='vistaMapa'
    )

]
from django.urls import path

# Views
from eventos import views

urlpatterns = [
    path(
        route='eventosFinalizados/',
        view=views.eventosFinalizados,
        name='eventosFinalizados'
    ),

]
from django.urls import path

# Views
from usuarios import views

urlpatterns = [
    path(
        route='informacion/',
        view=views.informacion,
        name='informacion'
    ),

]
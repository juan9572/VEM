
#Django
from django.shortcuts import render


# Create your views here.
def error_404(request,exception):
    """Muestra la vista por defecto del error 404 o cuando se accede a una página que no está disponible en el dominio web."""
    return render(request=request,template_name='404.html')

def home(request):
    """Muestra la vista para que se logee el cliente"""
    return render(request=request,
                  template_name='mapa/home.html',
                  )

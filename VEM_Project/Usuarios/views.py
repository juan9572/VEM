from django.shortcuts import render

def informacion(request):
    return render(request,template_name='usuarios/informacion.html')
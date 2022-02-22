from django.shortcuts import render

# Create your views here.
def eventosFinalizados(request):
    return render(request,template_name='eventos/eventosFinalizados.html')
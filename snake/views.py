from django.shortcuts import render

# Create your views here.
def snakes(request):
    return render(request, 'snake.html')

def home(request):
    return render(request, 'index.html')
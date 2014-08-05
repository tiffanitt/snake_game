from django.contrib.auth.forms import *
from django.shortcuts import render, redirect

# Create your views here.
from snake.forms import EmailUserCreationForm


def snakes(request):
    return render(request, 'snake.html')

def home(request):
    return render(request, 'index.html')

def login(request):
    return render(request, 'registration/login.html')

def register(request):
    if request.method == 'POST':
        form = EmailUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("login")
    else:
        form = EmailUserCreationForm()

    return render(request, "registration/register.html", {
        'form': form,
    })
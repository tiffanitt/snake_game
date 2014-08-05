import json
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import *
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from snake.forms import EmailUserCreationForm
from snake.models import Score

@login_required
def snakes(request):
    return render(request, 'snake.html')

def home(request):
    return render(request, 'index.html')

def login(request):
    return render(request, 'registration/login.html')

def profile(request):
    return render(request, 'registration/profile.html')

def register(request):
    if request.method == 'POST':
        form = EmailUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("/account/profile")
    else:
        form = EmailUserCreationForm()

    return render(request, "registration/register.html", {
        'form': form,
    })

@csrf_exempt
def more_score(request):
    if request.method == "POST":
        data = json.loads(request.body)
        Score.objects.create(
            scores = int(data['score']),
            user=request.user,
            which_game = data['game'],
        )
        return HttpResponseRedirect('/profile/')

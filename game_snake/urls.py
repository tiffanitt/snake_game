from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'game_snake.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'snake.views.home', name='home'),
    url(r'^snakes/$', 'snake.views.snakes', name='snakes'),
    url(r'^register/$', 'snake.views.register', name='register'),
    url(r'^login/$', 'django.contrib.auth.views.login', name='login'),
    url(r'^profile/$', 'snake.views.profile', name='profile'),
    url(r'^more_score/$', 'snake.views.more_score', name='more_score'),




)

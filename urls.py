from django.conf.urls import patterns, include, url
from gbd.views import *

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
                       (r'^$', IndexView.as_view()),
                       (r'^([^.]+.(?:css|js|html))$', StaticFileView.as_view())
    # Examples:
    # url(r'^$', 'GunboatDiplomacy.views.home', name='home'),
    # url(r'^GunboatDiplomacy/', include('GunboatDiplomacy.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)

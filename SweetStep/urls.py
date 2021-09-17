from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

from SweetStep import views, settings

urlpatterns = [

    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('contact_us/', views.contact_us, name='contact_us')

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

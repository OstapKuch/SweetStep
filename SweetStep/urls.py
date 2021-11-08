from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

from SweetStep import views, settings

urlpatterns = [

    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('contact_us/', views.contact_us, name='contact_us'),
    path('cart/', views.cart, name='cart'),
    path('delivery/', views.delivery, name='delivery'),
    path('images/', views.images, name='images'),
    path('products/', views.products, name='products'),
    # path('wayforpay/', views.wayforpay, name='wayforpay')
    path('checkout/', views.checkout, name='checkout')

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

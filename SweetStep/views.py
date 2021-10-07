from django.http import JsonResponse
from django.shortcuts import render, redirect
from .models import ProductImage, Product
from django.core.mail import send_mail
from django.core import serializers
from django.http import HttpResponse



def index(request):
    products = Product.objects.all()
    images = ProductImage.objects.all().filter(is_main_image=1)
    return render(request, 'index.html',
                  {
                      'products': products,
                      'images': images
                  })


def products(request):
    all_products = Product.objects.all()
    qs_json = serializers.serialize('json', all_products)
    images = ProductImage.objects.all().filter(is_main_image=1)
    return HttpResponse(qs_json, content_type='application/json')
    # return JsonResponse(
    #     {
    #         'products': qs_json,
    #         'images': images
    #     }
    # )

def images(request):
    images = ProductImage.objects.all().filter(is_main_image=1)
    qs_json = serializers.serialize('json', images)
    return HttpResponse(qs_json, content_type='application/json')
    # return JsonResponse(
    #     {
    #         'products': qs_json,
    #         'images': images
    #     }
    # )

def cart(request):
    products = Product.objects.all()
    images = ProductImage.objects.all().filter(is_main_image=1)
    return render(request, 'shopping_cart.html',
                  {
                      'products': products,
                      'images': images
                  })


def contact_us(request):
    name = request.POST.get('name')
    phone_number = request.POST['phone_number']
    email = request.POST['email']
    print(name, phone_number, email)
    return JsonResponse({'foo': 'bar'})


def send_email(recipient, title, message):
    send_mail(
        title,
        message,
        "DEFAULT_SENDER",
        [recipient],
        fail_silently=False,
    )

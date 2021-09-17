from django.http import JsonResponse
from django.shortcuts import render, redirect
from .models import ProductImage, Product
from django.core.mail import send_mail



def index(request):
    products = Product.objects.all()
    images = ProductImage.objects.all().filter(is_main_image=1)
    return render(request, 'index.html',
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

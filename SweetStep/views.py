import datetime
import hashlib
import hmac
import json

from django.http import JsonResponse
from django.shortcuts import render, redirect
from .models import ProductImage, Product, Order
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


def delivery(request):
    return render(request, 'delivery_info.html')


def wayforpay(request):
    # print(request.POST.)
    if request.method == 'POST':
        data = json.loads(request.body.decode('UTF-8'))
    print(data)
    all_products = Product.objects.all()
    product_name = []
    product_price = []
    product_count = []
    cart_json = json.loads(data["cart"])
    cart_sum = 0
    for product in all_products:
        print(product.pk)
        for i in cart_json:
            if i == 'product_' + str(product.pk):
                product_name.append(product.title)
                product_price.append(product.price)
                product_count.append(cart_json[i])
                cart_sum += int(product.price) * int(cart_json[i])
    print(product_name, product_price, product_count, cart_sum)
    info = ""
    for i in range(0, len(product_name)):
        info += "{ " + str(product_name[i]) + " " + str(product_count[i]) + "шт " + str(product_price[i]) + "грн }\n "
    print(info)
    order = Order.objects.create(user_name=data['name'],
                                 user_surname=data['surname'],
                                 user_middle_name=data['middle_name'],
                                 phone=data['phone'],
                                 email=data['email'],
                                 city=data['post'],
                                 post_number=data['post'],
                                 order_info=info,
                                 total_price=cart_sum,
                                 order_date=datetime.datetime.now(),
                                 paid=0
                                 )
    # print(data['cart'][product_id])
    merchant_account = "lvivtranstour_site"
    merchant_domain_name = "lvivtranstour.site"
    order_reference = str(order.pk)
    order_date = "1415379863"
    # url which will be rendered after successful payment
    return_url = ""
    # RU UA EN or AUTO (based on browser)
    language = "UA"
    # sum of the whole order
    amount = str(cart_sum)
    currency = "UAH"
    # list of products in cart
    # product_name = ["Чурчхелла", "Ірис"]
    # prices for each product
    # product_price = ["1", "1"]
    # product count in cart
    # product_count = ["1", "1"]
    string = merchant_account + ";" + merchant_domain_name + ";" + order_reference + ";" + order_date + ";" \
             + amount + ";" + currency
    for i in product_name:
        string += ";" + i
    for i in product_count:
        string += ";" + str(i)
    for i in product_price:
        string += ";" + str(i)

    print(string)
    update_bytes = bytes(string, 'utf-8')
    secret_key = bytes("9f37aeff7b368d2546d60422878d70ecbf42f7a1", 'utf-8')
    key = hmac.new(secret_key, update_bytes, hashlib.md5).hexdigest()
    print()
    response = {
        'merchant_account': merchant_account,
        'merchant_domain_name': merchant_domain_name,
        'order_reference': order_reference,
        'order_date': order_date,
        'amount': amount,
        'product_name': product_name,
        'product_price': product_price,
        'product_count': product_count,
        'key': key
    }
    return HttpResponse(json.dumps(response), content_type='application/json')


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

from django.db import models

BOOLEAN_CHOICES = (
    (1, 1),
    (0, 0)
)


class Product(models.Model):
    title = models.CharField(max_length=60)
    price = models.IntegerField()
    description = models.CharField(max_length=750)

    def __str__(self):
        return self.title

class ProductImage(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    is_main_image = models.IntegerField(choices=BOOLEAN_CHOICES, help_text="1 - якщо головна картинка, 0 - якщо ні")
    image = models.ImageField(upload_to='images/')
    image_name = models.CharField(max_length=50)

    def __str__(self):
        return self.image_name


class Order(models.Model):
    user_name = models.CharField(max_length=100)
    user_surname = models.CharField(max_length=100)
    user_middle_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=12)
    city = models.CharField(max_length=100)
    post_number = models.CharField(max_length=100)
    order_info = models.CharField(max_length=5000)
    total_price = models.CharField(max_length=60)
    order_date = models.CharField(max_length=60)
    paid = models.IntegerField()

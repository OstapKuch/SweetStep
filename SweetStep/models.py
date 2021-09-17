from django.db import models

BOOLEAN_CHOICES = (
    (1, 1),
    (0, 0)
)


class Product(models.Model):
    title = models.CharField(max_length=60)
    price = models.IntegerField()
    description = models.CharField(max_length=750)


class ProductImage(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    is_main_image = models.IntegerField(choices=BOOLEAN_CHOICES, help_text="1 - якщо головна картинка, 0 - якщо ні")
    image = models.ImageField(upload_to='images/')
    image_name = models.CharField(max_length=50)

    def __str__(self):
        return self.image_name

from django.contrib import admin
from .models import Product, ProductImage


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    fields = ('title', 'description', 'price')


@admin.register(ProductImage)
class ProductImagesAdmin(admin.ModelAdmin):
    fields = ('product_id', 'is_main_image', 'image', 'image_name')
    list_display = ('product_id', 'is_main_image')
    list_filter = (
        'product_id',
        'is_main_image'
    )

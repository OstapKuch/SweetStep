from django.contrib import admin
from .models import Product, ProductImage, Order, MainImage


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    fields = (
        'title',
        'description',
        'price'
    )


@admin.register(ProductImage)
class ProductImagesAdmin(admin.ModelAdmin):
    fields = ('product_id', 'image', 'image_name')
    # list_display = ('product_id')
    # list_filter = (
    #     'product_id'
    #     # 'is_main_image'
    # )


@admin.register(Order)
class ProductAdmin(admin.ModelAdmin):
    fields = (
        'user_name',
        'user_surname',
        'user_middle_name',
        'email', 'phone',
        'post_number',
        'order_info',
        'total_price',
        'order_date'
    )


@admin.register(MainImage)
class ProductAdmin(admin.ModelAdmin):
    fields = (
        'image',
    )

# Generated by Django 3.2.8 on 2021-11-08 12:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MainImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=100)),
                ('user_surname', models.CharField(max_length=100)),
                ('user_middle_name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=12)),
                ('city', models.CharField(max_length=100)),
                ('post_number', models.CharField(max_length=100)),
                ('order_info', models.CharField(max_length=5000)),
                ('total_price', models.CharField(max_length=60)),
                ('order_date', models.CharField(max_length=60)),
                ('paid', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=60)),
                ('price', models.IntegerField()),
                ('description', models.CharField(max_length=750)),
            ],
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_main_image', models.IntegerField(choices=[(1, 1), (0, 0)], default=1, help_text='1 - якщо головна картинка, 0 - якщо ні')),
                ('image', models.ImageField(upload_to='images/')),
                ('image_name', models.CharField(max_length=50)),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SweetStep.product')),
            ],
        ),
    ]

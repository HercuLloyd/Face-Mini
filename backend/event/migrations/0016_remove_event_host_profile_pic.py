# Generated by Django 5.0.6 on 2024-05-31 09:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0015_event_host_profile_pic'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='host_profile_pic',
        ),
    ]

# Generated by Django 5.0.6 on 2024-05-29 04:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0006_alter_event_post'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='post',
        ),
        migrations.AddField(
            model_name='eventpost',
            name='event',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='post_in_event', to='event.event'),
            preserve_default=False,
        ),
    ]

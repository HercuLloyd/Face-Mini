# Generated by Django 5.0.6 on 2024-06-06 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0017_alter_eventpost_message'),
        ('user', '0005_alter_profile_user_memories'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='user_memories',
            field=models.ManyToManyField(blank=True, to='event.event'),
        ),
    ]

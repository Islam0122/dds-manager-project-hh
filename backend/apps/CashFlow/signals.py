from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.core.management import call_command
from .models import Status, OperationType, Category, Subcategory, CashFlow

@receiver(post_migrate)
def load_event_data(sender, **kwargs):
    if not Status.objects.exists() or not OperationType.objects.exists() or not Category.objects.exists() or not Subcategory.objects.exists():
        call_command('loaddata', 'apps/CashFlow/fixtures/initial_data.json')

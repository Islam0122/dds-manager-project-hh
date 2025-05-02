from django.apps import AppConfig


class CashflowConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.CashFlow'
    verbose_name = 'CashFlow'

    def ready(self):
        import apps.CashFlow.signals

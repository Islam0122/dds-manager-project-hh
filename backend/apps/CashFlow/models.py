from django.db import models
from datetime import date

class Status(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Статус",
        help_text="Например: Бизнес, Личное, Налог"
    )

    class Meta:
        verbose_name = "Статус"
        verbose_name_plural = "Статусы"

    def __str__(self):
        return self.name


class OperationType(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Тип операции",
        help_text="Например: Пополнение, Списание"
    )

    class Meta:
        verbose_name = "Тип операции"
        verbose_name_plural = "Типы операций"

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name="Категория"
    )
    operation_type = models.ForeignKey(
        OperationType,
        on_delete=models.CASCADE,
        verbose_name="Тип операции",
        help_text="Категория принадлежит определённому типу операции"
    )

    class Meta:
        unique_together = ('name', 'operation_type')
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return f"{self.name} ({self.operation_type})"


class Subcategory(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name="Подкатегория"
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        verbose_name="Категория",
        help_text="Подкатегория принадлежит определённой категории"
    )

    class Meta:
        unique_together = ('name', 'category')
        verbose_name = "Подкатегория"
        verbose_name_plural = "Подкатегории"

    def __str__(self):
        return f"{self.name} ({self.category})"


class CashFlow(models.Model):
    date = models.DateField(
        default=date.today,
        verbose_name="Дата записи",
        help_text="Дата создания записи. По умолчанию — сегодня."
    )
    status = models.ForeignKey(
        Status,
        on_delete=models.PROTECT,
        verbose_name="Статус",
        help_text="Выберите статус: Бизнес, Личное и т.д."
    )
    operation_type = models.ForeignKey(
        OperationType,
        on_delete=models.PROTECT,
        verbose_name="Тип операции",
        help_text="Пополнение или Списание"
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        verbose_name="Категория"
    )
    subcategory = models.ForeignKey(
        Subcategory,
        on_delete=models.PROTECT,
        verbose_name="Подкатегория"
    )
    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name="Сумма",
        help_text="Укажите сумму в рублях, например 1000.00"
    )
    comment = models.TextField(
        blank=True,
        null=True,
        verbose_name="Комментарий",
        help_text="Необязательный комментарий к записи"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Создано"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Обновлено"
    )

    class Meta:
        verbose_name = "Денежная операция"
        verbose_name_plural = "Денежные операции"
        ordering = ['-date']

    def __str__(self):
        return f"{self.date} | {self.operation_type} | {self.category} > {self.subcategory} | {self.amount}₽"

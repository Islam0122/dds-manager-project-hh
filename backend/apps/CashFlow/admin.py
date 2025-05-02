from django.contrib import admin
from django.utils.html import format_html
from .models import Status, OperationType, Category, Subcategory, CashFlow


@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = ('name', 'edit_link')
    search_fields = ('name',)
    list_filter = ('name',)
    ordering = ('name',)
    fieldsets = (
        (None, {
            'fields': ('name',)
        }),
    )
    verbose_name = "Статус"
    verbose_name_plural = "Статусы"

    def edit_link(self, obj):
        return format_html('<a href="/admin/app_name/status/{}/change/">Изменить</a>', obj.pk)

    edit_link.short_description = "Ссылка на изменение"


@admin.register(OperationType)
class OperationTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'edit_link')
    search_fields = ('name',)
    list_filter = ('name',)
    ordering = ('name',)
    fieldsets = (
        (None, {
            'fields': ('name',)
        }),
    )
    verbose_name = "Тип операции"
    verbose_name_plural = "Типы операций"

    def edit_link(self, obj):
        return format_html('<a href="/admin/app_name/operationtype/{}/change/">Изменить</a>', obj.pk)

    edit_link.short_description = "Ссылка на изменение"


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'operation_type', 'edit_link')
    search_fields = ('name', 'operation_type__name')
    list_filter = ('operation_type',)
    ordering = ('name',)
    list_select_related = ('operation_type',)
    fieldsets = (
        (None, {
            'fields': ('name', 'operation_type')
        }),
    )
    verbose_name = "Категория"
    verbose_name_plural = "Категории"

    def edit_link(self, obj):
        return format_html('<a href="/admin/app_name/category/{}/change/">Изменить</a>', obj.pk)

    edit_link.short_description = "Ссылка на изменение"


@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'edit_link')
    search_fields = ('name', 'category__name')
    list_filter = ('category',)
    ordering = ('name',)
    list_select_related = ('category',)
    fieldsets = (
        (None, {
            'fields': ('name', 'category')
        }),
    )
    verbose_name = "Подкатегория"
    verbose_name_plural = "Подкатегории"

    def edit_link(self, obj):
        return format_html('<a href="/admin/app_name/subcategory/{}/change/">Изменить</a>', obj.pk)

    edit_link.short_description = "Ссылка на изменение"


@admin.register(CashFlow)
class CashFlowAdmin(admin.ModelAdmin):
    list_display = (
    'date', 'operation_type', 'category', 'subcategory', 'amount', 'status', 'created_at', 'updated_at', 'edit_link')
    search_fields = ('status__name', 'operation_type__name', 'category__name', 'subcategory__name', 'amount')
    list_filter = ('status', 'operation_type', 'category', 'subcategory', 'date')
    ordering = ('-date',)
    list_select_related = ('status', 'operation_type', 'category', 'subcategory')

    fieldsets = (
        (None, {
            'fields': ('date', 'status', 'operation_type', 'category', 'subcategory', 'amount', 'comment')
        }),
        ('Метаданные', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    date_hierarchy = 'date'

    def edit_link(self, obj):
        return format_html('<a href="/admin/app_name/cashflow/{}/change/">Изменить</a>', obj.pk)

    edit_link.short_description = "Ссылка на изменение"

    verbose_name = "Денежная операция"
    verbose_name_plural = "Денежные операции"


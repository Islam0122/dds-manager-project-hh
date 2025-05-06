from rest_framework import serializers
from .models import Status, OperationType, Category, Subcategory, CashFlow


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ['id', 'name']
        read_only_fields = ['id']


class OperationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OperationType
        fields = ['id', 'name']
        read_only_fields = ['id']


class CategorySerializer(serializers.ModelSerializer):
    operation_type = serializers.PrimaryKeyRelatedField(queryset=OperationType.objects.all())

    class Meta:
        model = Category
        fields = ['id', 'name', 'operation_type']
        read_only_fields = ['id']


class SubcategorySerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Subcategory
        fields = ['id', 'name', 'category']
        read_only_fields = ['id']


class CashFlowSerializer(serializers.ModelSerializer):
    status = serializers.PrimaryKeyRelatedField(queryset=Status.objects.all())
    operation_type = serializers.PrimaryKeyRelatedField(queryset=OperationType.objects.all())
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    subcategory = serializers.PrimaryKeyRelatedField(queryset=Subcategory.objects.all())

    class Meta:
        model = CashFlow
        fields = ['id', 'date', 'status', 'operation_type', 'category', 'subcategory', 'amount', 'comment', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def validate(self, data):
        category = data.get('category')
        subcategory = data.get('subcategory')
        operation_type = data.get('operation_type')

        if category.operation_type != operation_type:
            raise serializers.ValidationError("Категория не относится к выбранному типу операции.")
        if subcategory.category != category:
            raise serializers.ValidationError("Подкатегория не относится к выбранной категории.")

        return data

    def create(self, validated_data):
        return CashFlow.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.date = validated_data.get('date', instance.date)
        instance.status = validated_data.get('status', instance.status)
        instance.operation_type = validated_data.get('operation_type', instance.operation_type)
        instance.category = validated_data.get('category', instance.category)
        instance.subcategory = validated_data.get('subcategory', instance.subcategory)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()
        return instance

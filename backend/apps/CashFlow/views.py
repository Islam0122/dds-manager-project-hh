from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import *
from django.db import models

class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer


class OperationTypeViewSet(viewsets.ModelViewSet):
    queryset = OperationType.objects.all()
    serializer_class = OperationTypeSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.all()
    serializer_class = SubcategorySerializer


class CashFlowViewSet(viewsets.ModelViewSet):
    queryset = CashFlow.objects.all()
    serializer_class = CashFlowSerializer

    def get_queryset(self):
        queryset = CashFlow.objects.all()
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status__id=status)

        operation_type = self.request.query_params.get('operation_type', None)
        if operation_type:
            queryset = queryset.filter(operation_type__id=operation_type)

        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__id=category)

        return queryset

    @action(detail=False, methods=['get'])
    def statistics(self, request):
        status = request.query_params.get('status', None)
        operation_type = request.query_params.get('operation_type', None)
        category = request.query_params.get('category', None)
        queryset = CashFlow.objects.all()
        if status:
            queryset = queryset.filter(status__id=status)
        if operation_type:
            queryset = queryset.filter(operation_type__id=operation_type)
        if category:
            queryset = queryset.filter(category__id=category)
        total_amount = queryset.aggregate(total_amount=models.Sum('amount'))

        return Response(total_amount)

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

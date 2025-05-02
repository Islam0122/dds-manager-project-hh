from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StatusViewSet, OperationTypeViewSet, CategoryViewSet, SubcategoryViewSet, CashFlowViewSet

router = DefaultRouter()

router.register(r'status', StatusViewSet)
router.register(r'operation-types', OperationTypeViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'subcategories', SubcategoryViewSet)
router.register(r'cashflows', CashFlowViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

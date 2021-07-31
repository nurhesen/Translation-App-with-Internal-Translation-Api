from django.urls import path
from .views import TranslationTrDetail, TranslationAzDetail

app_name='appcore'

urlpatterns = [

    path('translation_tr/<str:word>/', TranslationTrDetail.as_view(), name='api'),
    path('translation_az/<str:word>/', TranslationAzDetail.as_view(), name='api'),


]

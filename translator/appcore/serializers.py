from rest_framework import serializers
from .models import Words, WordsAz

class WordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Words
        fields = ['word','translation']

class WordsAzSerializer(serializers.ModelSerializer):
    class Meta:
        model = WordsAz
        fields = ['word','translation']
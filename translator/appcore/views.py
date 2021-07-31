from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Words, WordsAz
from .serializers import WordsSerializer, WordsAzSerializer
from django.http import Http404
from rest_framework.views import APIView
from django.db.models import Q


class TranslationTrDetail(APIView):

    def get_object(self, word):
        try:
            return Words.objects.get(word__iexact=word)
        except Words.DoesNotExist:
            x1 = Words.objects.filter(word__startswith=word[0:-1])
            if len(x1)>0:
                val = [m for m in x1 if len(m.word)<len(word)]
                if val:
                    return val[0]
            x2 = Words.objects.filter(word__startswith=word[0:-2])
            if len(x2)>0:
                val = [m for m in x2 if len(m.word)<len(word)]
                if val:
                    return val[0]
            x3 = Words.objects.filter(word__startswith=word[0:-3])
            if len(x3)>0:
                val=[m for m in x3 if len(m.word)<len(word)]
                if val:
                    return val[0]
            return False

    def get(self, request, word, format=None):
        snippet = self.get_object(word)
        if snippet:
            serializer = WordsSerializer(snippet)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

class TranslationAzDetail(APIView):

    def get_object(self, word):
        try:
            return WordsAz.objects.get(word__iexact=word)
        except WordsAz.DoesNotExist:
            x1 = WordsAz.objects.filter(word__startswith=word[0:-1])
            if len(x1)>0:
                val = [m for m in x1 if len(m.word)<len(word)]
                if val:
                    return val[0]
            x2 = WordsAz.objects.filter(word__startswith=word[0:-2])
            if len(x2)>0:
                val = [m for m in x2 if len(m.word)<len(word)]
                if val:
                    return val[0]
            x3 = WordsAz.objects.filter(word__startswith=word[0:-3])
            if len(x3)>0:
                val=[m for m in x3 if len(m.word)<len(word)]
                if val:
                    return val[0]
            return False

    def get(self, request, word, format=None):
        snippet = self.get_object(word)
        if snippet:
            serializer = WordsAzSerializer(snippet)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)







@api_view(['GET', 'POST'])
def snippet_list(request, word):
    print(word)
    if request.method == 'GET':
        snippets = Words.objects.get(word=word)
        serializer = WordsSerializer(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = WordsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





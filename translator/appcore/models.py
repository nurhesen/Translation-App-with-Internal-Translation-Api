from django.db import models

# Create your models here.
class Words(models.Model):
    word=models.CharField(max_length=364)
    translation=models.CharField(max_length=364)

    def __str__(self):
        return self.word+' means '+self.translation


class WordsAz(models.Model):
    word=models.CharField(max_length=364)
    translation=models.CharField(max_length=364)

    def __str__(self):
        return self.word+' means '+self.translation




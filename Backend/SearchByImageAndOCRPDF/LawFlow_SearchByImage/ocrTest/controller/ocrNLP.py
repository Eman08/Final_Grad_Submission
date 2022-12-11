import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
from nltk.chunk import conlltags2tree, tree2conlltags
from pprint import pprint
from datetime import date
from nltk import RegexpParser
import spacy 
import re
from spacy import displacy
from nltk.corpus import stopwords
from nltk import RegexpTokenizer
from nltk.stem import WordNetLemmatizer
import sys
import path
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent.parent)
from db_connection import *
import en_core_web_sm


sw_nltk = stopwords.words('english')
new_stop_list=[]
#NER = spacy.load("en_core_web_sm")
NER = en_core_web_sm.load()
relation_list = ["i","between","and","is","as"]

for i in sw_nltk:
  for j in relation_list:
    if i == j:
      sw_nltk.remove(i)

#this removes all the stop words
def removeStopWordsinOCRNLP(raw):
  tokens = word_tokenize(raw.lower())
  stop_removed_sentence=""
  filtered_words = [word for word in tokens if word not in sw_nltk]
  for i in filtered_words:
    stop_removed_sentence+= i + " "
  print(stop_removed_sentence)
  return stop_removed_sentence

def getAllOrganizationsAndPeople(sentence):
    namedEntity = []
    text1= NER(sentence)
    for word in text1.ents:
        if word.label_ == "PERSON" or word.label_ == "ORG":
            print(word.text, word.label_)
            namedEntity.append(word.text)

    return namedEntity


def storeInDb(documentID, namedEntities):
    doc_ref = return_db().collection(u'Documents').document(documentID).update({u'named_entities':namedEntities})
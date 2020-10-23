import tensorflow as tf
import tensorflow as hub
import pandas as pd
import os
import json
import numpy as np
import nltk
from konlpy.tag import Okt
from tensorflow.keras import models, layers, optimizers, losses, metrics


def tokenize(comment):
    return ['|'.join(word) for word in okt.pos(comment, norm=True, stem=True)]


def term_frequency(doc):
        return [doc.count(word) for word in selected_words]



def main():
    model = models.load_model("toxic_comment_model.h5")
    review = ""
    token = tokenize(review)
    tf = term_frequency(token)
    data = np.expand_dims(np.asarray(tf).astype('float32'), axis=0)
    score = float(model.predict(data))
    print("스코어: ",score) # 클린 댓글 일수록 낮은 숫자


if __name__ == '__main__':
    main()
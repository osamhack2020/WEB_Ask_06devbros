# import pandas as pd
# import os
import json
import numpy as np
# import nltk
# import csv
from preprocessor import PreProcessor
# from konlpy.tag import Okt
from tensorflow.keras import models


class Predictor(object):
    def __init__(self, input_comment):
        self.input_comment = input_comment

    # def term_frequency(self, doc, selected_words):
    #     return [doc.count(word) for word in selected_words]

    def predict_comment(self):
        with open('selected_words.txt', 'r', encoding='UTF-8') as fd:
            selected_words = json.loads(fd.read())
        model = models.load_model("toxic_comment_model.h5")
        pprocess = PreProcessor()
        token = pprocess.tokenize(self.input_comment)
        tf = pprocess.term_frequency(token, selected_words)
        data = np.expand_dims(np.asarray(tf).astype('float32'), axis=0)
        score = float(model.predict(data))
        # print("스코어: ",score) # 클린 댓글 일수록 낮은 숫자
        return score

    


# def main(input_comment):
#     # DEFAULT_VALUE = 1  # set default label value to 1 == toxic comment
#     # all_comments = pd.read_csv('dataset/train.tsv', sep='\t', header=0)
#     # all_comments['label'] = DEFAULT_VALUE
#     # test_comments = pd.read_csv('dataset/dev.tsv', sep='\t', header=0)
#     # test_comments['label'] = DEFAULT_VALUE
#     predict_comment(input_comment)


# if __name__ == '__main__':

#     main()
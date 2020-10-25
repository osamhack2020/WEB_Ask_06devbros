import tensorflow as tf
import pandas as pd
import os
import json
import numpy as np
import nltk
import csv
import trainer as tr
from konlpy.tag import Okt
from tensorflow.keras import models, layers, optimizers, losses, metrics


okt = Okt()


def tokenize(comment):
    return ['|'.join(word) for word in okt.pos(comment, norm=True, stem=True)]

def determine_pos_neg_label(input_dataframe):
    # for row in input_dataframe.itertuples():
    #     if row.hate == 'none' and row.contain_gender_bias == False and row.bias == 'none':
    #         input_dataframe.at[row.Index, 'label'] = 0 # clean comment
    #     else:
    #         pass
    #     word = tokenize(row.comments)
    #     input_dataframe.at[row.Index, 'comments'] = word
    # newdf = input_dataframe[['comments', 'label']]

    # tokens = [t for d in newdf.to_numpy() for t in d[0]]
    # text = nltk.Text(tokens, name='NMSC')
    
    # selected_words = [f[0] for f in text.vocab().most_common(12986)]
    # def term_frequency(doc):
    selected_words = list()
    with open('selected_words.csv', 'r') as fd:
        reader = csv.reader(fd, delimiter=',')
        for row in reader:
            selected_words.append(row)
    # print(selected_words[0])
        # print(selected_words)
        # df = pd.read_csv('selected_words.csv')
        # selected_words = df.values.tolist()
        # print(df)
        # selected_words = [row for row in df.values]
        # print(selected_words)
    #     return [doc.count(word) for word in selected_words]

    model = models.load_model("toxic_comment_model.h5")
    review = "좋아요 구독 눌러주세요"
    token = tr.tokenize(review)
    # print(tr.term_frequency(token))
    tf = tr.term_frequency(token, selected_words)
    data = np.expand_dims(np.asarray(tf).astype('float32'), axis=0)
    score = float(model.predict(data))
    print("스코어: ",score) # 클린 댓글 일수록 낮은 숫자


def main():
    DEFAULT_VALUE = 1  # set default label value to 1 == toxic comment
    all_comments = pd.read_csv('dataset/train.tsv', sep='\t', header=0)
    all_comments['label'] = DEFAULT_VALUE
    determine_pos_neg_label(all_comments)


if __name__ == '__main__':
    main()
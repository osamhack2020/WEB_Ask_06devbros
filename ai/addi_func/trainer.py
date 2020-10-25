import tensorflow as tf
import pandas as pd
import os
import json
import numpy as np
import nltk
import csv
from konlpy.tag import Okt
from tensorflow.keras import models, layers, optimizers, losses, metrics


okt = Okt()
LENGTH = 0

def tokenize(comment):
    return ['|'.join(word) for word in okt.pos(comment, norm=True, stem=True)]


def preprocess_data(labeled_dataframe):
    tokens = [token for data in labeled_dataframe.to_numpy() for token in data[0]]
    text = nltk.Text(tokens, name='NMSC')
    LENGTH = len(set(text.tokens))
    selected_words = [vocab[0] for vocab in text.vocab().most_common(len(labeled_dataframe))]
    # with open('selected_words.csv', 'w', newline="\n") as fd:
    #     writer = csv.writer(fd)
    #     writer.writerow(selected_words)
    return selected_words


# def term_frequency(doc, selected_words):
#             return [doc.count(word) for word in selected_words]


def determine_pos_neg_label(input_dataframe):
    # 한글 불용어 모음
    stop_words = ["하", "있", "되", "않", "없", "사람", "지", "보", "때", "같", "년", "대하", "주", "말", "일", "위하", "때문", "말하", "가",
                  "받", "그렇", "알", ".", "?", "!", "。", "‘", "’", "“", "”", "`", "\'", "\"", "(", ")", "{", "}", "[", "]",
                  "─", "『", "』", ",", "ㆍ", "·", "ᆞ", ":", ";", "/", "…", "_", "~", "∼", "∽", "□", "■", "▶", "◀", "◆",
                  "▲", "◇", "◈", "☎", "【", "】", "+", "-", "=", "±", "÷", "×", "*", "^", ">", "<", "｜", "|", "％", "%",
                  "&", "￦", "₩", "\\", "\t", "\r\n", "\n", "＄", "$", "¥", "￥", "£", "￡", "°", "㎞", "㎏", "@", "©", "ⓒ",
                  "↑", "|", "#", "♥", "♡", "★", "☆", "♪", "♬"]

    for row in input_dataframe.itertuples():
        if row.hate == 'none' and row.contain_gender_bias == False and row.bias == 'none':
            input_dataframe.at[row.Index, 'label'] = 0 # clean comment
        else:
            pass
        word = tokenize(row.comments)
        input_dataframe.at[row.Index, 'comments'] = word
    labeled_dataframe = input_dataframe[['comments', 'label']]
    return labeled_dataframe
    

def term_frequency(doc, selected_words):
        return [doc.count(word) for word in selected_words]


def train_data(labeled_dataframe, test_comments):
    selected_words = preprocess_data(labeled_dataframe)

    # train_x = [term_frequency(text_npval, selected_words) for text_npval, _ in labeled_dataframe.to_numpy()]
    # train_y = [label_val for _, label_val in labeled_dataframe.to_numpy()]

    # x_train = np.asarray(train_x).astype('float32')
    # y_train = np.asarray(train_y).astype('float32')


    # selected_words = preprocess_data(test_comments)
    # print([term_frequency(text_npval) for text_npval, _ in test_comments.to_numpy()])
   
    # test_x = [term_frequency(text_npval, selected_words) for text_npval, _ in test_comments.to_numpy()]
    # test_y = [label_val for _, label_val in test_comments.to_numpy()]

    # x_test = np.asarray(test_x).astype('float32')
    # y_test = np.asarray(test_y).astype('float32')

    # model = models.Sequential()
    # model.add(layers.Dense(32, activation='relu', input_shape=(len(labeled_dataframe),)))
    # model.add(layers.Dense(32, activation='relu'))
    # model.add(layers.Dense(1, activation='sigmoid'))

    # model.compile(optimizer=optimizers.RMSprop(lr=0.001),
    #             loss=losses.binary_crossentropy,
    #             metrics=[metrics.binary_accuracy])

    # model.fit(x_train, y_train, epochs=10, batch_size=256)

    # # test_data(determine_pos_neg_label(test_comments) , model)
    # eval_results = model.evaluate(x_test, y_test)
    
    # # save model
    # model.save("toxic_comment_model.h5") 

    model = models.load_model("toxic_comment_model.h5")
    review = "어쩌라고 무슨 말을 하는지 모르겠네"
    token = tokenize(review)
    tf = term_frequency(token, selected_words)
    data = np.expand_dims(np.asarray(tf).astype('float32'), axis=0)
    score = float(model.predict(data))
    print("스코어: ",score) # 클린 댓글 일수록 낮은 숫자
    

# def test_data(labeled_dataframe, model):
#     selected_words = preprocess_data(labeled_dataframe)
#     test_x = [term_frequency(text_npval, selected_words) for text_npval, _ in labeled_dataframe.to_numpy()]
#     test_y = [label_val for _, label_val in labeled_dataframe.to_numpy()]

#     x_test = np.asarray(test_x).astype('float32')
#     y_test = np.asarray(test_y).astype('float32')
#     eval_results = model.evaluate(x_test, y_test)


def main():
    DEFAULT_VALUE = 1  # set default label value to 1 == toxic comment
   
    train_comments = pd.read_csv('dataset/train.tsv', sep='\t', header=0)
    train_comments['label'] = DEFAULT_VALUE

    test_comments = pd.read_csv('dataset/dev.tsv', sep='\t', header=0)
    test_comments['label'] = DEFAULT_VALUE
    train_data(determine_pos_neg_label(train_comments), determine_pos_neg_label(test_comments))
    
    
   
if __name__ == '__main__':
    main()
    
import tensorflow as tf
import tensorflow as hub
import pandas as pd
import os
import json
import numpy as np
import nltk
from konlpy.tag import Okt
from tensorflow.keras import models, layers, optimizers, losses, metrics


okt = Okt()

def tokenize(comment):
    return ['|'.join(word) for word in okt.pos(comment, norm=True, stem=True)]


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
    newdf = input_dataframe[['comments', 'label']]

    tokens = [t for d in newdf.to_numpy() for t in d[0]]
    text = nltk.Text(tokens, name='NMSC')

    selected_words = [f[0] for f in text.vocab().most_common(12986)]

    def term_frequency(doc):
        return [doc.count(word) for word in selected_words]

    # train_x = [term_frequency(d) for d, _ in newdf.to_numpy()]
    # train_y = [c for _, c in newdf.to_numpy()]

    # x_train = np.asarray(train_x).astype('float32')
    # y_train = np.asarray(train_y).astype('float32')

    # model = models.Sequential()
    # model.add(layers.Dense(64, activation='relu', input_shape=(12986,)))
    # model.add(layers.Dense(64, activation='relu'))
    # model.add(layers.Dense(1, activation='sigmoid'))

    # model.compile(optimizer=optimizers.RMSprop(lr=0.001),
    #             loss=losses.binary_crossentropy,
    #             metrics=[metrics.binary_accuracy])

    # model.fit(x_train, y_train, epochs=10, batch_size=512)
    # # save model
    # model.save("toxic_comment_model.h5")
    # load model
    
    # npcomments = np.array(input_dataframe['comments'])
    # print(npcomments)
        
        # if (word not in stop_words) and (word == 'Noun' or word == 'Adjective' or word=='Number' or word=='Verb'):
        #     input_dataframe.at[row.Index, 'comments'] = word
    # print(input_dataframe['comments'])
    # tokens = [t for d in input_dataframe['comments'] for t in d[0]]
    # train_doc = [(tokenize(row[0]), row[3]) for comment, label in input_dataframe]
    # print(train_doc)
    # if os.path.isfile('../dataset/train_doc.json'):
    #     pass
    # #     with open ('/dataset/train_doc.json') as fd:
    # #         json.dump(train_doc, fd, ensure_ascii=False, indent='\t')
    # else:
    # with open('dataset/train_doc.json', 'w', encoding='utf-8') as newfile:
    #     json.dump(train_doc, newfile, ensure_ascii=False, indent='\t')
        

def main():
    DEFAULT_VALUE = 1  # set default label value to 1 == toxic comment
   
    all_comments = pd.read_csv('dataset/train.tsv', sep='\t', header=0)
    all_comments['label'] = DEFAULT_VALUE

    test_comments = pd.read_csv('dataset/dev.tsv', sep='\t', header=0)
    test_comments['label'] = DEFAULT_VALUE


    # find distinctive values
    # print(all_comments.contain_gender_bias.unique())
    # print(all_comments.hate.unique())
    # print(all_comments.bias.unique())

    all_comments[all_comments['hate'] == 'none'].shape[0]
    all_comments[all_comments['bias'] == 'others'].shape[0]
    all_comments[all_comments['contain_gender_bias'] == True].shape[0]

    determine_pos_neg_label(all_comments)
    # determine_pos_neg_label(test_comments)
    # print(all_comments[all_comments['label'] == 0].shape[0])

    # for i in range(0,len(all_comments)):
    # all_comments['comments'].iloc[0]

    # kkma = kopy.tag.Kkma()
    # print(kkma.morphs(all_comments['comments'].iloc[0]))

    
    # print(okt.morphs(all_comments['comments'].iloc[0]))

    
    # stop_words = ["하", "있", "되", "않", "없", "사람", "지", "보", "때", "같", "년", "대하", "주", "말", "일", "위하", "때문", "말하", "가",
    #               "받", "그렇", "알", ".", "?", "!", "。", "‘", "’", "“", "”", "`", "\'", "\"", "(", ")", "{", "}", "[", "]",
    #               "─", "『", "』", ",", "ㆍ", "·", "ᆞ", ":", ";", "/", "…", "_", "~", "∼", "∽", "□", "■", "▶", "◀", "◆",
    #               "▲", "◇", "◈", "☎", "【", "】", "+", "-", "=", "±", "÷", "×", "*", "^", ">", "<", "｜", "|", "％", "%",
    #               "&", "￦", "₩", "\\", "\t", "\r\n", "\n", "＄", "$", "¥", "￥", "£", "￡", "°", "㎞", "㎏", "@", "©", "ⓒ",
    #               "↑", "|", "#", "♥", "♡", "★", "☆", "♪", "♬"]

    # for index in range(0, len(all_comments)):
    #     sentence = okt.pos(all_comments['comments'].iloc[index], norm=True, stem=True)
    #     new_sent = []
    #     for word in sentence:
    #         if (word[0] not in stop_words) and (word[1] == 'Noun' or word[1] == 'Adjective' or word[1]=='Number' or word[1]=='Verb'):
    #             new_sent.append(word[0])

        
        #  print(new_sent)

    # tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
    # model = TFAutoModel.from_pretrained("bert-base-uncased")
    # inputs = tokenizer("Hello yellow below!", return_tensors='tf')
    # outputs = model(**inputs)
    

    # model = TFElectraModel.from_pretrained("monologg/koelectra-base-v3-discriminator", from_pt=True)
    # classifier = pipeline('sentiment-analysis')
    # print(classifier(''))
    # model = TFElectraModel.from_pretrained("monologg/korean-hate-speech-koelectra")
    # tokenizer = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-discriminator")
    # print(tokenizer.tokenize(all_comments['comments'].iloc[0]))
    # model = TFBertForSequenceClassification.from_pretrained('bert-base-multilingual-cased')

   
if __name__ == '__main__':
    main()
    
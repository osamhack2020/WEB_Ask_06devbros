import tensorflow as tf
import tensorflow as hub
import pandas as pd
import konlpy as kopy
import transformers as transf
from tensorflow import keras


# from bert import TFBertForSequenceClassification
# from transformers import TFElectraModel, ElectraTokenizer,ElectraPreTrainedModel, TFBertForSequenceClassification
# from transformers import AutoTokenizer, TFAutoModel, pipeline


def determine_pos_neg_label(input_dataframe):
    for row in input_dataframe.itertuples():
        if row.hate == 'none' and row.contain_gender_bias == False and row.bias == 'none':
            input_dataframe.at[row.Index, 'label'] = 0  # clean comment
        else:
            pass
    # print(input_dataframe['label'])


def main():
    DEFAULT_VALUE = 1  # set default label value to 1 == toxic comment
    # BERT_MODEL_HUB = "https://tfhub.dev/google/bert_uncased_L-12_H-768_A-12/1"

    all_comments = pd.read_csv('dataset/train.tsv', sep='\t', header=0)
    all_comments['label'] = DEFAULT_VALUE

    # find distinctive values
    print(all_comments.contain_gender_bias.unique())
    print(all_comments.hate.unique())
    print(all_comments.bias.unique())

    all_comments[all_comments['hate'] == 'none'].shape[0]
    all_comments[all_comments['bias'] == 'others'].shape[0]
    all_comments[all_comments['contain_gender_bias'] == True].shape[0]

    determine_pos_neg_label(all_comments)
    print(all_comments[all_comments['label'] == 0].shape[0])
    # for i in range(0,len(all_comments)):
    # all_comments['comments'].iloc[0]

    # kkma = kopy.tag.Kkma()
    # print(kkma.morphs(all_comments['comments'].iloc[0]))

    okt = kopy.tag.Okt()
    # print(okt.morphs(all_comments['comments'].iloc[0]))

    # 한글 불용어 모음
    stop_words = ["하", "있", "되", "않", "없", "사람", "지", "보", "때", "같", "년", "대하", "주", "말", "일", "위하", "때문", "말하", "가",
                  "받", "그렇", "알", ".", "?", "!", "。", "‘", "’", "“", "”", "`", "\'", "\"", "(", ")", "{", "}", "[", "]",
                  "─", "『", "』", ",", "ㆍ", "·", "ᆞ", ":", ";", "/", "…", "_", "~", "∼", "∽", "□", "■", "▶", "◀", "◆",
                  "▲", "◇", "◈", "☎", "【", "】", "+", "-", "=", "±", "÷", "×", "*", "^", ">", "<", "｜", "|", "％", "%",
                  "&", "￦", "₩", "\\", "\t", "\r\n", "\n", "＄", "$", "¥", "￥", "£", "￡", "°", "㎞", "㎏", "@", "©", "ⓒ",
                  "↑", "|", "#", "♥", "♡", "★", "☆", "♪", "♬"]

    # for index in range(0, len(all_comments)):
    #     sentence = okt.pos(all_comments['comments'].iloc[index])
    #     new_sent = []
    #     for word in sentence:
    #         if (word[0] not in stop_words) and (word[1] == 'Noun' or word[1] == 'Adjective' or word[1]=='Number' or word[1]=='Verb'):
    #             new_sent.append(word[0])

    #     print(new_sent)

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

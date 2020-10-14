import tensorflow as tf
import tensorflow as hub
import pandas as pd
from tensorflow import keras
import konlpy as kopy


def main():
    all_comments = pd.read_csv('train.tsv', sep='\t', header=0)

    # find distinctive values
    all_comments.contain_gender_bias.unique()
    all_comments.hate.unique()
    all_comments.bias.unique()

    all_comments[all_comments['hate'] == 'none'].shape[0]
    all_comments[all_comments['bias'] == 'others'].shape[0]
    all_comments[all_comments['contain_gender_bias'] == True].shape[0]

    # for i in range(0,len(all_comments)):
    all_comments['comments'].iloc[0]

    kkma = kopy.tag.Kkma()
    print(kkma.morphs(all_comments['comments'].iloc[0]))

    okt = kopy.tag.Okt()
    print(okt.morphs(all_comments['comments'].iloc[0]))

    # 한글 불용어 모음
    stop_words = ["하", "있", "되", "않", "없", "사람", "지", "보", "때", "같", "년", "대하", "주", "말", "일", "위하", "때문", "말하", "가",
                  "받", "그렇", "알", ".", "?", "!", "。", "‘", "’", "“", "”", "`", "\'", "\"", "(", ")", "{", "}", "[", "]",
                  "─", "『", "』", ",", "ㆍ", "·", "ᆞ", ":", ";", "/", "…", "_", "~", "∼", "∽", "□", "■", "▶", "◀", "◆",
                  "▲", "◇", "◈", "☎", "【", "】", "+", "-", "=", "±", "÷", "×", "*", "^", ">", "<", "｜", "|", "％", "%",
                  "&", "￦", "₩", "\\", "\t", "\r\n", "\n", "＄", "$", "¥", "￥", "£", "￡", "°", "㎞", "㎏", "@", "©", "ⓒ",
                  "↑", "|", "#", "♥", "♡", "★", "☆", "♪", "♬"]

    # for comment in all_comments['comments']:
    sentence = okt.pos(all_comments['comments'].iloc[0])
    new_sent = []
    for i in sentence:
        if i[0] not in stop_words and i[1] != 'Punctuation':
            new_sent.append(i)

    print(new_sent)
if __name__ == '__main__':
    main()

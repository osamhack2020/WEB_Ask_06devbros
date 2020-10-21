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


if __name__ == '__main__':
    main()

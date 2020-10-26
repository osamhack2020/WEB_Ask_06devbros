import pandas as pd
# import os
import json
# import numpy as np
import nltk
# import csv
from konlpy.tag import Okt


class PreProcessor:
    def load_data(self, inputfile):
        DEFAULT_VALUE = 1  # set default label value to 1 == toxic comment
        comments_df = pd.read_csv(inputfile, sep='\t', header=0)
        comments_df['label'] = DEFAULT_VALUE
        return comments_df

    def preprocess_data(self, labeled_dataframe):
        tokens = [token for data in labeled_dataframe.to_numpy() for token in data[0]]
        text = nltk.Text(tokens, name='NMSC')
        LENGTH = len(set(text.tokens))
        selected_words = [vocab[0] for vocab in text.vocab().most_common(len(labeled_dataframe))]
        with open('selected_words.txt', 'w', encoding='UTF-8') as fd:
            fd.write(json.dumps(selected_words))
        return selected_words

    def tokenize(self, comment):
        okt = Okt()
        return ['|'.join(word) for word in okt.pos(comment, norm=True, stem=True)]
    
    def determine_pos_neg_label(self, input_dataframe):
        for row in input_dataframe.itertuples():
            if row.hate == 'none' and row.contain_gender_bias == False and row.bias == 'none':
                input_dataframe.at[row.Index, 'label'] = 0 # clean comment
            else:
                pass
            word = self.tokenize(row.comments)
            input_dataframe.at[row.Index, 'comments'] = word
        labeled_dataframe = input_dataframe[['comments', 'label']]
        return labeled_dataframe

    def term_frequency(self, doc, selected_words):
        return [doc.count(word) for word in selected_words]

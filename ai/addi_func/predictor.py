import json
import numpy as np
from preprocessor import PreProcessor
from tensorflow.keras import models


class Predictor(object):
    def __init__(self, input_comment):
        self.input_comment = input_comment

    def predict_comment(self):
        with open('selected_words.txt', 'r', encoding='UTF-8') as fd:
            selected_words = json.loads(fd.read())
        model = models.load_model("toxic_comment_model.h5")
        pprocess = PreProcessor()
        token = pprocess.tokenize(self.input_comment)
        tf = pprocess.term_frequency(token, selected_words)
        data = np.expand_dims(np.asarray(tf).astype('float32'), axis=0)
        score = float(model.predict(data)) # 클린 댓글 일수록 낮은 숫자
        return score

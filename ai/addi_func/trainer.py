import sys
import getopt
import numpy as np
from preprocessor import PreProcessor
from konlpy.tag import Okt
from tensorflow.keras import models, layers, optimizers, losses, metrics


def train_model(pprocess, labeled_dataframe, test_comments, selected_words):
    train_x = [pprocess.term_frequency(text_npval, selected_words) for text_npval, _ in labeled_dataframe.to_numpy()]
    train_y = [label_val for _, label_val in labeled_dataframe.to_numpy()]

    x_train = np.asarray(train_x).astype('float32')
    y_train = np.asarray(train_y).astype('float32')
   
    test_x = [pprocess.term_frequency(text_npval, selected_words) for text_npval, _ in test_comments.to_numpy()]
    test_y = [label_val for _, label_val in test_comments.to_numpy()]

    x_test = np.asarray(test_x).astype('float32')
    y_test = np.asarray(test_y).astype('float32')

    model = models.Sequential()
    model.add(layers.Dense(32, activation='relu', input_shape=(len(labeled_dataframe),)))
    model.add(layers.Dense(32, activation='relu'))
    model.add(layers.Dense(1, activation='sigmoid'))

    model.compile(optimizer=optimizers.RMSprop(lr=0.001),
                loss=losses.binary_crossentropy,
                metrics=[metrics.binary_accuracy])

    model.fit(x_train, y_train, epochs=7, batch_size=256)

    # function to evaluate the created model
    eval_results = model.evaluate(x_test, y_test)
    
    # save model
    model.save("toxic_comment_model.h5") 


def main(train_file, test_file):
    # FILE_NAME = argv[0]
    pprocess = PreProcessor()
    train_data = pprocess.load_data(train_file)
    test_data = pprocess.load_data(test_file)
    
    labeled_train_df = pprocess.determine_pos_neg_label(train_data)
    labeled_test_df = pprocess.determine_pos_neg_label(test_data)
    
    selected_words = pprocess.preprocess_data(labeled_train_df)
    train_model(pprocess, labeled_train_df, labeled_test_df, selected_words)
    
   
if __name__ == '__main__':
    # python3 trainer.py dataset/train.tsv dataset/dev.tsv 
    # train data: 'dataset/train.tsv'
    # test data: 'dataset/dev.tsv'
    main(sys.argv[1], sys.argv[2])
    
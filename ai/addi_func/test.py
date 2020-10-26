from predictor import Predictor


def main():
    ptr = Predictor("ㅅㅂ")
    print(ptr.predict_comment())


if __name__ == '__main__':
    main()
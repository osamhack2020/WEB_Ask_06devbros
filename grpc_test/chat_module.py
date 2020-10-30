import os, sys
#import pathlib
#sys.path.append(str(pathlib.Path(__file__).parent.absolute())+'/../ai/chatbot')
sys.path.append('../ai/chatbot') # cwd == WEB_ASK_06DEVBROS/grpc_test
import torch
import torch.nn as nn

from transformers import (
  ElectraConfig,
  ElectraTokenizer
)

from model.kogpt2 import DialogKoGPT2
from model.koelectra import koElectraForSequenceClassification,koelectra_input
from kogpt2_transformers import get_kogpt2_tokenizer

ctx = "cuda" if torch.cuda.is_available() else "cpu"
device = torch.device(ctx)

class ChatModel():
    def __init__(self, root_path='../ai/chatbot'):
        checkpoint_path = f"{root_path}/checkpoint"
        self.model_path = f"{checkpoint_path}/kogpt2-wellness-auto-regressive.pth"

        checkpoint = torch.load(self.model_path, map_location=device)
        self.model = DialogKoGPT2()
        self.model.load_state_dict(checkpoint['model_state_dict'])
        self.model.eval()

        self.tokenizer = get_kogpt2_tokenizer()

    def predict(self, chat):
        tokenized_indexs = self.tokenizer.encode(chat)
        input_ids = torch.tensor([self.tokenizer.bos_token_id,]  + tokenized_indexs +[self.tokenizer.eos_token_id]).unsqueeze(0)
        output_chat = self.model.generate(input_ids=input_ids)
        resChat = self.tokenizer.decode(output_chat[0].tolist()[len(tokenized_indexs)+1:],skip_special_tokens=True)

        return resChat

class DetectionModel():
    def __init__(self, root_path='../ai/chatbot'):
        checkpoint_path = f"{root_path}/checkpoint"
        self.model_path = f"{checkpoint_path}/koelectra-wellness-text-classification.pth"
        model_name_or_path = "monologg/koelectra-base-discriminator"

        checkpoint = torch.load(self.model_path, map_location=device)
        electra_config = ElectraConfig.from_pretrained(model_name_or_path)
        self.model = koElectraForSequenceClassification.from_pretrained(pretrained_model_name_or_path=model_name_or_path, config=electra_config, num_labels=359)
        self.model.load_state_dict(checkpoint['model_state_dict'])
        self.model.to(device)
        self.model.eval()

        self.tokenizer = ElectraTokenizer.from_pretrained(model_name_or_path)

        self.category = []
        idx = -1
        with open(root_path+'/data/wellness_data_for_text_classification.txt', 'r') as f:
            while True:
                line = f.readline()
                if not line:
                    break
                datas = line.strip().split("\t")
                if datas[1] != str(idx):
                    self.category.append(datas[2])
                idx += 1

    def predict(self, chat):
        data = koelectra_input(self.tokenizer, chat, device, 512)
        output_class = self.model(**data)

        logit = output_class
        softmax_logit = nn.Softmax(logit).dim
        softmax_logit = softmax_logit[0].squeeze()

        max_index = torch.argmax(softmax_logit).item() # 대화에 대한 카테고리 인덱스 값
        max_index_value = softmax_logit[torch.argmax(softmax_logit)].item() # 인덱스 값에 대한 신뢰도(?). 7이상일 경우 신뢰.
        
        detection = self.category[max_index]

        return max_index_value, detection

    
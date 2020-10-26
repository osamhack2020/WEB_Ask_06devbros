# Copyright 2015 gRPC authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""The Python implementation of the GRPC test.Greeter server."""

from concurrent import futures
import logging

import grpc

import chat_pb2
import chat_pb2_grpc

import os, sys
import pathlib
sys.path.append(str(pathlib.Path(__file__).parent.absolute())+'/../ai/chatbot')
sys.path.append('../') # cwd == WEB_ASK_06DEVBROS/grpc_test
import torch
import torch.nn as nn

from transformers import (
  ElectraConfig,
  ElectraTokenizer
)

from model.kogpt2 import DialogKoGPT2
from model.koelectra import koElectraForSequenceClassification,koelectra_input
from kogpt2_transformers import get_kogpt2_tokenizer

class Chat(chat_pb2_grpc.ChatServicer):
    # WEB_ASK_06DEVBROS/ai/chatbot/checkpoint에 저장된 pth 파일(pytorch weight 파일)을 불러옴
    
    root_path= str(pathlib.Path(__file__).parent.absolute()) + '/../ai/chatbot'
    checkpoint_path =f"{root_path}/checkpoint"
    chat_ckpt_path = f"{checkpoint_path}/kogpt2-wellness-auto-regressive.pth"
    class_ckpt_path = f"{checkpoint_path}/koelectra-wellness-text-classification.pth"
    
    model_name_or_path = "monologg/koelectra-base-discriminator" # used for loading koelectra model

    ctx = "cuda" if torch.cuda.is_available() else "cpu"
    device = torch.device(ctx)

    #인덱스 값에 따른 카테고리 불러오기
    category = []
    idx = -1
    with open(root_path+'/data/wellness_data_for_text_classification.txt', 'r') as f:
    while True:
        line = f.readline()
        if not line:
        break
        datas = line.strip().split("\t")
        if datas[1] != str(idx):
        category.append(datas[2])
        idx += 1

    # 저장한 Checkpoint 불러오기
    checkpoint_chat = torch.load(chat_ckpt_path, map_location=device)
    checkpoint_class = torch.load(class_ckpt_path, map_location=device)
    model_chat = DialogKoGPT2()
    model_chat.load_state_dict(checkpoint_chat['model_state_dict'])
    model_chat.eval()

    tokenizer_gpt2 = get_kogpt2_tokenizer()

    tokenizer_electra = ElectraTokenizer.from_pretrained(model_name_or_path)
    electra_config = ElectraConfig.from_pretrained(model_name_or_path)
    model_class = koElectraForSequenceClassification.from_pretrained(pretrained_model_name_or_path=model_name_or_path, config=electra_config, num_labels=359)
    model_class.load_state_dict(checkpoint['model_state_dict'])
    model_class.to(device)
    model_class.eval()

    def ChatBot(self, request, context):
        reqChat = request.clientChat #들어온 채팅 데이터
        # 챗봇의 답변 생성
        tokenized_indexs = self.tokenizer_gpt2.encode(reqChat)
        input_ids = torch.tensor([self.tokenizer_gpt2.bos_token_id,]  + tokenized_indexs +[self.tokenizer_gpt2.eos_token_id]).unsqueeze(0)
        output_chat = self.model_chat.generate(input_ids=input_ids)
        resChat = self.tokenizer_gpt2.decode(output_chat[0].tolist()[len(tokenized_indexs)+1:],skip_special_tokens=True)
        # 대화 분류
        data = koelectra_input(tokenizer_electra, reqChat, device, 512)
        output_class = model_class(**data)

        logit = output_class
        softmax_logit = nn.Softmax(logit).dim
        softmax_logit = softmax_logit[0].squeeze()

        max_index = torch.argmax(softmax_logit).item() # 대화에 대한 카테고리 인덱스 값
        max_index_value = softmax_logit[torch.argmax(softmax_logit)].item() # 인덱스 값에 대한 신뢰도(?). 7이상일 경우 신뢰.

        resChat = resChat + '\t' + self.category[max_index] + '\t' + str(max_index_value)
        # reqChat '바쁠 땐 아무 생각이 없는데 한가해질 때면 우울함이 밀려와요.'에 대한 resChat 예시:
        # '이해해요. 아무 이유 없이 우울할 때가 있죠. 우울함은 저절로 ... 후략'+'\t'+'감정/우울감'+'\t'+'12.761611938476562'
        
        return chat_pb2.ChatReply(serverChat=resChat)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    chat_pb2_grpc.add_ChatServicer_to_server(Chat(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()

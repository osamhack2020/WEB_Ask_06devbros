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
from model.kogpt2 import DialogKoGPT2
from kogpt2_transformers import get_kogpt2_tokenizer

class Chat(chat_pb2_grpc.ChatServicer):
    # WEB_ASK_06DEVBROS/ai/chatbot/checkpoint에 저장된 pth 파일(pytorch weight 파일)을 불러옴
    
    root_path= str(pathlib.Path(__file__).parent.absolute()) + '/../ai/chatbot'
    checkpoint_path =f"{root_path}/checkpoint"
    save_ckpt_path = f"{checkpoint_path}/kogpt2-wellness-auto-regressive.pth"

    ctx = "cuda" if torch.cuda.is_available() else "cpu"
    device = torch.device(ctx)

    # 저장한 Checkpoint 불러오기
    checkpoint = torch.load(save_ckpt_path, map_location=device)
    model = DialogKoGPT2()
    model.load_state_dict(checkpoint['model_state_dict'])
    model.eval()
    tokenizer = get_kogpt2_tokenizer()

    def ChatBot(self, request, context):
        reqChat = request.clientChat #들어온 채팅 데이터

        tokenized_indexs = self.tokenizer.encode(reqChat)
        input_ids = torch.tensor([self.tokenizer.bos_token_id,]  + tokenized_indexs +[self.tokenizer.eos_token_id]).unsqueeze(0)
        output = self.model.generate(input_ids=input_ids)
        resChat = self.tokenizer.decode(output[0].tolist()[len(tokenized_indexs)+1:],skip_special_tokens=True)
        
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
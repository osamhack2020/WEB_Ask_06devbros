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

import chat_module
from chat_module import ChatModel, DetectionModel

chat_model = ChatModel()
detect_model = DetectionModel()

class Chat(chat_pb2_grpc.ChatServicer):

    def ChatBot(self, request, context):
        reqChat = request.clientChat #들어온 채팅 데이터

        resChat = chat_model.predict(reqChat) # 답변
        danger, chatType = detect_model.predict(reqChat) # 점수(7점 이상일 경우 신뢰함), 카테고리

        return chat_pb2.ChatReply(serverChat=resChat,chatType=chatType,danger=danger)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    chat_pb2_grpc.add_ChatServicer_to_server(Chat(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
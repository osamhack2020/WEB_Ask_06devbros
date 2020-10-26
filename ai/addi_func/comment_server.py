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

import comment_pb2
import comment_pb2_grpc
from predictor import Predictor

class Comment(comment_pb2_grpc.CommentServicer):

    def CensorComment(self, request, context):
        reqComment = request.clientComment # 들어온 채팅 데이터
        resCensor = False
        predic = Predictor(reqComment)
        score = predic.predict_comment()
        # 점수 값이 0.51 보다 높으면 악플로 판정/ 낮으면 클린한 글
        if score >= 0.51: 
            resCensor = True # censor comment 
        return comment_pb2.CensorReply(serverCensor=resCensor)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    comment_pb2_grpc.add_CommentServicer_to_server(Comment(), server)
    server.add_insecure_port('[::]:50052')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()

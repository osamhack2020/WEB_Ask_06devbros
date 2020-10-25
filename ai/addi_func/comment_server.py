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
import predictor as predict

class Comment(comment_pb2_grpc.CommentServicer):

    def CensorComment(self, request, context):
        reqComment = request.clientComment #들어온 채팅 데이터
        resCensor = True
        """
            ------todo------

            여기서 reqComment를 ai로 처리해서 보내고 싶은 데이터를 resCensor에 넣으면된다.

        """
        # 예시 함수 (들어오는 comment에 바보가 있으면 false,아니면 true)
        if '바보' in reqComment:
            resCensor = False
        if score >= 0.6:
            resCensor = False
        
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

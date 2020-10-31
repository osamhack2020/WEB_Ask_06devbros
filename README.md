# 물어봐 (06devbros)
![logo](./img/logo.png)
 
 물어봐(ASK)는 AI 챗봇을 바탕으로한 24시간 상담 웹 서비스입니다.

## 프로젝트 설명
 프로젝트 물어봐(ASK) 는 코로나로 인해 외부와의 소통이 쉽지 않아 심리적으로 지친 장병들을 위한 24시간 챗봇기반 상담 서비스 웹 어플리케이션입니다. 코로나 사태 이후 우울하고 마음이 불안정한 장병들이 늘어난데다가 대면 심리 상담도 어려워져 24시간 운영되는 실시간 언택트 상담 서비스의 중요성이 커졌습니다. '물어봐'는 AI 기반의 실시간 상담 챗봇을 웹페이지에서 구현하여 챗봇의 판단에 따라 전문상담관과의 연결 기능을 제공합니다. 이에 더해 서비스를 이용하는 장병이 하는 말을 분석하여, 특정 장병이 심리적으로 얼마나 위험한 상태인지를 수치화하여 전문상담관이 이를 확인할 수 있도록 합니다.
 또한, 상담만으로는 해결할 수 없는 다양한 고민 사항을 공유하고 해결할 수 있도록 질문 게시판을 마련하였습니다.  AI기반의 악플 검열 기능도 추가하여 유해한 답변은 자동으로 배제됩니다.  본 서비스를 통해 코로나 블루를 겪거나 군생활의 다양한 고충을 가진 장병들이 상담으로 심리적 우울감과 고민을 해소하여 정신적으로 건강하고 슬기로운 군생활을 보낼 수 있습니다.

## 기능 설계
### 프론트엔드 설계
 - 화면설계 링크 : https://ovenapp.io/view/Mw3sayAMNzwJNPcoovGfFscGcRDSOxBL

### 백엔드 설계
- REST API로 구성하였으며, auth, chat, comment, post, mypage로 5가지 api를 제공합니다.
- API내용은 아래 그림의 예시와 같이 gitbook으로 문서화하여 API를 활용할 수 있도록 하였습니다. 
(gitbook 읽기권한 초대 링크(가입 필요): https://app.gitbook.com/invite/osamhackathon-docs-com?invite=-MJvx6usPXk3wfgsC2do )

 ![gitbook_ex](./img/gitbook_ex.png)

### AI 설계

### 전체 기능 연결
-python으로 작성한 ai코드와 node로 구성된 웹 서버를 grpc를 통해 연결하고, REST API를 통해 프론트엔드와 백엔드를 연결하였습니다.
 ![relation](./img/relation.png)

## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
* ECMAScript 6 지원 브라우저 사용
* Node 10 이상
* Python 3.6 이상

### 필요 python packages
* kogpt2-transformers
* kobert-transformers
* transformers==3.0.2
* torch
* kss
* flask
* flask_restful
* google_drive_downloader
* tokenizers==0.8.1.rc1
* konlpy
* tensorflow
* pandas
* nltk

## 기술 스택 (Technique Used)
### Back-end
 - nodejs + express
 - mongodb + mongoose
 - grpc
 - Socket io
 - REST api
 
### Front-end
 - html + css + js
 - react.js + redux
 - material ui
 - socket io
 - moment.js

### AI
 - python
 - pytorch
 - konlpy
 - tensorflow + keras

## 설치 안내 (Installation Process)
파일 받기
```
$ git clone https://github.com/osamhack2020/WEB_Ask_06devbros.git
```

AI 악플감지 서버 활성화
```
$ cd ai/addi_func/
$ python3 chat_server.py
```
AI 챗봇 서버 활성화
```
$ cd grpc_test/
$ python3 chat_server.py
```
백엔드 서버 활성화
```
$ cd backend/
$ npm install
$ npm start
```
프론트 엔드 실행
```
$ cd frontend/
$ npm start
```

## 프로젝트 사용법 (Getting Started)
**마크다운 문법을 이용하여 자유롭게 기재**

잘 모를 경우
구글 검색 - 마크다운 문법
[https://post.naver.com/viewer/postView.nhn?volumeNo=24627214&memberNo=42458017](https://post.naver.com/viewer/postView.nhn?volumeNo=24627214&memberNo=42458017)

 편한 마크다운 에디터를 찾아서 사용
 샘플 에디터 [https://stackedit.io/app#](https://stackedit.io/app#)
 
## 팀 정보 (Team Information)
- 강태영 (tae_11@naver.com), Github Id: tzerok
- 이용우 (brotherwoo@naver.com), Github Id: hellowoo-lee
- 양용진 (dyyjkd@naver.com), Github Id: YangYongJin
- 임성빈 (dlatqdlatq@naver.com), Github Id: NEM-NE

## 저작권 및 사용권 정보 (Copyleft / End User License)
 * [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)


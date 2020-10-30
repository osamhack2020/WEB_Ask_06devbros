# 물어봐 (06devbros)
![logo](./img/logo.png)

## 프로젝트 설명
 프로젝트 물어봐(ASK) 는 코로나로 인해 외부와의 소통이 쉽지 않아 심리적으로 지친 장병들을 위한 24시간 챗봇기반 상담 서비스 웹 어플리케이션입니다. 코로나 사태 이후 우울하고 마음이 불안정한 장병들이 늘어난데다가 대면 심리 상담도 어려워져 24시간 운영되는 실시간 언택트 상담 서비스의 중요성이 커졌습니다. '물어봐'는 AI 기반의 실시간 상담 챗봇을 웹페이지에서 구현하여 챗봇의 판단에 따라 전문상담관과의 연결 기능을 제공합니다. 또한, 상담만으로는 해결할 수 없는 다양한 고민 사항을 공유하고 해결할 수 있도록 질문 게시판을 마련하였습니다.  AI기반의 악플 검열 기능도 추가하여 유해한 답변은 자동으로 배제됩니다.  본 서비스를 통해 코로나 블루를 겪거나 군생활의 다양한 고충을 가진 장병들이 상담으로 심리적 우울감과 고민을 해소하여 정신적으로 건강하고 슬기로운 군생활을 보낼 수 있습니다.

## 기능 설계
### 프론트엔드 설계
 - 발사믹, 카카오 오븐 등 본인이 편한 목업 프레임워크를 이용하여 제작 후 링크 
 - 수기로 작성시 찍어서 올려주세요

### 백엔드 설계

### AI 설계

### 전체 기능 연결
 ![relation](./img/relation.png)

## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
* ECMAScript 6 지원 브라우저 사용
* Node 10 이상
* Python 3.6이 상
* 

### 필요 python packages
*

## 기술 스택 (Technique Used)
### Back-end
 - nodejs + express
 - mongodb + mongoose
 - grpc
 - Socket io
 - REST api
 
### Front-end
 -  react.js
 -  UI framework
 - 기타 사용한 라이브러리

### AI

## 설치 안내 (Installation Process)
파일 받기
```
$ git clone git주소
```

AI 악플감지 서버 활성화
```
$ cd ai/addi_func/
$ python3 chat_server.py
```
AI 챗봇 서버 활성화
```
```
백엔드 서버 활성화
```
$ cd backend/
$ npm install
$ npm start
```
프론트 엔드 실행
```
$
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


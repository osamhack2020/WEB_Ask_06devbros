# KoGPT2와 KoELECTRA 모델을 이용한 상담 챗봇 만들기
[nawnoes/WellnessConversationAI](https://github.com/nawnoes/WellnessConversationAI)을 참고한 심리상담 대화 챗봇.

## 사용 순서
### 챗봇을 이용할 경우
1. ./checkpoint/download_trained_model.py를 실행하여 google drive에서 학습이 완료된 KoGPT2, KoELECTRA 모델을 다운로드 받는다.
2. ./example/kogpt2-text-generation.py를 실행한다.
### 위험군 분류 모델을 이용할 경우
1. ./checkpoint/download_trained_model.py를 실행하여 google drive에서 학습이 완료된 KoGPT2, KoELECTRA 모델을 다운로드 받는다.
2. ./example/koelectra-wellness-qa.py를 실행한다.
### 모델을 직접 학습시킬 경우
1. ./train/run_koelectra_text_classification.py 혹은 run_kogpt2_autoregressive.py를 실행시킨다.

## 결과 예시
### 챗봇 결과
```text
Question: 요새 힘들어요
Setting `pad_token_id` to 50256 (first `eos_token_id`) to generate sequence
Answer: 잘 버티고 있어요. 조금 힘들더라도 조금만 기운을 내요.파이팅! 오늘도 파이팅! 오늘도 파이팅! 파이팅! 파이팅! 파이팅! 파이팅! 파이
----------------------------------------------------------------------------------------------------
Question: 선임이 괴롭혀서 삶이 힘들어요
Setting `pad_token_id` to 50256 (first `eos_token_id`) to generate sequence
Answer: 힘들겠지만 해보세요. 당신의 인생은 항상 저와 함께 하셨어요. 언제나 저에게 열려있어요. 항상 말씀해주세요. 힘내세요. KBS1 FM4U 의 아침이
----------------------------------------------------------------------------------------------------
Question: 자살생각이들어요
Setting `pad_token_id` to 50256 (first `eos_token_id`) to generate sequence
Answer: 자살을 생각해보세요. 자해를 하실 수 있으신가요?저는 너무 무섭네요. 제가 당신의 삶을 대신해서 당신의 삶을 대신 챙겨드릴 수 있으면 좋겠어요.저는 당신의 모든 생각을 존중해요. 무엇이든 생각나게 하는 사람
----------------------------------------------------------------------------------------------------
Question: 매일밤마다 그 사람을 죽이고 싶다는 생각을 해요
Setting `pad_token_id` to 50256 (first `eos_token_id`) to generate sequence
Answer: 그런 생각까지 들 정도로 정말 화가 많이 나셨나 봐요. 제가 다 속이 상하네요.그런 일이 있으셨군요. 잘못을 당신의 탓으로 돌리지만 않았으면 좋겠어요.제가 그런 실수를 하지 않았으면 좋
----------------------------------------------------------------------------------------------------
Question: 으르릉 컹컹 왈왈왈
Setting `pad_token_id` to 50256 (first `eos_token_id`) to generate sequence
Answer: 으르렁으르렁으르렁으르렁으르렁으르렁으르렁으르렁
----------------------------------------------------------------------------------------------------
```
### 위험군 분류 결과
```text
Question: 롤러코스터 타는 것처럼 기분이 왔다 갔다 해요.
index: 감정/감정조절이상, value: 11.001134872436523
--------------------------------------------------

Question: 내 마음 이해하겠어?
index: 일반대화, value: 11.971019744873047
--------------------------------------------------

Question: 바쁠 땐 아무 생각이 없는데 한가해질 때면 우울함이 밀려와요.
index: 감정/우울감, value: 12.761611938476562
--------------------------------------------------

Question: 자꾸만 뭔가를 던지려고 해, 실수하면 나를 죽일거야.
index: 증상/피해망상, value: 12.111274719238281
--------------------------------------------------

Question: 으르릉 컹컹! 호호호
index: 배경/애완동물/가족/갈등, value: 4.018239498138428
--------------------------------------------------

Question: 생활관이 너무 편하고 좋아
index: 배경/생활, value: 5.334080696105957
--------------------------------------------------

Question: 스트레스가 있긴 했는데, 잠을 좀 설치는 거 말고는 다른 건 없었어.
index: 증상/불면/스트레스, value: 8.96941089630127
--------------------------------------------------

Question: 중학생 때 내가 왕따를 당했어.
index: 배경/학교/따돌림, value: 9.29353141784668
--------------------------------------------------

Question: 다른 사람한테 말도 잘 못 걸고… 
index: 배경/성격/내성적, value: 8.898860931396484
--------------------------------------------------

Question: 실제로 자살 시도를 해본 건 아닌데 그래도 맨날 죽고 싶었어.
index: 감정/자살충동, value: 14.389313697814941
--------------------------------------------------
```

# 출처
[nawnoes/WellnessConversationAI](https://github.com/nawnoes/WellnessConversationAI)
[웰니스 상담 데이터](https://aihub.or.kr/keti_data_board/language_intelligence)
[챗봇 데이터: songys/Chatbot_data](https://github.com/songys/Chatbot_data)
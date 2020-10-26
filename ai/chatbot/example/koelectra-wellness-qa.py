import pathlib

import torch
import torch.nn as nn
import random

import torch
from transformers import (
  ElectraConfig,
  ElectraTokenizer
)
from model.koelectra import koElectraForSequenceClassification,koelectra_input

if __name__ == "__main__":
  root_path = str(pathlib.Path(__file__).parent.absolute())
  checkpoint_path =f"{root_path}/checkpoint"
  save_ckpt_path = f"{checkpoint_path}/koelectra-wellness-text-classification.pth"
  model_name_or_path = "monologg/koelectra-base-discriminator"

  #답변과 카테고리 불러오기
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

  ctx = "cuda" if torch.cuda.is_available() else "cpu"
  device = torch.device(ctx)

  # 저장한 Checkpoint 불러오기
  checkpoint = torch.load(save_ckpt_path, map_location=device)

  # Electra Tokenizer
  tokenizer = ElectraTokenizer.from_pretrained(model_name_or_path)

  electra_config = ElectraConfig.from_pretrained(model_name_or_path)
  model = koElectraForSequenceClassification.from_pretrained(pretrained_model_name_or_path=model_name_or_path,
                                                             config=electra_config,
                                                             num_labels=359)
  model.load_state_dict(checkpoint['model_state_dict'])
  model.to(device)
  model.eval()


  while 1:
    sent = input('\nQuestion: ') # '요즘 기분이 우울한 느낌이에요'
    data = koelectra_input(tokenizer,sent, device,512)
    # print(data)

    output = model(**data)

    logit = output
    softmax_logit = nn.Softmax(logit).dim
    softmax_logit = softmax_logit[0].squeeze()

    max_index = torch.argmax(softmax_logit).item()
    max_index_value = softmax_logit[torch.argmax(softmax_logit)].item()

    print(f'index: {category[max_index]}, value: {max_index_value}')
    print('-'*50)
  # print('argmin:',softmax_logit[torch.argmin(softmax_logit)])





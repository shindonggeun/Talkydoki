from fastapi import HTTPException, APIRouter
from sklearn.metrics.pairwise import cosine_similarity

import numpy as np
import pandas as pd

import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import Dataset
from pydantic import BaseModel

router = APIRouter()

class DataStorage:
    def __init__(self):
        self.users = [str(i) for i in range(1, 1001)]
        self.categories = ['사회', '경제', '정치', '과학', '문화']
        self.articles = [f"{category}기사{i}" for category in self.categories for i in range(1, 201)]
        self.words = [f"{category}_{i}" for category in self.categories for i in range(1, 201)]

        self.article_word_df = pd.DataFrame(data=np.zeros((1000, 1000), dtype=int), index=self.articles, columns=self.words)
        self.user_word_df = pd.DataFrame(data=np.zeros((1000, 1000), dtype=int), index=self.users, columns=self.words)
        self.user_preferences = [category for category in self.categories for _ in range(200)]
        self.article_categories = [category for category in self.categories for _ in range(200)]

        self.initialize_dataframes()

    def initialize_dataframes(self):
        for i, user in enumerate(self.users):
            preferred_category = self.user_preferences[i]
            preferred_words = [word for word in self.words if preferred_category in word]
            non_preferred_words = [word for word in self.words if preferred_category not in word]

            num_to_exclude = int(len(preferred_words) * np.random.uniform(0.1, 0.15))
            excluded_words = np.random.choice(preferred_words, size=num_to_exclude, replace=False)

            for word in preferred_words:
                if word not in excluded_words:
                    self.user_word_df.at[user, word] = np.random.randint(5, 11)
                else:
                    self.user_word_df.at[user, word] = 0

            for word in non_preferred_words:
                self.user_word_df.at[user, word] = np.random.randint(0, 5)

        for i, article in enumerate(self.article_word_df.index):
            category = self.article_categories[i]
            category_words = [word for word in self.article_word_df.columns if category in word]
            non_category_words = [word for word in self.article_word_df.columns if category not in word]

            num_to_exclude = int(len(category_words) * np.random.uniform(0.1, 0.15))
            excluded_words = np.random.choice(category_words, size=num_to_exclude, replace=False)

            for word in category_words:
                if word not in excluded_words:
                    self.article_word_df.at[article, word] = np.random.uniform(0.5, 1)
                else:
                    self.article_word_df.at[article, word] = 0

            for word in non_category_words:
                self.article_word_df.at[article, word] = np.random.uniform(0, 0.5)

        self.user_word_df_norm = (self.user_word_df - self.user_word_df.min()) / (self.user_word_df.max() - self.user_word_df.min())
        self.article_word_df_norm = (self.article_word_df - self.article_word_df.min()) / (self.article_word_df.max() - self.article_word_df.min())

        self.cosine_sim = cosine_similarity(self.user_word_df_norm, self.article_word_df)
        self.cosine_sim_df = pd.DataFrame(self.cosine_sim, columns=self.articles, index=self.users)

@router.get("/recommend/news/{member_id}")
async def news_recommend(member_id: str):
    if member_id not in data_storage.users:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = data_storage.cosine_sim_df.loc[member_id].sort_values(ascending=False)
    recommendations = user_data.index.values.tolist()[:3]

    return {
        "memberId": member_id, 
        "recommendations": recommendations
        }

class MatrixFactorization(nn.Module):
    def __init__(self, num_users, num_items, latent_dim, dropout_rate=0.8, l2=0.01):
        super(MatrixFactorization, self).__init__()
        self.user_embedding = nn.Embedding(num_users, latent_dim)
        self.item_embedding = nn.Embedding(num_items, latent_dim)
        self.user_bias = nn.Embedding(num_users, 1)
        self.item_bias = nn.Embedding(num_items, 1)
        self.dropout = nn.Dropout(dropout_rate)
        self.l2 = l2

        nn.init.normal_(self.user_embedding.weight, mean=0.0, std=0.01)
        nn.init.normal_(self.item_embedding.weight, mean=0.0, std=0.01)
        nn.init.zeros_(self.user_bias.weight)
        nn.init.zeros_(self.item_bias.weight)

    def forward(self, user_indices, item_indices):
        user_latent = self.dropout(self.user_embedding(user_indices))
        item_latent = self.dropout(self.item_embedding(item_indices))
        user_bias = self.user_bias(user_indices).squeeze()
        item_bias = self.item_bias(item_indices).squeeze()

        prediction = torch.sum(user_latent * item_latent, dim=1) + user_bias + item_bias
        return prediction

    def loss(self, prediction, target):
        return F.mse_loss(prediction, target)

# 데이터셋 클래스 정의
class UserWordDataset(Dataset):
    def __init__(self, data):
        self.users = {user: idx for idx, user in enumerate(data.index)}
        self.items = {item: idx for idx, item in enumerate(data.columns)}
        self.ratings = data.values.flatten().astype(np.float32)

        user_indices = [self.users[user] for user in data.index.repeat(len(data.columns))]
        item_indices = [self.items[item] for item in np.tile(data.columns, len(data.index))]

        self.user_indices = np.array(user_indices)
        self.item_indices = np.array(item_indices)

    def __len__(self):
        return len(self.ratings)

    def __getitem__(self, idx):
        user = torch.tensor(self.user_indices[idx], dtype=torch.long)
        item = torch.tensor(self.item_indices[idx], dtype=torch.long)
        rating = torch.tensor(self.ratings[idx], dtype=torch.float)
        return user, item, rating

# 모델과 데이터셋을 로드하는 함수
def load_model_and_dataset(user_word_df):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model_path = 'best_model.pth'
    model_checkpoint = torch.load(model_path, map_location=device)
    
    num_users, num_items = len(user_word_df.index), len(user_word_df.columns)
    model = MatrixFactorization(num_users, num_items, latent_dim=270, dropout_rate=0.8)
    model.load_state_dict(model_checkpoint['model_state_dict'])
    model.to(device)
    model.eval()

    dataset = UserWordDataset(user_word_df)
    
    return model, dataset, device

data_storage = DataStorage()
model, dataset, device = load_model_and_dataset(data_storage.user_word_df)

class UserRecommendationRequest(BaseModel):
    user_index: int

@router.get("/recommend/word/{member_id}")
async def word_recommend(member_id: str):
    if member_id not in data_storage.users:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_index = data_storage.users.index(member_id)
    
    untrained_item_indices = []
    untrained_item_names = data_storage.user_word_df.iloc[user_index][data_storage.user_word_df.iloc[user_index] == 0].index.tolist()
    for item_name in untrained_item_names:
        item_index = dataset.items[item_name]
        untrained_item_indices.append(item_index)
    
    if not untrained_item_indices:
        return {"message": "No items to recommend for this user."}
    
    untrained_item_indices_tensor = torch.tensor(untrained_item_indices, dtype=torch.long, device=device)
    predictions = model(torch.tensor([user_index] * len(untrained_item_indices), device=device), untrained_item_indices_tensor)
    
    recommended_item_index = untrained_item_indices[torch.argmax(predictions).item()]
    recommended_item_name = list(dataset.items.keys())[list(dataset.items.values()).index(recommended_item_index)]
    
    return {
        "memberId": member_id, 
        "recommended_item": recommended_item_name
        }

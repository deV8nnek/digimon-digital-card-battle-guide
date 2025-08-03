from pathlib import Path

import numpy as np
import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader

from src.pytorchmon.dataset.cardfusion import CardFusionBasicDataset
from src.pytorchmon.model.cardfusion import CardFusionModel

card_fusion = pd.read_csv(Path("data/external/card_fusion.csv"))
data = np.array(card_fusion)
# n_row, n_col = data.shape()
np.random.shuffle(data)

# train_tensor = data[0:10]

# If entire dataset can fit into RAM
# x_train = torch.IntTensor(train_tensor[:,:7])
# y_train = torch.IntTensor(train_tensor[:,7:])

# tensor = TensorDataset(x_train, y_train)

# Dataset → Sampler → DataLoader → Collate → Batch → Model
train_dataset = CardFusionBasicDataset(data)

# Finding right model
model = CardFusionModel()

# Training the model for some number of iterations
# Finding right wieght and bias
train_dataloader = DataLoader(
    train_dataset,
    batch_size=1,
    shuffle=True,
    num_workers=0,
    pin_memory=False,  # use GPU
)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

num_epochs = 1
train_loss, val_loss = [], []

for epoch in range(num_epochs):
    model.train()
    running_loss = 0.0
    for batch_idx, (batch_x, batch_y) in enumerate(train_dataloader):
        outputs = model(batch_x)
        loss = criterion(outputs, batch_y)
        if batch_idx % 100 == 0:
            print(
                f"Epoch [{epoch}/{num_epochs}], Batch [{batch_idx}/{len(train_dataloader)}], Loss: {loss.item():.4f}"
            )


test_dataset = CardFusionBasicDataset(train_dataset)

# Make useful predictions
correct = 0
with torch.no_grad():
    for idx, data in enumerate(test_dataset):
        y = model(data)
        print(f"Index [{idx}], Card Number {y.argmax().item()}")

        if y.argmax().item() == test_dataset[idx]:
            correct += 1
        # predicted_prob = model(test_dataset.data[0])
        # predicted_class = (predicted_prob > 0.5).float().item()
        # print(f"For X = [6.0, 7.0], Predicted Probability: {predicted_prob.item():.4f}, Predicted Class: {predicted_class}")

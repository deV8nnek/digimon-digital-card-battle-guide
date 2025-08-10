import torch
import torch.nn as nn


class CardFusionModel(nn.Module):

    def __init__(self, inp, out, b=False, h1=None, h2=None):
        super(CardFusionModel, self).__init__()
        self.layer1 = nn.Linear(inp, out, bias=b)
        if h1 is not None:
            self.layer1 = nn.Linear(inp, h1, bias=b)
            self.hidden1 = torch.nn.ReLU()
            self.layer2 = nn.Linear(h1, out, bias=b)
        if h2 is not None:
            self.layer2 = nn.Linear(inp, h1, bias=b)
            self.hidden2 = torch.nn.ReLU()
            self.layer3 = nn.Linear(h1, out, bias=b)

    def forward(self, x):
        x = self.layer1(x)
        if hasattr(self, "layer2"):
            x = self.hidden1(x)
            x = self.layer2(x)
        if hasattr(self, "layer3"):
            x = self.hidden1(x)
            x = self.layer2(x)
        return x

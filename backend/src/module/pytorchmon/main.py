import torch

from src.domain.card import Card
from src.module.pytorchmon.model.cardfusion import CardFusionModel


def load():
    INPUT_DIM = 6
    OUTPUT_DIM = 301
    BIAS = False
    H1 = OUTPUT_DIM * 1
    batch_size = 2**4
    lr = 0.001
    epochs = 2**9
    acc = 0.74
    data_src = "gamefaq-526754-24611"

    model = CardFusionModel(INPUT_DIM, OUTPUT_DIM, b=BIAS, h1=H1)
    filename = (
        f"{type(model).__name__}_{data_src}"
        f"_lr-{lr}_bs-{batch_size}"
        f"_epoch-{epochs:03d}"
        f"_acc-{acc:.2f}"
    )
    model.load_state_dict(torch.load(f"resource/model/{filename}.pt"))
    model.eval()
    return model


def predict_fusion(card1: Card, card2: Card):
    x = torch.Tensor(
        [
            card1.number,
            card1.type.to_int(),
            0 if card1.lv is None else card1.lv.to_int(),
            card2.number,
            card2.type.to_int(),
            0 if card2.lv is None else card2.lv.to_int()
        ]
    )
    model = load()
    output = model(x).argmax().item()
    return output

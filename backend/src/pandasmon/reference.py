import re
from pathlib import Path

import pandas as pd

from src.domain.card import Card

r_icon = re.compile(
    r'<img src=.*"((circle)|(O)|(triangle)|(Δ)|(x)|(X)|(fire)|(ice)|(nature)|(darkness)|(rare)).*"\/>',
    re.IGNORECASE,
)
r_en = re.compile(
    r"(?<= )((circle)|(O)|(triangle)|(Δ)|(x)|(X)|(fire)|(ice)|(nature)|(darkness)|(rare))$",
    re.IGNORECASE,
)


def repl(match: re.Match):
    if match:
        icon = match.groups()[0]
        if match.groups()[1] or match.groups()[2]:
            icon = Card.button("circle")
        elif match.groups()[3] or match.groups()[4]:
            icon = Card.button("triangle")
        elif match.groups()[5] or match.groups()[6]:
            icon = Card.button("X")
        return f"{icon}"
    return None


cards_jp = pd.read_csv(Path("data/external/card.csv"))
cards_jp = cards_jp[["number", "name", "type", "lv"]]
cards_jp["name"] = [r_icon.sub(repl, name) for name in cards_jp["name"]]
cards_en = pd.read_csv(Path("data/external/card_en_only.csv"))
cards_en = cards_en[["number", "name_en"]]
cards_en["name_en"] = [r_en.sub(repl, name) for name in cards_en["name_en"]]
cards = Path("data/processed/card_ref.csv")
cards.parent.mkdir(parents=True, exist_ok=True)
cards = pd.merge(cards_jp, cards_en)
cards = cards[["number", "name", "name_en", "type", "lv"]]
cards.to_csv("data/processed/card_ref.csv", index=False)

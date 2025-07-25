from pathlib import Path

import pandas as pd

cards_jp = pd.read_csv(Path("data/external/card.csv"))
cards_jp = cards_jp[["number", "name", "type", "lv"]]
cards_en = pd.read_csv(Path("data/external/card_en_only.csv"))
cards_en = cards_en[["number", "name_en"]]
cards = Path("data/processed/card_ref.csv")
cards.parent.mkdir(parents=True, exist_ok=True)
cards = pd.merge(cards_jp, cards_en)
cards = cards[["number", "name", "name_en", "type", "lv"]]
cards.to_csv("data/processed/card_ref.csv", index=False)

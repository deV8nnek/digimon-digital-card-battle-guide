# import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sqlmodel import Session, select
from src.config.db import engine
from src.domain.card import Card


def read_card():
    with Session(engine) as session:
        statement = select(Card).limit(300)
        card_dataset = session.exec(statement).all()
        return card_dataset


def clean(df):
    df = pd.DataFrame(read_card())
    df.columns = [el[0] for el in df.loc[0]]
    for column in df.columns:
        df[column] = [el[1] for el in df[column]]
    df = (
        df.dropna()
        .drop_duplicates()
        .drop(columns=["number", "lv", "effect", "special_effect", "img"])
    )
    df = df.fillna(0)
    for column in df.columns:
        if column == "type":  # since of fillna
            df[column] = [el.value for el in df[column]]
            ctype = pd.CategoricalDtype(categories=[t.value for t in Card.CardType])
            df[column] = df[column].astype(ctype)
        elif column not in ["name"]:  # since drop will infer type
            df[column] = df[column].astype(int, errors="ignore")
    return df


# def show_digimon_stats():
df = pd.DataFrame(clean(read_card()))
card1 = df.copy().sample(n=1)
# card_2 = df.copy().sample(n=1)
filter = df.copy()

filter = filter.pivot_table(
    values=["hp", "circle", "pow", "x", "dp", "triangle"],
    index=[
        "type",
    ],
    aggfunc=[
        "max",
    ],
)

name = card1["name"].tolist()[0]
card1 = card1[[column for column in filter.columns.get_level_values(1)]]
filter.columns = filter.columns.droplevel(0)
filter.index = filter.index.set_names(None)
filter = filter.sort_values(by="hp", ascending=False)
filter.loc[name] = card1.iloc[0].to_list()
filter = filter.astype(int)

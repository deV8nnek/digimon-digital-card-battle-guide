from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from japanize_matplotlib import fonts
from sqlmodel import Session, select

from src.config.db import engine
from src.domain.card import Card


def read_card():
    with Session(engine) as session:
        statement = select(Card).limit(301)
        card_dataset = session.exec(statement).all()
        return card_dataset


def clean_card(data):
    df = pd.DataFrame(data)
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
            ctype = pd.CategoricalDtype(
                categories=[t.value for t in Card.CardType], ordered=True
            )
            df[column] = df[column].astype(ctype)
        elif column not in ["name"]:  # since drop will infer type
            df[column] = df[column].astype(int, errors="ignore")
    return df


def gen_summary(cards: pd.DataFrame):
    df = cards.copy()
    min = df.pivot_table(
        values=["hp", "circle", "pow", "dp", "x", "triangle"],
        index=[
            "type",
        ],
        aggfunc=[
            "min",
        ],
        observed=False,
        sort=False,
    )
    mean = df.pivot_table(
        values=["hp", "circle", "pow", "dp", "x", "triangle"],
        index=[
            "type",
        ],
        aggfunc=[
            "mean",
        ],
        observed=False,
        sort=False,
    )
    max = df.pivot_table(
        values=["hp", "circle", "pow", "dp", "x", "triangle"],
        index=[
            "type",
        ],
        aggfunc=[
            "max",
        ],
        observed=False,
        sort=False,
    )
    min.columns = min.columns.droplevel(0)
    min.index = min.index.set_names(None)
    min = min.sort_values(by="hp", ascending=False)
    min = min.astype(int)
    mean.columns = mean.columns.droplevel(0)
    mean.index = mean.index.set_names(None)
    mean = mean.sort_values(by="hp", ascending=False)
    mean = mean.astype(int)
    max.columns = max.columns.droplevel(0)
    max.index = max.index.set_names(None)
    max = max.sort_values(by="hp", ascending=False)
    max = max.astype(int)
    return [min, mean, max]


def gen_chart_data(cards: pd.DataFrame, card: pd.DataFrame, filter):
    agg = ["min", "mean", "max"]
    for a, max in zip(agg, [650, 1273, 2750]):
        df = cards[cards["type"].isin(filter)]
        df = df.pivot_table(
            values=["hp", "circle", "pow", "dp", "x", "triangle"],
            index=[
                "type",
            ],
            aggfunc=[
                a,
            ],
            observed=False,
            sort=False,
        )
        df.columns = df.columns.droplevel(0)
        df.index = df.index.set_names(None)
        df = df.sort_values(by="hp", ascending=False)
        if int(card.iloc[0]["hp"]) <= max:
            agg = a
            break
    cards = df
    name = card["name"].tolist()[0]
    card = card[[column for column in cards.columns]]
    cards.loc[name] = card.iloc[0].to_list()
    cards = cards.astype(int)
    return (cards, agg)


def gen_chart(chart_data):
    chd, agg = chart_data
    yt = 750 if (agg == "min") else 1500 if (agg == "mean") else 3000
    yt = np.arange(0, yt + 1, yt / 5).astype(int)
    labels = [
        column if column not in ["circle", "triangle", "x"] else Card.button(column)
        for column in chd.columns.tolist()
    ]
    theta = [n / float(len(labels)) * 2 * np.pi for n in range(len(labels))]
    theta.append(theta[0])  # close line

    fig, ax = plt.subplots(figsize=(6, 6), subplot_kw=dict(polar=True))
    ax.set_theta_zero_location("N")
    ax.set_axisbelow(False)
    ax.set_rlabel_position(90)
    ax.set_xticks(theta[:-1], labels)
    ax.set_yticks(yt[1:], yt[1:])
    ax.set_title("スタッツ")
    for index, row in chd.iterrows():
        row = row.tolist()
        row.append(row[0])  # close line
        color = Card.CardType.OPTION.color()
        if index in [member.value for member in Card.CardType]:
            color = Card.CardType(index).color()
            a = "(min)" if (agg == "min") else "(mean)" if (agg == "mean") else "(max)"
            index = f"{index} {a}"
        ax.plot(theta, row, color=color, label=index)
        ax.fill(theta, row, color=color, alpha=0.4)
    ax.legend(ncol=1, facecolor="ivory", loc="lower center")
    return fig


cards = Path("data/processed/card.csv")
if not cards.exists():
    cards.parent.mkdir(parents=True, exist_ok=True)
    cards = clean_card(read_card())
    cards.to_csv("data/processed/cards.csv", index=False)

filter = [member.value for member in Card.CardType][:-1]

chd = gen_summary(cards.copy())

chd[0].to_csv("data/processed/card_by-type_hp-min.csv", index=True)
chd[1].to_csv("data/processed/card_by-type_hp-mean.csv", index=True)
chd[2].to_csv("data/processed/card_by-type_hp-max.csv", index=True)

# card1 = cards[cards["name"] == "アカトリモン"]
# chart = gen_chart(gen_chart_data(cards.copy(), card1.copy(), filter))
# chart.savefig(f'img/{str(card1.iloc[0]["name"])}.svg', dpi=300, transparent=True)
# chart.savefig(f'img/{str(card1.iloc[0]["name"])}.png', dpi=300, transparent=False)

# card1 = cards[cards["name"] == "シーラモン"]
# chart = gen_chart(gen_chart_data(cards.copy(), card1.copy(), filter[:3]))
# chart.savefig(f'img/{str(card1.iloc[0]["name"])}.svg', dpi=300, transparent=True)

# card1 = cards[cards["name"] == "ヴェノムヴァンデモン"]
# chart = gen_chart(gen_chart_data(cards.copy(), card1.copy(), [filter[3]]))
# chart.savefig(f'img/{str(card1.iloc[0]["name"])}.svg', dpi=300, transparent=True)

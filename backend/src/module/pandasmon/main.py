from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from japanize_matplotlib import fonts

from src.domain.card import Card


def read(path):
    return pd.read_csv(Path(path), index_col=0)


def clean(data):
    df = pd.DataFrame([vars(data)])
    return df


def gen_chart_data(card: pd.DataFrame, filter):
    agg = ["min", "mean", "max"]
    for a, max in zip(agg, [650, 1273, 2750]):
        if int(card.iloc[0]["hp"]) <= max:
            agg = a
            if a == "min":
                df = read("resource/data/external/card_by-type_hp-min.csv")
            elif a == "mean":
                df = read("resource/data/external/card_by-type_hp-mean.csv")
            else:
                df = read("resource/data/external/card_by-type_hp-max.csv")
            break
    filter = [Card.CardType(el).value for el in filter]
    cards = df.loc[filter]
    name = card["name"].tolist()[0]
    card = card[[column for column in cards.columns]]
    cards.loc[name] = card.iloc[0].to_list()
    return (cards, agg)


def gen_fig(chart_data):
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
        alpha = 0.4
        if index in [member.value for member in Card.CardType]:
            color = Card.CardType(index).color()
            a = "(min)" if (agg == "min") else "(mean)" if (agg == "mean") else "(max)"
            index = f"{index} {a}"
        else:
            alpha = 0.7
        ax.plot(theta, row, color=color, label=index)
        ax.fill(theta, row, color=color, alpha=alpha)
    ax.legend(ncol=1, facecolor="ivory", loc="lower center")
    return fig


def gen_chart(card, filter):
    card = clean(card)
    chart_data = gen_chart_data(card, filter)
    chart = gen_fig(chart_data)
    return chart


# card = Card(
#     number=0,
#     name="インペリアルドラモン",
#     type=Card.CardType.FIRE,
#     lv=Card.CardLv.U,
#     hp=1900,
#     circle=980,
#     pow=10,
#     dp=60,
#     x=0,
#     triangle=670,
#     special_effect="",
#     effect="",
#     img="",
# )
# filter = [member.value for member in Card.CardType][:-1]
# chart = gen_chart(card, filter)
# chart.show()

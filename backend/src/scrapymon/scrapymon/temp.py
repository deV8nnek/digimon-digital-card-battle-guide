from pathlib import Path

import pandas as pd


def closest(fromString: str, toString: str):
    threshold = 1
    if (
        len(fromString) == len(toString)
        or len(fromString) == len(toString) + threshold
        or len(fromString) == len(toString) - threshold
    ):
        fromString = fromString.lower()
        toString = toString.lower()
        i = 0
        j = 0
        while i < len(fromString) and j < len(toString):
            if threshold < 0:
                break
            if fromString[i] != toString[j]:
                k = 1
                while k < threshold + 1:
                    if not (i + k < len(fromString) or j + k < len(toString)):
                        break
                    if (
                        fromString[i] == toString[j + k]
                        and fromString[i + k] == toString[j]
                    ):
                        j += k + 1
                        i += k + 1
                        k += 1
                    elif fromString[i] == toString[j + k]:
                        j += k
                    elif fromString[i + k] == toString[j]:
                        i += k
                    k += 1
                threshold -= 1
            i += 1
            j += 1
    else:
        threshold = -1
    return threshold >= 0


card_ref = pd.read_csv(Path("../scrapymon/data/external/card_ref.csv"))
l = [
    # "Imperialdrmon",
    # "MasterTyranomon", #Fixed in card_spider_en
    # "MasterTyranomon",
    # "R.Gatomon",
    # "Sylpkymon",
    # "MasterTyranomon",
    # "Digitamamamon",
    # "Digi-Sardnyx",
    # "Digi-Sardnyx",
    # "Attack Disk O", #Fixed in card_spider_fusion
    # "Patch Of Love", #Fixed in card_spider_fusion
    # "Heap Of Junk", #Fixed in card_spider_fusion
    # "Heap Of Junk",
    # "Heap Of Junk",
    # "Heap Of Junk",
    # "Grankuwagamon",
    # "Grankuwagamon",
    # "Mega Def. Disk Circle", #Fixed in card_spider_fusion
    # "Attack Disk Triangle", #Fixed in card_spider_fusion
    # "Digi-Devolve",
    "MetalGarurmon",
    # "WereGarurmon",
    # "R.Gatomon",
    # "Anklyomon",
    # "Heap Of Junk",
]

items = []
for name_en in l:
    df = card_ref.copy()
    df = df[[closest(el, name_en) for el in df["name_en"].values.flatten().tolist()]]
    if type(df) is type([]) and not df:
        print(name_en)
    elif type(df) is type(pd.DataFrame()) and df.empty:
        print(name_en)
    df = df.values.flatten().tolist()
    items.extend(df)

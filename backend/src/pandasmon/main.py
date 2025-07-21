import numpy as np
import pandas as pd
from sqlmodel import Session, select

from src.config.db import engine
from src.domain.card import Card

# def read_card():
with Session(engine) as session:
    statement = select(Card).limit(300) #300)
    card_dataset = session.exec(statement).all()
    # return card_dataset


    # def format():
    # df = pd.DataFrame(read_card())
    df = pd.DataFrame(card_dataset)
    df.columns = [el[0] for el in df.loc[0]]
    for column in df.columns:
        df[column] = [el[1] for el in df[column]]
    df = df.dropna().drop_duplicates().drop(columns=['"number',"effect","special_effect"])
    for column in ["hp","dp","pow","circle","triangle","x"]:
        df[column] = df[column].astype(pd.Int64Dtype(), errors="ignore")
    
    # return df

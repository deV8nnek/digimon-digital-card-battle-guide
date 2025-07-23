from enum import Enum

from sqlmodel import Field, SQLModel


class CardBase(SQLModel):
    class CardType(Enum):
        FIRE = "火炎"
        ICE = "氷水"
        NATURE = "自然"
        DARKNESS = "暗黒"
        RARE = "珍種"
        OPTION = "ＯＰ"

        @classmethod
        def _missing_(cls, s: str):
            match s:
                case "オプション":
                    return cls.OPTION

        def color(self):
            match self.value:
                case self.FIRE.value:
                    return "orangered"
                case self.ICE.value:
                    return "cornflowerblue"
                case self.NATURE.value:
                    return "lightgreen"
                case self.DARKNESS.value:
                    return "black"
                case self.RARE.value:
                    return "gold"
            return "brown"

    class CardLv(Enum):
        R = "Ⅲ"
        C = "Ⅳ"
        U = "完"
        A = "Ａ"

        @classmethod
        def _missing_(cls, s: str):
            match s.upper():
                case "III":
                    return cls.R
                case "IV":
                    return cls.C
                case "A":
                    return cls.A

    number: int = Field(ge=0, le=301, primary_key=True)
    name: str
    type: CardType
    lv: CardLv | None = None
    hp: int | None = Field(default=None, ge=0)
    dp: int | None = Field(default=None, ge=0)
    pow: int | None = Field(default=None, ge=0)
    circle: int | None = Field(default=None, ge=0)
    triangle: int | None = Field(default=None, ge=0)
    x: int | None = Field(default=None, ge=0)
    special_effect: str | None = None
    effect: str
    img: str = Field(default='<img src="{0}/{1}.png" alt="{2}"/>')

    @staticmethod
    def button(s: str) -> str:
        match s.lower():
            case "circle":
                return "〇"
            case "triangle":
                return "△"
            case "x":
                return "X"
        return ""


class Card(CardBase, table=True):
    pass

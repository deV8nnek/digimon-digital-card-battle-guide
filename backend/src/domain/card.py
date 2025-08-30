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
            s = s.upper()
            match s:
                case "オプション":
                    return cls.OPTION
            if s in cls._member_names_:
                return cls._member_map_.get(s)

        def to_int(self):
            match self.value:
                case self.FIRE.value:
                    return 1
                case self.ICE.value:
                    return 2
                case self.NATURE.value:
                    return 3
                case self.DARKNESS.value:
                    return 4
                case self.RARE.value:
                    return 5
                case self.OPTION.value:
                    return 6

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
            return "ivory"

    class CardLv(Enum):
        R = "Ⅲ"
        C = "Ⅳ"
        U = "完"
        A = "Ａ"

        @classmethod
        def _missing_(cls, s: str):
            match s:
                case "III":
                    return cls.R
                case "IV":
                    return cls.C
                case "A":
                    return cls.A
            if s in cls._member_names_:
                return cls._member_map_.get(s)

        def to_int(self):
            match self.value:
                case self.U.value:
                    return 6
                case self.A.value:
                    return 5
                case self.C.value:
                    return 4
                case self.R.value:
                    return 3

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
    img: str = Field(default="{0}")

    @staticmethod
    def button(s: str) -> str:
        match s.lower():
            case "circle":
                return "〇"
            case "triangle":
                return "△"
            case "x" | "✖":
                return "X"
        return s


class Card(CardBase, table=True):
    pass


class CardPublic(CardBase):
    pass

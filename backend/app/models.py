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

    number: int | None = Field(default=None, ge=0, le=301, primary_key=True)
    name: str = Field(max_length=10)
    type: CardType
    lv: CardLv | None = None
    hp: int | None = Field(default=None, ge=0)
    dp: int | None = Field(default=None, ge=0)
    pow: int | None = Field(default=None, ge=0)
    circle: int | None = Field(default=None, ge=0)
    triangle: int | None = Field(default=None, ge=0)
    x: int | None = Field(default=None, ge=0)
    special_effect: str | None = Field(default=None, max_length=93)
    effect: str = Field(max_length=376)
    img: str = Field(
        default='<img src="~/img/card/card_{0}.png" alt="{0}">', max_length=59
    )


class Card(CardBase, table=True):
    pass


# # Shared properties
# class UserBase(SQLModel):
#     email: EmailStr = Field(unique=True, index=True, max_length=255)
#     is_active: bool = True
#     is_superuser: bool = False
#     full_name: str | None = Field(default=None, max_length=255)


# # Properties to receive via API on creation
# class UserCreate(UserBase):
#     password: str = Field(min_length=8, max_length=40)


# class UserRegister(SQLModel):
#     email: EmailStr = Field(max_length=255)
#     password: str = Field(min_length=8, max_length=40)
#     full_name: str | None = Field(default=None, max_length=255)


# # Properties to receive via API on update, all are optional
# class UserUpdate(UserBase):
#     email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
#     password: str | None = Field(default=None, min_length=8, max_length=40)


# class UserUpdateMe(SQLModel):
#     full_name: str | None = Field(default=None, max_length=255)
#     email: EmailStr | None = Field(default=None, max_length=255)


# class UpdatePassword(SQLModel):
#     current_password: str = Field(min_length=8, max_length=40)
#     new_password: str = Field(min_length=8, max_length=40)


# # Database model, database table inferred from class name
# class User(UserBase, table=True):
#     id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
#     hashed_password: str
#     items: list["Item"] = Relationship(back_populates="owner", cascade_delete=True)


# # Properties to return via API, id is always required
# class UserPublic(UserBase):
#     id: uuid.UUID


# class UsersPublic(SQLModel):
#     data: list[UserPublic]
#     count: int


# # Shared properties
# class ItemBase(SQLModel):
#     title: str = Field(min_length=1, max_length=255)
#     description: str | None = Field(default=None, max_length=255)


# # Properties to receive on item creation
# class ItemCreate(ItemBase):
#     pass


# # Properties to receive on item update
# class ItemUpdate(ItemBase):
#     title: str | None = Field(default=None, min_length=1, max_length=255)  # type: ignore


# # Database model, database table inferred from class name
# class Item(ItemBase, table=True):
#     id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
#     owner_id: uuid.UUID = Field(
#         foreign_key="user.id", nullable=False, ondelete="CASCADE"
#     )
#     owner: User | None = Relationship(back_populates="items")


# # Properties to return via API, id is always required
# class ItemPublic(ItemBase):
#     id: uuid.UUID
#     owner_id: uuid.UUID


# class ItemsPublic(SQLModel):
#     data: list[ItemPublic]
#     count: int


# # Generic message
# class Message(SQLModel):
#     message: str


# # JSON payload containing access token
# class Token(SQLModel):
#     access_token: str
#     token_type: str = "bearer"


# # Contents of JWT token
# class TokenPayload(SQLModel):
#     sub: str | None = None


# class NewPassword(SQLModel):
#     token: str
#     new_password: str = Field(min_length=8, max_length=40)

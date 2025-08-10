from io import BytesIO
from typing import Annotated

from fastapi import APIRouter, Query
from fastapi.responses import StreamingResponse
from sqlmodel import select

import src.module.pandasmon.main as pandasmon
import src.module.pytorchmon.main as pytorchmon
from src.common.dependency import Session
from src.domain.card import Card, CardPublic

router = APIRouter(prefix="/card", tags=["card"])


@router.get("/")
async def get_cards(session: Session):
    result = await session.exec(select(Card).order_by(Card.number))
    result = result.all()
    return list[CardPublic](result)


@router.get("/stat-chart/{num}")
async def get_chart(session: Session, num: int, filter: Annotated[list[str], Query()]):
    card = await session.exec(select(Card).where(Card.number == num))
    card = card.first()
    result = pandasmon.gen_chart(card, filter)
    buffer = BytesIO()
    result.savefig(buffer, format="png", dpi=300, transparent=True)
    buffer.seek(0)
    return StreamingResponse(buffer, media_type="image/png")


@router.get("/fusion")
async def get_fusion(session: Session, num1: int, num2: int):
    card1 = await session.exec(select(Card).where(Card.number == num1))
    card2 = await session.exec(select(Card).where(Card.number == num2))
    card1, card2 = card1.first(), card2.first()
    result = pytorchmon.predict_fusion(card1, card2)
    result = await session.exec(select(Card).where(Card.number == result))
    result = result.first()
    return result

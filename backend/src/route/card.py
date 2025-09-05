from io import BytesIO
from typing import Annotated

from fastapi import APIRouter, HTTPException, Query, status
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
    try:
        [Card.CardType(el) for el in filter]
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            # detail="Filter is invalid"
            detail="フィルターの入力は無効です",
        )
    if num < 0 or num > 190:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            # detail="Only digimon cards (0 to 190) are valid"
            detail="有効なのはデジモンカード（0から190まで）だけです",
        )
    card = await session.exec(select(Card).where(Card.number == num))
    card = card.first()
    result = pandasmon.gen_chart(card, filter)
    buffer = BytesIO()
    result.savefig(buffer, format="png", dpi=100, transparent=True)
    buffer.seek(0)
    return StreamingResponse(buffer, media_type="image/png")


@router.get("/fusion")
async def get_fusion(session: Session, num1: int, num2: int):
    if num1 < 0 or num1 > 300 or num2 < 0 or num2 > 300:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            # detail="Only cards (0 to 300) are valid"
            detail="有効なのはカード（0から300まで）だけです",
        )
    if num1 >= 172 and num1 <= 190 or num2 >= 172 and num2 <= 190:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            # detail="Partner cards as input is invalid"
            detail="パートナーカードの入力は無効です",
        )
    if num1 in [103, 200, range(273, 293)] or num2 in [103, 200, range(273, 293)]:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            # detail="Hard to obtain cards as input is not recommended"
            detail="入手困難なカードの入力は推奨しません",
        )
    card1 = await session.exec(select(Card).where(Card.number == num1))
    card2 = await session.exec(select(Card).where(Card.number == num2))
    card1, card2 = card1.first(), card2.first()
    result = pytorchmon.predict_fusion(card1, card2)
    result = await session.exec(select(Card).where(Card.number == result))
    result = result.first()
    return result

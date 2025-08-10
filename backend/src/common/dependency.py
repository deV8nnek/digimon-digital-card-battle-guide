from collections.abc import AsyncGenerator
from typing import Annotated

from fastapi import Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from src.config.db import engine


async def get_db() -> AsyncGenerator[AsyncSession, None, None]:
    async with AsyncSession(engine) as session:
        yield session


Session = Annotated[AsyncSession, Depends(get_db)]

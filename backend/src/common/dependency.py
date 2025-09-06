from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel.ext.asyncio.session import AsyncSession

from src.config.env import settings


async def get_session():
    engine = create_async_engine(str(settings.SQLALCHEMY_DATABASE_URI))
    async with AsyncSession(engine) as session:
        yield session


Session = Annotated[AsyncSession, Depends(get_session)]

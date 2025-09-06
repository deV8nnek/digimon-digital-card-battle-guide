from fastapi import FastAPI

from src.route import card

app = FastAPI()

app.include_router(card.router)

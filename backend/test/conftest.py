import asyncio
import sys

import pytest
from fastapi.testclient import TestClient

from src.main import app

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client

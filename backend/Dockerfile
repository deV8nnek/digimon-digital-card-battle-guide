# https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile
FROM python:3.10

WORKDIR /src

# https://docs.astral.sh/uv/guides/integration/docker
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy
# RUN --mount=type=cache,target=/root/.cache/uv \
#     uv sync
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --no-install-project --no-dev

COPY . /src

ENV PATH="/backend/.venv/bin:$PATH"
CMD ["fastapi", "run", "src/main.py"]

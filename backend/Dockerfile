# https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile
# https://docs.docker.com/build/building/multi-stage/
FROM python:3.10 AS build

# https://docs.astral.sh/uv/guides/integration/docker
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy
ENV UV_TOOL_BIN_DIR=/usr/local/bin
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --no-install-project --no-dev

FROM build AS final

WORKDIR /backend

COPY . .

ENV PATH="/backend/.venv/bin:$PATH"
ENTRYPOINT []

CMD ["fastapi", "run", "src/main.py"]

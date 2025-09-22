# FastAPI Project - Backend

## Requirement

- [uv](https://docs.astral.sh/uv/) for Python package and dependency management

## Directory Layout

- `backend` - project root
  - `/asset` - subset of resource but static like media
  - `/resource` - non-code files
  - `/script` - run modules, etc.
  - `/src` - source folder
    - `/alembic` - migration
    - `/common` - dependency, etc.
    - `/config` - environment, security, etc.
    - `/domain` - entity, etc.
    - `/module` - logic, etc.
    - `/route` - endpoints, etc.
  - `/test` - test folder

## Setup

Install dependencies

```bash
$ uv sync
```

Set python interpreter in VSCode from `backend/.venv`

Initialize database

```bash
alembic upgrade head
```

Import the data from `resource/data/external/card.csv` to the database.

If using command,

```bash
# Postgresql must be installed and with environment variable
# Change parameters as needed
psql -d postgresql://postgres:postgres@localhost:5432/digimon-digital-card-battle-guide -c "\\copy public.card FROM 'resource/data/external/card.csv' WITH(FORMAT csv, DELIMITER ',', HEADER, ENCODING 'UTF8', QUOTE '\"', ESCAPE '\"');"
```

For further configurations, see **Migrations** section at the bottom.

## Run

Activate virtual environment
Run in local environment

```bash
# Linux
source .venv/bin/activate 
# Windows
source .venv/Scripts/activate
fastapi dev src/main.py
```

## Debug

Edit `vscode/launch.json` as necessary

See VSCode > Run and Debug

## Test

Run in local environment

```bash
pytest
```

Manage CI workflows from `.github/workflows`

Runs automatically in Github Actions

## Deploy

See [deploy.md](../deploy.md)

Manage CD workflows from `.github/workflows`

Run automatically in Github Actions

## Configure

### Environment Variables

Edit `.env.*` and `src/config` as necessary

### Migrations

Make revision which reflects on the database,

Like add import to the new model in `alembic/env.py`

```bash
alembic revision --autogenerate -m "Add model"
alembic upgrade head
```

Delete revision from `alembic/versions`

# FastAPI Project - Backend

## Requirement

- [uv](https://docs.astral.sh/uv/) for Python package and dependency management

## Directory Layout

- `backend` - project root
  - `/asset` - subset of resource but static like media
  - `/resource` - non-code files
  - `/scripts` - run modules, etc.
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

Set python interpreter from `backend/.venv`

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

**Manually**,
<br>Edit the log_file such as for current year month in pytest config from `pyproject.toml`
<br>For each test, rename the log file to not be overwritten

### Backend tests

To test the backend run:

```console
bash ./scripts/test.sh
```

The tests run with Pytest, modify and add tests to `./backend/app/tests/`.

If you use GitHub Actions the tests will run automatically.

### Test running stack

If your stack is already up and you just want to run the tests, you can use:

```bash
docker compose exec backend bash scripts/tests-start.sh
```

That `/app/scripts/tests-start.sh` script just calls `pytest` after making sure that the rest of the stack is running. If you need to pass extra arguments to `pytest`, you can pass them to that command and they will be forwarded.

For example, to stop on first error:

```bash
docker compose exec backend bash scripts/tests-start.sh -x
```

### Test Coverage

When the tests are run, a file `htmlcov/index.html` is generated, you can open it in your browser to see the coverage of the tests.

## Deploy

### Docker Compose

Start the local development environment with Docker Compose following the guide in [../development.md](../development.md).

* Start an interactive session in the backend container:

```console
$ docker compose exec backend bash
```

During development, you can change Docker Compose settings that will only affect the local development environment in the file `docker-compose.override.yml`.

The changes to that file only affect the local development environment, not the production environment. So, you can add "temporary" changes that help the development workflow.

For example, the directory with the backend code is synchronized in the Docker container, copying the code you change live to the directory inside the container. That allows you to test your changes right away, without having to build the Docker image again. It should only be done during development, for production, you should build the Docker image with a recent version of the backend code. But during development, it allows you to iterate very fast.

There is also a command override that runs `fastapi run --reload` instead of the default `fastapi run`. It starts a single server process (instead of multiple, as would be for production) and reloads the process whenever the code changes. Have in mind that if you have a syntax error and save the Python file, it will break and exit, and the container will stop. After that, you can restart the container by fixing the error and running again:

```console
$ docker compose watch
```

There is also a commented out `command` override, you can uncomment it and comment the default one. It makes the backend container run a process that does "nothing", but keeps the container alive. That allows you to get inside your running container and execute commands inside, for example a Python interpreter to test installed dependencies, or start the development server that reloads when it detects changes.

To get inside the container with a `bash` session you can start the stack with:

```console
$ docker compose watch
```

and then in another terminal, `exec` inside the running container:

```console
$ docker compose exec backend bash
```

You should see an output like:

```console
root@7f2607af31c3:/app#
```

that means that you are in a `bash` session inside your container, as a `root` user, under the `/app` directory, this directory has another directory called "app" inside, that's where your code lives inside the container: `/app/app`.

There you can use the `fastapi run --reload` command to run the debug live reloading server.

```console
$ fastapi run --reload app/main.py
```

...it will look like:

```console
root@7f2607af31c3:/app# fastapi run --reload app/main.py
```

and then hit enter. That runs the live reloading server that auto reloads when it detects code changes.

Nevertheless, if it doesn't detect a change but a syntax error, it will just stop with an error. But as the container is still alive and you are in a Bash session, you can quickly restart it after fixing the error, running the same command ("up arrow" and "Enter").

...this previous detail is what makes it useful to have the container alive doing nothing and then, in a Bash session, make it run the live reload server.

## Configure

### Migrations

To make revision which reflects on the database,

Like add import to the new model in `alembic/env.py`

```bash
alembic revision --autogenerate -m "Add model"
alembic upgrade head
```

To delete revision, remove it from `alembic/versions`

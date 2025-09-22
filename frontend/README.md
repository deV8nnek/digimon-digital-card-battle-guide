# FastAPI Project - Frontend

## Requirement

- [Node.js](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation)

## Directory Layout

- `frontend` - project root
  - `/public` - next folder for favicon.ico, etc.
    - `/asset` - subset of resource but static like media
- `/src` - source folder
  - `/app` - next folder for pages
  - `/domain` - entity, etc.
  - `/component` - ui
  - `/hook` - logic etc.
  - `/lib` - utility, helper etc.
  - `/style` - css

## Setup

Install dependencies

```bash
pnpm install
```

## Run

Run in local environment

```bash
pnpm run dev
```

## Debug

Edit `vscode/launch.json` as necessary

See VSCode > Run and Debug

## Test

...

## Deploy

See [deploy.md](../deploy.md)

Manage CD workflows from `.github/workflows`

Run automatically in Github Actions

## Configure

### Environment Variables

Edit `.env.*` and `src/config` as necessary

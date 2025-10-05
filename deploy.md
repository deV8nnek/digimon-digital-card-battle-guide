# FastAPI Project - Deployment

- [docker](https://www.docker.com/) for containerization
- **kubernetes** for orchestration # already in docker

# Docker

Build the docker image

```bash
docker build -t digimon-digital-card-battle-guide/backend ./backend
docker build -t digimon-digital-card-battle-guide/frontend ./frontend
# or
bash scripts/build.sh backend
bash scripts/build.sh
```

# Kubenetes

Build namespace
```bash
kubectl apply -f config/namespace.yaml
```

Build deployment
Note: 
- Redeploy if same name otherwise use **kubectl delete**
- May run script twice since pod is not yet ready 

```bash
kubectl apply -f config/dev/backend.yaml -n dev
kubectl apply -f config/dev/database.yaml -n dev
kubectl apply -f config/dev/frontend.yaml -n dev
# or
kubectl apply -k config/dev -n dev
# or
bash scripts/deploy.sh dev db
# or
bash scripts/redeploy.sh dev db
```

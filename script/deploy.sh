#! /usr/bin/env bash

echo "deploy.sh $1"

env="default"
if [[ -n $1 ]]; then
    env=$1
fi

echo "namespace $env"

if [[ $env != "default" ]]; then
    kubectl apply -f config;
fi
kubectl apply -f config/$env -n $env;

# echo Waiting for pods to be created \(30 seconds\)...
# sleep 30s

backend=$(kubectl get pod -n $env -o name | grep -o "backend.*");
database=$(kubectl get pod -n $env -o name | grep -o "database.*");

kubectl wait --for=condition=Available "deployment/backend" -n $env --timeout=300s
kubectl wait  --for=condition=Ready "pod/$database" -n $env --timeout=300s

echo Initialize database - tables
kubectl exec $backend -n $env -- bash \
    -c "uv run --no-dev --no-sync alembic upgrade head"

echo Initialize database - data
kubectl cp "./backend/resource/data/external/card.csv" "${env}/${database}:var/database" && \
kubectl exec -i $database -n $env -- bash \
    -c "cd var/database && psql -U changethis -d digimon-digital-card-battle-guide" <<EOF
    \copy public.card FROM 'card.csv' WITH(FORMAT csv, DELIMITER ',', HEADER, ENCODING 'UTF8', QUOTE '"', ESCAPE '"');
EOF


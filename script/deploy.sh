#! /usr/bin/env bash

env="dev"
if [[ -n $1 ]]; then
    env=$1
fi

kubectl apply -k config/$env -n $env;

backend=$(kubectl get pod -n $env -o name | grep -o "backend.*");
database=$(kubectl get pod -n $env -o name | grep -o "database.*");

echo Initialize database - tables
kubectl wait --for=jsonpath='{.status.phase}'=Running "pod/${backend}" -n $env --timeout=300s && \
kubectl exec $backend -n $env -- bash \
    -c "uv run --no-${env} --no-sync alembic upgrade head"

echo Initialize database - data
kubectl wait --for=jsonpath='{.status.phase}'=Running "pod/${database}" -n $env --timeout=300s && \
kubectl cp "./backend/resource/data/external/card.csv" "${env}/${database}:var/database" && \
kubectl exec -i $database -n $env -- bash \
    -c "cd var/database && psql -U postgres -d digimon-digital-card-battle-guide" <<EOF
    \copy public.card FROM 'card.csv' WITH(FORMAT csv, DELIMITER ',', HEADER, ENCODING 'UTF8', QUOTE '"', ESCAPE '"');
EOF


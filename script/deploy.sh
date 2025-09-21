#! /usr/bin/env bash

kubectl apply -k config -n prod;

backend=$(kubectl get pod -n prod -o name | grep -o "backend.*");
database=$(kubectl get pod -n prod -o name | grep -o "database.*");

echo Initialize database - tables
kubectl wait --for=condition=Ready "pod/${backend}" -n prod --timeout=300s && \
kubectl exec $backend -n prod -- bash \
    -c "uv run --no-dev --no-sync alembic upgrade head"

echo Initialize database - data
kubectl wait --for=condition=Ready "pod/${database}" -n prod --timeout=300s && \
kubectl cp "./backend/resource/data/external/card.csv" "prod/${database}:var/database" && \
kubectl exec -i $database -n prod -- bash \
    -c "cd var/database && psql -U postgres -d digimon-digital-card-battle-guide" <<EOF
    \copy public.card FROM 'card.csv' WITH(FORMAT csv, DELIMITER ',', HEADER, ENCODING 'UTF8', QUOTE '"', ESCAPE '"');
EOF


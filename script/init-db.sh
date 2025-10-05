#! /usr/bin/env bash

echo "init-db.sh $1"

env=$1

kubectl get pods -n $env

backend=$(kubectl get pods -n $env | grep -oE "backend[^ ]+");

readarray -t arr <<< "$backend"

for el in "${arr[@]}"; do
    # echo "Waiting for $el to be ready (timeout 60s)..."
    # kubectl wait --for=condition=Ready "pod/$el" -n $env --timeout=60s

    echo Initialize database - tables
    kubectl exec $el -n $env -- bash \
    -c "uv run --no-dev --no-sync alembic upgrade head"
done

database=$(kubectl get pods -n $env | grep -oE "database[^ ]+");

readarray -t arrdb <<< "$database"

for el in "${arrdb[@]}"; do
    # echo "Waiting for $el to be ready (timeout 60s)..."
    # kubectl wait --for=condition=Ready "pod/$el" -n $env --timeout=60s

    echo Initialize database - data
    kubectl cp "./backend/resource/data/external/card.csv" "${env}/${el}:var/database" && \
    kubectl exec -i $el -n $env -- bash \
        -c "cd var/database && psql -U changethis -d digimon-digital-card-battle-guide" <<EOF
        \copy public.card FROM 'card.csv' WITH(FORMAT csv, DELIMITER ',', HEADER, ENCODING 'UTF8', QUOTE '"', ESCAPE '"');
EOF
done

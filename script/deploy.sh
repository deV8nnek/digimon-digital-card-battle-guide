#! /usr/bin/env bash

echo "deploy.sh $1 $2"

env="default"
db=""
if [[ -n $1 ]]; then
    env=$1
fi
if [[ -n $2 ]]; then
    db=$2
fi

if [[ $env != "default" ]]; then
    kubectl apply -f config;
fi
kubectl apply -f config/$env -n $env;

kubectl get pods -n $env
kubectl get nodes -n $env

if [[ $db == "db" ]]; then
    echo "Waiting to be ready (timeout 60s)..."
    sleep 60s
    bash script/init-db.sh $env;
fi
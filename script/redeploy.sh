#! /usr/bin/env bash

echo "redeploy.sh $1 $2"

env="default"
db=""
if [[ -n $1 ]]; then
    env=$1
fi
if [[ -n $2 ]]; then
    db=$2
fi

kubectl delete pods -n dev --field-selector status.phase=Evicted
kubectl delete pods -n dev --field-selector status.phase=Failed
kubectl delete pods -n dev --field-selector status.phase=Error
kubectl delete pods -n dev --field-selector status.phase=Succeeded
kubectl delete pods -n dev --field-selector status.phase!=Running
kubectl delete -f config/$env -n $env;
kubectl delete -f config;

if [[ $db == "db" ]]; then
    bash script/deploy.sh $env db;
else
    bash script/deploy.sh $env;
fi
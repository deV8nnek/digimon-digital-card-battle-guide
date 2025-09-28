#! /usr/bin/env bash

echo "deploy.sh $1"

env="default"
if [[ -n $1 ]]; then
    env=$1
fi

echo "namespace $env"

kubectl delete -f config/$env -n $env;
bash script/deploy.sh $env;


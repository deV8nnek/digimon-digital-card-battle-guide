#! /usr/bin/env bash

env="default"
if [[ -n $1 ]]; then
    env=$1
fi

kubectl delete -f config/$env -n $env;
bash script/deploy.sh $env;


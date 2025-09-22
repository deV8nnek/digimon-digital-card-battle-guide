#! /usr/bin/env bash

env=$1
if [[ -n $1 ]]; then
    env=$1
fi

kubectl delete -k config/$env -n $env;
sh ./script/deploy.sh


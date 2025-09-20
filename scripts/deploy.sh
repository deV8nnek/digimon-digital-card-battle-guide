#! /usr/bin/env bash

backend=$(kubectl get prod -n prod -o name);
if [[ -z $backend ]];
    kubectl delete -k config -n prod;
fi

kubectl apply -k config -n prod;
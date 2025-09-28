#! /usr/bin/env bash

flag=0;
if [[ $1 == "backend" ]]; then
    flag=1;
elif [[ $1 == "frontend" ]]; then
    flag=2;
elif [[ $1 == "github" ]]; then
    flag=3;
fi

TAG=$(basename "$PWD");

timestamp=$(date +%Y%m%d_%H%M%S);

if [[ $flag == 3 ]]; then
    docker build --progress=plain -t $TAG/backend ./backend;
elif [[ $flag == 0 || $flag == 1 ]]; then
    docker build --progress=plain -t $TAG/backend ./backend 2>&1 | tee "log/backend_$timestamp.log";
fi

if [[ $flag == 3 ]]; then
    docker build --progress=plain -t $TAG/frontend ./frontend;
elif [[ $flag == 0 || $flag == 2 ]]; then
    docker build --progress=plain -t $TAG/frontend ./frontend 2>&1 | tee "log/frontend_$timestamp.log";
fi
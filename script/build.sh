#! /usr/bin/env bash

flag=0
if [[ $1 == "backend" ]]; then
    flag=1
elif [[ $1 == "frontend" ]]; then
    flag=2
fi

TAG=$(basename "$PWD");

timestamp=$(date +%Y%m%d_%H%M%S);

if [[ $flag == 0 || $flag == 1 ]]; then
    docker build -t $TAG/backend ./backend --no-cache --progress=plain 2>&1 log/build_$timestamp.log;
fi
if [[ $flag == 0 || $flag == 2 ]]; then
    docker build -t $TAG/frontend ./frontend --no-cache --progress=plain 2>&1 log/build_$timestamp.log;
fi
#! /usr/bin/env bash

flag=0
if [[ $1 == "backend" ]]; then
    flag=1
elif [[ $1 == "frontend" ]]; then
    flag=2
fi

TAG=$(basename "$PWD");

if [[ $flag == 0 || $flag == 1 ]]; then
    docker build -t $TAG/backend ./backend;
fi
if [[ $flag == 0 || $flag == 2 ]]; then
    docker build -t $TAG/frontend ./frontend;
fi
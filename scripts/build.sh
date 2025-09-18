#! /usr/bin/env bash

TAG=$(basename "$PWD");
docker build -t $TAG/backend ./backend;

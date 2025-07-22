#! /usr/bin/env bash

cd src/scrapymon
scrapy runspider scrapymon/spiders/$1.py
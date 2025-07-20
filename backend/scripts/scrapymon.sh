#! /usr/bin/env bash

cd app/scrapymon
scrapy runspider scrapymon/spiders/$1.py
#! /usr/bin/env bash

cd src/module/scrapymon

if [[ $1 == "card_spider_en" ]]; 
then
    csv="scrapymon/data/processed/card_en_only.csv";
    if [[ -e $csv ]];
    then
        cp -u $csv "../pandasmon/data/external";
    fi
elif [[ $1 == "card_fusion_spider" ]];
then
    csv="scrapymon/data/processed/card_fusion.csv";
    if [[ -e $csv ]];
    then
        cp -u $csv "../pytorchmon/data/external";
    else
        mkdir -p "../pytorchmon/data/external";
        cp "$csv" "../pytorchmon/data/external";
    fi
else
    scrapy runspider scrapymon/spiders/$1.py;
fi

import random
import re
from pathlib import Path

import scrapy
import scrapy.exceptions

from src.scrapymon.scrapymon.items import CardItem


class CardSpider(scrapy.Spider):
    name = "card_spider_en_only"
    path_icon = "~/img/icon"
    start_url = [
        "https://gamefaqs.gamespot.com/ps/526754-digimon-digital-card-battle/faqs/78563/100-card-collection-extra-notes",
    ]
    r_icon = re.compile(
        r"(〇)|(<img.*\/a\/faqs\/63\/78563-427\.png.*>)|(△)|(<img.*\/a\/faqs\/63\/78563-425\.png.*>)|(✖)|(<img.*\/a\/faqs\/63\/78563-428\.png.*>)|(fire)|(ice)|(nature)|(darkness)|(rare)"
    )
    r_num = re.compile(r"\d+")

    @classmethod
    def update_settings(cls, settings):
        super().update_settings(settings)
        settings.set("FEED_EXPORT_ENCODING", "utf-8", priority="spider")
        settings.set(
            "FEEDS",
            {
                "scrapymon/data/processed/card_en_only.csv": {
                    "format": "csv",
                    "overwrite": False,
                    "item_export_kwargs": {
                        "export_empty_fields": True,
                        "include_headers_line": True,
                    },
                }
            },
            priority="spider",
        )
        settings.set("ITEM_PIPELINES", {}, priority="spider")

    def random_header(self):
        user_agent_list = [
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15",
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Windows; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8",
            "Mozilla/5.0 (Windows NT 10.0; Windows; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15",
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15",
            "Mozilla/5.0 (Windows NT 10.0; Windows; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36",
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36",
        ]
        user_agent = {
            "User-Agent": user_agent_list[random.randint(0, len(user_agent_list) - 1)],
            "Referer": "https://gamefaqs.gamespot.com/",
        }
        return user_agent

    def repl(self, match: re.Match):
        if match:
            icon = match[0]
            if match.groups()[0] or match.groups()[1]:
                icon = "circle"
            elif match.groups()[2] or match.groups()[3]:
                icon = "triangle"
            elif match.groups()[4] or match.groups()[5]:
                icon = "x"
            return f'<img src="{self.path_icon}/{icon}.png" alt="{icon}"/>'
        return None

    async def start(self):
        yield scrapy.Request(
            url=self.start_url[0],
            callback=self.parse,
            headers=self.random_header(),
            dont_filter=True,
        )

    def parse(self, response):
        for table in enumerate(response.xpath("//table")[-301:]):
            table = table[1]
            item = {}
            text = table.xpath(".//text()")[:3].getall()
            item.update({"number": int(text[2])})
            item.update({"name_en": text[0]})
            text = " ".join(table.xpath(".//tr[7]/td/node()").getall())
            text = re.sub(r" +", " ", text).strip()
            text = self.r_icon.sub(self.repl, text)
            item.update({"special_effect_en": text})
            text = " ".join(table.xpath(".//tr[2]/td[3]/text()").getall())
            text = re.sub(r" +", " ", text).strip()
            text = self.r_icon.sub(self.repl, text)
            item.update({"effect_en": text})
            yield item

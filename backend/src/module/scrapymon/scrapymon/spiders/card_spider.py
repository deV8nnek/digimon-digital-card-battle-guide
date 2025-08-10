import random
import re
from pathlib import Path

import scrapy
import scrapy.exceptions

from src.module.scrapymon.scrapymon.items import CardItem


class CardSpider(scrapy.Spider):
    name = "card_spider"
    is_image = False
    batch = 100
    b = 1
    path_icon = "~/img/icon"
    path_card = "~/img/card"
    custom_settings = {
        "FEED_EXPORT_ENCODING": "utf-8",
    }
    if is_image:
        custom_settings.update(
            {
                "IMAGES_STORE": "scrapymon/img/card",
            }
        )
    else:
        custom_settings.update(
            {
                "FEEDS": {
                    "scrapymon/data/processed/card.csv": {
                        "format": "csv",
                        "overwrite": False,
                        "item_export_kwargs": {
                            "export_empty_fields": True,
                            "include_headers_line": True,
                        },
                    }
                }
            }
        )
    start_url = [
        "https://wiki3.jp/digitalcardarena/page/7",
        "https://gamefaqs.gamespot.com/ps/526754-digimon-digital-card-battle/faqs/78563/100-card-collection-extra-notes",
    ]
    r_icon = re.compile(r"(〇)|(△)|(✖)|(fire)|(ice)|(nature)|(darkness)|(rare)")
    r_num = re.compile(r"\d+")

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
        }
        if self.is_image:
            user_agent.update(
                {
                    "Referer": "https://gamefaqs.gamespot.com/",
                }
            )
        else:
            user_agent.update(
                {
                    "Referer": "https://wiki3.jp",
                }
            )
        return user_agent

    async def start(self):
        yield scrapy.Request(
            url=self.start_url[0],
            callback=self.parse_page1,
            headers=self.random_header(),
        )

    def parse_page1(self, response):
        n = []
        if self.is_image:
            for p in Path("scrapymon/img/card").iterdir():
                n.append(int(self.r_num.search(p.name)[0]))
        else:
            n = self.batch * (self.b - 1)
        i = 0
        for href in response.xpath(
            '//*[@id="main_content"]//a[not(contains(@href, "#"))]/@href'
        ).getall():
            if (self.is_image and i not in n) or (i >= n and self.batch > 0):
                if i == 2:
                    yield scrapy.Request(
                        url=href,
                        callback=self.parse_pageN,
                        headers=self.random_header(),
                        dont_filter=True,
                    )
                self.batch -= 1
            i += 1

    def parse_pageN(self, response):
        item = CardItem.model_construct()

        def repl(match):
            if match:
                icon = match[0]
                match match[0]:
                    case "〇":
                        icon = "circle"
                    case "△":
                        icon = "triangle"
                    case "✖":
                        icon = "x"
                return item.model_fields["img"].default.format(
                    self.path_icon, icon, icon
                )
            return None

        try:
            table = response.xpath(
                '//*[@id="main_content"]//table//text()[normalize-space()]'
            ).getall()
            item.number = int(self.r_num.search(table[0])[0])
            if self.is_image:
                item.name = table[1]
            else:
                item.name = self.r_icon.sub(repl, table[1])
            if self.is_image:
                yield scrapy.Request(
                    url=self.start_url[1],
                    callback=self.parse_image,
                    headers=self.random_header(),
                    cb_kwargs={"item": item},
                    dont_filter=True,
                )
            else:
                item.type = CardItem.CardType(table[2])
                if table[3].startswith("Lv"):
                    table[3] = re.search(r"(?<= ).*", table[3])[0]
                    item.lv = CardItem.CardLv(table[3])
                    item.hp = int(table[5])
                    item.dp = int(table[7])
                    item.pow = int(table[9])
                    item.circle = int(table[13])
                    item.triangle = int(table[16])
                    item.x = int(
                        self.r_num.search(table[19])[0]
                    )  # weird data for flamedramon
                    item.special_effect = self.r_icon.sub(repl, table[24])
                table[7] = table[25] if item.lv else table[7]
                item.effect = self.r_icon.sub(repl, table[7])
                item.img = item.img.format(
                    self.path_card, f"card_{item.number}_{item.name}", item.name
                )
                yield item
        except IndexError:
            raise scrapy.exceptions.CloseSpider("Update scraper")

    def parse_image(self, response, *, item):
        ends_with = "string-length(@src) - string-length('pn') + 1) = 'pn'"
        src = "(//table//img[substring(@src,{}]/@src)[{}]"
        img = response.xpath(
            src.format(ends_with, item.number + 1)
        ).get()  # ends-with may not be compatible
        link = f"https://gamefaqs.gamespot.com{img}"
        item.img = link
        yield item

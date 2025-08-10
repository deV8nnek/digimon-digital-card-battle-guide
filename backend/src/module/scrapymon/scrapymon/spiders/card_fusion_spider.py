import random
import re
from pathlib import Path

import pandas as pd
import scrapy

from src.domain.card import Card


class CardSpider(scrapy.Spider):
    name = "card_fusion_spider"
    start_url = [
        "https://gamefaqs.gamespot.com/ps/526754-digimon-digital-card-battle/faqs/24611",
    ]
    r_fusion = re.compile(r"(?m)(.+) +\+ +(.+) +\= +(.+)$")
    r_en = re.compile(
        r"(?<= )((circle)|(O)|(triangle)|(Δ)|(x)|(X)|(fire)|(ice)|(nature)|(darkness)|(rare)|(of))(?= |$)",
        re.IGNORECASE,
    )

    @classmethod
    def update_settings(cls, settings):
        super().update_settings(settings)
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

    async def start(self):
        yield scrapy.Request(
            url=self.start_url[0],
            callback=self.parse,
            headers=self.random_header(),
            dont_filter=True,
        )

    def repl(self, match: re.Match):
        if match:
            icon = match.groups()[0]
            if match.groups()[1] or match.groups()[2]:
                icon = Card.button("circle")
            elif match.groups()[3] or match.groups()[4]:
                icon = Card.button("triangle")
            elif match.groups()[5] or match.groups()[6]:
                icon = Card.button("X")
            elif match.groups()[12]:
                icon = icon.lower()
            return f"{icon}"
        return None

    def closest(self, fromString: str, toString: str):
        threshold = 1
        if (
            len(fromString) == len(toString)
            or len(fromString) == len(toString) + threshold
            or len(fromString) == len(toString) - threshold
        ):
            fromString = fromString.lower()
            toString = toString.lower()
            i = 0
            j = 0
            while i < len(fromString) and j < len(toString):
                if threshold < 0:
                    break
                if fromString[i] != toString[j]:
                    k = 1
                    while k < threshold + 1:
                        if not (i + k < len(fromString) or j + k < len(toString)):
                            break
                        if (
                            fromString[i] == toString[j + k]
                            and fromString[i + k] == toString[j]
                        ):
                            j += k + 1
                            i += k + 1
                            k += 1
                        elif fromString[i] == toString[j + k]:
                            j += k
                        elif fromString[i + k] == toString[j]:
                            i += k
                        k += 1
                    threshold -= 1
                i += 1
                j += 1
        else:
            threshold = -1
        return threshold >= 0

    def parse(self, response):
        outlier = ["Digitamamamon", "Shining Hand", "Mega Def.", "Centaurumon"]
        fix = ["Digitamamon", "Shining Mane", " Disk", "Centarumon"]
        items = response.xpath('//*[@id="faqspan-1"]/text()').get()
        card_ref = pd.read_csv(Path("scrapymon/data/external/card_ref.csv"))
        temp = []
        debug = 0
        for item in self.r_fusion.finditer(items):
            items = []
            name = list(item.groups()[0:3])
            name[2] = re.split(r"( +\(|\r)", name[2])[0]
            for name_en in name:
                name_en = self.r_en.sub(self.repl, name_en)
                for i in range(len(outlier)):
                    if name_en.startswith(outlier[i]):
                        if name_en.startswith("Mega Def."):
                            if "Disk" not in name_en:
                                if ".Disk" in name_en:
                                    name_en = name_en[:9] + fix[i] + name_en[13:]
                                else:
                                    name_en = list(name_en)
                                    name_en.insert(9, fix[i])
                                    name_en = "".join(name_en)
                        else:
                            name_en = fix[i]
                df = card_ref.copy()
                df = df[
                    [
                        self.closest(el, name_en)
                        for el in df["name_en"].values.flatten().tolist()
                    ]
                ]
                if df.empty:
                    df = pd.DataFrame([None] * 5)
                df = df.values.flatten().tolist()
                if len(df) > 5:
                    for i in range(2, len(df), 5):
                        if name_en == df[i]:
                            df = df[i - 2 : i + 3]
                            break
                df = [df[0]] + df[3:]
                df[1] = Card.CardType(df[1]).to_int()
                if df[1] == Card.CardType("OPTION").to_int():
                    df[2] = 0
                else:
                    df[2] = Card.CardLv(df[2]).to_int()
                items.extend(df)
            if len(items) > 15:
                print(debug, items)
            temp.append(items)
            debug += 1
        column = card_ref.columns.tolist()
        column = [column[0]] + column[3:]
        column = [
            f"{prefix}_{col}"
            for prefix in ["card1", "card2", "result"]
            for col in column
        ]
        items = pd.DataFrame(
            temp,
            columns=column,
        )
        temp = Path("scrapymon/data/processed/card_fusion.csv")
        temp.parent.mkdir(parents=True, exist_ok=True)
        items.to_csv(temp, index=False)

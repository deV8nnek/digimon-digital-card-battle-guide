import random

import scrapy
from scrapy.pipelines.images import ImagesPipeline


class CardPipeline:
    # def open_spider(self, spider):
    #     self.session = Session(engine)

    def process_item(self, item, spider):
        item.img = item.model_fields["img"].default.format(item.name)
        # obj = Card(**item.__dict__)
        # self.session.add(obj)
        # self.session.commit()
        return item

    # def close_spider(self, spider):
    #     self.session.close()


class CardImagesPipeline(ImagesPipeline):
    def randomHeader(self):
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
        return {
            "User-Agent": user_agent_list[random.randint(0, len(user_agent_list) - 1)],
            "Referer": "https://gamefaqs.gamespot.com/",
        }

    def get_media_requests(self, item, info):
        return scrapy.Request(
            url=item.img,
            callback=self.file_path,
            headers=self.randomHeader(),
            dont_filter=True,
        )

    def file_path(self, request, response=None, info=None, *, item):
        img = f"card_{item.number}_{item.name}.png"
        return img

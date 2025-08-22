'use client'

import { Button } from "@/component/ui/button";
import { ScrollArea } from "@/component/ui/scroll-area";
import React, { useState } from "react";
import { ArrowUp01, ArrowDown01 } from 'lucide-react';
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { Card, CardHead, CardBody } from "./card";
import { Card as CardItem } from "./app/card-list/card";
//import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Toggle } from "./ui/toggle";

const title = "カード一覧"

const filter = [
  { button: "/asset/image/icon/ascending.png", label: "Ascending" },
  { button: "/asset/image/icon/descending.png", label: "Descending" },
  { button: "全", label: "All" },
  { button: "/asset/image/icon/fire.png", label: "Fire" },
  { button: "/asset/image/icon/ice.png", label: "Ice" },
  { button: "/asset/image/icon/nature.png", label: "Nature" },
  { button: "/asset/image/icon/darkness.png", label: "Darkness" },
  { button: "/asset/image/icon/rare.png", label: "Rare" },
  { button: "/asset/image/icon/option.png", label: "Option" },
];

const card0: Card = {
  number: 0,
  name: "インペリアルドラモン",
  type: "火炎",
  lv: "完",
  hp: 1900,
  dp: 60,
  pow: 10,
  circle: 980,
  triangle: 670,
  x: 0,
  special_effect: "〇カウンター",
  effect: "自分の攻撃力に、自分の場のＰＯＷカード枚数×100を足す",
  img: "0_インペリアルドラモン"
}

function CardList({ cards }: { cards: Card[] }) {
  return (
    <Card>
      <CardHead>
        <div>
          {title}
        </div>

        <Toggle className="bg-game-darkblue text-white min-w-6 h-6 text-center rounded-none p-0 text-xs [line-height:0] hover:text-foreground hover:bg-amber-400 data-[state=on]:bg-amber-400 data-state-on">
          {filter[2].button}
        </Toggle>
        {
          filter.slice(3).map((el, index) => (
            <Toggle key={index} className="bg-game-darkblue flex items-center w-full h-6 [line-height:0] min-w-min p-0 hover:text-foreground rounded-none hover:bg-amber-400 data-[state=on]:bg-amber-400">
              <img src={`${el.button}`} alt={el.label} />
            </Toggle>
          ))

        }
        <RadioGroup.Root
          // defaultValue={filter[0].label}
          className="flex gap-2 w-full"
        >
          {filter.slice(0, 2).map((el) => (
            <RadioGroup.Item
              key={el.label}
              value={el.label}
              className="bg-game-darkblue flex justify-center items-center w-full h-6 [line-height:0] data-[state=checked]:bg-amber-400"
            >
              <img src={`${el.button}`} alt={el.label} className="size-[16px]" />
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </CardHead>
      <CardBody>
          <ScrollArea type="always" className="min-h-0">
            <div className="flex flex-wrap gap-2">
              {cards.map((_, i) => (
                <CardItem key={i} card={_} />
              ))}
            </div>
          </ScrollArea>
      </CardBody>
    </Card>
  );
};

export { CardList };

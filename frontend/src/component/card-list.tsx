'use client'

import { Button } from "@/component/ui/button";
import { ScrollArea } from "@/component/ui/scroll-area";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ArrowUp01, ArrowDown01 } from 'lucide-react';
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { Card, CardHead, CardHeadButton, CardBody } from "./card";
import { Card as CardItem } from "./app/card-list/card";
//import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Toggle } from "./ui/toggle";

const title = "カード一覧"

const filter = [
  { button: "全", label: "All" },
  { button: "/asset/image/icon/fire.png", label: "Fire" },
  { button: "/asset/image/icon/ice.png", label: "Ice" },
  { button: "/asset/image/icon/nature.png", label: "Nature" },
  { button: "/asset/image/icon/darkness.png", label: "Darkness" },
  { button: "/asset/image/icon/rare.png", label: "Rare" },
  { button: "/asset/image/icon/option.png", label: "Option" },
  { button: "/asset/image/icon/ascending.png", label: "Ascending" },
  { button: "/asset/image/icon/descending.png", label: "Descending" },
];

function CardList({ cards, cardState }: { cards: Card[], cardState: { card: number[], setCard: Dispatch<SetStateAction<number[]>> } }) {
  return (
    <Card>
      <CardHead>
        <div>
          {title}
        </div>
        <Toggle className="
        data-[state=on]:bg-game-darkblue1 data-[state=on]:hover:bg-transparent data-[state=on]:text-white 
        hover:bg-game-darkblue1 hover:text-white border-game-darkblue1 border-1 border-dashed p-0 leading-0 rounded-none min-w-min h-6 w-full"
          defaultPressed aria-label={filter[0].label}>
          {filter[0].button}
        </Toggle>
        {
          filter.slice(1, -2).map((el, index) => (
            // bg-game-darkblue1 flex items-center w-full h-6 [line-height:0] min-w-min p-0 hover:text-foreground rounded-none hover:bg-amber-400
            <Toggle key={index} className="
            data-[state=on]:bg-game-darkblue1 data-[state=on]:hover:bg-transparent data-[state=on]:text-white 
        hover:bg-game-darkblue1 hover:text-white border-game-darkblue1 border-1 border-dashed p-0 leading-0 rounded-none min-w-min h-6 w-full"
              defaultPressed aria-label={el.label}>
              <img src={`${el.button}`} alt={el.label} className="size-[16px]" />
              {/* <CardHeadButton>
                <img src={`${el.button}`} alt={el.label} className="size-[16px]" />
              </CardHeadButton> */}
            </Toggle>
          ))

        }
        <RadioGroup.Root
          defaultValue={filter[7].label}
          className="flex gap-2 w-full"
        >
          {filter.slice(-2).map((el) => (
            <RadioGroup.Item
              key={el.label}
              value={el.label}
              className="data-[state=checked]:bg-game-darkblue1"
            >
              <CardHeadButton>
                <img src={`${el.button}`} alt={el.label} className="size-[16px]" />
              </CardHeadButton>
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </CardHead>

      <CardBody>
        <ScrollArea type="always" className="min-h-0">
          <div className="flex flex-wrap gap-2 py-2">
            {cards.map((_, i) => (
              <CardItem key={i} card={_} cardState={ cardState } />
            ))}
          </div>
        </ScrollArea>
      </CardBody>
    </Card>
  );
};

export { CardList };

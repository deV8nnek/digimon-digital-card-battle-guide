'use client'

import { Button } from "@/component/ui/button";
import { ScrollArea } from "@/component/ui/scroll-area";
import React, { useState } from "react";
import { ArrowUp01, ArrowDown01 } from 'lucide-react';
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { Card, CardHead, CardBody } from "./card";
//import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Toggle } from "./ui/toggle";

const title = "カード一覧"

const filter = [
  { button: <ArrowUp01 />, label: "Ascending" },
  { button: <ArrowDown01 />, label: "Descending" },
  { button: "全", label: "All" },
  { button: "/asset/image/icon/fire.png", label: "Fire" },
  { button: "/asset/image/icon/ice.png", label: "Ice" },
  { button: "/asset/image/icon/nature.png", label: "Nature" },
  { button: "/asset/image/icon/darkness.png", label: "Darkness" },
  { button: "/asset/image/icon/rare.png", label: "Rare" },
  { button: "/asset/image/icon/option.png", label: "Option" },
];


function CardList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Card>
      <CardHead>
        <div className="bg-amber-300">
          {title}
        </div>
        <RadioGroup.Root
          defaultValue={filter[0].label}
        >
          {filter.slice(0, 2).map((el) => (
            <RadioGroup.Item
              key={el.label}
              value={el.label}
              className="bg-amber-300 data-[state=checked]:bg-amber-400"
            >
              <span className="font-semibold tracking-tight">{el.button}</span>
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
        <Toggle className="bg-amber-300 block h-6 [line-height:24px] min-w-min p-0 hover:text-foreground rounded-none hover:bg-amber-400 data-[state=on]:bg-amber-400">
          {filter[2].button}
        </Toggle>
        {
          filter.slice(3).map(el => (
            <Toggle className="bg-amber-300 flex items-center w-full h-6 [line-height:0] min-w-min p-0 hover:text-foreground rounded-none hover:bg-amber-400 data-[state=on]:bg-amber-400">
              <Image key={el.label} src={`${el.button}`} alt={el.label} width={16} height={16} quality={100} priority />
            </Toggle>
            ))
            
        }
      </CardHead>
      <CardBody>

      </CardBody>
    </Card>
  );
};

function FigmaCardList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className="inline-flex min-w-[159px] min-h-[132px] items-start gap-2 p-2 rounded-2xl border border-solid border-black">
      <header className="flex flex-col w-[18px] items-start gap-2 self-stretch bg-transparent">
        <div className="w-[18px] mt-[-1.00px] z-[1] font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
          カード一覧
        </div>

        <div className="flex flex-col w-[19px] items-start gap-2 flex-[0_0_auto] mr-[-1.00px] z-0">
          {/* {filterButtons.map((button, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`w-full h-[19px] p-0 bg-[#d9d9d9] hover:bg-[#c9c9c9] aspect-[1] ${
                activeFilters.includes(index) ? "bg-[#b9b9b9]" : ""
              }`}
              onClick={() => toggleFilter(index)}
            >
              {button.icon && !button.customIcon && (
                <button.icon className="w-3.5 h-3 text-black" />
              )}
              {button.customIcon && index === 3 && (
                <img
                  className="w-[15px] h-[15px] aspect-[0.98]"
                  alt="Fire"
                  src=""
                />
              )}
              {button.text && (
                <span className="font-body-m font-[number:var(--body-m-font-weight)] text-[length:var(--body-m-font-size)] leading-[var(--body-m-line-height)] text-black tracking-[var(--body-m-letter-spacing)] [font-style:var(--body-m-font-style)]">
                  {button.text}
                </span>
              )}
            </Button>
          ))} */}
        </div>
      </header>

      {/* <Card className="w-[1088px] h-[547px] rounded-[var(--shape-corner-large)] border border-solid border-black">
        <CardContent className="p-2">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-10 gap-2">
              {cardImages.map((card) => (
                <img
                  key={card.id}
                  className="w-[100px] h-[100px] aspect-[1] object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  alt={`Card ${card.id}`}
                  src={card.src}
                />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card> */}
    </div>
  );
};

export { CardList };

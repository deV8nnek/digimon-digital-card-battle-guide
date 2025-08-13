import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";

const filterButtons = [
  { icon: null, label: "Ascending", active: true },
  { icon: null, label: "Descending", active: false },
  { text: "全", label: "All", active: true },
  { icon: null, label: "Fire", active: false, customIcon: true },
  { icon: null, label: "Ice", active: false },
  { icon: null, label: "Nature", active: false },
  { icon: null, label: "Darkness", active: false },
  { icon: null, label: "Rare", active: false },
  { text: "OP", label: "OP", active: false },
];

const CardList = () => {

  return (
    <div className="inline-flex min-w-[159px] min-h-[132px] items-start gap-2 p-2 rounded-2xl border border-solid border-black">
      <header className="flex flex-col w-[18px] items-start gap-2 self-stretch bg-transparent">
        <div className="w-[18px] mt-[-1.00px] z-[1] font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
          カード一覧
        </div>

        <div className="flex flex-col w-[19px] items-start gap-2 flex-[0_0_auto] mr-[-1.00px] z-0">
          {filterButtons.map((button, index) => (
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
          ))}
        </div>
      </header>

      <Card className="w-[1088px] h-[547px] rounded-[var(--shape-corner-large)] border border-solid border-black">
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
      </Card>
    </div>
  );
};

export default CardList;

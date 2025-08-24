'use client'

import React from "react";
import { Card, CardHead, CardBody } from "./card";
import { Toggle } from "@radix-ui/react-toggle";
import { Icon, TextIcon } from "./icon";

function CardView({ card }: { card?: Card }) {
  return (
    <Card>
      <CardHead className="min-h-min gap-2 pt-0.5">
        <Toggle className="
          data-[state=on]:bg-game-darkblue1 data-[state=on]:text-white data-[state=on]:hover:bg-transparent
          hover:bg-game-darkblue1 hover:text-white border-game-darkblue1 border-1 border-dashed p-0 leading-0 rounded-none min-w-min min-h-fit w-full pt-2 pb-2" defaultPressed aria-label="Card Info">
          カード情報
        </Toggle>
        <Toggle className="data-[state=on]:bg-game-darkblue1 data-[state=on]:text-white data-[state=on]:hover:bg-transparent
          hover:bg-game-darkblue1 hover:text-white border-game-darkblue1 border-1 border-dashed p-0 leading-0 rounded-none min-w-min min-h-fit w-full pt-2 pb-2" aria-label="Card Info">
          チャート
        </Toggle>
        <Toggle className="data-[state=on]:bg-game-darkblue1 data-[state=on]:text-white data-[state=on]:hover:bg-transparent
          hover:bg-game-darkblue1 hover:text-white border-game-darkblue1 border-1 border-dashed p-0 leading-0 rounded-none min-w-min min-h-fit w-full pt-2 pb-2" aria-label="Card Info">
          合成
        </Toggle>
      </CardHead>
      <CardBody className="min-h-[150px] text-white">
        {
          !!card ?
            <div className="grid size-full grid-cols-2 grid-rows-2 gap-2">
              <div className="flex justify-center">
                <img className="object-contain h-full w-auto" src={`/asset/image/card/${card.img}.png`} alt="0" />
              </div>
              <div className="content-center">
                <div className="flex flex-col gap-2">
                  <h4 className="text-start"><TextIcon text={card.name}/></h4>
                  <div className="flex flex-row lg:flex-col flex-wrap items-start gap-2">
                    <h4 className="inline-block w-[48px]">{card.number.toString().padStart(3, "0")}</h4>
                    <div className="flex">
                      <div className="inline-block w-[48px]">
                        <h4>属性</h4>
                      </div>
                      <div className=" inline-block w-[24px]">
                        <Icon name={card.type} />
                      </div>
                    </div>
                    {card.type != "ＯＰ" && <div className="flex">
                      <div className="inline-block w-[48px]">
                        <h4>Ｌｖ</h4>
                      </div>
                      <div className="inline-block w-[24px]">
                        <h4>{card.lv}</h4>
                      </div>
                    </div>}

                    {card.type != "ＯＰ" && <div className="flex">
                      <div className="inline-block w-[48px]">
                        <h4>ＤＰ</h4>
                      </div>
                      <div className="inline-block w-[24px]">
                        <h4>{card.dp}</h4>
                      </div>
                    </div>}
                    {card.type != "ＯＰ" && <div className="flex">
                      <div className="inline-block w-[56px]">
                        <h4>ＰＯＷ</h4>
                      </div>
                      <div className="inline-block w-[24px]">
                        <h4>{card.pow}</h4>
                      </div>
                    </div>}
                  </div>
                </div>
              </div>
              <div>
                {card.type != "ＯＰ" && <div className="grid grid-rows-5 grid-cols-2 gap-2">
                  <h4 className="text-end">HP</h4>
                  <div>
                    <div className="inline-block w-[48px]">
                      <h4 className="text-end">{card.hp}</h4>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-end">
                      <Icon name="circle" />
                    </div>
                  </div>
                  <div>
                    <div className="inline-block w-[48px]">
                      <h4 className="text-end">{card.circle}</h4>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-end">
                      <Icon name="triangle" />
                    </div>
                  </div>
                  <div>
                    <div className="inline-block w-[48px]">
                      <h4 className="text-end">{card.triangle}</h4>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-end">
                      <Icon name="x" />
                    </div>
                  </div>
                  <div>
                    <div className="inline-block w-[48px]">
                      <h4 className="text-end">{card.x}</h4>
                    </div>
                  </div>
                  <div className="col-span-full text-center"><TextIcon text={card.special_effect}/></div>
                </div>}
              </div>
              <div>
                <div className="grid gap-2">
                  <h4 className="text-game-highlight">援護能力</h4>
                  <div><TextIcon text={card.effect}/></div>
                </div>
              </div>
            </div> :
            <div></div>
        }
      </CardBody>
    </Card>
  );
};

export { CardView };

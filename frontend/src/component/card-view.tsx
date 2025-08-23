'use client'

import React from "react";
import { Card, CardHead, CardHeadButton, CardBody } from "./card";
import { Toggle } from "@radix-ui/react-toggle";
import { Icon } from "./icon";

function CardView({ card }: { card: Card }) {
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
      <CardBody className="min-h-[150px]">
        <div className="grid size-full grid-cols-2 grid-rows-2 gap-2">
          <div className="flex justify-center">
            <img className="object-contain h-full w-auto" src={`/asset/image/card/${card.img}.png`} alt="0" />
          </div>
          <div className="content-center">
            <div className="grid items-center grid-rows-2 grid-cols-6 gap-2">
              <h4 className="bg-white col-span-full">{card.name}</h4>
              <h4 className="bg-white ">{card.number.toString().padStart(3, "0")}</h4>
              {!!card.lv && <div className="grid grid-cols-subgrid col-span-2">
                <h4 className="bg-white text-end">Ｌｖ</h4>
                <h4 className="bg-white">{card.lv}</h4>
              </div>}
              <div className="grid grid-cols-subgrid col-span-2">
                <h4 className="bg-white text-end">属性</h4>
                <div className="bg-white">
                  <Icon name={card.type}/>
                </div>
              </div>
              <div className="grid grid-cols-subgrid col-span-2">
                <h4 className="bg-white text-end min-w-max">ＰＯＷ</h4>
                <h4 className="bg-white">0</h4>
              </div>
              <div className="grid grid-cols-subgrid col-span-2">
                <h4 className="bg-white text-end">Ｐ＋</h4>
                <h4 className="bg-white">0</h4>
              </div>
            </div>
          </div>
          <div className="">
            <div className="grid grid-rows-5 grid-cols-2 gap-2">
              <h4 className="bg-white text-end">HP</h4>
              <h4 className="bg-white ">0000</h4>
              <div className="bg-white justify-self-end">
                <div className="bg-white h-6 w-6 flex justify-center items-center [line-height:0]  p-0">
                  <img src="/asset/image/icon/fire.png" alt="" />
                </div>
              </div>

              <h4 className="bg-white">0000</h4>
              <div className="bg-white justify-self-end">
                <div className="bg-white h-6 w-6 flex justify-center items-center [line-height:0]  p-0">
                  <img src="/asset/image/icon/fire.png" alt="" />
                </div>
              </div>
              <h4 className="bg-white ">0000</h4>
              <div className="bg-white justify-self-end">
                <div className="bg-white h-6 w-6 flex justify-center items-center [line-height:0]  p-0">
                  <img src="/asset/image/icon/fire.png" alt="" />
                </div>
              </div>
              <h4 className="bg-white ">0000</h4>
              <h4 className="bg-white col-span-full text-center">0000</h4>
            </div>
          </div>
          <div className="">
            <div className="grid gap-2">
              <h4 className="bg-white">援護能力</h4>
              <h4 className="bg-white">000</h4>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export { CardView };

import { cn } from "@/lib/utils";
import { Icon, TextIcon } from "./icon";
import { Card } from "@/domain/card";


interface Props {
  className?: string,
  card: Card,
}

export function CardInfo({ className, card }: Props) {
  return (
    <div className={cn("lg:text-xl grid size-full grid-cols-2 grid-rows-2 gap-2",
      className
    )}>
      <div className="flex justify-center pt-2">
        <img className="object-contain h-full w-auto" src={`/asset/image/card/${card.img}.png`} alt="0" />
      </div>
      <div className="content-center">
        <div className="grid gap-2">
          <div>
            {[216, 217, 218, 219, 220,259].includes(card.number) ? card.name 
            : <TextIcon text={card.name} />}
          </div>
          <div className="flex flex-wrap items-start gap-2 lg:gap-x-6">
            <h4 className="">{card.number.toString().padStart(3, "0")}</h4>
            <div className="flex h-full max-h-6 gap-2">
              <div>
                <h4>属性</h4>
              </div>
              <TextIcon text={card.type} />
            </div>
            {card.type != "ＯＰ" && <div className="flex h-full max-h-6 gap-2">
              <div>
                <h4>Ｌｖ</h4>
              </div>
              <div className="flex h-full">
                <h4>{card.lv}</h4>
              </div>
            </div>}
            <div className="max-md:hidden basis-full"></div>
            {card.type != "ＯＰ" && <div className="flex gap-2">
              <div>
                <h4>ＤＰ</h4>
              </div>
              <div>
                <h4>{card.dp}</h4>
              </div>
            </div>}
            {card.type != "ＯＰ" && <div className="flex gap-2">
              <div className="">
                <h4>ＰＯＷ</h4>
              </div>
              <div>
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
            <div className="inline-block w-[48px] h-full">
              <h4 className="text-end">{card.hp}</h4>
            </div>
          </div>
          <div>
            <div className="flex justify-end h-full">
              <TextIcon text="circle" />
            </div>
          </div>
          <div>
            <div className="inline-block w-[48px] h-full">
              <h4 className="text-end">{card.circle}</h4>
            </div>
          </div>
          <div>
            <div className="flex justify-end h-full">
              <TextIcon text="triangle" />
            </div>
          </div>
          <div>
            <div className="inline-block w-[48px] h-full">
              <h4 className="text-end">{card.triangle}</h4>
            </div>
          </div>
          <div>
            <div className="flex justify-end h-full">
              <TextIcon text="x" />
            </div>
          </div>
          <div>
            <div className="inline-block w-[48px]">
              <h4 className="text-end">{card.x}</h4>
            </div>
          </div>
          <div className="col-span-full text-center">
            {!!card.special_effect && <TextIcon text={card.special_effect} />}
          </div>
        </div>}
      </div>
      <div>
        <div className="grid gap-2">
          <h4 className="text-game-highlight">援護能力</h4>
          <div>
            <TextIcon text={card.effect} />
          </div>
        </div>
      </div>
    </div>
  );
}

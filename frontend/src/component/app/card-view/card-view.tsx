'use client'

import { useState } from "react";
import { Card as Card, CardHead, CardBody } from "../card";
import { enumCardType, Card as ICard } from "@/domain/card";
import { Button } from "../../ui/button";
import { CardInfo } from "./card-info";
import { cn } from "@/lib/utils";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { CardChart } from "./card-chart";
import CardFusion from "./card-fusion";
import { Dialog, DialogTrigger } from "@/component/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";

const view = [
  { button: "カード情報", label: "Card Info" },
  { button: "チャート", label: "Card Chart" },
  { button: "合成", label: "Card Fusion" }
] as const;

interface View {
  button: "カード情報" | "チャート" | "合成"
  label: string
}

interface Props {
  className?: string,
  cardView: (ICard | null)[],
  index: number,
  onClear: (card: ICard | null, index: number) => void
}

export function CardView({ className, cardView, index, onClear }: Props) {
  const [state, setState] = useState<View | undefined>(view[0]);

  const show = (value: string) => setState(view.find(_ => _.label == value));
  const clear = () => onClear(null, index);

  return (
    <Card className={cn(
      className
    )}>
      <CardHead className="min-h-min gap-2 pt-0.5">
        <RadioGroup.Root
          defaultValue={state?.label}
          className="flex gap-2 w-full"
          onValueChange={(value: string) => show(value)}
        >
          {
            view.slice(0, 2).map((el) => (
              <RadioGroup.Item
                key={el.label}
                value={el.label}
                className="data-[state=checked]:bg-game-darkblue1 data-[state=checked]:text-white
                hover:bg-game-darkblue1 hover:text-white border-game-darkblue1 border-1 border-dashed p-0 leading-0 min-w-min min-h-fit w-full pt-2 pb-2"
                aria-label={el.label}
              >
                {el.button}
              </RadioGroup.Item>
            ))
          }
        </RadioGroup.Root>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="
        hover:bg-game-darkblue1 hover:text-white 
        text-game-darkblue1 bg-transparent border-game-darkblue1 border-1 border-dashed p-0 leading-0 min-w-min min-h-fit w-full pt-2 pb-2 rounded-none"
              disabled={cardView.includes(null)}>
              {view[2].button}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-md">
            <CardFusion cards={cardView.filter(el => el != null)}/>
          </DialogContent>
        </Dialog>


        {
          !!cardView[index] &&
          <Button className="
          hover:bg-game-darkblue1/50 bg-game-darkblue1 hover:text-white p-0 leading-0 rounded-full min-w-min h-[24px] w-full mt-auto"
            onClick={clear}
            aria-label="Close Button">
            ✕
          </Button>
        }
      </CardHead>
      <CardBody className="min-h-[150px] text-white ">
        {state === view[0] && !!cardView[index] && <CardInfo card={cardView[index]} />}
        {state === view[1] && !!cardView[index] && <CardChart card={cardView[index]} filter={[enumCardType.fire, enumCardType.ice, enumCardType.nature, enumCardType.darkness, enumCardType.rare]} />}
      </CardBody>
    </Card>
  );
}

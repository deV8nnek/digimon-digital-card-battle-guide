'use client'

import { use, useState } from "react";
import { Card as Card, CardHead, CardBody } from "./card";
import { enumCardType, Card as ICard } from "@/domain/card";
import { CardInfo } from "./info";
import { cn } from "@/lib/utils";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { CardChart } from "./chart";
import { CardFusion } from "./fusion";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/component/ui/dialog";
import { Filter } from "./main";
import { Button } from "../ui/button";
import { settings } from "@/config/env";

export interface Error {
  detail: string
}

function isError(obj: any): obj is Error {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'detail' in obj
  );
}

async function getFusion(cards: ICard[]) {
  const response = await fetch(`http://${settings.BACKEND_URL}/card/fusion?num1=` + cards[0].number + "&num2=" + cards[1].number,
    { cache: 'force-cache' });
  const result: Promise<ICard | Error> = await response.json();
  return result;
};

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
  filters: Filter[],
  onClear: (card: ICard | null, index: number) => void
  onShow: () => void
}

export function CardView({ className, cardView, index, filters, onClear, onShow }: Props) {
  const [state, setState] = useState<View | undefined>(view[0]);
  const [fusionResponse, setFusionResponse] = useState<Promise<ICard | Error>>(Promise.resolve({ detail: "" }));

  const fusion = use(fusionResponse);

  const showState = (value: string) => setState(view.find(_ => _.label == value));
  const clear = () => onClear(null, index);
  const fuse = () => setFusionResponse(getFusion(cardView.filter(el => el != null)));
  const showView = onShow;

  return (
    <Card className={cn(
      className
    )}>
      <CardHead className="min-h-min gap-2 pt-0.5">
        <RadioGroup.Root
          defaultValue={state?.label}
          className="flex gap-2 w-full"
          onValueChange={(value: string) => showState(value)}
        >
          {
            view.slice(0, 2).map((el) => (
              <RadioGroup.Item
                key={el.label}
                value={el.label}
                className="data-[state=checked]:bg-game-darkblue1 data-[state=checked]:text-white
                disabled:opacity-50 disabled:hover:text-inherit disabled:hover:bg-inherit hover:bg-game-darkblue1 hover:text-white border-game-darkblue1 border-1 border-dashed p-0 leading-0 min-w-min min-h-fit w-full pt-2 pb-2"
                aria-label={el.label}
                disabled={el.button == view[1].button && !!cardView[index] && cardView[index]?.type == enumCardType.option.value}
              >
                {el.button}
              </RadioGroup.Item>
            ))
          }
        </RadioGroup.Root>
        <Dialog >
          <DialogTrigger asChild>
            <Button className="
            hover:bg-game-darkblue1 hover:text-white 
            text-game-darkblue1 bg-transparent border-game-darkblue1 border-1 border-dashed p-0 leading-0 min-w-min min-h-fit w-full pt-2 pb-2 rounded-none"
              onClick={fuse}
              disabled={cardView.includes(null)}>
              {view[2].button}
            </Button>
          </DialogTrigger>
          <DialogContent className="h-1/3 p-0 min-w-full border-none rounded-none [&>button:last-child]:hidden">
            <DialogTitle className="sr-only">
              Card Fusion Dialog
            </DialogTitle>
            {
              isError(fusion) ? <CardFusion message={fusion as Error} />
                : <CardFusion card={fusion as ICard} />
            }
          </DialogContent>
        </Dialog>
        <Button className="min-md:hidden
        hover:bg-transparent hover:text-game-darkblue1
        text-white bg-game-darkblue1 border-game-darkblue1 border-1 border-dashed p-0 leading-0 min-w-min min-h-fit w-full pt-2 pb-2 rounded-none [writing-mode:initial]"
          onClick={showView}>
          {index}
        </Button>
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
        {state === view[1] && !!cardView[index] && <CardChart card={cardView[index]} filters={filters} />}
      </CardBody>
    </Card>
  );
}

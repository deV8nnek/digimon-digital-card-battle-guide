import { ScrollArea } from "@/component/ui/scroll-area";
import { cn } from "@/lib/utils"
import { Card, CardHead, CardHeadButton, CardBody } from "./card";
import { Card as CardItem } from "./list-item";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Toggle } from "../../ui/toggle";
import { Card as ICard } from "@/domain/card";
import { Filter } from "./main";
import { useState } from "react";

const title = "カード一覧"

const filterOpt = [
  { button: "全", label: "All" },
  { button: "/asset/image/icon/fire.png", label: "fire" },
  { button: "/asset/image/icon/ice.png", label: "ice" },
  { button: "/asset/image/icon/nature.png", label: "nature" },
  { button: "/asset/image/icon/darkness.png", label: "darkness" },
  { button: "/asset/image/icon/rare.png", label: "rare" },
  { button: "/asset/image/icon/option.png", label: "option" },
  { button: "/asset/image/icon/ascending.png", label: "Ascending" },
  { button: "/asset/image/icon/descending.png", label: "Descending" },
];

interface Props {
  className?: string,
  cardList: ICard[],
  cardView: (ICard | null)[],
  filters: Filter[],
  onSelect: (card: ICard | null, index: number) => void
  onFilter: (isAll?: boolean, label?: string) => void
}

export function CardList({ className, cardList, cardView, filters, onSelect, onFilter}: Props) {
  const [cards, setCards] = useState<ICard[]>(cardList);
  const [isAll, setIsAll] = useState<boolean>(true);

  const filter = onFilter;
  const filterByAll = (pressed: boolean) => {
    filter(pressed);
    setIsAll(pressed);
  };
  const filterByType = (label: string) => {
    filter(false,label);
    if (filters.every(el => el.cardType.name == label.toUpperCase() ? el.isOn : !el.isOn))
      setIsAll(false);
  };
  const sort = (value:string) => setCards((value == filterOpt[7].label) ? [...cardList] : [...cardList].reverse());

  return (
    <Card className={cn(
      className
    )}>
      <CardHead>
        <div>
          {title}
        </div>
        <Toggle className="
        data-[state=on]:bg-game-darkblue1 data-[state=on]:hover:bg-transparent data-[state=on]:text-white 
        hover:bg-game-darkblue1 hover:text-white border-game-darkblue1 border-1 border-dashed p-0 leading-0 rounded-none min-w-min h-6 w-full"
          pressed={isAll} 
          aria-label={filterOpt[0].label}
          onPressedChange={filterByAll}
          >
          {filterOpt[0].button}
        </Toggle>
        {
          filterOpt.slice(1, -2).map((el, index) => (
            <Toggle key={index} className="
            data-[state=on]:bg-game-darkblue1 data-[state=on]:hover:bg-transparent data-[state=on]:text-white 
            hover:bg-game-darkblue1 hover:text-white border-game-darkblue1 border-1 border-dashed p-0 leading-0 rounded-none min-w-min h-6 w-full"
              pressed={filters.find(_ => _.cardType.name == el.label.toUpperCase())?.isOn} aria-label={el.label}
              onPressedChange={() => filterByType(el.label)}>
              <img src={`${el.button}`} alt={el.label} className="size-[16px]" />
            </Toggle>
          ))

        }
        <RadioGroup.Root
          defaultValue={filterOpt[7].label}
          className="flex gap-2 w-full"
          onValueChange={sort}
        >
          {filterOpt.slice(-2).map((el) => (
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
          <div className="flex flex-wrap justify-center gap-2 py-2">
            {cards.map((el, i) => (
              filters.some(_ => _.cardType.value == el.type && _.isOn) && <CardItem key={i} card={el} cardView={cardView} onSelect={onSelect} />
            ))}
          </div>
        </ScrollArea>
      </CardBody>
    </Card>
  );
}

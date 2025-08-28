import { ScrollArea } from "@/component/ui/scroll-area";
import { cn } from "@/lib/utils"
import { Card, CardHead, CardHeadButton, CardBody } from "../card";
import { Card as CardItem } from "./card";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Toggle } from "../../ui/toggle";
import { Card as ICard } from "@/domain/card";

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

interface Props {
  className?: string,
  cardList: ICard[],
  cardView: (ICard | null)[],
  onSelect: (card: ICard | null, index: number) => void
}

function CardList({ className, cardList, cardView, onSelect }: Props) {
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
          defaultPressed aria-label={filter[0].label}>
          {filter[0].button}
        </Toggle>
        {
          filter.slice(1, -2).map((el, index) => (
            <Toggle key={index} className="
            data-[state=on]:bg-game-darkblue1 data-[state=on]:hover:bg-transparent data-[state=on]:text-white 
            hover:bg-game-darkblue1 hover:text-white border-game-darkblue1 border-1 border-dashed p-0 leading-0 rounded-none min-w-min h-6 w-full"
              defaultPressed aria-label={el.label}>
              <img src={`${el.button}`} alt={el.label} className="size-[16px]" />
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
          <div className="flex flex-wrap justify-center gap-2 py-2">
            {cardList.map((el, i) => (
              <CardItem key={i} card={el} cardView={cardView} onSelect={onSelect} />
            ))}
          </div>
        </ScrollArea>
      </CardBody>
    </Card>
  );
};

export { CardList };

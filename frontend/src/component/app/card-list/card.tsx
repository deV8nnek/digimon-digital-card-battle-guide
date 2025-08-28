import { Toggle } from '@/component/ui/toggle';
import { Card as ICard } from '@/domain/card';
import { cn } from '@/lib/utils';

const cardType = {
  FIRE: "火炎",
  ICE: "氷水",
  NATURE: "自然",
  DARKNESS: "暗黒",
  RARE: "珍種",
  OPTION: "ＯＰ"
}

interface Props {
  className?: string,
  card: ICard,
  cardView: (ICard | null)[],
  onSelect: (card: ICard | null, index: number) => void
}

export function Card({ className, card, cardView, onSelect }: Props) {
  const select = () => {
    const [el, i] = cardView.includes(card) ? [null, cardView.indexOf(card)] : [card, cardView.indexOf(null)];
    onSelect(el,i);
  };

  return (
    <Toggle
      data-slot="card"
      className={cn(
        "data-[state=on]:text-white data-[state=on]:bg-transparent data-[state=on]:hover:bg-transparent " +
        "p-0 relative size-[100px] text-white hover:text-white hover:bg-transparent bg-transparent text-center rounded-none border-6 " +
        (card.type == cardType.FIRE ? "border-game-fire" :
          card.type == cardType.ICE ? "border-game-ice" :
            card.type == cardType.NATURE ? "border-game-nature" :
              card.type == cardType.DARKNESS ? "border-game-darkness" :
                card.type == cardType.RARE ? "border-game-rare" :
                  "border-game-option"),
        className
      )}
      onPressedChange={select}
      disabled = {!cardView.includes(card) && !cardView.includes(null)}
    >
      <img className=
        {cardView.includes(card) ?
          "opacity-100 hover:opacity-25" :
          "opacity-25 hover:opacity-100"}
        src={`/asset/image/card/${card.img}.png`} alt=" " />
      {!!card.lv && <div className="absolute top-0 left-0 w-2/5 text-left ml-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">{card.lv}</div>}
      <div className="absolute bottom-0 right-0 w-2/5 text-right mr-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">{card.number.toString().padStart(3, "0")}</div>
    </Toggle>
  );
}

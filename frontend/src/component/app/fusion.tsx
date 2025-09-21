import { Card, enumCardType } from "@/domain/card";
import { cn } from "@/lib/utils";
import { Error } from "./view";

interface Props {
  className?: string,
  card?: Card,
  message?: Error
}

export function CardFusion({ className, card, message }: Props) {
  return (
    <div className={cn("flex justify-center items-center size-full bg-black text-white py-8",
      className
    )}>
      {!!card && <div
        className={"p-0 relative h-full w-auto text-white hover:text-white hover:bg-transparent bg-transparent text-center rounded-none border-6 " +
          (card.type == enumCardType.fire.value ? "border-game-fire" :
            card.type == enumCardType.ice.value ? "border-game-ice" :
              card.type == enumCardType.nature.value ? "border-game-nature" :
                card.type == enumCardType.darkness.value ? "border-game-darkness" :
                  card.type == enumCardType.rare.value ? "border-game-rare" :
                    "border-game-option")}>
        <img className="object-contain w-auto h-full"
          src={`/asset/image/card/${card.img}.png`} alt={card.name} />
        {!!card.lv && <div className="absolute text-3xl top-0 left-0 w-2/5 text-left ml-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">{card.lv}</div>}
        <div className="absolute bottom-0 right-0 text-3xl w-2/5 text-right mr-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">{card.number.toString().padStart(3, "0")}</div>
      </div>
      }
      {!!message && <h2 className="w-full text-center text-game-highlight text-3xl">エラー: {message.detail}</h2>}
    </div>
  );
}


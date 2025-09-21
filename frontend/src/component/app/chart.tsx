import { Card, enumCardType, EnumCardType } from "@/domain/card";
import { cn } from "@/lib/utils";
import { Filter } from "./main";
import { config as URL } from "@/config/env";

interface Props {
  className?: string,
  card: Card,
  filters: Filter[]
}

export function CardChart({ className, card, filters }: Props) {
  const img = `${URL}/card/stat-chart/` + card.number + "?" +
    filters.filter(el => el.isOn && el.cardType != enumCardType.option).map((el) => "filter=" + el.cardType.value).join("&");

  return (
    <div className={cn("size-full flex flex-col justify-center pt-2",
      className
    )}>
      <div className="text-center">{card.number.toString().padStart(3, "0")} {card.name}</div>
        <img className="object-contain h-full lg:h-full lg:w-auto" src={img} alt={card.name} /> 
    </div>
  );
}
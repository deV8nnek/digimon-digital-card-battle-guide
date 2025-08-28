import { Card, EnumCardType } from "@/domain/card";
import { cn } from "@/lib/utils";

// TODO: Filter omit type option

interface Props {
  className?: string,
  card: Card,
  filter: EnumCardType[]
}

export function CardChart({ className, card, filter }: Props) {
  const img = "http://localhost:8000/card/stat-chart/" + card.number + "?" +
    filter.map(el => el.value).map((el) => "filter=" + el).join("&");

  return (
    <div className={cn("size-full flex flex-col justify-center pt-2",
      className
    )}>
      <div className="text-center">{card.number.toString().padStart(3, "0")} {card.name}</div>
      <img className="object-contain min-h w-full lg:h-full lg:w-auto" src={img} alt={card.name} />
    </div>
  );
}

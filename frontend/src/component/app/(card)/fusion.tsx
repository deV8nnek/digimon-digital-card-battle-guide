import { Card } from "@/domain/card";
import { cn } from "@/lib/utils";
import { use } from "react";

interface Props {
  className?: string,
  card: Card
}

export function CardFusion({ className, card }: Props) {
  return (
    
    <div className={cn("flex justify-center",
      className
    )}>
      <img className="object-contain w-auto h-full" src={`/asset/image/card/${card.img}.png`} alt={card.name} />
    </div>
  );
}

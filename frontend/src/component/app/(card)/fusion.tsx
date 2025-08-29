import { Card } from "@/domain/card";
import { cn } from "@/lib/utils";
import { use } from "react";

interface Props {
  className?: string,
  card: Promise<Card>
}

export function CardFusion({ className, card }: Props) {
  const fusion = use(card);

  return (
    <div className={cn("flex justify-center",
      className
    )}>
      <img className="object-contain w-auto h-full" src={`/asset/image/card/${fusion.img}.png`} alt={fusion.name} />
    </div>
  );
}

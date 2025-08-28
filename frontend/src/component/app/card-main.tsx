"use client"

import { CardList } from "./card-list/card-list";
import { CardView } from "@/component/app/card-view/card-view";
import { Card } from "@/domain/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
  className?: string,
  cardList: Card[]
}

export function CardMain({ className, cardList }: Props) {
  const [cardView, setCardView] = useState<(Card | null)[]>([cardList[115], cardList[197]]);

  const replace = (card: Card | null, index: number) => setCardView(cardView.map((el, i) => (i == index) ? card : el));

  return (
    <main
      className={cn(
        "grid grid-rows-2 px-2 md:px-24 h-screen",
        className
      )}
      style={{ background: "url('/asset/image/background/デジモンワールド.png') repeat 0 0", animation: "scrollbg 20s linear infinite" }}>
      <section className="flex flex-1">
        <div className="flex flex-1 gap-2">
          <CardView cardView={cardView} index={0} onClear={replace} />
        </div>
        {/* TODO: md below add switch button between card view */}
        <div className="hidden md:flex flex-1">
          <CardView cardView={cardView} index={1} onClear={replace} />
        </div>
      </section>
      <section className="flex flex-1">
        <CardList cardList={cardList} cardView={cardView} onSelect={replace} />
      </section>
    </main>
  );
}







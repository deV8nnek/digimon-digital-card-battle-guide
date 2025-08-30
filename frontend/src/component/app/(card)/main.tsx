"use client"

import { CardList } from "./list";
import { CardView } from "@/component/app/(card)/view";
import { Card, EnumCardType, enumCardType } from "@/domain/card";
import { cn } from "@/lib/utils";
import { useState } from "react";


export interface Filter {
  isOn: boolean;
  cardType: EnumCardType
}

interface Props {
  className?: string,
  cardList: Card[]
}

export function CardMain({ className, cardList }: Props) {
  const [cardView, setCardView] = useState<(Card | null)[]>([cardList[115], cardList[197]]);
  const [filters, setFilters] = useState<Filter[]>(Object.entries(enumCardType).map((el) =>
    ({ isOn: true, cardType: el[1] })
  ));
  const [index, setIndex] = useState<0 | 1>(0);

  const replace = (card: Card | null, index: number) => setCardView(cardView.map((el, i) => (i == index) ? card : el));
  const filter = (isAll?: boolean, label?: string) => {
    const nextFilter = filters.map(el => {
      if (!label) {
        return { isOn: !!isAll, cardType: el.cardType }
      } else {
        return el.cardType.name == label.toUpperCase() ? { isOn: !el.isOn, cardType: el.cardType } : el
      }
    });
    setFilters(nextFilter);
  };
  const show = () => {
    setIndex(index == 0 ? 1 : 0)
  };

  return (
    <main
      className={cn(
        "grid grid-rows-2 px-2 md:px-24 h-screen",
        className
      )}
      style={{ background: "url('/asset/image/background/デジモンワールド.png') repeat 0 0", animation: "scrollbg 20s linear infinite" }}>
      <section className="flex flex-1">
        <div className="flex flex-1 gap-2">
          {
            index == 0
              ? <CardView cardView={cardView} index={0} onClear={replace} filters={filters} onShow={show} />
              : <CardView cardView={cardView} index={1} onClear={replace} filters={filters} onShow={show} />
          }
        </div>
        {/* TODO: md below add switch button between card view */}
        <div className="hidden md:flex flex-1 gap-2">
          <CardView cardView={cardView} index={1} onClear={replace} filters={filters} onShow={show} />
        </div>
      </section>
      <section className="flex flex-1">
        <CardList cardList={cardList} cardView={cardView} onSelect={replace} filters={filters} onFilter={filter} />
      </section>
    </main>
  );
}







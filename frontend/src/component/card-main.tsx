"use client"

import { CardList } from "./card-list";
import { CardView } from "@/component/card-view";
import { useState } from "react";

function CardMain({ cards }: { cards: Card[] }) {
  const [card, setCard] = useState([0])
  const cardState = { card: card, setCard: setCard }

  return (
    <main className="grid grid-rows-2 px-2 md:px-24 h-screen" style={{ background: "url('/asset/image/background/デジモンワールド.png') repeat 0 0", animation: "scrollbg 20s linear infinite" }}>
      <section className="flex flex-1">
        <div className="flex flex-1 gap-2">
          {cardState.card.length >= 1 && <CardView card={cards[cardState.card[0]]} />}
        </div>
        {/* <div className="bg-amber-300 hidden md:flex flex-1">
          <Card>
            <CardHead>
              <div className="bg-amber-300">
                カート
              </div>
              <div className="bg-amber-300">button</div>
            </CardHead>
            <CardBody>

            </CardBody>
          </Card>
        </div> */}
      </section>
      <section className="flex flex-1">
        <CardList cards={cards} cardState={cardState}></CardList>
      </section>
    </main>
  );
}

export { CardMain };

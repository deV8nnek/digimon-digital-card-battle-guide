import React from 'react';
import { Toggle } from "@/component/ui/toggle";
import { useState } from "react";

function Card({ card }: { card: Card }) {
  const [isSelected, setIsSelected] = useState(false)



  return (
    <Toggle
      data-slot="card"
      className="p-0 relative size-[100px] text-white  hover:text-white text-center"
    >
      <img className="opacity-50 hover:opacity-100" src={`/asset/image/card/${card.img}.png`} alt=" " />
      {!!card.lv && <div className="absolute top-0 left-0 w-2/5 m-1">{card.lv}</div>}
      <div className="absolute bottom-0 right-0 w-2/5 m-1">{card.number.toString().padStart(3,"0")}</div>
    </Toggle>
  );
}

export { Card }

import { Card } from "@/domain/card";

interface Props {
  className?: string,
  cards: Card[]
}

async function getFusion(cards: Card[]) {
    const result = await fetch("http://localhost:8000/card/fusion?num1=" + cards[0].number + "&num2=" + cards[1].number);
    console.log(result);
    return result.json();
  }

export default async function CardFusion({ className, cards }: Props) {
  const result: Card = await getFusion(cards);

  return (
    <>
      {result}
    </>
  );
}

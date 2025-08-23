import { CardMain } from "@/component/card-main";

async function getCards() {
  const result = await fetch("http://localhost:8000/card/")
  return result.json()
}

export default async function Page() {
  const cards: Card[] = await getCards()

  return (
    <CardMain cards={cards} />
  );
}

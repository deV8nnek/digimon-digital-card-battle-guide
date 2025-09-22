import { CardMain } from "@/component/app/main";
import { settings } from "@/config/env";
import { Card } from "@/domain/card";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function getCards() {
  const response = await fetch(`http://${settings.BACKEND_URL}/card/`);
  const result =  await response.json();
  
  return result;
}

export default async function Page() {
  const cards: Card[] = await getCards();

  return (
    <CardMain cardList={cards} />
  );
}

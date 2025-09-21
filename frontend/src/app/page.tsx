import { CardMain } from "@/component/app/main";
import { config as URL } from "@/config/env";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function getCards() {
  const response = await fetch(`${URL}/card/`);
  const result = await response.json();
  return result;
}

export default async function Page() {
  const cards = await getCards();

  return (
    <CardMain cardList={cards} />
  );
}

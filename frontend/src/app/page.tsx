import { CardContent, CardHeader, CardTitle } from "@/component/card";
import { CardInfo } from "@/app/component/card-info";
import { Card } from "@/app/component/card";
import { CardList } from "@/app/component/card-list";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function Page() {
  return (
    <main className="bg-white h-full flex flex-col px-48">
      <section className="bg-amber-100 flex flex-1 flex-wrap">
        <div className="bg-amber-200 flex-1">
          <Card>

          </Card>
        </div>
        <div className="bg-amber-300 flex-1">
          <Card>

          </Card>
        </div>
      </section>
      <section className="bg-amber-400 flex flex-1">
        <Card>

        </Card>
      </section>
    </main>
  );
}

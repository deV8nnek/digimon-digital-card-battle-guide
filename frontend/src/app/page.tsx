import { Card, CardHead, CardBody } from "../component/card";
import { CardList } from "../component/card-list";

export default function Page() {
  return (
    <main className="bg-white h-full flex flex-col px-2 md:px-24">
      <section className="bg-amber-100 flex flex-1 flex-wrap">
        <div className="bg-amber-200 flex-1 min-h-min">
          <Card>
            <CardHead className="min-h-min">
              <div className="bg-amber-300">
                カート
              </div>
              <div className="bg-amber-300">button</div>
            </CardHead>
            <CardBody className="min-h-[150px]">

            </CardBody>
          </Card>
        </div>
        <div className="bg-amber-300 hidden md:flex flex-1">
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
        </div>
      </section>
      <section className="bg-amber-400 flex flex-1">
        <CardList></CardList>
      </section>
    </main>
  );
}

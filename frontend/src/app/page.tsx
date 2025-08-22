import { Toggle } from "@/component/ui/toggle";
import { Card, CardHead, CardBody } from "../component/card";
import { CardList } from "../component/card-list";
import Image from 'next/image'

async function getCards() {
  const result = await fetch("http://localhost:8000/card/")
  return result.json()
}

export default async function Page() {
  const cards: Card[] = await getCards()

  return (
    <main className="grid grid-rows-2 px-2 md:px-24 h-screen bg-[url('/asset/image/background/デジモンワールド.png')]">
      <section className="flex flex-1 flex-wrap">
        <div className="flex-1 min-h-min gap-2">
          <Card>
            <CardHead className="min-h-min gap-2">
              <Toggle className="bg-amber-300 h-min block [line-height:24px] min-w-min p-0 hover:text-foreground rounded-none hover:bg-amber-400 data-[state=on]:bg-amber-400 data-state-on">
                カード情報
              </Toggle>
              <Toggle className="bg-amber-300 h-min block [line-height:24px] min-w-min p-0 hover:text-foreground rounded-none hover:bg-amber-400 data-[state=on]:bg-amber-400 data-state-on">
                チャート
              </Toggle>
              <Toggle className="bg-amber-300 h-min block [line-height:24px] min-w-min p-0 hover:text-foreground rounded-none hover:bg-amber-400 data-[state=on]:bg-amber-400 data-state-on">
                合成
              </Toggle>
            </CardHead>
            <CardBody className="min-h-[150px]">
              <div className="grid size-full grid-cols-2 grid-rows-2 gap-2">
                <div className="flex justify-center">
                  <Image className="object-contain h-full w-auto" src="/asset/image/card/card_0_インペリアルドラモン.png" alt="0" height={100} width={100} quality={100} />
                </div>
                <div className="content-center">
                  <div className="grid items-center grid-rows-2 grid-cols-6 gap-2">
                    <h4 className="bg-white col-span-full">インペリアルドラモン</h4>
                    <h4 className="bg-white ">000</h4>
                    <div className="grid grid-cols-subgrid col-span-2">
                      <h4 className="bg-white text-end">Ｌｖ</h4>
                      <h4 className="bg-white">A</h4>
                    </div>
                    <div className="grid grid-cols-subgrid col-span-2">
                      <h4 className="bg-white text-end">属性</h4>
                      <div className="bg-white h-6 w-6 flex justify-center items-center [line-height:0]  p-0">
                        <Image src="/asset/image/icon/fire.png" alt="" width={16} height={16} quality={100} priority />
                      </div>
                    </div>
                    <div className="grid grid-cols-subgrid col-span-2">
                      <h4 className="bg-white text-end min-w-max">ＰＯＷ</h4>
                      <h4 className="bg-white">0</h4>
                    </div>
                    <div className="grid grid-cols-subgrid col-span-2">
                      <h4 className="bg-white text-end">Ｐ＋</h4>
                      <h4 className="bg-white">0</h4>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="grid grid-rows-5 grid-cols-2 gap-2">
                    <h4 className="bg-white text-end">HP</h4>
                    <h4 className="bg-white ">0000</h4>
                    <div className="bg-white justify-self-end">
                      <div className="bg-amber-200 h-6 w-6 flex justify-center items-center [line-height:0]  p-0">
                        <Image src="/asset/image/icon/fire.png" alt="" width={16} height={16} quality={100} priority />
                      </div>
                    </div>

                    <h4 className="bg-white">0000</h4>
                    <div className="bg-white justify-self-end">
                      <div className="bg-amber-200 h-6 w-6 flex justify-center items-center [line-height:0]  p-0">
                        <Image src="/asset/image/icon/fire.png" alt="" width={16} height={16} quality={100} priority />
                      </div>
                    </div>
                    <h4 className="bg-white ">0000</h4>
                    <div className="bg-white justify-self-end">
                      <div className="bg-amber-200 h-6 w-6 flex justify-center items-center [line-height:0]  p-0">
                        <Image src="/asset/image/icon/fire.png" alt="" width={16} height={16} quality={100} priority />
                      </div>
                    </div>
                    <h4 className="bg-white ">0000</h4>
                    <h4 className="bg-white col-span-full text-center">0000</h4>
                  </div>
                </div>
                <div className="">
                  <div className="grid gap-2">
                    <h4 className="bg-white">援護能力</h4>
                    <h4 className="bg-white">000</h4>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
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
        <CardList cards={cards}></CardList>
      </section>
    </main>
  );
}

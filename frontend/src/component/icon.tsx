"use client"

function Icon({ name }: { name: string }) {
  let file = name == "火炎" ? "fire"
    : name == "氷水" ? "ice"
      : name == "自然" ? "nature"
        : name == "暗黒" ? "darkness"
          : name == "珍種" ? "rare"
            : name == "ＯＰ" ? "option"
              : ["〇", "circle"].includes(name) ? "circle"
                : ["△", "triangle"].includes(name) ? "triangle"
                  : ["X", "x"].includes(name) ? "x"
                    : ""
  const isName = file != ""

  return (
    <>
      {
        isName ?
          <div className='min-h-[24px] justify-center items-center inline-flex'>
            <img className="object-contain h-full w-auto"
              src={`/asset/image/icon/${file}.png`}
              alt={name + (["x", "circle", "triangle"].includes(file) ? " stat" : " type")} />
          </div>
          : name
      }
    </>
  );
}

function TextIcon({ text }: { text?: string }) {
  const icon = /(〇|△|X|火炎|氷水|自然|暗黒|珍種|ＯＰ)/

  return (
    <>
      {
        !!text && text.split(icon).map((_, i) => (
          <Icon key={i} name={_} />
        ))
      }
    </>
  );
}

export { Icon, TextIcon }

import { cn } from "@/lib/utils";

interface Props {
  className?: string,
  text: string,
}

export function Icon({ className, text }: Props) {
  const file = text == "火炎" ? "fire"
    : text == "氷水" ? "ice"
      : text == "自然" ? "nature"
        : text == "暗黒" ? "darkness"
          : text == "珍種" ? "rare"
            : text == "ＯＰ" ? "option"
              : ["〇", "circle"].includes(text) ? "circle"
                : ["△", "triangle"].includes(text) ? "triangle"
                  : ["X", "x"].includes(text) ? "x"
                    : ""
  const isIcon = file != ""

  return (
    <>
      {
        isIcon ?
          <div className={cn(
            "h-full justify-center items-center inline-flex",
            className)}>
            <img className="object-contain min-h-min h-[90%] w-auto"
              src={`/asset/image/icon/${file}.png`}
              alt={text + (["x", "circle", "triangle"].includes(file) ? " stat" : " type")} />
          </div>
          : text
      }
    </>
  );
}

export function TextIcon({ className, text }: Props) {
  const icon = /(〇|△|X|火炎|氷水|自然|暗黒|珍種|ＯＰ)/

  return (
    <>
      {
        text.split(icon).map((_, i) => (
          <Icon className={cn(
            "h-full max-h-5 lg:max-h-6  align-text-bottom",
            className)} key={i} text={_} />
        ))
      }
    </>
  );
}

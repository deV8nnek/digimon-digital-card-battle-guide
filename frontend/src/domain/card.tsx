interface Card {
  number: number;
  name: string;
  type: "FIRE" | "火炎"
  | "ICE" | "氷水"
  | "NATURE" | "自然"
  | "DARKNESS" | "暗黒"
  | "RARE" | "珍種"
  | "OPTION" | "ＯＰ";
  lv?: "R" | "Ⅲ"
  | "C" | "Ⅳ"
  | "U" | "完"
  | "A" | "Ａ";
  hp?: number;
  dp?: number;
  pow?: number;
  circle?: number;
  triangle?: number;
  x?: number;
  special_effect?: string;
  effect: string;
  img: string;
}
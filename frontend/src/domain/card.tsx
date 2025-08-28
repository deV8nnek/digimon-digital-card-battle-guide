export const enumCardType = {
  fire: { name: "FIRE", value: "火炎" },
  ice: { name: "ICE", value: "氷水" },
  nature: { name: "NATURE",value: "自然"},
  darkness: {name: "DARKNESS", value: "暗黒"},
  rare: {name: "RARE", value: "珍種"},
  option: {name: "OPTION", value: "ＯＰ"}
} as const;

export type EnumCardType = typeof enumCardType[keyof typeof enumCardType];

export interface Card {
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
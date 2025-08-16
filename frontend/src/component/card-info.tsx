'use client'

import { Card, CardContent } from "@/component/ui/card";
import React from "react";
// import { MainContentSection } from "./MainContentSection";
// import { NavigationHeaderSection } from "./NavigationHeaderSection";

function CardInfo({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Card className="size-full">
    </Card>
  );
};

// const CardInfo = (): JSX.Element => {
//   return (
//     <Card className="w-[565px] h-[462px] rounded-[var(--size-radius-400)] border border-solid border-black aspect-[1.22]">
//       <CardContent className="flex items-start gap-2 p-2 h-full">
//         <NavigationHeaderSection />
//         <MainContentSection />
//       </CardContent>
//     </Card>
//   );
// };

// export default CardInfo;

// import { Card, CardContent } from "@/components/ui/card";
// import React from "react";

// const statsData = [
//   {
//     symbol: "HP",
//     value: "650",
//     symbolClass:
//       "font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] whitespace-nowrap [font-style:var(--heading-6-font-style)]",
//     valueClass:
//       "[font-family:'Roboto-Bold',Helvetica] font-bold text-black text-lg tracking-[0] leading-[19.8px]",
//   },
//   {
//     symbol: "○",
//     value: "280",
//     symbolClass:
//       "[font-family:'Roboto-Thin',Helvetica] font-thin text-black text-base tracking-[0] leading-[17.6px] whitespace-nowrap",
//     valueClass:
//       "font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]",
//   },
//   {
//     symbol: "Δ",
//     value: "240",
//     symbolClass:
//       "[font-family:'Roboto-Light',Helvetica] font-light text-black text-base tracking-[0] leading-[17.6px] whitespace-nowrap",
//     valueClass:
//       "font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]",
//   },
//   {
//     symbol: "×",
//     value: "190",
//     symbolClass:
//       "[font-family:'Roboto-Light',Helvetica] font-light text-black text-xl tracking-[0] leading-[22.0px] whitespace-nowrap",
//     valueClass:
//       "font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]",
//   },
// ];

// const characterStats = [
//   { label: "190", value: "" },
//   { label: "Lv", value: "III" },
//   { label: "属性", value: "?" },
//   { label: "POW", value: "20" },
//   { label: "+P", value: "0" },
// ];

// export default function MainContentSection(): JSX.Element {
//   return (
//     <Card className="w-full h-full rounded-2xl border border-solid border-black">
//       <CardContent className="p-2 h-full">
//         <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
//           <div className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center w-[211px] min-h-[100px] h-full aspect-[1] bg-[url(/image.png)] bg-cover bg-[50%_50%]" />

//           <div className="row-[1_/_2] col-[2_/_3] justify-self-start [align-self:start] w-[248.5px] items-start justify-center relative h-full flex flex-col gap-2">
//             <div className="flex flex-wrap min-w-[100px] h-[45px] items-start gap-[0px_0px] relative self-stretch w-full">
//               <div className="relative flex-1 mt-[-1.00px] font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
//                 アルマジモン
//               </div>
//             </div>

//             <div className="flex flex-wrap min-w-[100px] min-h-12 items-start gap-[8px_24px] relative self-stretch w-full flex-[0_0_auto]">
//               {characterStats.map((stat, index) => (
//                 <div
//                   key={index}
//                   className={
//                     index === 0
//                       ? "w-8 relative h-5 mt-[-1.00px] font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] whitespace-nowrap [font-style:var(--heading-6-font-style)]"
//                       : "inline-flex items-start gap-2 relative flex-[0_0_auto]"
//                   }
//                 >
//                   {index === 0 ? (
//                     stat.label
//                   ) : (
//                     <>
//                       <div className="relative w-fit mt-[-1.00px] font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] whitespace-nowrap [font-style:var(--heading-6-font-style)]">
//                         {stat.label}
//                       </div>
//                       {stat.label === "属性" ? (
//                         <div className="relative w-5 h-5 bg-[#d9d9d9] aspect-[1]">
//                           <div className="absolute -top-px left-1.5 whitespace-nowrap font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
//                             {stat.value}
//                           </div>
//                         </div>
//                       ) : (
//                         <div
//                           className={
//                             stat.label === "Lv"
//                               ? "relative w-4 h-5 mt-[-1.00px] font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] whitespace-nowrap [font-style:var(--heading-6-font-style)]"
//                               : "w-[21px] text-right relative h-5 mt-[-1.00px] font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] whitespace-nowrap [font-style:var(--heading-6-font-style)]"
//                           }
//                         >
//                           {stat.value}
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="row-[2_/_3] col-[1_/_2] w-full items-center relative h-full flex flex-col gap-2">
//             <div className="grid grid-cols-2 grid-rows-4 gap-2 w-[248px] h-[150px]">
//               {statsData.map((stat, index) => (
//                 <React.Fragment key={index}>
//                   <div
//                     className={`row-[${index + 1}_/_${index + 2}] ${index === 0 ? "col-[1_/_2] justify-self-end self-center w-[25px] text-center" : "col-[1_/_2] justify-self-end self-center"} relative h-5 ${stat.symbolClass}`}
//                   >
//                     {index === 0 ? (
//                       stat.symbol
//                     ) : (
//                       <div className="relative w-5 h-5 bg-[#d9d9d9] aspect-[1]">
//                         <div
//                           className={`absolute ${stat.symbol === "×" ? "left-1 -top-1" : stat.symbol === "Δ" ? "top-0 left-1" : "top-0 left-[3px]"} ${stat.symbolClass}`}
//                         >
//                           {stat.symbol}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                   <div
//                     className={`row-[${index + 1}_/_${index + 2}] col-[2_/_3] self-center ${index === 0 ? "w-[42px]" : "w-[42px]"} h-5 text-right whitespace-nowrap relative ${stat.valueClass}`}
//                   >
//                     {stat.value}
//                   </div>
//                 </React.Fragment>
//               ))}
//             </div>

//             <div className="flex flex-wrap items-start gap-[0px_0px] pt-2 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
//               <div className="absolute w-5 h-5 top-[7px] left-[104px] z-[1] bg-[#d9d9d9] aspect-[1]">
//                 <div className="absolute top-0 left-[3px] [font-family:'Roboto-Thin',Helvetica] font-thin text-black text-base tracking-[0] leading-[17.6px] whitespace-nowrap">
//                   ○
//                 </div>
//               </div>

//               <div className="flex-1 mt-[-1.00px] z-0 text-center relative font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;を0に
//               </div>
//             </div>
//           </div>

//           <div className="row-[2_/_3] col-[2_/_3] justify-self-start [align-self:start] w-[248.5px] items-start relative h-full flex flex-col gap-2">
//             <div className="self-stretch mt-[-1.00px] relative h-5 font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] whitespace-nowrap [font-style:var(--heading-6-font-style)]">
//               援護能力
//             </div>

//             <div className="relative self-stretch font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
//               相手の山札から2枚捨て、自分は山札から1枚引く
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// import { Button } from "@/components/ui/button";
// import { X } from "lucide-react";
// import React, { useState } from "react";

// const navigationItems = [
//   { id: "card-info", label: "カード情報" },
//   { id: "chart", label: "チャート" },
//   { id: "synthesis", label: "合成" },
// ];

// export const NavigationHeaderSection = (): JSX.Element => {
//   const [activeItem, setActiveItem] = useState<string>("card-info");

//   return (
//     <header className="inline-flex flex-col items-start justify-between relative self-stretch flex-[0_0_auto] bg-transparent">
//       <nav className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto] z-[1]">
//         {navigationItems.map((item) => (
//           <Button
//             key={item.id}
//             variant="ghost"
//             className={`inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto] bg-[#d9d9d9] h-auto px-2.5 py-1 ${
//               activeItem === item.id ? "bg-[#c0c0c0]" : ""
//             }`}
//             onClick={() => setActiveItem(item.id)}
//           >
//             <span className="relative w-[18px] mt-[-1.00px] font-heading-6 font-[number:var(--heading-6-font-weight)] text-black text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)]">
//               {item.label}
//             </span>
//           </Button>
//         ))}
//       </nav>

//       <Button
//         variant="ghost"
//         size="icon"
//         className="relative w-5 h-5 z-0 bg-[#d9d9d9] rounded-[var(--size-radius-full)] overflow-hidden aspect-[1] p-0"
//       >
//         <X className="w-3 h-3 text-black" />
//       </Button>
//     </header>
//   );
// };

export { CardInfo };

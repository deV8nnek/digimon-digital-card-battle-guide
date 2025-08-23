'use client'

import { Button } from "@/component/ui/button"
import { Card as _Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card"
import { ScrollArea } from "@/component/ui/scroll-area"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <_Card data-slot="card"
      className={cn(
        "size-full flex flex-row bg-game-border-out  border-l-[5px] border-game-border-in gap-0 gap-x-1 gap-y-0 p-1 pl-0",
        className
      )}
      {...props}
    />
  );
}

function CardHead({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <CardHeader data-slot="card-head"
      className={cn(
        "flex p-0 [writing-mode:vertical-rl] text-game-darkblue1 gap-2 w-[24px]",
        className
      )}
      {...props}
    />
  );
}

function CardHeadButton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-head-button"
      className={cn(
        "border-game-darkblue1 border-1 border-dashed flex leading-0 justify-center items-center w-full min-h-6 h-full hover:bg-game-darkblue1 hover:text-white",
        className
      )}
      {...props}
    />
  );
}

function CardBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Card data-slot="card-body"
      className={cn(
        "grow shadow-none border-none bg-[repeating-linear-gradient(0deg,_#101040,_#101040_50%,_#000020_50%,_#000020)] bg-[size:100%_5px] p-0 px-2",
        className
      )}
      {...props}
    />
  );
}

export { Card, CardHead, CardHeadButton, CardBody }

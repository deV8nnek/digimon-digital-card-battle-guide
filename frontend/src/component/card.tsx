'use client'

import { Button } from "@/component/ui/button"
import { Card as _Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card"
import { ScrollArea } from "@/component/ui/scroll-area"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <_Card data-slot="card"
      className={cn(
        "size-full flex-row flex p-2 gap-2",
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
        "bg-amber-200 min-w-6 flex p-0 [writing-mode:vertical-rl]",
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
        "bg-amber-200 grow shadow-none",
        className
      )}
      {...props}
    />
  );
}

export { Card, CardHead, CardBody }

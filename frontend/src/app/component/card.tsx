'use client'

import { Button } from "@/component/button";
import { Card as _Card, CardContent, CardHeader, CardTitle } from "@/component/card";
import { ScrollArea } from "@/component/scroll-area";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <_Card className="size-full flex">
      <CardHeader className="h-full flex-col">
        <CardTitle>

        </CardTitle>
      </CardHeader>
      <CardContent>

      </CardContent>
    </_Card>
  );
};

export { Card };

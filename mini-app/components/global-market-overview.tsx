"use client";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export default function GlobalMarketOverview() {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Global Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">$--</span>
            <span className="text-sm text-muted-foreground">Market Cap</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">$--</span>
            <span className="text-sm text-muted-foreground">24h Volume</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">--%</span>
            <span className="text-sm text-muted-foreground">BTC Dominance</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">--%</span>
            <span className="text-sm text-muted-foreground">ETH Dominance</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface GlobalStats {
  total_market_cap: string;
  total_volume_24h: string;
  btc_dominance: string;
  eth_dominance: string;
}

export default function GlobalMarketOverview() {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/global");
        if (!res.ok) {
          throw new Error("Failed to load global stats");
        }
        const data = await res.json();
        setStats({
          total_market_cap: data.total_market_cap,
          total_volume_24h: data.total_volume_24h,
          btc_dominance: data.btc_dominance,
          eth_dominance: data.eth_dominance,
        });
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Global Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (error || !stats) {
    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Global Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Global Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">${Number(stats.total_market_cap).toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">Market Cap</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">${Number(stats.total_volume_24h).toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">24h Volume</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{Number(stats.btc_dominance).toFixed(2)}%</span>
            <span className="text-sm text-muted-foreground">BTC Dominance</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{Number(stats.eth_dominance).toFixed(2)}%</span>
            <span className="text-sm text-muted-foreground">ETH Dominance</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

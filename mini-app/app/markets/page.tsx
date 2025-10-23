"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  price_usd: string;
  market_cap_usd: string;
  percent_change_24h: string;
}

export default function MarketsPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof Coin>("rank");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const pageSize = 20;

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch("/api/coins");
        if (!res.ok) {
          throw new Error("Failed to load coins");
        }
        const data: Coin[] = await res.json();
        setCoins(data);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, []);

  const sortedCoins = useMemo(() => {
    const sorted = [...coins].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
    return sorted;
  }, [coins, sortKey, sortDir]);

  const paginatedCoins = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedCoins.slice(start, start + pageSize);
  }, [sortedCoins, page]);

  const totalPages = Math.ceil(coins.length / pageSize);

  const handleSort = (key: keyof Coin) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  if (loading) {
    return (
      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Markets</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Loading...</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Markets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">Error: {error}</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Markets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort("rank")}>
                  Rank {sortKey === "rank" && (sortDir === "asc" ? "▲" : "▼")}
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead onClick={() => handleSort("price_usd")}>
                  Price {sortKey === "price_usd" && (sortDir === "asc" ? "▲" : "▼")}
                </TableHead>
                <TableHead onClick={() => handleSort("market_cap_usd")}>
                  Market Cap{" "}
                  {sortKey === "market_cap_usd" && (sortDir === "asc" ? "▲" : "▼")}
                </TableHead>
                <TableHead onClick={() => handleSort("percent_change_24h")}>
                  24h %{" "}
                  {sortKey === "percent_change_24h" &&
                    (sortDir === "asc" ? "▲" : "▼")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCoins.map((coin) => (
                <TableRow key={coin.id}>
                  <TableCell>{coin.rank}</TableCell>
                  <TableCell>{coin.name}</TableCell>
                  <TableCell>{coin.symbol}</TableCell>
                  <TableCell>${Number(coin.price_usd).toLocaleString()}</TableCell>
                  <TableCell>
                    ${Number(coin.market_cap_usd).toLocaleString()}
                  </TableCell>
                  <TableCell
                    className={
                      Number(coin.percent_change_24h) >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {Number(coin.percent_change_24h).toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

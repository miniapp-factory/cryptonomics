import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function WatchlistPage() {
  return (
    <main className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Watchlist</CardTitle>
        </CardHeader>
        <CardContent>
          <p>User watchlist will appear here.</p>
        </CardContent>
      </Card>
    </main>
  );
}

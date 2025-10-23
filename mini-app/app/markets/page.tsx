import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MarketsPage() {
  return (
    <main className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Markets</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Coin listings with pagination, sorting, and filtering will appear here.</p>
        </CardContent>
      </Card>
    </main>
  );
}

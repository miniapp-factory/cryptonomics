import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function NewsPage() {
  return (
    <main className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>News</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Crypto news feed will appear here.</p>
        </CardContent>
      </Card>
    </main>
  );
}

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PortfolioPage() {
  return (
    <main className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <p>User portfolio tracker will appear here.</p>
        </CardContent>
      </Card>
    </main>
  );
}

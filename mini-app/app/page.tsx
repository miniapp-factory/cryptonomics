import { description, title, url } from "@/lib/metadata";
import { Metadata } from "next";
import GlobalMarketOverview from "@/components/global-market-overview";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [`${url}/icon.png`],
    },
  };
}

export default function Home() {
  return (
    <main className="flex flex-col gap-6 place-items-center px-4 py-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <GlobalMarketOverview />
    </main>
  );
}

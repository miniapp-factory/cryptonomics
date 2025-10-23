import { NextResponse } from "next/server";

const COINMARKETCAP_BASE = "https://api.coinmarketcap.com/v1";

export async function GET() {
  try {
    const res = await fetch(`${COINMARKETCAP_BASE}/global`);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch global data" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching global data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

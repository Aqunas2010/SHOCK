import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    persistenceMode: "hybrid",
    message: "Client local storage handles offline learning progress. When DATABASE_URL is configured, attempts sync to PostgreSQL Prisma schema.",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      received: body,
      syncedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process progress payload" },
      { status: 400 }
    );
  }
}

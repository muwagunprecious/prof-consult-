import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leads = await prisma.bookingLead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(leads);
  } catch (error) {
    console.error("GET /api/leads error:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking leads" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { listingId, listingTitle, whatsapp } = body;

    if (!listingId || !listingTitle || !whatsapp) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const lead = await prisma.bookingLead.create({
      data: {
        listingId: parseInt(listingId, 10),
        listingTitle,
        whatsapp,
      },
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error("POST /api/leads error:", error);
    return NextResponse.json(
      { error: "Failed to create booking lead" },
      { status: 500 }
    );
  }
}

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);
    const listing = await prisma.listing.findUnique({ where: { id } });
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }
    return NextResponse.json(listing);
  } catch (error) {
    console.error('GET /api/listings/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch listing' }, { status: 500 });
  }
}


export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  await prisma.listing.delete({ where: { id } });
  return NextResponse.json({ success: true });
}


export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);
    const body = await request.json();
    const { title, location, price, period, images, description, firstPayment, subsequentPayment, amenities, rating, type } = body;
    const updated = await prisma.listing.update({
      where: { id },
      data: {
        title,
        location,
        price,
        period,
        images,
        description,
        firstPayment,
        subsequentPayment,
        amenities,
        rating,
        type,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/listings/[id] error:", error);
    return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
  }
}

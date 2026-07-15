import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const records = await prisma.propertyRecord.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(records);
  } catch (error) {
    console.error("GET /api/properties error:", error);
    return NextResponse.json(
      { error: "Failed to fetch property records" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tenantName, propertyName, amountPaid, amountBalanced, dueDate, datePaid } = body;

    if (!tenantName || !propertyName || !dueDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const record = await prisma.propertyRecord.create({
      data: {
        tenantName,
        propertyName,
        amountPaid: parseFloat(amountPaid) || 0,
        amountBalanced: parseFloat(amountBalanced) || 0,
        dueDate,
        datePaid: datePaid || "",
      },
    });

    return NextResponse.json(record);
  } catch (error) {
    console.error("POST /api/properties error:", error);
    return NextResponse.json(
      { error: "Failed to create property record" },
      { status: 500 }
    );
  }
}

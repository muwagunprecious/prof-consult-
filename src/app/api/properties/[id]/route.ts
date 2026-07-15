import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { tenantName, propertyName, amountPaid, amountBalanced, dueDate, datePaid } = body;

    const data: any = {};
    if (tenantName !== undefined) data.tenantName = tenantName;
    if (propertyName !== undefined) data.propertyName = propertyName;
    if (amountPaid !== undefined) data.amountPaid = parseFloat(amountPaid) || 0;
    if (amountBalanced !== undefined) data.amountBalanced = parseFloat(amountBalanced) || 0;
    if (dueDate !== undefined) data.dueDate = dueDate;
    if (datePaid !== undefined) data.datePaid = datePaid;

    const updated = await prisma.propertyRecord.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/properties/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update property record" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.propertyRecord.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/properties/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete property record" },
      { status: 500 }
    );
  }
}

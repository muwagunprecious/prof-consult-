import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { listings as initialListings } from "@/data/listings";

export async function GET() {
  try {
    let dbListings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Auto-seed if database listings are empty
    if (dbListings.length === 0) {
      console.log("Seeding database with default listing data...");
      const seedData = initialListings.map(item => {
        const cleanPriceVal = parseInt(item.price.replace(/,/g, ""), 10) || 150000;
        const subPriceVal = Math.round(cleanPriceVal * 0.8); // 80% subsequent years
        
        return {
          title: item.title,
          location: item.location,
          price: item.price,
          period: item.period || "/mo",
          images: [item.image],
          description: `Experience luxury student living at this premium ${item.type} in ${item.location}. Fully furnished with high-speed WiFi, security, and top-class facilities.`,
          firstPayment: item.price,
          subsequentPayment: subPriceVal.toLocaleString("en-US"),
          amenities: item.amenities,
          rating: item.rating || 5.0,
          type: item.type,
        };
      });

      await prisma.listing.createMany({
        data: seedData,
      });

      dbListings = await prisma.listing.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return NextResponse.json(dbListings);
  } catch (error) {
    console.error("GET /api/listings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch property listings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, location, firstPayment, subsequentPayment, type, images, description, amenities, rating } = body;

    if (!title || !location || !firstPayment || !subsequentPayment || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Helper to format numeric strings to comma strings e.g. 150000 -> 150,000
    const formatPriceStr = (val: string) => {
      let cleanVal = val.toString();
      if (!cleanVal.includes(",")) {
        const num = parseInt(cleanVal.replace(/[^0-9]/g, ""), 10);
        if (!isNaN(num)) {
          return num.toLocaleString("en-US");
        }
      }
      return cleanVal;
    };

    const formattedFirst = formatPriceStr(firstPayment);
    const formattedSub = formatPriceStr(subsequentPayment);

await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"Listing"','id'), (SELECT COALESCE(MAX(id), 0) + 1 FROM "Listing"), false);`);
    const listing = await prisma.listing.create({
      data: {
        title,
        location,
        price: formattedFirst, // Sync original price to firstPayment for compatibility
        period: "/mo",
        images: images && images.length > 0 ? images : ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800"],
        description: description || "No description provided.",
        firstPayment: formattedFirst,
        subsequentPayment: formattedSub,
        amenities: amenities || ["WiFi", "Security"],
        rating: parseFloat(rating) || 5.0,
        type,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("POST /api/listings error:", error);
    return NextResponse.json(
      { error: "Failed to create property listing" },
      { status: 500 }
    );
  }
}

/**
 * migrate-to-supabase.mjs
 * 
 * Migrates all data from local PostgreSQL to Supabase.
 * Run after: npx prisma db push (to create tables in Supabase)
 */

import { PrismaClient } from "@prisma/client";

// Local PostgreSQL client
const localDb = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:postgres@localhost:5432/prof_consult?schema=public",
    },
  },
  log: ["warn", "error"],
});

// Supabase client
const supabaseDb = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.fjbqtwtlulntengmxvfw:u7rq72rdobHMojVh@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1",
    },
  },
  log: ["warn", "error"],
});

async function migrate() {
  console.log("\n🚀 Starting data migration: Local PostgreSQL → Supabase\n");

  try {
    // ─── 1. Migrate PropertyRecords ─────────────────────────────────
    console.log("📋 Migrating PropertyRecords...");
    const localRecords = await localDb.propertyRecord.findMany();
    console.log(`   Found ${localRecords.length} property records locally.`);

    if (localRecords.length > 0) {
      // Delete existing Supabase records to avoid duplicates
      await supabaseDb.propertyRecord.deleteMany();
      
      for (const record of localRecords) {
        await supabaseDb.propertyRecord.create({ data: record });
      }
      console.log(`   ✅ Migrated ${localRecords.length} PropertyRecords.`);
    } else {
      console.log("   ⚠️  No PropertyRecords found locally — skipping.");
    }

    // ─── 2. Migrate Listings ─────────────────────────────────────────
    console.log("\n🏠 Migrating Listings...");
    const localListings = await localDb.listing.findMany();
    console.log(`   Found ${localListings.length} listings locally.`);

    if (localListings.length > 0) {
      // Delete existing Supabase listings to avoid duplicates on re-run
      await supabaseDb.listing.deleteMany();
      
      for (const listing of localListings) {
        await supabaseDb.listing.create({ data: listing });
      }
      console.log(`   ✅ Migrated ${localListings.length} Listings.`);
    } else {
      console.log("   ⚠️  No Listings found locally — skipping.");
    }

    // ─── 3. Migrate BookingLeads ─────────────────────────────────────
    console.log("\n📞 Migrating BookingLeads...");
    const localLeads = await localDb.bookingLead.findMany();
    console.log(`   Found ${localLeads.length} booking leads locally.`);

    if (localLeads.length > 0) {
      await supabaseDb.bookingLead.deleteMany();
      
      for (const lead of localLeads) {
        await supabaseDb.bookingLead.create({ data: lead });
      }
      console.log(`   ✅ Migrated ${localLeads.length} BookingLeads.`);
    } else {
      console.log("   ⚠️  No BookingLeads found locally — skipping.");
    }

    // ─── Summary ─────────────────────────────────────────────────────
    console.log("\n✨ Migration complete! All data is now live in Supabase.\n");
    
    // Verify counts in Supabase
    const supalistings = await supabaseDb.listing.count();
    const supaRecords = await supabaseDb.propertyRecord.count();
    const supaLeads = await supabaseDb.bookingLead.count();
    
    console.log("📊 Supabase row counts:");
    console.log(`   Listings:        ${supalistings}`);
    console.log(`   PropertyRecords: ${supaRecords}`);
    console.log(`   BookingLeads:    ${supaLeads}`);
    console.log("");

  } catch (err) {
    console.error("\n❌ Migration failed:", err.message || err);
    process.exit(1);
  } finally {
    await localDb.$disconnect();
    await supabaseDb.$disconnect();
  }
}

migrate();

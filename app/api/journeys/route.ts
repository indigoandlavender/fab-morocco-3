import { NextResponse } from "next/server";
import { getSheetData } from "@/lib/sheets";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Fetch from Tours tab
    const journeys = await getSheetData("Tours");
    
    console.log("Raw journeys from sheet:", journeys.slice(0, 2)); // Debug log
    
    // Map to consistent format - matching Fab Morocco column names (lowercase with underscores)
    const formattedJourneys = journeys
      .filter((j: any) => {
        // Check if row has required data
        return j.slug && j.title;
      })
      .map((j: any) => {
        // Parse duration from title or short_description
        const durationMatch = (j.title || "").match(/(\d+)-Day/i);
        const durationDays = durationMatch ? parseInt(durationMatch[1]) : 1;
        
        return {
          slug: j.slug || "",
          title: j.title || "",
          duration: `${durationDays}-Day`,
          durationDays: durationDays,
          description: j.short_description || j.short_de || "",
          shortDescription: j.short_description || j.short_de || "",
          heroImage: j.hero_image_url || "",
          price: parseInt(j.price_eur || j.price) || 0,
          startCity: j.start_city || "Marrakech",
          focus: j.focus_type || j.focus || "",
          category: j.category || "",
          journeyId: j.tour_id || j.journey_id || "",
          destinations: j.destinations || "",
          badge: j.badge || "",
        };
      });

    console.log("Formatted journeys:", formattedJourneys.slice(0, 2)); // Debug log

    return NextResponse.json({
      success: true,
      journeys: formattedJourneys,
    });
  } catch (error: any) {
    console.error("Journeys fetch error:", error);
    return NextResponse.json(
      { success: false, journeys: [], error: error.message },
      { status: 500 }
    );
  }
}

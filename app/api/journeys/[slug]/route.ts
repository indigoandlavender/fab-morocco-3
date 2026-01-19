import { NextResponse } from "next/server";
import { getSheetData } from "@/lib/sheets";

// CORS headers for cross-origin requests (e.g., from Riad di Siena)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    // Get all tours from Tours tab
    const tours = await getSheetData("Tours");
    
    // Find the specific tour by slug (lowercase column name)
    const tourData = tours.find(
      (j: any) => j.slug === slug || j.slug === decodeURIComponent(slug)
    );

    if (!tourData) {
      return NextResponse.json(
        { success: false, error: "Tour not found" },
        { status: 404 }
      );
    }

    // Parse duration from title
    const durationMatch = (tourData.title || "").match(/(\d+)-Day/i);
    const durationDays = durationMatch ? parseInt(durationMatch[1]) : 1;

    // Format tour data (lowercase column names)
    const journey = {
      slug: tourData.slug || "",
      title: tourData.title || "",
      duration: `${durationDays}-Day`,
      durationDays: durationDays,
      description: tourData.short_description || tourData.short_de || "",
      arcDescription: tourData.arc_description || "",
      heroImage: tourData.hero_image_url || "",
      price: parseInt(tourData.price_eur || tourData.price) || 0,
      startCity: tourData.start_city || "Marrakech",
      focus: tourData.focus_type || tourData.focus || "",
      journeyId: tourData.tour_id || "",
      journeyType: "regular",
      epicPrice: tourData.epic_price_eur ? parseInt(tourData.epic_price_eur) : null,
    };

    // Try to get itinerary from Tour_Itinerary tab
    let itinerary: any[] = [];
    try {
      const itineraryData = await getSheetData("Tour_Itinerary");
      const tourItinerary = itineraryData.filter(
        (item: any) => item.tour_id === tourData.tour_id || item.slug === slug
      );
      
      itinerary = tourItinerary
        .sort((a: any, b: any) => (parseInt(a.day_number) || 0) - (parseInt(b.day_number) || 0))
        .map((item: any) => ({
          dayNumber: parseInt(item.day_number) || 1,
          cityName: item.location || item.city || "",
          fromCity: item.from_city || "",
          toCity: item.to_city || item.location || "",
          description: item.description || item.narrative || "",
          imageUrl: item.image_url || "",
          travelTime: item.travel_time || "",
          activities: item.activities || "",
          meals: item.meals || "",
        }));
    } catch (e) {
      console.log("No Tour_Itinerary tab or error fetching:", e);
    }

    return NextResponse.json({
      success: true,
      journey,
      itinerary,
    }, { headers: corsHeaders });
  } catch (error: any) {
    console.error("Tour detail fetch error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

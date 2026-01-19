import { NextResponse } from "next/server";
import { getSheetData } from "@/lib/sheets";

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET(request: Request) {
  try {
    const tours = await getSheetData("Tours");
    
    // Check for debug mode
    const { searchParams } = new URL(request.url);
    const debug = searchParams.get("debug");
    
    if (debug === "true") {
      // Return raw data for debugging
      const isPublishedDebug = (value: any): boolean => {
        if (value === true || value === 1) return true;
        const str = String(value || "").toUpperCase().trim();
        return str === "TRUE" || str === "YES" || str === "1";
      };
      
      return NextResponse.json({
        totalRows: tours.length,
        firstRowKeys: tours[0] ? Object.keys(tours[0]) : [],
        firstRowPublished: tours[0]?.published,
        allPublishedValues: tours.map((t: any) => ({ 
          id: t.tour_id,
          slug: t.slug,
          rawValue: t.published,
          publishedType: typeof t.published,
          isPublished: isPublishedDebug(t.published)
        }))
      });
    }
    
    // Filter only published tours
    // Handles: TRUE, true, True, "TRUE", checkboxes (boolean), 1, yes, etc.
    const isPublished = (value: any): boolean => {
      if (value === true || value === 1) return true;
      const str = String(value || "").toUpperCase().trim();
      return str === "TRUE" || str === "YES" || str === "1";
    };
    
    const publishedTours = tours
      .filter((tour: any) => isPublished(tour.published))
      .sort((a: any, b: any) => (parseFloat(a.order) || 99) - (parseFloat(b.order) || 99))
      .map((tour: any) => ({
        id: tour.tour_id || "",
        slug: tour.slug || "",
        title: tour.title || "",
        heroImage: tour.hero_image_url || "",
        description: tour.short_description || "",
        durationDays: parseInt(tour.duration_days) || 1,
        durationNights: parseInt(tour.duration_nights) || 0,
        priceUsd: parseInt(tour.price_usd) || 0,
        price: parseInt(tour.price_eur) || 0, // EUR as default
        startCity: tour.start_city || "Marrakech",
        endCity: tour.end_city || tour.start_city || "Marrakech",
        destinations: tour.destinations || "",
        highlights: tour.highlights ? tour.highlights.split("|").map((h: string) => h.trim()) : [],
        includes: tour.includes ? tour.includes.split("|").map((i: string) => i.trim()) : [],
        excludes: tour.excludes ? tour.excludes.split("|").map((e: string) => e.trim()) : [],
        category: tour.category || "Desert",
        focus: (tour.category || "desert").toLowerCase(),
        featured: tour.featured === "TRUE" || tour.featured === true,
      }));

    return NextResponse.json(publishedTours);
  } catch (error) {
    console.error("Error fetching tours:", error);
    return NextResponse.json([], { status: 500 });
  }
}

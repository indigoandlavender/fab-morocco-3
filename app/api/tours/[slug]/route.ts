import { NextResponse } from "next/server";
import { getSheetData, getSlowMoroccoData } from "@/lib/sheets";

export const revalidate = 60;

// Stay day content (when route_id starts with STAY_)
const STAY_CONTENT: Record<string, { imageUrl: string; activities: string; difficulty: string; meals: string }> = {
  STAY_MERZOUGA: {
    imageUrl: "https://res.cloudinary.com/drstfu5yr/image/upload/v1766356531/ARRIVAL_STANDARD-Morocco_gbtt25.png",
    activities: "Desert exploration",
    difficulty: "Easy",
    meals: "Breakfast|Dinner",
  },
  STAY_FES: {
    imageUrl: "https://res.cloudinary.com/drstfu5yr/image/upload/v1766356531/ARRIVAL_STANDARD-Morocco_gbtt25.png",
    activities: "Medina exploration",
    difficulty: "Easy",
    meals: "Breakfast",
  },
  STAY_MARRAKECH: {
    imageUrl: "https://res.cloudinary.com/drstfu5yr/image/upload/v1766356531/ARRIVAL_STANDARD-Morocco_gbtt25.png",
    activities: "Medina exploration",
    difficulty: "Easy",
    meals: "Breakfast",
  },
  STAY_ESSAOUIRA: {
    imageUrl: "https://res.cloudinary.com/drstfu5yr/image/upload/v1766356531/ARRIVAL_STANDARD-Morocco_gbtt25.png",
    activities: "Relaxation",
    difficulty: "Easy",
    meals: "Breakfast",
  },
};

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Check for admin preview mode
    const { searchParams } = new URL(request.url);
    const preview = searchParams.get("preview") === "true";
    
    // Helper to check published status
    const isPublished = (value: any): boolean => {
      if (value === true || value === 1) return true;
      const str = String(value || "").toUpperCase().trim();
      return str === "TRUE" || str === "YES" || str === "1";
    };
    
    // Get all tours from Fab Morocco
    const tours = await getSheetData("Tours");
    const tour = tours.find((t: any) => t.slug === slug);
    
    if (!tour) {
      return NextResponse.json(
        { success: false, error: "Tour not found" },
        { status: 404 }
      );
    }
    
    // Block unpublished tours unless in preview mode
    if (!isPublished(tour.published) && !preview) {
      return NextResponse.json(
        { success: false, error: "Tour not found" },
        { status: 404 }
      );
    }
    
    // Get simplified itinerary (tour_id, day_number, route_id)
    const allItinerary = await getSheetData("Tour_Itinerary");
    const tourDays = allItinerary
      .filter((day: any) => day.tour_id === tour.tour_id)
      .sort((a: any, b: any) => parseInt(a.day_number) - parseInt(b.day_number));
    
    // Get Content Library from Slow Morocco (single source of truth)
    const contentLibrary = await getSlowMoroccoData("Content_Library");
    
    // Build lookup map for route content
    const routeMap: Record<string, any> = {};
    contentLibrary.forEach((route: any) => {
      if (route.Route_ID) {
        routeMap[route.Route_ID] = route;
      }
    });
    
    // Merge itinerary with route content
    const tourItinerary = tourDays.map((day: any) => {
      const routeId = day.route_id || "";
      const route = routeMap[routeId];
      
      // Handle STAY days (no route content)
      if (routeId.startsWith("STAY_")) {
        const stayContent = STAY_CONTENT[routeId] || STAY_CONTENT.STAY_MERZOUGA;
        const cityName = routeId.replace("STAY_", "");
        return {
          dayNumber: parseInt(day.day_number) || 1,
          title: day.day_title || cityName,
          fromCity: cityName,
          toCity: cityName,
          cityName: cityName,
          description: day.override_description || `Full day in ${cityName}.`,
          drivingHours: 0,
          meals: stayContent.meals,
          accommodation: `${cityName} Hotel`,
          imageUrl: stayContent.imageUrl,
          activities: stayContent.activities,
          difficulty: day.override_difficulty || stayContent.difficulty,
        };
      }
      
      // Handle ARRIVAL/DEPARTURE
      if (routeId === "ARRIVAL_STANDARD" || routeId === "DEPARTURE_STANDARD") {
        return {
          dayNumber: parseInt(day.day_number) || 1,
          title: day.day_title || (routeId === "ARRIVAL_STANDARD" ? "Arrival" : "Departure"),
          fromCity: "",
          toCity: "",
          cityName: day.day_title?.split(" ").pop() || "",
          description: day.override_description || "",
          drivingHours: 0,
          meals: "Breakfast",
          accommodation: "",
          imageUrl: route?.Image_URL_1 || "",
          activities: routeId === "ARRIVAL_STANDARD" ? "Arrival" : "Departure",
          difficulty: day.override_difficulty || "Easy",
        };
      }
      
      // Standard route from Content Library
      if (route) {
        return {
          dayNumber: parseInt(day.day_number) || 1,
          title: day.day_title || `${route.From_City} to ${route.To_City}`,
          fromCity: route.From_City || "",
          toCity: route.To_City || "",
          cityName: route.To_City || route.From_City || "",
          description: day.override_description || route.Route_Narrative || route.Route_Description || "",
          drivingHours: parseFloat(route.Travel_Time_Hours) || 0,
          meals: route.Meals || "Breakfast",
          accommodation: `${route.To_City} Hotel`,
          imageUrl: route.Image_URL_1 || "",
          activities: route.Activities || "Sightseeing",
          difficulty: day.override_difficulty || route.Difficulty_Level || "Easy",
        };
      }
      
      // Fallback if route not found
      return {
        dayNumber: parseInt(day.day_number) || 1,
        title: day.day_title || "",
        fromCity: "",
        toCity: "",
        cityName: "",
        description: day.override_description || "",
        drivingHours: 0,
        meals: "Breakfast",
        accommodation: "",
        imageUrl: "",
        activities: "Sightseeing",
        difficulty: day.override_difficulty || "Easy",
      };
    });
    
    // Transform tour data
    const tourData = {
      id: tour.tour_id || "",
      slug: tour.slug || "",
      title: tour.title || "",
      heroImage: tour.hero_image_url || "",
      description: tour.short_description || "",
      durationDays: parseInt(tour.duration_days) || 1,
      durationNights: parseInt(tour.duration_nights) || 0,
      priceUsd: parseInt(tour.price_usd) || 0,
      price: parseInt(tour.price_eur) || 0,
      startCity: tour.start_city || "Marrakech",
      endCity: tour.end_city || tour.start_city || "Marrakech",
      destinations: tour.destinations || "",
      highlights: tour.highlights ? tour.highlights.split("|").map((h: string) => h.trim()) : [],
      includes: tour.includes ? tour.includes.split("|").map((i: string) => i.trim()) : [],
      excludes: tour.excludes ? tour.excludes.split("|").map((e: string) => e.trim()) : [],
      category: tour.category || "Desert",
      featured: tour.featured === "TRUE" || tour.featured === true,
    };
    
    return NextResponse.json({
      success: true,
      tour: tourData,
      itinerary: tourItinerary,
    });
  } catch (error) {
    console.error("Error fetching tour:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tour" },
      { status: 500 }
    );
  }
}

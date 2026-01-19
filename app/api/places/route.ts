import { NextResponse } from "next/server";
import { getSlowMoroccoData, convertDriveUrl } from "@/lib/sheets";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Fetch from Slow Morocco database - places tab
    const placesData = await getSlowMoroccoData("places");
    
    // Filter published places, sort by order
    const places = placesData
      .filter((p: any) => {
        const pub = String(p.published || p.Published || "true").toLowerCase().trim();
        return pub === "true" || pub === "yes" || pub === "1";
      })
      .map((p: any) => ({
        slug: p.slug || p.Slug || "",
        title: p.title || p.Title || "",
        destination: p.destination || p.Destination || "",
        category: p.category || p.Category || "",
        heroImage: convertDriveUrl(p.heroImage || p.hero_image || p.HeroImage || p.image || ""),
        excerpt: p.excerpt || p.Excerpt || p.description || "",
        featured: String(p.featured || p.Featured || "false").toLowerCase() === "true",
        order: parseInt(p.order || p.Order) || 999,
      }))
      .sort((a: any, b: any) => a.order - b.order);

    return NextResponse.json({ 
      success: true,
      places 
    });
  } catch (error: any) {
    console.error("GET /api/places error:", error);
    return NextResponse.json(
      { success: false, error: error.message, places: [] },
      { status: 500 }
    );
  }
}

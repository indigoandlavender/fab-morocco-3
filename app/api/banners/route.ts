import { NextResponse } from "next/server";
import { getSheetData } from "@/lib/sheets";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get("page");
    
    // Fetch from Page_Banners tab
    const banners = await getSheetData("Page_Banners");
    
    console.log("Banners API - Raw data sample:", banners[0]);
    
    if (pageSlug) {
      // Return specific page banner
      const banner = banners.find(
        (b: any) => {
          const slug = (b.page_slug || b.page || b.pageSlug || b.Page || b.slug || "").toLowerCase().trim();
          return slug === pageSlug.toLowerCase();
        }
      );
      
      console.log(`Banners API - Looking for "${pageSlug}", found:`, banner);
      
      if (banner) {
        // Try multiple column name variations
        const heroImage = banner.hero_image_url || banner.hero_image || 
                         banner.heroImage || banner.image || 
                         banner.Image || banner.hero || banner.Hero ||
                         banner.image_url || banner.imageUrl || "";
        
        return NextResponse.json({
          success: true,
          banner: {
            pageSlug: banner.page_slug || banner.page || banner.pageSlug || "",
            heroImage: heroImage,
            title: banner.title || banner.Title || "",
            subtitle: banner.subtitle || banner.Subtitle || banner.description || "",
            labelText: banner.label_text || banner.labelText || banner.label || "",
          },
        });
      }
      
      return NextResponse.json({
        success: false,
        banner: null,
      });
    }
    
    // Return all banners
    const formattedBanners = banners.map((b: any) => {
      const heroImage = b.hero_image_url || b.hero_image || 
                       b.heroImage || b.image || 
                       b.Image || b.hero || b.Hero ||
                       b.image_url || b.imageUrl || "";
      return {
        pageSlug: b.page_slug || b.page || b.pageSlug || "",
        heroImage: heroImage,
        title: b.title || b.Title || "",
        subtitle: b.subtitle || b.Subtitle || b.description || "",
        labelText: b.label_text || b.labelText || b.label || "",
      };
    });

    return NextResponse.json({
      success: true,
      banners: formattedBanners,
    });
  } catch (error: any) {
    console.error("Banners fetch error:", error);
    return NextResponse.json(
      { success: false, banners: [], error: error.message },
      { status: 500 }
    );
  }
}

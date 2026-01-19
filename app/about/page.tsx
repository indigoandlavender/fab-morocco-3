import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getSheetData } from "@/lib/sheets";
import { Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Fab Morocco",
  description: "Private journeys through Morocco, guided by a philosophy of hospitality. Unhurried days, trusted guides, and travel as it should feel. Since 2010.",
  openGraph: {
    title: "About Fab Morocco",
    description: "Private journeys through Morocco, guided by a philosophy of hospitality. Since 2010.",
    url: "https://fabmorocco.com/about",
  },
  alternates: {
    canonical: "https://fabmorocco.com/about",
  },
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  rating: number;
}

interface Banner {
  heroImage: string;
  title: string;
  subtitle: string;
  labelText: string;
}

async function getAboutContent() {
  try {
    const settingsData = await getSheetData("Website_Settings");
    const settings: { [key: string]: string } = {};
    settingsData.forEach((row: any) => {
      if (row.Key) settings[row.Key] = row.Value || "";
    });

    // Fetch banner
    let banner: Banner | null = null;
    try {
      const bannersData = await getSheetData("Page_Banners");
      console.log("Page_Banners raw data:", JSON.stringify(bannersData, null, 2));
      
      const aboutBanner = bannersData.find(
        (b: any) => {
          const slug = (b.page_slug || b.page || b.pageSlug || b.Page || b.slug || "").toLowerCase().trim();
          return slug === "about";
        }
      );
      
      console.log("About banner found:", JSON.stringify(aboutBanner, null, 2));
      
      if (aboutBanner) {
        // Try multiple possible column names for the image
        const heroImage = aboutBanner.hero_image_url || aboutBanner.hero_image || 
                         aboutBanner.heroImage || aboutBanner.image || 
                         aboutBanner.Image || aboutBanner.hero || aboutBanner.Hero ||
                         aboutBanner.image_url || aboutBanner.imageUrl || "";
        
        console.log("Hero image URL found:", heroImage);
        
        if (heroImage) {
          banner = {
            heroImage: heroImage,
            title: aboutBanner.title || aboutBanner.Title || "",
            subtitle: aboutBanner.subtitle || aboutBanner.Subtitle || aboutBanner.description || "",
            labelText: aboutBanner.label_text || aboutBanner.labelText || aboutBanner.label || "",
          };
          console.log("Final banner object:", JSON.stringify(banner, null, 2));
        } else {
          console.log("No heroImage found in aboutBanner. Keys available:", Object.keys(aboutBanner));
        }
      } else {
        console.log("No about banner found. Available slugs:", bannersData.map((b: any) => b.page_slug || b.page || "unknown"));
      }
    } catch (e) {
      console.warn("Could not fetch banner:", e);
    }

    // Fetch testimonials
    let testimonials: Testimonial[] = [];
    try {
      const testimonialsData = await getSheetData("Website_Testimonials");
      testimonials = testimonialsData
        .filter((t: any) => {
          const pub = String(t.Published || t.published || "true").toLowerCase().trim();
          return pub === "true" || pub === "yes" || pub === "1";
        })
        .slice(0, 6)
        .map((t: any) => ({
          quote: t.Quote || t.quote || "",
          author: t.Author || t.author || t.Name || t.name || "",
          location: t.Location || t.location || "",
          rating: parseInt(t.Rating || t.rating) || 5,
        }));
    } catch (e) {
      console.warn("Could not fetch testimonials:", e);
    }

    return {
      testimonials,
      banner,
      settings: {
        hero_title: settings.about_hero_title || "About",
        hero_subtitle: settings.about_hero_subtitle || "A philosophy of hospitality, since 2010",
      },
    };
  } catch (error) {
    console.error("Error fetching about content:", error);
    return {
      testimonials: [],
      banner: null,
      settings: {
        hero_title: "About",
        hero_subtitle: "A philosophy of hospitality, since 2010",
      },
    };
  }
}

export default async function AboutPage() {
  const { testimonials, banner, settings } = await getAboutContent();

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      {banner?.heroImage ? (
        <section className="relative h-[60vh] min-h-[450px] bg-sand">
          <Image
            src={banner.heroImage}
            alt="About Fab Morocco"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-6 lg:px-16 pb-10 md:pb-14">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-3">
                {banner.labelText || "Fab Morocco"}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] font-serif text-white mb-3">
                {banner.title || "About"}
              </h1>
              {banner.subtitle && (
                <p className="text-sm text-white/70 max-w-lg">
                  {banner.subtitle}
                </p>
              )}
            </div>
          </div>
        </section>
      ) : (
        /* Fallback Hero */
        <section className="pt-24 pb-10 md:pt-32 md:pb-12">
          <div className="container mx-auto px-6 lg:px-16">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-3">
              Fab Morocco
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] font-serif mb-4">
              {settings.hero_title}
            </h1>
            <p className="text-sm text-foreground/60 max-w-lg">
              {settings.hero_subtitle}
            </p>
          </div>
        </section>
      )}

      {/* Our Approach */}
      <section className="py-16 md:py-24 border-t border-foreground/10">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto items-center">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-3">
                Our Approach
              </p>
              <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-6">
                Travel as it should feel
              </h2>
              <div className="space-y-4 text-sm text-foreground/60 leading-relaxed">
                <p>
                  In Morocco, hospitality isn't a service—it's a way of being. A guest is sacred. 
                  You offer tea before business, conversation before directions, time before efficiency.
                </p>
                <p>
                  We carry that into how we work. Private journeys, unhurried days, and guides who 
                  treat your trip as if you were visiting their own family. Because in a sense, you are.
                </p>
                <p>
                  Since 2010, we've welcomed travelers who want to feel the country rather than 
                  just see it. No rush. No crowds. Just Morocco, at its own pace.
                </p>
              </div>
            </div>

            {/* Mohammed's photo - trust signal */}
            <div className="relative aspect-[4/5] bg-sand overflow-hidden">
              <Image
                src="/team/Mohammed.jpg"
                alt="Mohammed - Fab Morocco team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 md:py-24 bg-sand">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-3">
              How We Work
            </p>
            <h2 className="font-serif text-2xl md:text-3xl mb-3">
              Simple things, done well
            </h2>
            <p className="text-sm text-foreground/50">
              The details that make a journey feel like yours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-foreground/40 text-[10px]">1</span>
              </div>
              <div>
                <h3 className="font-serif text-lg mb-1">Your own guide</h3>
                <p className="text-xs text-foreground/50">
                  One driver, one vehicle, one relationship. Someone who learns what you like and adjusts along the way.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-foreground/40 text-[10px]">2</span>
              </div>
              <div>
                <h3 className="font-serif text-lg mb-1">Room to breathe</h3>
                <p className="text-xs text-foreground/50">
                  Itineraries with built-in flexibility. Linger where you love it, skip what doesn't call to you.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-foreground/40 text-[10px]">3</span>
              </div>
              <div>
                <h3 className="font-serif text-lg mb-1">Places we trust</h3>
                <p className="text-xs text-foreground/50">
                  Riads and hotels where we'd send our own family. Chosen for warmth, not star ratings.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-foreground/40 text-[10px]">4</span>
              </div>
              <div>
                <h3 className="font-serif text-lg mb-1">Always reachable</h3>
                <p className="text-xs text-foreground/50">
                  One WhatsApp number from first inquiry to final goodbye. Questions answered, not deflected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-3">
                  From Our Guests
                </p>
                <h2 className="font-serif text-2xl md:text-3xl">
                  In their words
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-sand p-6 flex flex-col"
                  >
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-foreground/60 leading-relaxed mb-4 flex-grow">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="text-xs font-medium">{testimonial.author}</p>
                      {testimonial.location && (
                        <p className="text-[10px] text-foreground/40">{testimonial.location}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Bar */}
      <section className="py-10 bg-[#2C2925] text-white">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-serif mb-1 text-white">15+</p>
              <p className="text-[10px] tracking-[0.15em] uppercase text-white/50">Years</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-serif mb-1 text-white">2000+</p>
              <p className="text-[10px] tracking-[0.15em] uppercase text-white/50">Travelers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-serif mb-1 text-white">4.9</p>
              <p className="text-[10px] tracking-[0.15em] uppercase text-white/50">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-serif mb-1 text-white">100%</p>
              <p className="text-[10px] tracking-[0.15em] uppercase text-white/50">Private</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-xl text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Let's start a conversation
          </h2>
          <p className="text-sm text-foreground/50 leading-relaxed mb-8">
            Tell us what you're hoping for. We'll take it from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tours"
              className="inline-block bg-foreground text-background px-8 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-foreground/80 transition-colors"
            >
              Browse Tours
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-foreground/30 text-foreground px-8 py-3 text-[10px] tracking-[0.2em] uppercase hover:border-foreground/60 transition-colors"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the map to avoid SSR issues
const PlacesMap = dynamic(() => import("@/components/PlacesMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] bg-sand flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
    </div>
  ),
});

interface Place {
  slug: string;
  title: string;
  destination: string;
  category: string;
  heroImage: string;
  excerpt: string;
  featured: boolean;
}

// Region definitions with display names
const regions = [
  { slug: "all", label: "All" },
  { slug: "cities", label: "Cities" },
  { slug: "desert", label: "Desert" },
  { slug: "mountains", label: "Mountains" },
  { slug: "coast", label: "Coast" },
  { slug: "kasbahs", label: "Kasbahs" },
];

// Map destinations to region categories
function getRegionCategory(destination: string): string {
  const dest = destination?.toLowerCase() || "";

  if (dest.includes("marrakech") || dest.includes("fes") || dest.includes("fez") ||
      dest.includes("casablanca") || dest.includes("rabat") || dest.includes("tangier") ||
      dest.includes("meknes") || dest.includes("chefchaouen")) {
    return "cities";
  }
  if (dest.includes("sahara") || dest.includes("merzouga") || dest.includes("erg") ||
      dest.includes("zagora") || dest.includes("desert")) {
    return "desert";
  }
  if (dest.includes("atlas") || dest.includes("imlil") || dest.includes("toubkal") ||
      dest.includes("rif") || dest.includes("mountain")) {
    return "mountains";
  }
  if (dest.includes("essaouira") || dest.includes("agadir") || dest.includes("coast") ||
      dest.includes("beach") || dest.includes("atlantic")) {
    return "coast";
  }
  if (dest.includes("ouarzazate") || dest.includes("ait ben") || dest.includes("kasbah") ||
      dest.includes("draa") || dest.includes("dades") || dest.includes("todra")) {
    return "kasbahs";
  }
  return "cities"; // Default
}

export default function PlacesPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [banner, setBanner] = useState<{ heroImage: string; title: string; subtitle: string; labelText: string } | null>(null);

  useEffect(() => {
    // Fetch banner
    fetch("/api/banners?page=places")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.banner) {
          setBanner(data.banner);
        }
      })
      .catch(() => {});

    fetch("/api/places")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setPlaces(data.places || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Filter places by selected region
  const filteredPlaces = useMemo(() => {
    if (selectedRegion === "all") return places;
    return places.filter((p) => getRegionCategory(p.destination) === selectedRegion);
  }, [places, selectedRegion]);

  // Group places by region for "All" view
  const placesByRegion = useMemo(() => {
    const grouped: Record<string, Place[]> = {};
    regions.slice(1).forEach((r) => {
      grouped[r.slug] = places.filter((p) => getRegionCategory(p.destination) === r.slug);
    });
    return grouped;
  }, [places]);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      {banner?.heroImage && (
        <section className="relative h-[60vh] min-h-[450px] bg-sand">
          <Image
            src={banner.heroImage}
            alt="Places"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-6 lg:px-16 pb-10 md:pb-14">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-3">
                {banner.labelText || "Explore Morocco"}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] font-serif text-white mb-3">
                {banner.title || "Places"}
              </h1>
              {banner.subtitle && (
                <p className="text-sm text-white/70 max-w-lg">
                  {banner.subtitle}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Hero Header (fallback when no banner) */}
      {!banner?.heroImage && (
        <section className="pt-28 pb-8 md:pt-36 md:pb-12">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="max-w-3xl">
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-3">
                Explore Morocco
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-serif mb-4">
                Places
              </h1>
              <p className="text-lg text-foreground/70 max-w-xl">
                From ancient medinas to Sahara dunes. Discover the destinations that make Morocco unforgettable.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Region Tabs - Horizontal scrollable */}
      <section className="border-b border-border sticky top-16 z-40 bg-background">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {regions.map((region) => (
              <button
                key={region.slug}
                onClick={() => setSelectedRegion(region.slug)}
                className={`px-5 py-2 text-xs tracking-[0.1em] uppercase whitespace-nowrap transition-all ${
                  selectedRegion === region.slug
                    ? "bg-foreground text-background"
                    : "bg-transparent text-foreground/60 hover:text-foreground hover:bg-sand"
                }`}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 lg:px-16">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
            </div>
          ) : selectedRegion === "all" ? (
            /* Grouped by Region View */
            <div className="space-y-16">
              {regions.slice(1).map((region) => {
                const regionPlaces = placesByRegion[region.slug] || [];
                if (regionPlaces.length === 0) return null;

                return (
                  <div key={region.slug}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-serif text-2xl md:text-3xl">{region.label}</h2>
                      <button
                        onClick={() => setSelectedRegion(region.slug)}
                        className="text-xs tracking-[0.1em] uppercase text-foreground/50 hover:text-foreground transition-colors"
                      >
                        View All →
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
                      {regionPlaces.slice(0, 5).map((place) => (
                        <PlaceCard key={place.slug} place={place} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Filtered View */
            <>
              <div className="mb-8">
                <p className="text-sm text-foreground/50">
                  {filteredPlaces.length} {filteredPlaces.length === 1 ? "place" : "places"}
                </p>
              </div>
              {filteredPlaces.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-foreground/50 mb-4">No places in this region yet.</p>
                  <button
                    onClick={() => setSelectedRegion("all")}
                    className="underline hover:no-underline"
                  >
                    View all places
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {filteredPlaces.map((place) => (
                    <PlaceCard key={place.slug} place={place} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16 bg-sand">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-8">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-3">
              Explore the Map
            </p>
            <h2 className="font-serif text-2xl md:text-3xl">
              Where will Morocco take you?
            </h2>
          </div>
          <PlacesMap places={places} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-16 max-w-2xl text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Want to visit these places?
          </h2>
          <p className="text-foreground/70 leading-relaxed mb-8">
            Our tours include Morocco's most iconic destinations.
            Tell us which places you want to see and we'll build your perfect itinerary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="inline-block bg-foreground text-background px-8 py-4 text-xs uppercase tracking-wider hover:bg-foreground/90 transition-colors"
            >
              Browse Tours
            </Link>
            <Link
              href="/tours"
              className="inline-block border border-foreground px-8 py-4 text-xs uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
            >
              Request Custom Tour
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Place Card Component
function PlaceCard({ place }: { place: Place }) {
  return (
    <Link href={`/places/${place.slug}`} className="group">
      {/* Tall vertical image */}
      <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-sand">
        {place.heroImage ? (
          <Image
            src={place.heroImage}
            alt={place.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-foreground/20" />
          </div>
        )}
      </div>
      {/* Content */}
      <div>
        <p className="text-[10px] text-foreground/50 uppercase tracking-[0.15em] mb-1">
          {place.destination}
        </p>
        <h3 className="font-serif text-base md:text-lg group-hover:opacity-60 transition-opacity">
          {place.title}
        </h3>
      </div>
    </Link>
  );
}

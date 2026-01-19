"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MoroccoMapWrapper from "@/components/MoroccoMapWrapper";

interface Region {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
}

interface Destination {
  slug: string;
  title: string;
  subtitle: string;
  region: string;
  heroImage: string;
  excerpt: string;
}

interface Place {
  slug: string;
  title: string;
  destination: string;
  category: string;
  heroImage: string;
  excerpt: string;
}

export default function PlacesContent() {
  const searchParams = useSearchParams();
  const regionParam = searchParams.get("region");
  
  const [regions, setRegions] = useState<Region[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states - initialize from URL param if present
  const [selectedRegion, setSelectedRegion] = useState<string>(regionParam || "all");
  const [selectedDestination, setSelectedDestination] = useState<string>("all");

  // Update region when URL param changes
  useEffect(() => {
    if (regionParam) {
      setSelectedRegion(regionParam);
      setSelectedDestination("all");
    }
  }, [regionParam]);

  useEffect(() => {
    Promise.all([
      fetch("/api/regions").then((r) => r.json()),
      fetch("/api/destinations").then((r) => r.json()),
      fetch("/api/places").then((r) => r.json()),
    ])
      .then(([regionsData, destinationsData, placesData]) => {
        setRegions(regionsData.regions || []);
        setDestinations(destinationsData.destinations || []);
        setPlaces(placesData.places || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter destinations based on selected region
  const filteredDestinations = selectedRegion === "all"
    ? destinations
    : destinations.filter((d) => d.region.includes(selectedRegion));

  // Filter places based on selected destination (or region if no destination selected)
  const filteredPlaces = (() => {
    if (selectedDestination !== "all") {
      return places.filter((p) => p.destination === selectedDestination);
    }
    if (selectedRegion !== "all") {
      const destSlugs = filteredDestinations.map((d) => d.slug);
      return places.filter((p) => destSlugs.includes(p.destination));
    }
    return places;
  })();

  // Reset destination when region changes
  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setSelectedDestination("all");
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-4xl">
            <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-6">
              Slow Morocco
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-[0.15em] font-light mb-6">
              P L A C E S
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl">
              The villages, valleys, and hidden corners that make Morocco worth slowing down for.
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {places.length > 0 && (
        <section className="pb-12">
          <div className="container mx-auto px-6 lg:px-16">
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
              Discover Morocco
            </p>
            <MoroccoMapWrapper 
              stories={places.map(p => ({
                slug: `places/${p.slug}`,
                title: p.title,
                subtitle: p.excerpt,
                category: p.category,
                region: destinations.find(d => d.slug === p.destination)?.title || p.destination,
              }))} 
            />
          </div>
        </section>
      )}

      {/* Region Cards */}
      <section className="py-12 border-y border-white/10">
        <div className="container mx-auto px-6 lg:px-16">
          <h2 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-6 text-center">
            Explore by Region
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regions.map((region) => (
              <button
                key={region.slug}
                onClick={() => handleRegionChange(region.slug === selectedRegion ? "all" : region.slug)}
                className={`relative aspect-[4/3] overflow-hidden group ${
                  selectedRegion === region.slug ? "ring-2 ring-white" : ""
                }`}
              >
                {region.heroImage ? (
                  <Image
                    src={region.heroImage}
                    alt={region.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-white/5" />
                )}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="font-serif text-lg md:text-xl">{region.title}</span>
                  <span className="text-xs text-white/60 mt-1 hidden md:block">{region.subtitle}</span>
                </div>
                {selectedRegion === region.slug && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0a0a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Filter */}
      {filteredDestinations.length > 0 && (
        <section className="py-8 border-b border-white/10">
          <div className="container mx-auto px-6 lg:px-16">
            <h2 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-4 text-center">
              {selectedRegion === "all" ? "All Destinations" : `Destinations in ${regions.find(r => r.slug === selectedRegion)?.title || selectedRegion}`}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setSelectedDestination("all")}
                className={`text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-colors ${
                  selectedDestination === "all"
                    ? "bg-white text-[#0a0a0a] border-white"
                    : "bg-transparent text-white/60 border-white/20 hover:border-white/40"
                }`}
              >
                All
              </button>
              {filteredDestinations.map((dest) => (
                <button
                  key={dest.slug}
                  onClick={() => setSelectedDestination(dest.slug === selectedDestination ? "all" : dest.slug)}
                  className={`text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-colors ${
                    selectedDestination === dest.slug
                      ? "bg-white text-[#0a0a0a] border-white"
                      : "bg-transparent text-white/60 border-white/20 hover:border-white/40"
                  }`}
                >
                  {dest.title}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Places Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-16">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          ) : filteredPlaces.length > 0 ? (
            <>
              <p className="text-sm text-white/40 mb-8">
                {filteredPlaces.length} {filteredPlaces.length === 1 ? "place" : "places"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlaces.map((place) => {
                  const dest = destinations.find((d) => d.slug === place.destination);
                  return (
                    <Link
                      key={place.slug}
                      href={`/places/${place.slug}`}
                      className="group"
                    >
                      <div className="relative aspect-[4/3] mb-4 overflow-hidden bg-white/5">
                        {place.heroImage && (
                          <Image
                            src={place.heroImage}
                            alt={place.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        )}
                      </div>
                      <p className="text-xs tracking-[0.15em] uppercase text-white/40 mb-1">
                        {dest?.title || place.destination}
                      </p>
                      <h2 className="font-serif text-xl text-white/90 mb-2 group-hover:text-white transition-colors">
                        {place.title}
                      </h2>
                      <p className="text-sm text-white/50 line-clamp-2">
                        {place.excerpt}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/50">No places found for this selection.</p>
              <button
                onClick={() => {
                  setSelectedRegion("all");
                  setSelectedDestination("all");
                }}
                className="mt-4 text-sm text-white/40 hover:text-white underline transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

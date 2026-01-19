"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MoroccoMapWrapper from "@/components/MoroccoMapWrapper";

interface DayTrip {
  slug: string;
  title: string;
  shortDescription: string;
  durationHours: number;
  priceMAD: number;
  priceEUR: number;
  category: string;
  heroImage: string;
  region?: string;
}

export default function DayTripsPage() {
  const [dayTrips, setDayTrips] = useState<DayTrip[]>([]);
  const [heroImage, setHeroImage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/day-trips")
      .then((r) => r.json())
      .then((data) => {
        setDayTrips(data.dayTrips || []);
        setHeroImage(data.heroImage || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Hero - Full viewport */}
      <section className="min-h-screen flex items-center justify-center relative">
        {heroImage && (
          <>
            <div className="absolute inset-0">
              <Image
                src={heroImage}
                alt="Day tours from Marrakech"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-black/50" />
          </>
        )}
        <div className="absolute inset-0 bg-[url('/images/texture-grain.png')] opacity-[0.03] pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-16 text-center max-w-4xl relative z-10">
          <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-8">
            From Marrakech
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-[0.15em] font-light mb-8">
            D A Y  T O U R S
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-serif italic max-w-2xl mx-auto">
            Leave in the morning, return by evening. Private car, the freedom to stop wherever something catches your eye.
          </p>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
        </div>
      </section>

      {/* Map Section */}
      {dayTrips.length > 0 && (
        <section className="py-16 border-t border-white/10">
          <div className="container mx-auto px-6 lg:px-16">
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
              Explore Destinations
            </p>
            <MoroccoMapWrapper 
              stories={dayTrips.map(trip => ({
                slug: `day-trips/${trip.slug}`,
                title: trip.title,
                subtitle: trip.shortDescription,
                category: trip.category,
                region: trip.region || trip.category,
              }))} 
            />
          </div>
        </section>
      )}

      {/* Day Trips Grid */}
      <section className="py-24 md:py-32 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-16">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border border-white/20 border-t-white/60 rounded-full animate-spin" />
            </div>
          ) : dayTrips.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/40">No day trips available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {dayTrips.map((trip) => (
                <Link
                  key={trip.slug}
                  href={`/day-trips/${trip.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-white/5">
                    {trip.heroImage && (
                      <Image
                        src={trip.heroImage}
                        alt={trip.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] tracking-[0.15em] uppercase bg-black/60 backdrop-blur-sm px-3 py-1.5 text-white/80">
                        {trip.category}
                      </span>
                    </div>
                  </div>
                  
                  <h2 className="font-serif text-xl md:text-2xl mb-3 text-white/90 group-hover:text-white/70 transition-colors">
                    {trip.title}
                  </h2>
                  
                  <div className="flex items-center gap-3 text-sm text-white/40 mb-4">
                    <span>{trip.durationHours} hours</span>
                    <span className="text-white/20">·</span>
                    <span>From €{trip.priceEUR}</span>
                  </div>
                  
                  <p className="text-white/50 text-sm leading-relaxed">
                    {trip.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* What's Included - Two columns */}
      <section className="border-t border-white/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Included - Dark */}
            <div className="py-20 md:py-28 px-6 lg:px-16 bg-[#0a0a0a]">
              <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">
                Every Day Tour Includes
              </p>
              <ul className="space-y-4">
                <li className="text-white/70 text-lg flex items-start gap-3">
                  <span className="text-white/30 mt-1">→</span>
                  <span>Private car (up to 3 guests)</span>
                </li>
                <li className="text-white/70 text-lg flex items-start gap-3">
                  <span className="text-white/30 mt-1">→</span>
                  <span>English-speaking driver</span>
                </li>
                <li className="text-white/70 text-lg flex items-start gap-3">
                  <span className="text-white/30 mt-1">→</span>
                  <span>Hotel pickup & drop-off in Marrakech</span>
                </li>
                <li className="text-white/70 text-lg flex items-start gap-3">
                  <span className="text-white/30 mt-1">→</span>
                  <span>All road fees and fuel</span>
                </li>
                <li className="text-white/70 text-lg flex items-start gap-3">
                  <span className="text-white/30 mt-1">→</span>
                  <span>Flexible stops for photos</span>
                </li>
              </ul>
            </div>
            
            {/* Not Included - Darker */}
            <div className="py-20 md:py-28 px-6 lg:px-16 bg-[#050505]">
              <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">
                Not Included
              </p>
              <ul className="space-y-4">
                <li className="text-white/40 text-lg flex items-start gap-3">
                  <span className="text-white/20 mt-1">×</span>
                  <span>Lunch (can be added)</span>
                </li>
                <li className="text-white/40 text-lg flex items-start gap-3">
                  <span className="text-white/20 mt-1">×</span>
                  <span>Entrance fees to sites</span>
                </li>
                <li className="text-white/40 text-lg flex items-start gap-3">
                  <span className="text-white/20 mt-1">×</span>
                  <span>Tips for driver</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 text-white/90">
            Not sure which tour?
          </h2>
          <p className="text-white/50 leading-relaxed mb-12 text-lg">
            Tell us what you're drawn to — mountains, villages, coast, craft — and we'll point you in the right direction.
          </p>
          <Link
            href="/contact"
            className="inline-block border border-white/20 px-12 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#0a0a0a] transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

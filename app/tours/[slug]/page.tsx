"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, ChevronLeft, ChevronRight, Check, Clock, Star, Users,
  MapPin, Calendar, Shield, X, Heart
} from "lucide-react";
import dynamic from "next/dynamic";
import TourBookingModal from "@/components/TourBookingModal";
import {
  IconClock,
  IconCamel,
  IconHiking,
  IconCooking,
  IconSpa,
  IconShopping,
  IconCamera,
  IconMeals,
  IconMountains,
  IconDesert,
  IconMedina,
  Icon4x4,
  IconStar,
} from "@/components/icons";

// Map activity keywords to icons
const getActivityIcon = (activity: string) => {
  const lower = activity.toLowerCase();
  if (lower.includes("camel")) return <IconCamel size={18} />;
  if (lower.includes("hik") || lower.includes("trek")) return <IconHiking size={18} />;
  if (lower.includes("cook") || lower.includes("tagine")) return <IconCooking size={18} />;
  if (lower.includes("hammam") || lower.includes("spa")) return <IconSpa size={18} />;
  if (lower.includes("souk") || lower.includes("shop")) return <IconShopping size={18} />;
  if (lower.includes("photo")) return <IconCamera size={18} />;
  if (lower.includes("mountain") || lower.includes("atlas")) return <IconMountains size={18} />;
  if (lower.includes("desert") || lower.includes("dune") || lower.includes("sahara")) return <IconDesert size={18} />;
  if (lower.includes("medina") || lower.includes("old town")) return <IconMedina size={18} />;
  if (lower.includes("4x4") || lower.includes("off-road")) return <Icon4x4 size={18} />;
  return <IconStar size={18} />;
};

const ItineraryMap = dynamic(() => import("@/components/ItineraryMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] md:h-[400px] bg-sand flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
    </div>
  ),
});

interface Tour {
  id: string;
  slug: string;
  title: string;
  heroImage: string;
  description: string;
  durationDays: number;
  durationNights: number;
  priceUsd: number;
  price: number;
  startCity: string;
  endCity: string;
  destinations: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  category: string;
  featured: boolean;
}

interface ItineraryDay {
  dayNumber: number;
  title: string;
  fromCity: string;
  toCity: string;
  cityName: string;
  description: string;
  imageUrl: string;
  drivingHours: number;
  meals: string;
  accommodation: string;
  activities: string;
  difficulty: string;
}

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// Related Tours Carousel
function RelatedTours({ currentSlug }: { currentSlug: string }) {
  const [tours, setTours] = useState<any[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/tours")
      .then((r) => r.json())
      .then((data) => {
        const otherTours = (data || []).filter(
          (t: any) => t.slug !== currentSlug
        );
        setTours(otherTours.slice(0, 6));
      })
      .catch(console.error);
  }, [currentSlug]);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = direction === "left" ? -320 : 320;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  if (tours.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-background border border-border hover:bg-muted transition-colors hidden md:flex items-center justify-center"
        aria-label="Previous tours"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {tours.map((tour) => (
          <Link
            key={tour.slug}
            href={`/tours/${tour.slug}`}
            className="group flex-shrink-0 w-[280px]"
          >
            <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-sand">
              {tour.heroImage && (
                <Image
                  src={tour.heroImage}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}
            </div>
            <div className="flex items-baseline justify-between mb-1">
              <p className="text-xs text-muted-foreground">
                {tour.durationDays} {tour.durationDays === 1 ? "Day" : "Days"}
              </p>
              {tour.price && (
                <p className="text-sm">
                  From <span className="font-medium">€{tour.price}</span>
                </p>
              )}
            </div>
            <h3 className="font-serif text-lg group-hover:opacity-60 transition-opacity">
              {tour.title}
            </h3>
          </Link>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-background border border-border hover:bg-muted transition-colors hidden md:flex items-center justify-center"
        aria-label="Next tours"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// Mobile Booking Bar
function MobileBookingBar({ price, onBook }: { price: number; onBook: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-foreground/10 p-3 lg:hidden z-50">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-lg font-serif">€{price}<span className="text-xs text-foreground/50 ml-1">/person</span></p>
          <p className="text-[10px] text-foreground/40">Based on 2 sharing</p>
        </div>
        <button
          onClick={onBook}
          className="bg-primary text-primary-foreground py-2.5 px-6 text-[11px] tracking-[0.1em] uppercase"
        >
          Book This Tour
        </button>
      </div>
    </div>
  );
}

export default function TourDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [tour, setTour] = useState<Tour | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/tours/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setTour(data.tour);
          setItinerary(data.itinerary || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="font-serif text-2xl mb-4">Tour not found</h1>
        <Link href="/tours" className="text-sm underline">
          Back to all tours
        </Link>
      </div>
    );
  }

  const price = Number(tour.price) || 0;

  // Use tour data from sheet, with fallbacks
  const inclusions = tour.includes && tour.includes.length > 0 
    ? tour.includes 
    : [
        "Private air-conditioned 4x4 vehicle",
        "English/French speaking driver-guide",
        "Accommodation in selected hotels/riads",
        "Daily breakfast included",
        "Desert camp experience with dinner",
        "Camel trek in the Sahara",
      ];

  const exclusions = tour.excludes && tour.excludes.length > 0 
    ? tour.excludes 
    : [
        "Flights to/from Morocco",
        "Travel insurance",
        "Lunches and dinners (except desert camp)",
        "Tips for guides and drivers",
        "Personal expenses",
      ];

  return (
    <div className="bg-background min-h-screen pb-20 lg:pb-0">
      {/* Hero Image */}
      <section className="relative h-[45vh] md:h-[50vh] bg-sand">
        {tour.heroImage && (
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Back Button */}
        <Link
          href="/tours"
          className="absolute top-24 left-6 lg:left-16 inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-[11px] tracking-[0.05em]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Tours
        </Link>
      </section>

      {/* Content */}
      <section className="py-10 md:py-12">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title & Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="flex items-center gap-1 text-[11px] text-foreground/50">
                  <Clock className="w-3 h-3" />
                  {tour.durationDays} {tour.durationDays === 1 ? "Day" : "Days"}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-foreground/50">
                  <MapPin className="w-3 h-3" />
                  From {tour.startCity || "Marrakech"}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-amber-600">
                  <Star className="w-3 h-3 fill-current" />
                  4.9 (47 reviews)
                </span>
              </div>

              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight mb-4">
                {tour.title}
              </h1>

              <p className="text-sm text-foreground/60 leading-relaxed mb-6">
                {tour.description}
              </p>

              {/* Quick Info Bar */}
              <div className="flex flex-wrap gap-4 p-3 bg-sand/50 mb-8">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Check className="w-3 h-3 text-foreground/40" />
                  <span>Private tour</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Check className="w-3 h-3 text-foreground/40" />
                  <span>Fully organized</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Shield className="w-3 h-3 text-foreground/40" />
                  <span>No hidden fees</span>
                </div>
              </div>

              {/* Route Map */}
              {itinerary.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-serif text-xl mb-4">Your Route</h2>
                  <ItineraryMap itinerary={itinerary} />
                </div>
              )}

              {/* Day by Day Itinerary */}
              {itinerary.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-serif text-2xl mb-8">Day by Day</h2>
                  <div className="space-y-16">
                    {itinerary
                      .sort((a, b) => a.dayNumber - b.dayNumber)
                      .map((day) => (
                        <div key={day.dayNumber}>
                          {/* Day Image */}
                          {day.imageUrl && (
                            <div 
                              className="relative aspect-[3/2] w-full max-w-2xl overflow-hidden mb-6 cursor-pointer"
                              onClick={() => {
                                setModalImage(day.imageUrl);
                                setShowImageModal(true);
                              }}
                            >
                              <Image
                                src={day.imageUrl}
                                alt={`Day ${day.dayNumber}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}

                          {/* Day Label */}
                          <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                            Day {day.dayNumber}
                          </p>

                          {/* Day Title */}
                          <h3 className="font-serif text-2xl mb-4">
                            {day.fromCity && day.toCity && day.fromCity !== day.toCity
                              ? `${day.fromCity} → ${day.toCity}`
                              : day.fromCity || day.toCity || `Day ${day.dayNumber}`
                            }
                          </h3>

                          {/* Day Metadata - Icons */}
                          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5 text-sm text-muted-foreground">
                            {/* Travel Time */}
                            {day.drivingHours > 0 && (
                              <div className="flex items-center gap-2">
                                <IconClock size={18} />
                                <span>{day.drivingHours}h drive</span>
                              </div>
                            )}
                            
                            {/* Activities */}
                            {day.activities && (
                              <div className="flex items-center gap-2">
                                {getActivityIcon(day.activities)}
                                <span className="capitalize">{day.activities.toLowerCase()}</span>
                              </div>
                            )}
                            
                            {/* Meals */}
                            {day.meals && (
                              <div className="flex items-center gap-2">
                                <IconMeals size={18} />
                                <span>{day.meals}</span>
                              </div>
                            )}

                            {/* Accommodation */}
                            {day.accommodation && day.accommodation !== 'End of tour' && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{day.accommodation}</span>
                              </div>
                            )}
                          </div>

                          {/* Day Description */}
                          <p className="text-muted-foreground leading-relaxed text-base">
                            {day.description}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* What's Included */}
              <div className="mb-12">
                <h2 className="font-serif text-2xl mb-6">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium mb-4 text-green-700">Included</h3>
                    <ul className="space-y-3">
                      {inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4 text-red-700">Not Included</h3>
                    <ul className="space-y-3">
                      {exclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Booking Widget (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-1 self-start">
              <div className="sticky top-24 bg-white border border-foreground/10 p-5">
                {/* Price */}
                <div className="mb-5 pb-5 border-b border-foreground/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-serif">€{price}</span>
                    <span className="text-xs text-foreground/50">/person</span>
                  </div>
                  <p className="text-[11px] text-foreground/40 mt-1">
                    Based on 2 travelers sharing
                  </p>
                </div>

                {/* Tour Info */}
                <div className="space-y-2.5 mb-5 pb-5 border-b border-foreground/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground/50">Duration</span>
                    <span>{tour.durationDays} days</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground/50">Start</span>
                    <span>{tour.startCity || "Marrakech"}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground/50">Tour type</span>
                    <span>Private</span>
                  </div>
                </div>

                {/* Primary CTA - Book Now */}
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="block w-full bg-primary text-primary-foreground text-center py-3 text-[11px] tracking-[0.1em] uppercase hover:opacity-90 transition-opacity mb-2.5"
                >
                  Book This Tour
                </button>

                {/* Secondary - Request Changes */}
                <a
                  href={`https://wa.me/212618070450?text=Hi!%20I'd%20like%20to%20request%20changes%20to%20the%20${encodeURIComponent(tour.title)}%20tour`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-foreground/15 text-foreground py-2.5 text-[11px] tracking-[0.05em] hover:border-foreground/30 transition-colors mb-4"
                >
                  Request Changes
                </a>

                {/* Trust Signals */}
                <div className="mt-5 pt-5 border-t border-foreground/10 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-foreground/50">
                    <Check className="w-3 h-3 text-foreground/40" />
                    30% deposit to secure dates
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-foreground/50">
                    <Shield className="w-3 h-3 text-foreground/40" />
                    Clear pricing, no hidden fees
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-foreground/50">
                    <Users className="w-3 h-3 text-foreground/40" />
                    100% private (your group only)
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-foreground/50">
                    <Calendar className="w-3 h-3 text-foreground/40" />
                    Everything confirmed in advance
                  </div>
                </div>

                {/* Booking Conditions Link */}
                <div className="mt-4 pt-4 border-t border-foreground/10">
                  <Link 
                    href="/booking-conditions" 
                    className="text-[10px] text-foreground/40 hover:text-foreground/60 transition-colors"
                  >
                    View booking conditions & payment terms →
                  </Link>
                </div>

                {/* Sahara Children Commitment */}
                {tour.category?.toLowerCase().includes('desert') && (
                  <div className="mt-4 p-4 bg-sand">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-foreground/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-4 h-4 text-foreground/60" />
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1">Supporting Sahara Families</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          A portion of this tour supports nomadic children in the desert.
                        </p>
                        <Link href="/sahara-children" className="text-xs text-foreground/60 hover:text-foreground underline mt-1 inline-block">
                          Learn more
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tours */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container mx-auto px-6 lg:px-16">
          <h2 className="font-serif text-2xl mb-8">You might also like</h2>
          <RelatedTours currentSlug={slug} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 md:py-16 bg-[#2C2925] text-white">
        <div className="container mx-auto px-6 lg:px-16 max-w-xl text-center">
          <h2 className="font-serif text-xl md:text-2xl mb-3">
            Ready to book?
          </h2>
          <p className="text-sm text-white/60 leading-relaxed mb-6">
            Book this tour as-is, or request changes and we'll confirm if it's included or quote extra.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setShowBookingModal(true)}
              className="inline-block bg-white text-foreground px-6 py-2.5 text-[10px] tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
            >
              Book This Tour
            </button>
            <a
              href={`https://wa.me/212618070450?text=Hi!%20I'd%20like%20to%20request%20changes%20to%20the%20${encodeURIComponent(tour.title)}%20tour`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white/30 text-white px-6 py-2.5 text-[10px] tracking-[0.15em] uppercase hover:border-white/60 transition-colors"
            >
              Request Changes
            </a>
          </div>
          <p className="text-[11px] text-white/40 mt-5">
            Need something completely different?{" "}
            <Link href="/bespoke" className="underline hover:no-underline">
              Build a bespoke itinerary
            </Link>
          </p>
        </div>
      </section>

      {/* Mobile Booking Bar */}
      <MobileBookingBar price={price} onBook={() => setShowBookingModal(true)} />

      {/* Tour Booking Modal */}
      <TourBookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        tour={{
          slug: tour.slug,
          title: tour.title,
          price: price,
        }}
      />

      {/* Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-4xl aspect-[4/3]">
            <Image
              src={modalImage}
              alt="Tour image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

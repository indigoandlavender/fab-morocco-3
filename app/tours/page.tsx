"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Star, Check, Phone, MessageCircle, ChevronDown, Heart } from "lucide-react";

// Tour type definition
interface Tour {
  id: string;
  slug: string;
  title: string;
  heroImage: string;
  description: string;
  durationDays: number;
  durationNights: number;
  priceUsd: number;
  price: number; // EUR
  startCity: string;
  endCity: string;
  destinations: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  category: string;
  featured: boolean;
}

const durations = [
  { slug: "all", label: "All Durations" },
  { slug: "1-4", label: "1-4 Days" },
  { slug: "5-8", label: "5-8 Days" },
  { slug: "9+", label: "9+ Days" },
];

const categories = [
  { slug: "all", label: "All Types" },
  { slug: "desert", label: "Desert" },
  { slug: "classic", label: "Classic" },
  { slug: "grand", label: "Grand" },
];

const startCities = [
  { slug: "all", label: "All Cities" },
  { slug: "marrakech", label: "Marrakech" },
  { slug: "fes", label: "Fes" },
  { slug: "casablanca", label: "Casablanca" },
];

// WhatsApp Icon Component
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<{ heroImage: string; title: string; subtitle: string; labelText: string } | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStartCity, setSelectedStartCity] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    // Fetch banner
    fetch("/api/banners?page=tours")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.banner) {
          setBanner(data.banner);
        }
      })
      .catch(() => {});

    fetch("/api/tours")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTours(data);
          setFilteredTours(data);
        }
        setLoading(false);
      })
      .catch(() => {
        // On error, show empty state
        setTours([]);
        setFilteredTours([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...tours];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title?.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query) ||
          t.destinations?.toLowerCase().includes(query)
      );
    }

    if (selectedDuration !== "all") {
      filtered = filtered.filter((t) => {
        const days = t.durationDays || 0;
        if (selectedDuration === "1-3") return days >= 1 && days <= 3;
        if (selectedDuration === "4-7") return days >= 4 && days <= 7;
        if (selectedDuration === "8+") return days >= 8;
        return true;
      });
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((t) =>
        t.category?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (selectedStartCity !== "all") {
      filtered = filtered.filter((t) =>
        t.startCity?.toLowerCase().includes(selectedStartCity.toLowerCase())
      );
    }

    setFilteredTours(filtered);
  }, [tours, searchQuery, selectedDuration, selectedCategory, selectedStartCity]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDuration("all");
    setSelectedCategory("all");
    setSelectedStartCity("all");
  };

  const hasActiveFilters = searchQuery || selectedDuration !== "all" || selectedCategory !== "all" || selectedStartCity !== "all";

  // Get category label for badge
  const getCategoryLabel = (category: string) => {
    if (!category) return null;
    const primary = category.split(",")[0].trim().toLowerCase();
    const found = categories.find((c) => c.slug.toLowerCase() === primary);
    return found?.label || primary.charAt(0).toUpperCase() + primary.slice(1);
  };

  const faqs = [
    {
      question: "Are these tours private?",
      answer: "Yes, 100%. Every tour is just you and your group with a dedicated driver-guide. No strangers, no fixed schedules."
    },
    {
      question: "Can I customize the itinerary?",
      answer: "Yes. Request changes and we'll let you know if it's included or quote extra. For something built completely from scratch, see our bespoke service."
    },
    {
      question: "What's included in the price?",
      answer: "Private vehicle, driver/guide, accommodation, daily breakfast, desert camp experience (where applicable), and all entrance fees. Lunches and dinners are at your expense to give you freedom to explore."
    },
    {
      question: "How do I book?",
      answer: "Send us a message on WhatsApp or fill out the booking form. We'll confirm availability, customize your trip, then secure your dates with a 30% deposit."
    },
    {
      question: "What's your cancellation policy?",
      answer: "Full refund if you cancel more than 30 days before departure. After that, refunds decrease on a sliding scale. We recommend travel insurance. See our booking conditions for full details."
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      {banner?.heroImage && (
        <section className="relative h-[60vh] min-h-[450px] bg-sand">
          <Image
            src={banner.heroImage}
            alt="Tours"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-6 lg:px-16 pb-10 md:pb-14">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-3">
                {banner.labelText || "Private Morocco Tours"}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] font-serif text-white mb-3">
                {banner.title || "Pick a Tour. Book Online."}
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
        <section className="pt-24 pb-10 md:pt-32 md:pb-12">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="max-w-2xl">
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-3">
                Private Morocco Tours
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] font-serif mb-4">
                Pick a Tour. Book Online.
              </h1>
              <p className="text-sm text-foreground/60 mb-5 max-w-lg">
                Fixed prices. Clear itineraries. Every tour is private—just you and your group. 
                Choose your dates and book directly.
              </p>
              
              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-5 text-[11px] text-foreground/50">
                <div className="flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-amber-500 fill-current" />
                  <span>4.9/5 from 200+ travelers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-foreground/40" />
                  <span>100% private tours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-foreground/40" />
                  <span>Clear pricing, no surprises</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust Signals (when banner exists) */}
      {banner?.heroImage && (
        <section className="py-4 bg-sand/30">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-[11px] text-foreground/50">
              <div className="flex items-center gap-1.5">
                <Star className="w-3 h-3 text-amber-500 fill-current" />
                <span>4.9/5 from 200+ travelers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-foreground/40" />
                <span>100% private tours</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-foreground/40" />
                <span>Clear pricing, no surprises</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick Contact Strip */}
      <section className="py-3 bg-[#2C2925] text-white/90">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/212618070450?text=Hi!%20I'd%20like%20to%20request%20a%20change%20to%20one%20of%20your%20tours"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase hover:bg-[#20bd5a] transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                Request Changes
              </a>
              <Link
                href="/bespoke"
                className="text-[11px] text-white/50 hover:text-white transition-colors"
              >
                Or go bespoke →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-6 border-b border-foreground/10">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Search with underline */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/30" />
            <input
              type="text"
              placeholder="Search tours, destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-4 py-2 bg-transparent border-b border-foreground/15 focus:border-foreground/40 focus:outline-none text-xs placeholder:text-foreground/30"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            {/* Duration */}
            <div className="flex flex-wrap items-center gap-1.5">
              {durations.map((d) => (
                <button
                  key={d.slug}
                  onClick={() => setSelectedDuration(selectedDuration === d.slug ? "all" : d.slug)}
                  className={`px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase border transition-all ${
                    selectedDuration === d.slug
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-foreground/50 border-foreground/15 hover:border-foreground/30"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Category */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setSelectedCategory(selectedCategory === c.slug ? "all" : c.slug)}
                  className={`px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase border transition-all ${
                    selectedCategory === c.slug
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-foreground/50 border-foreground/15 hover:border-foreground/30"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Start City */}
            <div className="flex flex-wrap items-center gap-1.5">
              {startCities.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setSelectedStartCity(selectedStartCity === c.slug ? "all" : c.slug)}
                  className={`px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase border transition-all ${
                    selectedStartCity === c.slug
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-foreground/50 border-foreground/15 hover:border-foreground/30"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-[10px] text-foreground/30 hover:text-foreground/60 transition-colors md:ml-auto"
              >
                Clear filters ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results count */}
      {!loading && (
        <div className="container mx-auto px-6 lg:px-16 py-4">
          <p className="text-[11px] text-foreground/30">
            {filteredTours.length} {filteredTours.length === 1 ? "tour" : "tours"} available
          </p>
        </div>
      )}

      {/* Tours Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6 lg:px-16">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
            </div>
          ) : tours.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-foreground/50 mb-4">No tours available at the moment.</p>
              <Link
                href="/bespoke"
                className="text-foreground underline hover:no-underline"
              >
                Request a bespoke itinerary →
              </Link>
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-foreground/50 mb-4">No tours match your search.</p>
              <button
                onClick={clearFilters}
                className="text-foreground underline hover:no-underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredTours.map((tour) => (
                <Link
                  key={tour.slug}
                  href={`/tours/${tour.slug}`}
                  className="group"
                >
                  {/* Tall vertical image */}
                  <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-sand">
                    {tour.heroImage && (
                      <Image
                        src={tour.heroImage}
                        alt={tour.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    {/* Category badge */}
                    {tour.category && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-background/90 text-foreground text-[10px] tracking-[0.1em] uppercase px-3 py-1.5">
                          {getCategoryLabel(tour.category)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex items-baseline justify-between mb-2">
                    <p className="text-xs text-foreground/50 uppercase tracking-wide">
                      {tour.durationDays} {tour.durationDays === 1 ? "Day" : "Days"}
                    </p>
                    {tour.price && (
                      <p className="text-sm">
                        From <span className="font-medium">€{tour.price}</span>
                      </p>
                    )}
                  </div>
                  <h3 className="font-serif text-lg md:text-xl mb-2 group-hover:opacity-60 transition-opacity">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed line-clamp-2">
                    {tour.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-sand">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl mb-4">How It Works</h2>
            <p className="text-foreground/60 max-w-xl mx-auto">
              No back-and-forth. No waiting for quotes. Just book.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-serif text-xl">
                1
              </div>
              <h3 className="font-medium mb-2">Pick Your Tour</h3>
              <p className="text-sm text-foreground/60">
                Browse our tours. Prices and itineraries are fixed—what you see is what you get.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-serif text-xl">
                2
              </div>
              <h3 className="font-medium mb-2">Book or Request Changes</h3>
              <p className="text-sm text-foreground/60">
                Book as-is, or request changes. We'll confirm if it's included or quote extra.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-serif text-xl">
                3
              </div>
              <h3 className="font-medium mb-2">Pay & You're Booked</h3>
              <p className="text-sm text-foreground/60">
                30% deposit secures your spot. Balance due 14 days before.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tours"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-wider font-medium hover:opacity-90 transition-opacity mb-4"
            >
              Book Now
            </Link>
            <p className="text-sm text-foreground/50">
              Need something built from scratch?{" "}
              <Link href="/bespoke" className="underline hover:no-underline">
                Go bespoke
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center md:text-left">
              <div className="w-10 h-10 bg-foreground/5 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">Fair, Transparent Pricing</h3>
              <p className="text-sm text-foreground/60">
                No hidden fees, no surprise costs. The price we quote is the price you pay.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="w-10 h-10 bg-foreground/5 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                <MessageCircle className="w-5 h-5 text-foreground/60" />
              </div>
              <h3 className="font-medium mb-2">Clear Communication</h3>
              <p className="text-sm text-foreground/60">
                Fast responses, straightforward answers. No confusion, no runaround.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="w-10 h-10 bg-foreground/5 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                <Star className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-medium mb-2">Organized & On Time</h3>
              <p className="text-sm text-foreground/60">
                Every pickup, every hotel, every detail confirmed in advance. No chaos.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="w-10 h-10 bg-foreground/5 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                <Phone className="w-5 h-5 text-foreground/60" />
              </div>
              <h3 className="font-medium mb-2">24/7 Support</h3>
              <p className="text-sm text-foreground/60">
                WhatsApp access throughout your trip. We're there if anything comes up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-12 md:py-16 bg-sand">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="w-16 h-16 bg-foreground/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-7 h-7 text-foreground/60" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-medium mb-2">Supporting the children of the Sahara</h3>
              <p className="text-sm text-foreground/60 leading-relaxed mb-3">
                A portion of every desert tour goes directly to nomadic families—school supplies, 
                education support, and basic necessities for children who call the desert home.
              </p>
              <Link 
                href="/sahara-children" 
                className="text-sm underline hover:no-underline"
              >
                Learn about our commitment →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl mb-8 text-center">Common Questions</h2>
            
            <div className="space-y-0 divide-y divide-border">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full py-5 flex items-center justify-between text-left"
                  >
                    <span className="font-medium pr-4">{faq.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 flex-shrink-0 text-foreground/40 transition-transform ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`} 
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="pb-5">
                      <p className="text-foreground/60 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Link to full booking conditions */}
            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-foreground/50 mb-2">
                For full details on payments, cancellations, and refunds:
              </p>
              <Link 
                href="/booking-conditions" 
                className="text-sm font-medium underline hover:no-underline"
              >
                View Booking Conditions →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-sand">
        <div className="container mx-auto px-6 lg:px-16 max-w-2xl text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Ready to go?
          </h2>
          <p className="text-foreground/70 leading-relaxed mb-8">
            Book a tour as-is, or request changes and we'll confirm if it's included or send a quote.
          </p>
          <Link
            href="/tours"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-wider font-medium hover:opacity-90 transition-opacity"
          >
            Book Now
          </Link>
          <p className="text-sm text-foreground/50 mt-6">
            Looking for something completely different?{" "}
            <Link href="/bespoke" className="underline hover:no-underline">
              Explore bespoke travel
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

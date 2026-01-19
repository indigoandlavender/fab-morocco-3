"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Types matching actual API responses
interface Journey {
  slug: string;
  title: string;
  description?: string;
  shortDescription?: string;
  heroImage?: string;
  price?: number;
  durationDays?: number;
  duration?: string;
  badge?: string;
  featured?: boolean;
}

interface Place {
  slug: string;
  title: string;
  heroImage?: string;
  excerpt?: string;
  featured?: boolean;
  destination?: string;
}

interface Story {
  slug: string;
  title: string;
  heroImage?: string;
  excerpt?: string;
  mood?: string;
  featured?: boolean;
}

interface Testimonial {
  quote: string;
  author: string;
  location?: string;
}

export default function EditorialHomePage() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    // Fetch settings for hero image
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          const heroUrl = data.settings.heroImage || data.settings.hero_image;
          if (heroUrl) {
            setHeroImage(heroUrl);
          }
        }
      })
      .catch(console.error);

    // Fetch journeys (tours)
    fetch("/api/journeys")
      .then((res) => res.json())
      .then((data) => {
        if (data.journeys) {
          setJourneys(data.journeys.slice(0, 6));
        }
      })
      .catch(console.error);

    // Fetch places
    fetch("/api/places")
      .then((res) => res.json())
      .then((data) => {
        if (data.places) {
          setPlaces(data.places.slice(0, 4));
        }
      })
      .catch(console.error);

    // Fetch stories (The Edit)
    fetch("/api/stories")
      .then((res) => res.json())
      .then((data) => {
        if (data.stories) {
          setStories(data.stories.slice(0, 3));
        }
      })
      .catch(console.error);

    // Fetch testimonials
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.testimonials && data.testimonials.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.testimonials.length);
          setTestimonial(data.testimonials[randomIndex]);
        }
      })
      .catch(console.error);
  }, []);

  // Get first 2 journeys for featured spreads
  const displayJourneys = journeys.slice(0, 2);

  return (
    <div className="bg-background min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════
          HERO - Full viewport, Black Tomato style
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center">
        {/* Hero Image */}
        <div className="absolute inset-0 bg-[#e8e0d4]">
          {heroImage && (
            <Image
              src={heroImage}
              alt="Morocco"
              fill
              className={`object-cover transition-opacity duration-700 ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}
              priority
              onLoad={() => setHeroLoaded(true)}
            />
          )}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Content - Centered but nudged up */}
        <div className="relative z-10 text-center px-6 max-w-4xl -mt-24">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1] tracking-[-0.02em] mb-6">
            Morocco, Reimagined
          </h1>
          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl mx-auto mb-10">
            Curated journeys, places, and stories beyond the obvious.
          </p>
          <Link
            href="/tours"
            className="inline-block text-white text-[10px] tracking-[0.25em] uppercase pb-2 border-b border-white/50 hover:border-white transition-colors"
          >
            Begin Your Journey
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-[10px] tracking-[0.2em] uppercase flex flex-col items-center gap-3">
          <span>Scroll</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          INTRO - Editorial prose
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-6">
            Private Tours Since 2010
          </p>
          <h2 className="font-serif text-xl md:text-2xl lg:text-[1.75rem] leading-[1.4] tracking-[-0.01em] text-foreground mb-6">
            We don't sell packages. We craft passages—through landscapes that shift from pink city walls to amber dunes, through moments that linger longer than photographs.
          </h2>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Every journey is private. Every itinerary, yours alone. We've spent fifteen years learning which doors open to a knock, which roads lead somewhere worth going, which silences are worth sitting in.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED JOURNEY 1 - Magazine spread
          ═══════════════════════════════════════════════════════════════ */}
      {displayJourneys[0] && (
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
          {/* Image */}
          <div className="relative h-[50vh] lg:h-auto bg-sand">
            {displayJourneys[0].heroImage && (
              <Image
                src={displayJourneys[0].heroImage}
                alt={displayJourneys[0].title}
                fill
                className="object-cover"
              />
            )}
          </div>
          {/* Content */}
          <div className="flex flex-col justify-center px-8 py-12 lg:px-14 lg:py-16 bg-sand">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-4">
              Featured Journey
            </p>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.15] tracking-[-0.02em] text-foreground mb-4">
              {displayJourneys[0].title}
            </h2>
            <p className="text-sm text-foreground/60 leading-relaxed mb-6 max-w-md">
              {displayJourneys[0].shortDescription || displayJourneys[0].description}
            </p>
            <div className="flex gap-6 mb-6 pt-5 border-t border-foreground/10">
              {displayJourneys[0].durationDays && (
                <div>
                  <p className="text-[9px] tracking-[0.15em] uppercase text-foreground/40 mb-1">Duration</p>
                  <p className="text-xs text-foreground/70">{displayJourneys[0].durationDays} Days</p>
                </div>
              )}
              {displayJourneys[0].price && (
                <div>
                  <p className="text-[9px] tracking-[0.15em] uppercase text-foreground/40 mb-1">From</p>
                  <p className="text-xs text-foreground/70">€{displayJourneys[0].price} per person</p>
                </div>
              )}
            </div>
            <Link
              href={`/tours/${displayJourneys[0].slug}`}
              className="inline-block self-start text-foreground text-[10px] tracking-[0.2em] uppercase pb-2 border-b border-foreground hover:opacity-60 transition-opacity"
            >
              View This Journey
            </Link>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED JOURNEY 2 - Reversed
          ═══════════════════════════════════════════════════════════════ */}
      {displayJourneys[1] && (
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
          {/* Content - First on mobile, second on desktop */}
          <div className="flex flex-col justify-center px-8 py-12 lg:px-14 lg:py-16 bg-background order-2 lg:order-1">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-4">
              Featured Journey
            </p>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.15] tracking-[-0.02em] text-foreground mb-4">
              {displayJourneys[1].title}
            </h2>
            <p className="text-sm text-foreground/60 leading-relaxed mb-6 max-w-md">
              {displayJourneys[1].shortDescription || displayJourneys[1].description}
            </p>
            <div className="flex gap-6 mb-6 pt-5 border-t border-foreground/10">
              {displayJourneys[1].durationDays && (
                <div>
                  <p className="text-[9px] tracking-[0.15em] uppercase text-foreground/40 mb-1">Duration</p>
                  <p className="text-xs text-foreground/70">{displayJourneys[1].durationDays} Days</p>
                </div>
              )}
              {displayJourneys[1].price && (
                <div>
                  <p className="text-[9px] tracking-[0.15em] uppercase text-foreground/40 mb-1">From</p>
                  <p className="text-xs text-foreground/70">€{displayJourneys[1].price} per person</p>
                </div>
              )}
            </div>
            <Link
              href={`/tours/${displayJourneys[1].slug}`}
              className="inline-block self-start text-foreground text-[10px] tracking-[0.2em] uppercase pb-2 border-b border-foreground hover:opacity-60 transition-opacity"
            >
              View This Journey
            </Link>
          </div>
          {/* Image */}
          <div className="relative h-[50vh] lg:h-auto bg-sand order-1 lg:order-2">
            {displayJourneys[1].heroImage && (
              <Image
                src={displayJourneys[1].heroImage}
                alt={displayJourneys[1].title}
                fill
                className="object-cover"
              />
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          PULL QUOTE - Editorial moment
          ═══════════════════════════════════════════════════════════════ */}
      {testimonial && (
        <section className="py-24 md:py-32 px-6 lg:px-12 bg-[#2C2925]">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="font-serif text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed italic mb-6">
              "{testimonial.quote}"
            </blockquote>
            <cite className="text-[10px] tracking-[0.2em] uppercase text-white/50 not-italic">
              {testimonial.author}{testimonial.location && `, ${testimonial.location}`}
            </cite>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          PLACES - Asymmetrical grid
          ═══════════════════════════════════════════════════════════════ */}
      {places.length > 0 && (
        <section className="py-24 md:py-32 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-end mb-12">
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-[-0.02em] text-foreground">
                Places
              </h2>
              <Link
                href="/places"
                className="text-foreground text-[10px] tracking-[0.2em] uppercase pb-2 border-b border-foreground hover:opacity-60 transition-opacity hidden md:inline-block"
              >
                View All Destinations
              </Link>
            </div>

            {/* Asymmetrical Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[240px] md:auto-rows-[200px]">
              {places.slice(0, 4).map((place, index) => (
                <Link
                  key={place.slug}
                  href={`/places/${place.slug}`}
                  className={`relative group overflow-hidden ${
                    index === 0 || index === 2 ? 'md:row-span-2' : ''
                  }`}
                >
                  <div className="relative w-full h-full bg-sand">
                    {place.heroImage && (
                      <Image
                        src={place.heroImage}
                        alt={place.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <h3 className="font-serif text-xl md:text-2xl text-white mb-1">
                        {place.title}
                      </h3>
                      {place.destination && (
                        <p className="text-xs text-white/70">{place.destination}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile link */}
            <div className="mt-8 text-center md:hidden">
              <Link
                href="/places"
                className="text-foreground text-[10px] tracking-[0.2em] uppercase pb-2 border-b border-foreground"
              >
                View All Destinations
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          THE EDIT - Editorial articles (Stories)
          ═══════════════════════════════════════════════════════════════ */}
      {stories.length > 0 && (
        <section className="py-24 md:py-32 px-6 lg:px-12 bg-sand">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-[-0.02em] text-foreground mb-3">
                The Edit
              </h2>
              <p className="text-sm text-foreground/60">
                Stories, seasons, and the Morocco we keep discovering
              </p>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {stories.map((story) => (
                <Link
                  key={story.slug}
                  href={`/the-edit/${story.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/5] bg-background mb-5 overflow-hidden">
                    {story.heroImage && (
                      <Image
                        src={story.heroImage}
                        alt={story.title}
                        fill
                        className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                      />
                    )}
                  </div>
                  <h3 className="font-serif text-lg md:text-xl text-foreground mb-2 leading-tight">
                    {story.title}
                  </h3>
                  {story.excerpt && (
                    <p className="text-xs text-foreground/60 leading-relaxed line-clamp-3">
                      {story.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-12">
              <Link
                href="/the-edit"
                className="inline-block text-foreground text-[10px] tracking-[0.2em] uppercase pb-2 border-b border-foreground hover:opacity-60 transition-opacity"
              >
                View All Stories
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          ALL TOURS - Clean list
          ═══════════════════════════════════════════════════════════════ */}
      {journeys.length > 2 && (
        <section className="py-24 md:py-32 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-[-0.02em] text-foreground">
                All Journeys
              </h2>
              <Link
                href="/tours"
                className="text-foreground text-[10px] tracking-[0.2em] uppercase pb-2 border-b border-foreground hover:opacity-60 transition-opacity hidden md:inline-block"
              >
                View All Tours
              </Link>
            </div>

            {/* Tours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {journeys.slice(2, 6).map((journey) => (
                <Link
                  key={journey.slug}
                  href={`/tours/${journey.slug}`}
                  className="group flex gap-4 md:gap-5"
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-sand overflow-hidden">
                    {journey.heroImage && (
                      <Image
                        src={journey.heroImage}
                        alt={journey.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center py-1">
                    <h3 className="font-serif text-base md:text-lg text-foreground mb-1 group-hover:opacity-70 transition-opacity leading-tight">
                      {journey.title}
                    </h3>
                    <p className="text-[11px] text-foreground/50 mb-1">
                      {journey.durationDays} Days{journey.price && ` · From €${journey.price}`}
                    </p>
                    {journey.shortDescription && (
                      <p className="text-xs text-foreground/60 line-clamp-2 hidden md:block">
                        {journey.shortDescription}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile link */}
            <div className="mt-8 text-center md:hidden">
              <Link
                href="/tours"
                className="text-foreground text-[10px] tracking-[0.2em] uppercase pb-2 border-b border-foreground"
              >
                View All Tours
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          BESPOKE CTA
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 lg:px-12 bg-[#2C2925]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">
            Bespoke Travel
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-[-0.02em] text-white leading-[1.15] mb-6">
            Something in mind that you don't see here?
          </h2>
          <p className="text-sm text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
            We design private itineraries from scratch. Tell us where you want to go, how you want to feel, and we'll craft something just for you.
          </p>
          <Link
            href="/bespoke"
            className="inline-block text-white text-[10px] tracking-[0.2em] uppercase pb-2 border-b border-white/50 hover:border-white transition-colors"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}

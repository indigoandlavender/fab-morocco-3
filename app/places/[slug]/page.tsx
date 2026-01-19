"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, MapPin, Clock, Ticket, ArrowLeft } from "lucide-react";

interface Place {
  slug: string;
  title: string;
  destination: string;
  category: string;
  address: string;
  openingHours: string;
  fees: string;
  notes: string;
  heroImage: string;
  heroCaption: string;
  excerpt: string;
  body: string;
  sources: string;
  tags: string;
}

interface Tour {
  slug: string;
  title: string;
  heroImage: string;
  description: string;
  durationDays: number;
  price: number;
}

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function PlaceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [place, setPlace] = useState<Place | null>(null);
  const [relatedTours, setRelatedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    Promise.all([
      fetch(`/api/places/${slug}`).then((r) => r.json()),
      fetch("/api/journeys").then((r) => r.json()),
    ])
      .then(([placeData, toursData]) => {
        if (placeData.success && placeData.place) {
          setPlace(placeData.place);

          // Filter tours that include this destination
          const destination = placeData.place.destination?.toLowerCase();
          if (destination && toursData.journeys) {
            const related = toursData.journeys.filter((t: any) => {
              const destinations = t.destinations?.toLowerCase() || "";
              const isEpic = t.journeyType === "epic";
              return destinations.includes(destination) && !isEpic;
            });
            setRelatedTours(related.slice(0, 4));
          }
        } else {
          setError(placeData.error || "Place not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load place");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="bg-background min-h-screen flex flex-col justify-center items-center">
        <p className="text-muted-foreground mb-4">{error || "Place not found"}</p>
        <Link href="/places" className="text-sm underline">
          Back to Places
        </Link>
      </div>
    );
  }

  const destinationTitle = place.destination
    ? place.destination.charAt(0).toUpperCase() + place.destination.slice(1)
    : "";

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Image */}
      <section className="relative h-[50vh] md:h-[60vh] bg-sand">
        {place.heroImage ? (
          <Image
            src={place.heroImage}
            alt={place.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-sand" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Back Link */}
          <Link
            href="/places"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Places
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Title */}
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                {destinationTitle}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                {place.title}
              </h1>

              {/* Excerpt */}
              {place.excerpt && (
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {place.excerpt}
                </p>
              )}

              {/* Body */}
              {place.body && (
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  {place.body.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-border p-6 sticky top-24">
                <h3 className="font-serif text-lg mb-6">Visitor Information</h3>

                {place.address && (
                  <div className="flex gap-3 mb-4">
                    <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Location
                      </p>
                      <p className="text-sm">{place.address}</p>
                    </div>
                  </div>
                )}

                {place.openingHours && (
                  <div className="flex gap-3 mb-4">
                    <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Hours
                      </p>
                      <p className="text-sm">{place.openingHours}</p>
                    </div>
                  </div>
                )}

                {place.fees && (
                  <div className="flex gap-3 mb-4">
                    <Ticket className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Entry Fee
                      </p>
                      <p className="text-sm">{place.fees}</p>
                    </div>
                  </div>
                )}

                {place.notes && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Tips
                    </p>
                    <p className="text-sm text-muted-foreground">{place.notes}</p>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <Link
                    href="/tours"
                    className="block w-full bg-foreground text-background text-center py-3 text-xs uppercase tracking-wider hover:bg-foreground/90 transition-colors"
                  >
                    Visit on a Tour
                  </Link>
                  <a
                    href={`https://wa.me/212618070450?text=Hi!%20I'd%20like%20to%20visit%20${encodeURIComponent(place.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full border border-border py-3 text-xs uppercase tracking-wider hover:bg-muted transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    Ask Us About It
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tours */}
      {relatedTours.length > 0 && (
        <section className="py-16 md:py-20 bg-sand">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl mb-2">
                Visit {place.title} on a Tour
              </h2>
              <p className="text-muted-foreground">
                Tours that include {destinationTitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTours.map((tour) => (
                <Link
                  key={tour.slug}
                  href={`/tours/${tour.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-background">
                    {tour.heroImage && (
                      <Image
                        src={tour.heroImage}
                        alt={tour.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    {tour.price > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex items-baseline gap-1">
                          <span className="text-white text-xs">From</span>
                          <span className="text-white text-xl font-bold">
                            €{tour.price}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {tour.durationDays} {tour.durationDays === 1 ? "Day" : "Days"}
                  </p>
                  <h3 className="font-serif text-lg group-hover:opacity-60 transition-opacity">
                    {tour.title}
                  </h3>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/tours"
                className="inline-block border border-foreground px-8 py-3 text-xs uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
              >
                View All Tours
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA if no related tours */}
      {relatedTours.length === 0 && (
        <section className="py-16 md:py-20 bg-sand">
          <div className="container mx-auto px-6 lg:px-16 max-w-2xl text-center">
            <h2 className="font-serif text-2xl md:text-3xl mb-4">
              Want to visit {place.title}?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We can include this destination in a custom tour designed just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tours"
                className="inline-block bg-foreground text-background px-8 py-4 text-xs uppercase tracking-wider hover:bg-foreground/90 transition-colors"
              >
                Request Custom Tour
              </Link>
              <Link
                href="/tours"
                className="inline-block border border-foreground px-8 py-4 text-xs uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
              >
                Browse Tours
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

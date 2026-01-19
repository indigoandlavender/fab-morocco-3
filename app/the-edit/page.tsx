"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Story {
  slug: string;
  title: string;
  subtitle?: string;
  mood?: string;
  heroImage?: string;
  excerpt?: string;
  destination?: string;
}

const moods = [
  {
    slug: "fierce",
    label: "Fierce",
    tagline: "Warriors, mountains, power",
    color: "from-amber-900/80",
  },
  {
    slug: "tender",
    label: "Tender",
    tagline: "Love stories, textiles, intimacy",
    color: "from-rose-900/80",
  },
  {
    slug: "sacred",
    label: "Sacred",
    tagline: "Rituals, music, silence",
    color: "from-indigo-900/80",
  },
  {
    slug: "golden",
    label: "Golden",
    tagline: "Light, desert, warmth",
    color: "from-amber-700/80",
  },
];

export default function TheEditPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<{ heroImage: string; title: string; subtitle: string; labelText: string } | null>(null);

  useEffect(() => {
    // Fetch banner
    fetch("/api/banners?page=the-edit")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.banner) {
          setBanner(data.banner);
        }
      })
      .catch(() => {});

    fetch("/api/stories")
      .then((res) => res.json())
      .then((data) => {
        setStories(data.stories || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredStories = selectedMood
    ? stories.filter((s) => s.mood?.toLowerCase() === selectedMood)
    : stories;

  const getStoriesByMood = (mood: string) =>
    stories.filter((s) => s.mood?.toLowerCase() === mood);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      {banner?.heroImage && (
        <section className="relative h-[70vh] min-h-[500px] bg-sand">
          <Image
            src={banner.heroImage}
            alt="The Edit"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-6 lg:px-16 pb-12 md:pb-16">
              {banner.labelText && (
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/70 mb-3">
                  {banner.labelText}
                </p>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-serif text-white mb-4">
                {banner.title || "The Edit"}
              </h1>
              {banner.subtitle && (
                <p className="text-lg text-white/80 max-w-xl">
                  {banner.subtitle}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Hero (fallback when no banner) */}
      {!banner?.heroImage && (
        <section className="pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-serif mb-6">
                The Edit
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Morocco through a different lens. Not where to go—how to feel.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Mood Filter */}
      <section className="py-8 border-y border-border">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => setSelectedMood(null)}
              className={`text-xs uppercase tracking-wider px-5 py-2.5 border transition-all ${
                selectedMood === null
                  ? "bg-foreground text-background border-foreground"
                  : "border-border hover:border-foreground"
              }`}
            >
              All
            </button>
            {moods.map((mood) => (
              <button
                key={mood.slug}
                onClick={() =>
                  setSelectedMood(selectedMood === mood.slug ? null : mood.slug)
                }
                className={`text-xs uppercase tracking-wider px-5 py-2.5 border transition-all ${
                  selectedMood === mood.slug
                    ? "bg-foreground text-background border-foreground"
                    : "border-border hover:border-foreground"
                }`}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-32">
          <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
        </div>
      ) : selectedMood ? (
        /* Filtered View - Simple Grid */
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="mb-12">
              <h2 className="font-serif text-3xl md:text-4xl mb-2 capitalize">
                {selectedMood}
              </h2>
              <p className="text-muted-foreground">
                {moods.find((m) => m.slug === selectedMood)?.tagline}
              </p>
            </div>

            {filteredStories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStories.map((story) => (
                  <StoryCard key={story.slug} story={story} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-16">
                No stories in this mood yet.
              </p>
            )}
          </div>
        </section>
      ) : (
        /* Full Editorial Layout - Mood Sections */
        <>
          {moods.map((mood, index) => {
            const moodStories = getStoriesByMood(mood.slug);
            if (moodStories.length === 0) return null;

            const featured = moodStories[0];
            const others = moodStories.slice(1, 4);

            return (
              <section
                key={mood.slug}
                className={`py-20 ${index % 2 === 1 ? "bg-sand" : ""}`}
              >
                <div className="container mx-auto px-6 lg:px-16">
                  {/* Section Header */}
                  <div className="mb-12">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                      {mood.tagline}
                    </p>
                    <h2 className="font-serif text-4xl md:text-5xl">
                      {mood.label}
                    </h2>
                  </div>

                  {/* Featured Story - Full Bleed */}
                  <Link
                    href={`/the-edit/${featured.slug}`}
                    className="group block mb-12"
                  >
                    <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-sand">
                      {featured.heroImage && (
                        <Image
                          src={featured.heroImage}
                          alt={featured.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${mood.color} to-transparent`}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white leading-tight max-w-3xl">
                          {featured.title}
                        </h3>
                        {featured.subtitle && (
                          <p className="text-white/80 mt-3 text-lg md:text-xl max-w-2xl">
                            {featured.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Other Stories in Row */}
                  {others.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {others.map((story) => (
                        <StoryCard key={story.slug} story={story} />
                      ))}
                    </div>
                  )}

                  {/* View All Link */}
                  {moodStories.length > 4 && (
                    <div className="mt-10 text-center">
                      <button
                        onClick={() => setSelectedMood(mood.slug)}
                        className="text-sm uppercase tracking-wider hover:opacity-60 transition-opacity"
                      >
                        View all {mood.label} stories →
                      </button>
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-16 text-center max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Walk where they walked
          </h2>
          <p className="text-background/70 leading-relaxed mb-8">
            Every story has a place. Every place has a tour.
          </p>
          <Link
            href="/tours"
            className="inline-block bg-background text-foreground px-8 py-4 text-xs uppercase tracking-wider hover:bg-background/90 transition-colors"
          >
            Explore Tours
          </Link>
        </div>
      </section>
    </div>
  );
}

function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/the-edit/${story.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-sand mb-4">
        {story.heroImage && (
          <Image
            src={story.heroImage}
            alt={story.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
      <h3 className="font-serif text-xl leading-tight group-hover:opacity-60 transition-opacity">
        {story.title}
      </h3>
      {story.subtitle && (
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {story.subtitle}
        </p>
      )}
    </Link>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Story {
  slug: string;
  title: string;
  subtitle?: string;
  mood?: string;
  heroImage?: string;
  heroCaption?: string;
  excerpt?: string;
  body?: string;
  destination?: string;
  tags?: string;
  relatedTour?: string;
  relatedTourSlug?: string;
}

interface StoryImage {
  image_url: string;
  caption?: string;
  image_order?: number;
}

export default function StoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [story, setStory] = useState<Story | null>(null);
  const [images, setImages] = useState<StoryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/stories/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.story) {
          setStory(data.story);
          setImages(data.images || []);
        } else {
          setError(data.error || "Story not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load story");
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

  if (error || !story) {
    return (
      <div className="bg-background min-h-screen flex flex-col justify-center items-center">
        <p className="text-muted-foreground mb-4">{error || "Story not found"}</p>
        <Link href="/the-edit" className="text-sm underline">
          Back to The Edit
        </Link>
      </div>
    );
  }

  // Parse body into sections - split by double newlines
  const bodySections = story.body
    ? story.body.split("\n\n").filter((s) => s.trim())
    : [];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero - Full Bleed */}
      <section className="relative h-[70vh] md:h-[85vh]">
        {story.heroImage ? (
          <Image
            src={story.heroImage}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-sand" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Hero Text */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-20">
          <div className="container mx-auto">
            {story.mood && (
              <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-4">
                {story.mood}
              </p>
            )}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-[1.1] max-w-4xl">
              {story.title}
            </h1>
            {story.subtitle && (
              <p className="text-xl md:text-2xl text-white/80 mt-4 max-w-2xl leading-relaxed">
                {story.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Hero Caption */}
        {story.heroCaption && (
          <p className="absolute bottom-4 right-8 text-xs text-white/40 italic">
            {story.heroCaption}
          </p>
        )}
      </section>

      {/* Back Link */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-6 lg:px-16">
          <Link
            href="/the-edit"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            The Edit
          </Link>
        </div>
      </section>

      {/* Content - Editorial Layout */}
      <article className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Excerpt - Large Pullquote */}
          {story.excerpt && (
            <div className="max-w-3xl mx-auto mb-20">
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed text-center italic">
                {story.excerpt}
              </p>
            </div>
          )}

          {/* Body Content - Magazine Spread Style */}
          <div className="max-w-4xl mx-auto">
            {bodySections.map((section, index) => {
              // Alternate between text and image inserts
              const imageForSection = images[index];

              return (
                <div key={index} className="mb-16">
                  {/* Text Section */}
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    {section}
                  </p>

                  {/* Image Insert */}
                  {imageForSection && (
                    <figure className="mt-12 mb-12">
                      <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden">
                        <Image
                          src={imageForSection.image_url}
                          alt={imageForSection.caption || ""}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {imageForSection.caption && (
                        <figcaption className="text-xs text-muted-foreground mt-3 italic text-center">
                          {imageForSection.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </div>
              );
            })}

            {/* Remaining Images */}
            {images.length > bodySections.length && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                {images.slice(bodySections.length).map((img, idx) => (
                  <figure key={idx}>
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={img.image_url}
                        alt={img.caption || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="text-xs text-muted-foreground mt-2 italic">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related Tour CTA */}
      {story.relatedTourSlug && (
        <section className="py-16 bg-sand">
          <div className="container mx-auto px-6 lg:px-16 text-center max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Walk where she walked
            </p>
            <h2 className="font-serif text-2xl md:text-3xl mb-6">
              {story.relatedTour || "Experience this story"}
            </h2>
            <Link
              href={`/tours/${story.relatedTourSlug}`}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wider hover:opacity-60 transition-opacity"
            >
              View Tour <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex justify-between items-center">
            <Link
              href="/the-edit"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to The Edit
            </Link>
            <Link
              href="/tours"
              className="text-sm uppercase tracking-wider hover:opacity-60 transition-opacity"
            >
              Browse Tours →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

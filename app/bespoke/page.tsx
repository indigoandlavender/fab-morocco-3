"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function BespokePage() {
  const [banner, setBanner] = useState<{ heroImage: string; title: string; subtitle: string; labelText: string } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dates: "",
    travelers: "",
    interests: "",
    message: "",
  });

  useEffect(() => {
    // Fetch banner
    fetch("/api/banners?page=bespoke")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.banner) {
          setBanner(data.banner);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message
    const message = `Hi! I'd like to request a bespoke Morocco itinerary.

Name: ${formData.name}
Email: ${formData.email}
Travel Dates: ${formData.dates}
Travelers: ${formData.travelers}
Interests: ${formData.interests}

${formData.message}`;
    
    window.open(`https://wa.me/212618070450?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      {banner?.heroImage && (
        <section className="relative h-[70vh] min-h-[500px] bg-sand">
          <Image
            src={banner.heroImage}
            alt="Bespoke Travel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-6 lg:px-16 pb-12 md:pb-16">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/70 mb-4">
                {banner.labelText || "Bespoke Travel"}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-serif text-white mb-4">
                {banner.title || "Your Itinerary. Built from Scratch."}
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
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-4">
                Bespoke Travel
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-serif mb-6">
                Your Itinerary. Built from Scratch.
              </h1>
              <p className="text-lg text-foreground/70 mb-8 max-w-xl">
                Don't see what you're looking for in our tours? Tell us what you want 
                and we'll design a completely custom itinerary for you.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Tours vs Bespoke */}
      <section className="py-16 md:py-20 bg-sand">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl mb-8 text-center">
              Which is right for you?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Tours */}
              <div className="bg-background p-8">
                <h3 className="font-serif text-xl mb-4">Ready-to-Book Tours</h3>
                <ul className="space-y-3 text-sm text-foreground/70 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Fixed prices, clear itineraries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Book and pay online</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Request minor changes (we'll confirm if included or quote extra)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Quick confirmation</span>
                  </li>
                </ul>
                <p className="text-sm text-foreground/50 mb-6">
                  Best for: Most travelers. You know roughly what you want and prefer a straightforward booking.
                </p>
                <Link
                  href="/tours"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
                >
                  Browse Tours <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Bespoke */}
              <div className="bg-foreground text-background p-8">
                <h3 className="font-serif text-xl mb-4">Bespoke Itineraries</h3>
                <ul className="space-y-3 text-sm text-background/70 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>100% custom—built around your vision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Personal consultation to understand your needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Custom quote based on your requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Proposal within 48-72 hours</span>
                  </li>
                </ul>
                <p className="text-sm text-background/50 mb-6">
                  Best for: Special occasions, complex multi-week trips, specific interests, or when nothing on our menu fits.
                </p>
                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-2 text-sm font-medium text-background hover:gap-3 transition-all"
                >
                  Start Your Inquiry <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Bespoke Looks Like */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl mb-8 text-center">
              What bespoke looks like
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center flex-shrink-0 font-serif">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-2">You tell us what you want</h3>
                  <p className="text-foreground/60">
                    Dates, group size, interests, pace, budget range, must-sees, must-avoids. 
                    The more detail, the better we can design.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center flex-shrink-0 font-serif">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-2">We design your itinerary</h3>
                  <p className="text-foreground/60">
                    Within 48-72 hours, you'll receive a detailed day-by-day proposal 
                    with accommodation options, activities, and a clear price breakdown.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center flex-shrink-0 font-serif">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-2">We refine together</h3>
                  <p className="text-foreground/60">
                    Feedback, adjustments, swaps—we'll revise until it's exactly right. 
                    No commitment until you're happy.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center flex-shrink-0 font-serif">
                  4
                </div>
                <div>
                  <h3 className="font-medium mb-2">Confirm and go</h3>
                  <p className="text-foreground/60">
                    Once approved, a 30% deposit secures everything. Balance due 14 days 
                    before departure. Then you just show up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-16 md:py-20 bg-sand">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl mb-4 text-center">
              Start your bespoke inquiry
            </h2>
            <p className="text-foreground/60 text-center mb-10">
              Tell us what you're looking for. No commitment—just a conversation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-foreground/50 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-foreground/20 py-3 focus:border-foreground outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-foreground/50 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-foreground/20 py-3 focus:border-foreground outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-foreground/50 mb-2">
                    Approximate Dates
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. March 2025, flexible"
                    value={formData.dates}
                    onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                    className="w-full bg-transparent border-b border-foreground/20 py-3 focus:border-foreground outline-none transition-colors placeholder:text-foreground/30"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-foreground/50 mb-2">
                    Number of Travelers
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2 adults, 1 child"
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                    className="w-full bg-transparent border-b border-foreground/20 py-3 focus:border-foreground outline-none transition-colors placeholder:text-foreground/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-foreground/50 mb-2">
                  Interests & Priorities
                </label>
                <input
                  type="text"
                  placeholder="e.g. desert, food, photography, relaxation, adventure..."
                  value={formData.interests}
                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  className="w-full bg-transparent border-b border-foreground/20 py-3 focus:border-foreground outline-none transition-colors placeholder:text-foreground/30"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-foreground/50 mb-2">
                  Tell us more
                </label>
                <textarea
                  rows={4}
                  placeholder="Anything else we should know—budget range, must-sees, special occasions, pace preferences..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-foreground/20 py-3 focus:border-foreground outline-none transition-colors placeholder:text-foreground/30 resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-foreground text-background py-4 text-sm font-medium uppercase tracking-wider hover:bg-foreground/90 transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Send Inquiry via WhatsApp
                </button>
                <p className="text-xs text-foreground/40 text-center mt-4">
                  Your inquiry opens in WhatsApp. We typically respond within a few hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Final Note */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-16 max-w-2xl text-center">
          <p className="text-foreground/60 leading-relaxed">
            Not sure if you need bespoke? Start with our{" "}
            <Link href="/tours" className="underline hover:no-underline">
              ready-to-book tours
            </Link>
            . You can always request customizations there, and we'll let you know 
            if it's a minor tweak or needs a full bespoke approach.
          </p>
        </div>
      </section>
    </div>
  );
}

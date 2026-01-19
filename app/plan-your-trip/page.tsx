"use client";

import { useState, useEffect } from "react";
import PlanYourTripForm from "@/components/PlanYourTripForm";

interface Journey {
  slug: string;
  title: string;
}

export default function PlanYourTripPage() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch journeys for dropdown
    fetch("/api/journeys")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJourneys(data.journeys || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-6 lg:px-16 max-w-2xl text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-6">
            Begin The Conversation
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-wide mb-6">
            How do I start planning my Morocco trip?
          </h1>
          <p className="text-white/70 text-lg mb-4">
            Fill out the form below. No obligation, no sales pitch—just a conversation about what you're hoping to find.
          </p>
          <p className="text-white/50 text-lg italic">
            Every journey begins with a question. What's yours?
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-6 lg:px-16 max-w-2xl">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          ) : (
            <PlanYourTripForm 
              journeys={journeys}
              siteId="slow-morocco"
              darkMode={true}
            />
          )}
        </div>
      </section>
    </div>
  );
}

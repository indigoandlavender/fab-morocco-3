"use client";

import Image from "next/image";
import Link from "next/link";

export default function SaharaChildrenPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh]">
        <Image
          src="https://res.cloudinary.com/drstfu5yr/image/upload/v1768692099/hf_20260117_231955_95b008d9-c7f5-4c54-b1e6-0d2560cc9a65_hrzjya.png"
          alt="Nomad children playing football in the Sahara"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="container mx-auto">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-3">
              Our Commitment
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
              The Children of the Sahara
            </h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="max-w-xl">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
                Fifty kilometers from Merzouga, past the last paved road, a family lives in a tent 
                made of woven goat hair. The father's great-grandfather crossed this same stretch 
                of Sahara with camels loaded with salt. Today, the camels are for tourists. The 
                salt trade ended decades ago. But the children still need schools.
              </p>
              <p className="text-foreground/60 leading-relaxed">
                Mohammed grew up in this desert. He knows these families by name—where they camp 
                in winter, where they move when the summer heat comes. For years, he's been bringing 
                them supplies: coloring books, pencils, toys, medicine. Not charity tourism. Just 
                a Moroccan helping his neighbors.
              </p>
            </div>
            <div className="relative aspect-[4/5]">
              <Image
                src="https://res.cloudinary.com/drstfu5yr/image/upload/v1768692978/0d983a08-6128-4a0c-a289-489fd2aad074_sce8sr.jpg"
                alt="Mohammed delivering supplies to nomad families"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Reality */}
      <section className="py-16 md:py-20 bg-sand">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative aspect-[4/5] md:order-1 order-2">
              <Image
                src="https://res.cloudinary.com/drstfu5yr/image/upload/v1768692205/hf_20260117_232240_8ebae684-ab47-4691-8dd6-8a5e50385ce8_sgsfqa.png"
                alt="Nomad family laughing together outside their tent"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:order-2 order-1">
              <h2 className="font-serif text-2xl md:text-3xl mb-6">What life looks like</h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  The nomadic families of the Moroccan Sahara—Ait Khebbach, Ait Atta, and others—have 
                  lived in this landscape for centuries. They know how to read the desert: which rocks 
                  mean water is near, which plants the goats can eat, how to navigate by color when 
                  sandstorms block the stars.
                </p>
                <p>
                  But knowledge doesn't build schools. Children who might walk 15 kilometers to the 
                  nearest classroom often don't go at all. Medical care means a day's journey. Running 
                  water is a well, if you're lucky.
                </p>
                <p>
                  These families aren't asking for handouts. They're asking for what every parent wants: 
                  a chance for their children to learn, to grow, to choose their own path—whether that's 
                  staying in the desert or leaving it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl mb-8">What we're doing</h2>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center flex-shrink-0 font-serif">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Direct support to families</h3>
                    <p className="text-foreground/60 leading-relaxed">
                      When Mohammed drives into the desert, he doesn't go empty. School supplies, 
                      coloring books, toys, basic medicine—things that make daily life a little easier. 
                      This isn't a photo opportunity. It's a visit to people he's known for 20 years.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center flex-shrink-0 font-serif">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Building toward schools</h3>
                    <p className="text-foreground/60 leading-relaxed">
                      The long-term goal: contribute to building actual classrooms in the desert. Not 
                      replacing government schools, but supplementing—creating spaces where nomadic 
                      children can learn without walking 15 kilometers or abandoning their families' 
                      way of life.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center flex-shrink-0 font-serif">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">A percentage of every tour</h3>
                    <p className="text-foreground/60 leading-relaxed">
                      A portion of every desert tour booking goes directly to supporting these families. 
                      Not to an organization. Not to overhead. Directly—supplies purchased locally, 
                      delivered by hand.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Girl with drawing */}
            <div className="relative aspect-[4/5]">
              <Image
                src="https://res.cloudinary.com/drstfu5yr/image/upload/v1768692262/hf_20260117_232343_7b3edc79-6f49-46ab-bce9-910f8d60ddf8_tvugwy.png"
                alt="Nomad girl proudly showing her camel drawing"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/60 to-transparent">
                <p className="text-white/90 text-sm italic">
                  A girl shows off her drawing—camels crossing the desert she calls home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="py-16 md:py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl mb-6">How you can help</h2>
            <p className="text-background/70 leading-relaxed mb-10">
              You don't need to do anything extra. When you book a desert tour with us, 
              you're already contributing. But if you want to do more:
            </p>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-white/5 p-6">
                <h3 className="font-medium mb-3">Bring supplies</h3>
                <p className="text-background/60 text-sm leading-relaxed mb-4">
                  Pack an extra bag with school supplies, coloring books, pencils, small toys. 
                  Mohammed will make sure they reach families who need them. You can come along 
                  to deliver them yourself.
                </p>
                <p className="text-xs text-background/40">
                  What's useful: coloring books, pencils, notebooks, small toys, children's 
                  clothes, basic medicine (ibuprofen, bandages).
                </p>
              </div>

              <div className="bg-white/5 p-6">
                <h3 className="font-medium mb-3">Buy locally</h3>
                <p className="text-background/60 text-sm leading-relaxed mb-4">
                  Prefer to buy here? Mohammed can take you to local shops in Merzouga or 
                  Rissani where you can purchase supplies at local prices. Everything you 
                  buy goes further when purchased in Morocco.
                </p>
                <p className="text-xs text-background/40">
                  We'll help you find the right shops—no tourist markups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Promise */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl mb-6">A note on transparency</h2>
            <p className="text-foreground/60 leading-relaxed mb-8">
              This isn't a registered charity. There's no tax deduction. No slick marketing 
              campaign. Just a Moroccan tour operator who grew up in the desert, doing what 
              he can for people he's known his whole life.
            </p>
            <p className="text-foreground/60 leading-relaxed">
              When you book a tour, a portion of the price goes to supplies. When you bring 
              goods, they go to families. When you visit, you see where it goes. That's it. 
              Simple. Direct. Real.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-sand">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Book a desert tour
          </h2>
          <p className="text-foreground/60 mb-8 max-w-xl mx-auto">
            Every desert tour contributes to the children of the Sahara. 
            See the landscape, meet the people, make a difference.
          </p>
          <Link
            href="/tours?focus=desert"
            className="inline-block bg-foreground text-background px-8 py-4 text-sm uppercase tracking-wider font-medium hover:bg-foreground/90 transition-colors"
          >
            View Desert Tours
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boutique Collection | Fab Morocco",
  description:
    "Design-forward journeys through Morocco. Boutique riads, artisan workshops, hidden courtyards. For travelers who seek beauty, not bucket lists.",
};

// Boutique tours data - these match the new tours in the Google Sheet
const boutiqueTours = [
  {
    id: "FAB-5DAY-STY",
    slug: "5-day-souks-style-escape",
    title: "Souks & Style Escape",
    days: 5,
    price: 590,
    tagline: "Marrakech deep dive",
    description:
      "Five days immersed in Marrakech's most beautiful spaces. Boutique riads. Artisan workshops. Hidden courtyards. The souks with someone who knows which doors to knock on.",
    highlights: ["Rooftop breakfasts", "Artisan workshops", "Atlas foothills", "Hammam experience"],
    image: "https://res.cloudinary.com/drstfu5yr/image/upload/v1768705843/hf_20260118_031004_ae431fc5-e449-4f15-ae2a-3c5483780251_bn3mnq.png",
  },
  {
    id: "FAB-7DAY-DES",
    slug: "7-day-desert-design",
    title: "Desert & Design",
    days: 7,
    price: 890,
    tagline: "The full experience",
    description:
      "Start and end in the pink city. In between: rose valleys, ancient kasbahs, and a night under more stars than you knew existed. This is the Morocco trip you've been pinning for years.",
    highlights: ["Desert camp under stars", "Todra Gorge sunrise", "Guided souk experience", "Cedar forest macaques"],
    image: "https://res.cloudinary.com/drstfu5yr/image/upload/v1768705904/hf_20260118_031105_accc6fa1-00ce-44b5-9572-6690341696b4_ydpot7.png",
  },
  {
    id: "FAB-3DAY-AGA",
    slug: "3-day-agafay-marrakech",
    title: "Agafay & Marrakech",
    days: 3,
    price: 390,
    tagline: "No long drives",
    description:
      "You don't have time for the Sahara. The Agafay desert is 45 minutes from Marrakech—rocky moonscape, same sunset gold and silence. Medina magic plus desert glamping.",
    highlights: ["Luxury desert glamping", "Sunset drinks", "Dinner under stars", "Guided medina walk"],
    image: "https://res.cloudinary.com/drstfu5yr/image/upload/v1768705983/hf_20260118_031211_40c3b688-956e-477b-a7a1-9da3c18b3e3a_bczevj.png",
  },
];

export default function BoutiquePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] bg-sand">
        {/* Background image */}
        <Image
          src="https://res.cloudinary.com/drstfu5yr/image/upload/v1768705746/hf_20260118_030821_06b9e621-74df-4731-ad8f-4dd16a270aa4_qb1v4x.png"
          alt="Riad courtyard with zellige fountain"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20" />
        
        {/* Content - bottom left aligned like other banners */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 lg:px-16 pb-10 md:pb-14">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-3">
              Our Boutique Collection
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] font-serif text-white mb-3">
              Morocco, by Design
            </h1>
            <p className="text-sm text-white/70 max-w-lg">
              For travelers who seek beauty, not bucket lists. Boutique riads, artisan workshops, hidden courtyards.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm tracking-[0.2em] uppercase text-[#8B7355] mb-6">
            A Different Kind of Journey
          </p>
          <p className="font-serif text-2xl md:text-3xl text-[#2C2C2C] leading-relaxed mb-8">
            These aren't tours. They're immersions. Into color and texture and light. 
            Into souks where someone knows which doors to knock on. Into riads hidden 
            behind unmarked entrances. Into Morocco as it's meant to be experienced.
          </p>
          <p className="text-[#5C5C5C] leading-relaxed">
            Private journeys. Your own pace. Your own story.
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="pb-20 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {boutiqueTours.map((tour) => (
              <Link
                key={tour.id}
                href={`/tours/${tour.slug}`}
                className="group block"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] mb-5 overflow-hidden bg-[#E8E4DF]">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  
                  {/* Days badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5">
                    <span className="text-xs tracking-[0.15em] uppercase text-[#2C2C2C]">
                      {tour.days} Days
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-[#8B7355] mb-2">
                    {tour.tagline}
                  </p>
                  <h3 className="font-serif text-xl md:text-2xl text-[#2C2C2C] mb-3 group-hover:text-[#8B7355] transition-colors">
                    {tour.title}
                  </h3>
                  <p className="text-[#5C5C5C] text-sm leading-relaxed mb-4">
                    {tour.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tour.highlights.slice(0, 3).map((highlight, i) => (
                      <span
                        key={i}
                        className="text-xs text-[#8B7355] border border-[#8B7355]/30 px-2 py-1"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <p className="text-sm text-[#2C2C2C]">
                    From <span className="font-medium">€{tour.price}</span> per person
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-28 px-6 bg-[#2C2C2C]">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-white/50 mb-6">
                Our Philosophy
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
                Same magic.<br />Your own pace.
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Group tours have their place. Ours isn't it. We believe the best way to 
                experience Morocco is privately—with a driver who knows when to stop 
                for mint tea, a guide who opens unmarked doors, and a schedule that 
                bends to your rhythm.
              </p>
              <p className="text-white/70 leading-relaxed">
                Every boutique journey includes handpicked accommodation, private 
                transport, and the kind of access that comes from fifteen years of 
                relationships built the slow way.
              </p>
            </div>
            <div className="relative aspect-square bg-[#3C3C3C]">
              <Image
                src="https://res.cloudinary.com/drstfu5yr/image/upload/v1768705797/hf_20260118_030910_aef4929c-9ede-410c-a200-08b454992a58_hrafyr.png"
                alt="Morning light through carved plaster screen"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's Different */}
      <section className="py-20 md:py-28 px-6 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-[#8B7355] mb-4">
              The Boutique Difference
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2C2C2C]">
              What sets these journeys apart
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {[
              {
                title: "Handpicked Stays",
                description:
                  "Boutique riads with character. Tiled courtyards, rooftop terraces, the kind of rooms you don't want to leave. Never generic hotels.",
              },
              {
                title: "Design Access",
                description:
                  "Artisan workshops. Private showrooms. The souks with someone who knows the makers. Shopping as cultural immersion.",
              },
              {
                title: "Sensory Focus",
                description:
                  "Rooftop breakfasts. Hammam afternoons. Courtyard dinners. We build in the moments other tours rush past.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 mx-auto mb-5 border border-[#8B7355]/30 flex items-center justify-center">
                  <span className="font-serif text-xl text-[#8B7355]">{i + 1}</span>
                </div>
                <h3 className="font-serif text-xl text-[#2C2C2C] mb-3">{item.title}</h3>
                <p className="text-[#5C5C5C] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-6 bg-[#E8E4DF]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#2C2C2C] mb-6">
            Ready to begin?
          </h2>
          <p className="text-[#5C5C5C] mb-8 leading-relaxed">
            Tell us when you're thinking of traveling and we'll help you choose 
            the right journey. Or create something entirely your own.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="bg-[#2C2C2C] text-white px-8 py-4 text-xs tracking-[0.15em] uppercase hover:bg-[#3C3C3C] transition-colors"
            >
              Start Planning
            </Link>
            <Link
              href="/bespoke"
              className="border border-[#2C2C2C] text-[#2C2C2C] px-8 py-4 text-xs tracking-[0.15em] uppercase hover:bg-[#2C2C2C] hover:text-white transition-colors"
            >
              Go Bespoke
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

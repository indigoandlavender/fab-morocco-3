import { Metadata } from "next";
import FAQSchema from "@/components/seo/FAQSchema";

export const metadata: Metadata = {
  title: "Private Morocco Tours | Book Online",
  description: "Book private Morocco tours from €450. Sahara desert, Atlas Mountains, Imperial Cities. Fixed prices, clear itineraries. Pick your dates and go.",
  keywords: ["Morocco tours", "private Morocco tours", "Sahara desert tour", "Morocco desert trip", "Marrakech tours", "Morocco travel", "book Morocco tour"],
  openGraph: {
    title: "Private Morocco Tours | Book Online | Fab Morocco",
    description: "Ready-to-book private tours across Morocco. Fixed prices, clear itineraries. Just pick your dates.",
    url: "https://fabmorocco.com/tours",
  },
  alternates: {
    canonical: "https://fabmorocco.com/tours",
  },
};

const toursFAQs = [
  {
    question: "Are these tours private?",
    answer: "Yes, 100%. Every tour is just you and your group with a dedicated driver-guide. No strangers, no shared buses.",
  },
  {
    question: "Can I customize the itinerary?",
    answer: "Yes. Request changes and we'll confirm if it's included or quote extra. For something built from scratch, see our bespoke service.",
  },
  {
    question: "What's included in the price?",
    answer: "Private vehicle, driver/guide, accommodation, daily breakfast, desert camp experience (where applicable), and all entrance fees.",
  },
  {
    question: "How do I book?",
    answer: "Pick a tour, choose your dates, and book online. A 30% deposit secures your spot.",
  },
  {
    question: "What's your cancellation policy?",
    answer: "Full refund if you cancel more than 30 days before departure. After that, refunds decrease on a sliding scale—see our booking conditions for details.",
  },
];

export default function ToursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FAQSchema faqs={toursFAQs} />
      {children}
    </>
  );
}

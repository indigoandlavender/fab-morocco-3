import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bespoke Morocco Travel | Custom Itineraries",
  description: "Fully custom Morocco itineraries built from scratch. Tell us your vision—dates, interests, pace, budget—and we'll design a trip just for you.",
  openGraph: {
    title: "Bespoke Morocco Travel | Fab Morocco",
    description: "Custom itineraries designed around your vision. Personal consultation, detailed proposal, no commitment until you're happy.",
    url: "https://fabmorocco.com/bespoke",
  },
  alternates: {
    canonical: "https://fabmorocco.com/bespoke",
  },
};

export default function BespokeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

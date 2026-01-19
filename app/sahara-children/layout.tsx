import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Children of the Sahara | Our Commitment",
  description: "A portion of every desert tour supports nomadic families in the Moroccan Sahara. School supplies, education, and direct support for children who call the desert home.",
  openGraph: {
    title: "Children of the Sahara | Fab Morocco",
    description: "Supporting nomadic families in the Moroccan Sahara. A portion of every desert tour goes directly to the children who call this landscape home.",
    url: "https://fabmorocco.com/sahara-children",
  },
  alternates: {
    canonical: "https://fabmorocco.com/sahara-children",
  },
};

export default function SaharaChildrenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

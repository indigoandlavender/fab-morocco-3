"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

// Social Icons - flat, minimal style
function SocialIcon({ name }: { name: string }) {
  const icons: { [key: string]: JSX.Element } = {
    instagram: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25">
        <rect x="3" y="3" width="14" height="14" rx="4" />
        <circle cx="10" cy="10" r="3.5" />
        <circle cx="14.5" cy="5.5" r="0.75" fill="currentColor" />
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25">
        <circle cx="10" cy="10" r="8" />
        <path d="M10.5 17V10H13L13.5 7.5H10.5V6C10.5 5 11 4.5 12 4.5H13.5V2.5C13.5 2.5 12.5 2.5 11.5 2.5C9.5 2.5 8.5 3.5 8.5 5.5V7.5H6V10H8.5V17" />
      </svg>
    ),
    tripadvisor: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25">
        <circle cx="5.5" cy="11" r="3" />
        <circle cx="14.5" cy="11" r="3" />
        <circle cx="5.5" cy="11" r="1" fill="currentColor" />
        <circle cx="14.5" cy="11" r="1" fill="currentColor" />
        <path d="M1 8L3 6H17L19 8" />
        <path d="M10 6V4" />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25">
        <rect x="2" y="4" width="16" height="12" rx="3" />
        <path d="M8 7.5V12.5L13 10L8 7.5Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  };

  return icons[name] || null;
}

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// Site configuration
const siteConfig = {
  siteId: "fab-morocco",
  siteType: "planet" as const,
  siteCategory: "commercial" as const,
  brandName: "Fab Morocco",
};

// Languages available
const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

// Currencies available
const CURRENCIES = [
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "MAD", symbol: "DH", label: "Moroccan Dirham" },
];

interface FooterLink {
  order: number;
  label: string;
  href: string | null;
  type: string;
}

interface FooterColumn {
  number: number;
  title: string;
  links: FooterLink[];
}

interface FooterData {
  newsletter: {
    show: boolean;
    backgroundImage: string;
    title: string;
    description: string;
  };
  columns: FooterColumn[];
  legal: { label: string; href: string }[];
}

const defaultFooterData: FooterData = {
  newsletter: {
    show: true,
    backgroundImage: "",
    title: "Morocco, Reimagined",
    description: "Routes worth taking. Places worth staying. Stories worth knowing.",
  },
  columns: [
    {
      number: 1,
      title: "",
      links: [],
    },
    {
      number: 2,
      title: "Plan Your Trip",
      links: [
        { order: 1, label: "Tours", href: "/tours", type: "link" },
        { order: 2, label: "Booking Conditions", href: "/booking-conditions", type: "link" },
        { order: 3, label: "Payments & Refunds", href: "/booking-conditions#refunds", type: "link" },
        { order: 4, label: "FAQ", href: "/faq", type: "link" },
      ],
    },
    {
      number: 3,
      title: "Guides",
      links: [
        { order: 1, label: "Places", href: "/places", type: "link" },
        { order: 2, label: "The Edit", href: "/the-edit", type: "link" },
      ],
    },
    {
      number: 4,
      title: "",
      links: [
        { order: 1, label: "About Us", href: "/about", type: "link" },
        { order: 2, label: "Sahara Children", href: "/sahara-children", type: "link" },
        { order: 3, label: "Contact", href: "/contact", type: "link" },
      ],
    },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Intellectual Property", href: "/intellectual-property" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [newsletterImage, setNewsletterImage] = useState("");

  // Language & Currency state
  const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES[0]);
  const [currentCurrency, setCurrency] = useState(CURRENCIES[0]);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  // Fixed footer data - no API
  const footerData = defaultFooterData;

  // Fetch newsletter image from settings
  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        console.log("Settings API response:", data);
        if (data.success && data.settings) {
          console.log("Available settings keys:", Object.keys(data.settings));
          // Check for newsletter_background_image key (exact match from sheet)
          const img = data.settings["newsletter_background_image"] || 
                     data.settings.newsletter_background_image ||
                     data.settings["newsletter_image"] || 
                     data.settings.newsletter_image || "";
          console.log("Newsletter image found:", img);
          if (img) {
            setNewsletterImage(img);
          }
        }
      })
      .catch((err) => console.error("Settings fetch error:", err));
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubscribing) return;

    setIsSubscribing(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setSubscribed(true);
        setSubscribeMessage(data.message);
        setEmail("");
      } else {
        setSubscribeMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubscribeMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer>
      {/* ════════════════════════════════════════════════════════════════════
          LEVEL 1: Newsletter / CTA Section
          - Warm gradient background with subtle ombre effect
          ════════════════════════════════════════════════════════════════════ */}
      {footerData.newsletter.show && (
        <section className="relative py-16 md:py-20 bg-foreground overflow-hidden">
          {/* Background image from Google Sheet settings */}
          {newsletterImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={newsletterImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-bottom z-0"
            />
          ) : (
            <div className="absolute inset-0 bg-[#3d3a36] z-0" />
          )}
          <div className="absolute inset-0 bg-black/40 z-10" />

          <div className="relative z-20 container mx-auto px-6 lg:px-16 max-w-xl text-center">
            <h3 className="font-serif text-2xl md:text-3xl mb-3 text-white">
              {footerData.newsletter.title}
            </h3>
            <p className="text-white/80 mb-6 text-sm">
              {footerData.newsletter.description}
            </p>

            {subscribed ? (
              <p className="text-white/90 font-medium">{subscribeMessage || "You're subscribed!"}</p>
            ) : (
              <>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    disabled={isSubscribing}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="px-6 py-3 bg-white text-[#2C2925] font-semibold rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50"
                  >
                    {isSubscribing ? "..." : "Subscribe"}
                  </button>
                </form>
                {subscribeMessage && !subscribed && (
                  <p className="text-white/70 text-sm mt-3">{subscribeMessage}</p>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          LEVEL 2: Brand Content - Clean, sleek layout
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-12 bg-[#1A1714]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 md:gap-x-16">
            {/* Column 1: Brand */}
            <div>
              <Link href="/" className="inline-block mb-4">
                <span className="font-serif text-base tracking-[0.25em] text-white">
                  F A B<br />M O R O C C O
                </span>
              </Link>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Private tours across Morocco with local guides who know the land, the people, and the hidden places.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-4">
                <a href="https://instagram.com/fabmorocco" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="Instagram">
                  <SocialIcon name="instagram" />
                </a>
                <a href="https://facebook.com/fabmorocco" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="Facebook">
                  <SocialIcon name="facebook" />
                </a>
                <a href="https://tripadvisor.com/fabmorocco" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="TripAdvisor">
                  <SocialIcon name="tripadvisor" />
                </a>
              </div>
            </div>

            {/* Column 2: Plan Your Trip */}
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase mb-5 text-white/40">Plan Your Trip</h4>
              <ul className="space-y-3">
                <li><Link href="/tours" className="text-sm text-white/70 hover:text-white transition-colors">Tours</Link></li>
                <li><Link href="/booking-conditions" className="text-sm text-white/70 hover:text-white transition-colors">Booking Conditions</Link></li>
                <li><Link href="/booking-conditions#refunds" className="text-sm text-white/70 hover:text-white transition-colors">Payments & Refunds</Link></li>
                <li><Link href="/faq" className="text-sm text-white/70 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Column 3: Guides */}
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase mb-5 text-white/40">Guides</h4>
              <ul className="space-y-3">
                <li><Link href="/places" className="text-sm text-white/70 hover:text-white transition-colors">Places</Link></li>
                <li><Link href="/the-edit" className="text-sm text-white/70 hover:text-white transition-colors">The Edit</Link></li>
              </ul>
            </div>

            {/* Column 4: About */}
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase mb-5 text-white/40">About Us</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors">Who We Are</Link></li>
                <li><Link href="/sahara-children" className="text-sm text-white/70 hover:text-white transition-colors">Sahara Children</Link></li>
                <li><Link href="/contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          LEVEL 3: Legal & Preferences - Compact, sleek
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-6 bg-[#141210]">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Legal links left, Language/Currency right */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            {/* Legal links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {footerData.legal.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-xs text-white/40 hover:text-white/60 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Language & Currency selectors */}
            <div className="flex items-center gap-4">
              {/* Language selector */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowLanguageDropdown(!showLanguageDropdown);
                    setShowCurrencyDropdown(false);
                  }}
                  className="text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="6.5" />
                    <line x1="1.5" y1="8" x2="14.5" y2="8" />
                    <path d="M8 1.5C6 4 6 12 8 14.5" />
                    <path d="M8 1.5C10 4 10 12 8 14.5" />
                  </svg>
                  EN
                  <ChevronDown className="w-3 h-3" />
                </button>

                {showLanguageDropdown && (
                  <div className="absolute bottom-full right-0 mb-2 bg-[#1A1714] border border-white/10 shadow-xl py-1 min-w-[140px] z-50">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLanguage(lang);
                          setShowLanguageDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-white/5 transition-colors ${
                          currentLanguage.code === lang.code ? 'text-white' : 'text-white/50'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Currency selector */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowCurrencyDropdown(!showCurrencyDropdown);
                    setShowLanguageDropdown(false);
                  }}
                  className="text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1"
                >
                  {currentCurrency.symbol} {currentCurrency.code}
                  <ChevronDown className="w-3 h-3" />
                </button>

                {showCurrencyDropdown && (
                  <div className="absolute bottom-full right-0 mb-2 bg-[#1A1714] border border-white/10 shadow-xl py-1 min-w-[140px] z-50">
                    {CURRENCIES.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setCurrency(currency);
                          setShowCurrencyDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-white/5 transition-colors ${
                          currentCurrency.code === currency.code ? 'text-white' : 'text-white/50'
                        }`}
                      >
                        {currency.symbol} {currency.code}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Fab Morocco. All rights reserved.
          </p>
        </div>
      </section>
    </footer>
  );
}

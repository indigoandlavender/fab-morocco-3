"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-sm border-b border-border/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={`font-serif text-lg md:text-xl tracking-[0.15em] transition-colors duration-300 ${
              scrolled ? 'text-foreground' : 'text-white'
            }`}>
              F A B &nbsp; M O R O C C O
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/tours"
              className={`text-xs font-medium uppercase hover:opacity-60 transition-all duration-300 ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Tours
            </Link>
            <Link
              href="/tours/boutique"
              className={`text-xs font-medium uppercase hover:opacity-60 transition-all duration-300 ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Boutique
            </Link>
            <Link
              href="/bespoke"
              className={`text-xs font-medium uppercase hover:opacity-60 transition-all duration-300 ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Bespoke
            </Link>
            <Link
              href="/places"
              className={`text-xs font-medium uppercase hover:opacity-60 transition-all duration-300 ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Places
            </Link>
            <Link
              href="/about"
              className={`text-xs font-medium uppercase hover:opacity-60 transition-all duration-300 ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              About
            </Link>

            {/* Contact button */}
            <Link
              href="/contact"
              className="bg-primary text-primary-foreground px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 tap-target md:hidden transition-colors duration-300 ${
              scrolled ? 'text-foreground' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className={`md:hidden pb-6 pt-4 space-y-1 border-t px-4 -mx-4 ${
            scrolled 
              ? 'border-border bg-background' 
              : 'border-white/20 bg-black/80 backdrop-blur-sm'
          }`}>
            <Link
              href="/tours"
              className={`block text-sm font-medium uppercase py-3 hover:opacity-60 transition-opacity ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tours
            </Link>
            <Link
              href="/tours/boutique"
              className={`block text-sm font-medium uppercase py-3 hover:opacity-60 transition-opacity ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Boutique
            </Link>
            <Link
              href="/bespoke"
              className={`block text-sm font-medium uppercase py-3 hover:opacity-60 transition-opacity ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Bespoke
            </Link>
            <Link
              href="/places"
              className={`block text-sm font-medium uppercase py-3 hover:opacity-60 transition-opacity ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Places
            </Link>
            <Link
              href="/about"
              className={`block text-sm font-medium uppercase py-3 hover:opacity-60 transition-opacity ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            <div className="pt-4">
              <Link
                href="/contact"
                className="block bg-primary text-primary-foreground py-3 px-4 text-center text-sm tracking-[0.15em] uppercase font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

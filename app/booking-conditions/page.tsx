import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking Conditions | Payments & Refunds",
  description: "Booking conditions, payment terms, and refund policy for Fab Morocco tours. Clear pricing, transparent terms, no hidden fees.",
};

export default function BookingConditionsPage() {
  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
        <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-4">
          Policies
        </p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6">Booking Conditions</h1>
        <p className="text-foreground/60 mb-12 text-lg leading-relaxed">
          Clear terms, fair pricing, no surprises. Here's everything you need to know 
          before booking your Morocco tour.
        </p>

        <div className="space-y-16">
          {/* How to Book */}
          <section>
            <h2 className="font-serif text-2xl mb-6">How to Book</h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                <strong className="text-foreground">1. Get in touch.</strong> Message us on WhatsApp or 
                fill out the booking form with your dates, group size, and interests.
              </p>
              <p>
                <strong className="text-foreground">2. Receive your quote.</strong> We'll send you a 
                detailed itinerary and price. No obligation.
              </p>
              <p>
                <strong className="text-foreground">3. Confirm with deposit.</strong> Once you're happy 
                with the itinerary, a 30% deposit secures your booking.
              </p>
              <p>
                <strong className="text-foreground">4. Final payment.</strong> The remaining balance 
                is due 14 days before your tour starts.
              </p>
            </div>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="font-serif text-2xl mb-6">Payment Terms</h2>
            <div className="space-y-6">
              <div className="border-l-2 border-foreground/20 pl-6">
                <h3 className="font-medium mb-2">Deposit</h3>
                <p className="text-foreground/70 leading-relaxed">
                  A <strong className="text-foreground">30% deposit</strong> is required to confirm your booking. 
                  This secures your dates, accommodations, and vehicle. The deposit is non-refundable 
                  except in cases where we cancel your tour.
                </p>
              </div>
              
              <div className="border-l-2 border-foreground/20 pl-6">
                <h3 className="font-medium mb-2">Balance Payment</h3>
                <p className="text-foreground/70 leading-relaxed">
                  The remaining <strong className="text-foreground">70% balance</strong> is due 14 days before 
                  your tour departure date. For bookings made within 14 days of departure, 
                  full payment is required at the time of booking.
                </p>
              </div>
              
              <div className="border-l-2 border-foreground/20 pl-6">
                <h3 className="font-medium mb-2">Payment Methods</h3>
                <p className="text-foreground/70 leading-relaxed">
                  We accept bank transfer (EUR, USD, GBP), PayPal, and Wise. Payment details 
                  will be provided in your booking confirmation. Please note that all payments 
                  should be made in the currency quoted to avoid exchange rate discrepancies.
                </p>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section>
            <h2 className="font-serif text-2xl mb-6">Pricing</h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                All prices on our website are <strong className="text-foreground">per person</strong>, 
                based on two travelers sharing a room. Solo travelers, larger groups, 
                or requests for single rooms will affect the final price.
              </p>
              <p>
                Prices include: private vehicle, driver/guide, accommodation, daily breakfast, 
                desert camp experience (where applicable), and all entrance fees listed in your itinerary.
              </p>
              <p>
                Prices do not include: flights, travel insurance, lunches and dinners 
                (except where specified), tips, and personal expenses.
              </p>
              <p>
                <strong className="text-foreground">No hidden fees.</strong> The price we quote is the 
                price you pay. Any optional extras or upgrades will be clearly communicated 
                before you confirm.
              </p>
            </div>
          </section>

          {/* Changes to Bookings */}
          <section>
            <h2 className="font-serif text-2xl mb-6">Changes to Your Booking</h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                <strong className="text-foreground">Before final payment:</strong> We'll do our best 
                to accommodate changes to dates, itinerary, or group size at no extra charge, 
                subject to availability.
              </p>
              <p>
                <strong className="text-foreground">After final payment:</strong> Changes may incur 
                additional fees if hotels, vehicles, or other services need to be rebooked. 
                We'll always tell you the cost before making any changes.
              </p>
              <p>
                <strong className="text-foreground">Significant changes</strong> (different dates, 
                major itinerary overhaul) may be treated as a cancellation and rebooking.
              </p>
            </div>
          </section>

          {/* Cancellation & Refunds */}
          <section>
            <h2 className="font-serif text-2xl mb-6">Cancellation & Refunds</h2>
            <p className="text-foreground/70 leading-relaxed mb-6">
              We understand plans can change. However, when you book, we commit resources 
              on your behalf—hotels, vehicles, guides—that often cannot be recovered. 
              Our policy reflects this reality.
            </p>
            
            <div className="bg-sand p-6 mb-6">
              <h3 className="font-medium mb-4">Refund Schedule</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-foreground/10">
                  <span className="text-foreground/60">More than 30 days before departure</span>
                  <span className="font-medium">Full refund</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-foreground/10">
                  <span className="text-foreground/60">15–30 days before departure</span>
                  <span className="font-medium">70% refund (deposit forfeited)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-foreground/10">
                  <span className="text-foreground/60">7–14 days before departure</span>
                  <span className="font-medium">50% refund</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-foreground/60">Less than 7 days before departure</span>
                  <span className="font-medium">No refund</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                <strong className="text-foreground">Refund processing:</strong> Approved refunds will 
                be processed within 14 business days to your original payment method. Please note 
                that bank fees and exchange rate fluctuations may affect the final amount received.
              </p>
            </div>
          </section>

          {/* Cancellation by Us */}
          <section>
            <h2 className="font-serif text-2xl mb-6">Cancellation by Fab Morocco</h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                In the rare event that we must cancel your tour due to circumstances beyond 
                our control (force majeure, safety concerns, natural disasters, civil unrest), 
                you will receive a <strong className="text-foreground">full refund</strong> or 
                the option to reschedule at no additional cost.
              </p>
              <p>
                We will never cancel a confirmed tour for commercial reasons. Once your booking 
                is confirmed, your tour is guaranteed.
              </p>
            </div>
          </section>

          {/* Travel Insurance */}
          <section>
            <h2 className="font-serif text-2xl mb-6">Travel Insurance</h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                <strong className="text-foreground">We strongly recommend</strong> purchasing 
                comprehensive travel insurance that includes trip cancellation, medical coverage, 
                and emergency evacuation. This protects you from unforeseen circumstances that 
                may require you to cancel or cut short your trip.
              </p>
              <p>
                Your policy should cover the full cost of your tour. We recommend purchasing 
                insurance as soon as you book, as many policies have time limits for cancellation coverage.
              </p>
              <p>
                We are not liable for costs arising from circumstances outside our control, 
                including but not limited to: flight delays/cancellations, illness, injury, 
                lost luggage, or visa issues.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="pt-8 border-t border-foreground/10">
            <h2 className="font-serif text-2xl mb-4">Questions?</h2>
            <p className="text-foreground/70 leading-relaxed mb-6">
              If anything is unclear, just ask. We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/212618070450?text=Hi!%20I%20have%20a%20question%20about%20booking%20conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 text-sm font-medium hover:bg-[#20bd5a] transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-foreground px-6 py-3 text-sm hover:bg-foreground hover:text-background transition-colors"
              >
                Contact Page
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

declare global {
  interface Window {
    paypal?: any;
  }
}

const PAYPAL_CLIENT_ID = "AWVf28iPmlVmaEyibiwkOtdXAl5UPqL9i8ee9yStaG6qb7hCwNRB2G95SYwbcikLnBox6CGyO-boyAvu";

interface TourBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: {
    slug: string;
    title: string;
    price: number;
  };
}

function DropdownArrow() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
      <svg className="w-4 h-4 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

function PayPalButton({
  amount,
  description,
  onSuccess,
  onError,
}: {
  amount: string;
  description: string;
  onSuccess: (orderId: string) => void;
  onError: (err: any) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const buttonsInstance = useRef<any>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const renderButton = async () => {
      if (!containerRef.current || !window.paypal || !isMounted.current) return;

      try {
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }

        buttonsInstance.current = window.paypal.Buttons({
          style: { layout: "vertical", color: "black", shape: "rect", label: "pay", height: 50 },
          createOrder: (_: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{ description, amount: { value: amount, currency_code: "EUR" } }],
            });
          },
          onApprove: async (_: any, actions: any) => {
            if (!isMounted.current) return;
            const order = await actions.order.capture();
            onSuccess(order.id);
          },
          onError: (err: any) => {
            if (!isMounted.current) return;
            onError(err);
          },
        });

        if (containerRef.current && isMounted.current) {
          await buttonsInstance.current.render(containerRef.current);
          if (isMounted.current) {
            setLoading(false);
          }
        }
      } catch (err) {
        console.error("PayPal render error:", err);
        if (isMounted.current) {
          setError(true);
          setLoading(false);
        }
      }
    };

    const initPayPal = () => {
      if (window.paypal) {
        renderButton();
      } else {
        const existingScript = document.querySelector('script[src*="paypal.com/sdk"]');
        if (!existingScript) {
          const script = document.createElement("script");
          script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=EUR`;
          script.async = true;
          script.onload = () => {
            if (isMounted.current) renderButton();
          };
          script.onerror = () => {
            if (isMounted.current) {
              setError(true);
              setLoading(false);
            }
          };
          document.head.appendChild(script);
        } else {
          const checkInterval = setInterval(() => {
            if (window.paypal) {
              clearInterval(checkInterval);
              if (isMounted.current) renderButton();
            }
          }, 100);
          
          setTimeout(() => {
            clearInterval(checkInterval);
            if (isMounted.current && !window.paypal) {
              setError(true);
              setLoading(false);
            }
          }, 10000);
        }
      }
    };

    requestAnimationFrame(initPayPal);

    return () => {
      isMounted.current = false;
      if (buttonsInstance.current && typeof buttonsInstance.current.close === "function") {
        try {
          buttonsInstance.current.close();
        } catch (e) {}
      }
    };
  }, [amount, description, onSuccess, onError]);

  if (error) {
    return (
      <div className="text-center py-6">
        <p className="text-red-600 text-sm mb-4">Unable to load payment. Please try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="text-xs underline text-foreground/50 hover:text-foreground"
        >
          Refresh page
        </button>
      </div>
    );
  }

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
        </div>
      )}
      <div ref={containerRef} className={loading ? "opacity-0 h-0" : ""} />
    </div>
  );
}

export default function TourBookingModal({ isOpen, onClose, tour }: TourBookingModalProps) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [requests, setRequests] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const getBillableUnits = (travelers: number): number => {
    if (travelers <= 2) return 1;
    return Math.ceil(travelers / 2);
  };
  
  const billableUnits = getBillableUnits(guests);
  const basePrice = tour.price; // Price for 2 guests
  const totalPrice = basePrice * billableUnits;

  const countryCodes = ["+1", "+44", "+61", "+33", "+49", "+34", "+39", "+31", "+41", "+971", "+212", "+91", "+81"];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => {
        setStep(1);
        setDate("");
        setGuests(2);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setRequests("");
        setBookingId("");
      }, 300);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  };

  const handlePaymentSuccess = async (paypalOrderId: string) => {
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourName: tour.title,
          tourSlug: tour.slug,
          tourDate: date,
          guests,
          firstName,
          lastName,
          email,
          phone: phone ? `${countryCode} ${phone}` : "",
          total: totalPrice,
          paypalOrderId,
          paypalStatus: "COMPLETED",
          specialRequests: requests,
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        setBookingId(data.bookingId);
        setStep(4);
      }
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentError = (err: any) => {
    console.error("Payment error:", err);
    alert("Payment failed. Please try again.");
  };

  const canProceedStep1 = date && guests >= 2;
  const canProceedStep2 = firstName && lastName && email;

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div className="relative bg-background w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-foreground/40 hover:text-foreground z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {step === 1 && (
            <div className="animate-fadeIn">
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-2">Step 1 of 3</p>
              <h2 className="font-serif text-2xl mb-1">{tour.title}</h2>
              <p className="text-sm text-foreground/50 mb-8">€{tour.price} for 2 guests</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] tracking-wider uppercase text-foreground/40 mb-2">Travel Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full py-3 bg-transparent border-b border-foreground/20 focus:border-foreground/40 focus:outline-none text-foreground transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-wider uppercase text-foreground/40 mb-2">Number of Guests</label>
                  <div className="relative">
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full py-3 bg-transparent border-b border-foreground/20 focus:border-foreground/40 focus:outline-none text-foreground transition-colors appearance-none cursor-pointer"
                    >
                      {[2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>{n} guests</option>
                      ))}
                    </select>
                    <DropdownArrow />
                  </div>
                </div>

                <div className="bg-foreground/[0.03] p-4 mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground/50">€{basePrice} × {billableUnits}{billableUnits > 1 ? ` (${guests} guests)` : ''}</span>
                    <span>€{totalPrice}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-foreground/10">
                    <span className="font-medium">Total</span>
                    <span className="font-serif text-lg">€{totalPrice}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="w-full mt-8 py-4 bg-foreground text-background text-sm tracking-wider uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
              >
                Continue
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="5,2 10,7 5,12" />
                </svg>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fadeIn">
              <p className="text-sm text-foreground/50 mb-1">{tour.title}</p>
              <p className="text-xs text-foreground/40 mb-6">{formatDate(date)} · {guests} guests · €{totalPrice}</p>
              
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-2">Step 2 of 3</p>
              <h2 className="font-serif text-2xl mb-8">Your Details</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-wider uppercase text-foreground/40 mb-2">First name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full py-3 bg-transparent border-b border-foreground/20 focus:border-foreground/40 focus:outline-none text-foreground transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-wider uppercase text-foreground/40 mb-2">Last name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full py-3 bg-transparent border-b border-foreground/20 focus:border-foreground/40 focus:outline-none text-foreground transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-wider uppercase text-foreground/40 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3 bg-transparent border-b border-foreground/20 focus:border-foreground/40 focus:outline-none text-foreground transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-wider uppercase text-foreground/40 mb-2">
                    Phone <span className="normal-case text-foreground/30">(optional)</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative w-20">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full py-3 bg-transparent border-b border-foreground/20 focus:border-foreground/40 focus:outline-none text-foreground transition-colors appearance-none cursor-pointer text-sm"
                      >
                        {countryCodes.map((code) => (
                          <option key={code} value={code}>{code}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 py-3 bg-transparent border-b border-foreground/20 focus:border-foreground/40 focus:outline-none text-foreground transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-wider uppercase text-foreground/40 mb-2">
                    Special requests <span className="normal-case text-foreground/30">(optional)</span>
                  </label>
                  <textarea
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    rows={2}
                    className="w-full py-3 bg-transparent border-b border-foreground/20 focus:border-foreground/40 focus:outline-none text-foreground transition-colors resize-none"
                    placeholder="Dietary needs, pickup location..."
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 border border-foreground/20 text-foreground/70 text-sm tracking-wider uppercase hover:border-foreground/40 hover:text-foreground transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="9,2 4,7 9,12" />
                  </svg>
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 py-4 bg-foreground text-background text-sm tracking-wider uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
                >
                  Continue
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="5,2 10,7 5,12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fadeIn">
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-2">Step 3 of 3</p>
              <h2 className="font-serif text-2xl mb-8">Payment</h2>

              <div className="bg-foreground/[0.03] p-4 mb-6">
                <p className="font-serif text-lg mb-1">{tour.title}</p>
                <p className="text-sm text-foreground/50 mb-3">{formatDate(date)} · {guests} guests</p>
                
                <div className="flex justify-between pt-3 border-t border-foreground/10">
                  <span className="font-medium">Total</span>
                  <span className="font-serif text-lg">€{totalPrice}</span>
                </div>
              </div>

              <PayPalButton
                amount={totalPrice.toFixed(2)}
                description={`${tour.title} - ${formatDate(date)}`}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />

              {isSubmitting && (
                <p className="text-center text-sm text-foreground/50 mt-4">Processing booking...</p>
              )}

              <button
                onClick={() => setStep(2)}
                className="w-full mt-6 py-4 border border-foreground/20 text-foreground/70 text-sm tracking-wider uppercase hover:border-foreground/40 hover:text-foreground transition-colors flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="9,2 4,7 9,12" />
                </svg>
                Back
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-4 animate-fadeIn">
              <div className="w-16 h-16 border border-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="6,14 12,20 22,8" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl mb-2">Booking Confirmed!</h3>
              <p className="text-sm text-foreground/50 mb-2">Booking ID: {bookingId}</p>
              <p className="text-sm text-foreground/50 mb-6">Confirmation sent to {email}</p>
              
              <div className="bg-foreground/[0.03] p-4 mb-6 text-left text-sm">
                <p className="mb-1"><strong>Tour:</strong> {tour.title}</p>
                <p className="mb-1"><strong>Date:</strong> {formatDate(date)}</p>
                <p className="mb-1"><strong>Guests:</strong> {guests}</p>
                <p><strong>Total Paid:</strong> €{totalPrice}</p>
              </div>

              <p className="text-sm text-foreground/50 mb-6">
                You'll receive pickup details and trip information by email.
              </p>

              <a
                href="https://wa.me/212618070450?text=Hi!%20I%20just%20booked%20a%20tour."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 text-sm font-medium hover:bg-[#128C7E] transition-colors mb-4 w-full"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message Mohammed
              </a>

              <button
                onClick={onClose}
                className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 hover:text-foreground transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
}

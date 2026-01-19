"use client";

import { useState } from "react";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: Connect to API
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="bg-[#2C2925] min-h-screen text-white">
      {/* Contact Form Section */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left - Title */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">
                Get in Touch
              </p>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-white mb-6">
                Send us
                <br />
                a note.
              </h1>
              <p className="text-sm text-white/50 leading-relaxed max-w-sm">
                Questions about a tour? Want to discuss a custom itinerary? We'd love to hear from you.
              </p>
            </div>

            {/* Right - Form */}
            <div>
              {submitted ? (
                <div className="py-10">
                  <h3 className="font-serif text-xl text-white mb-3">Thank you.</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    We've received your message and will be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-3">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-3">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-3">
                      Message (Optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white focus:outline-none focus:border-white/50 transition-colors resize-none placeholder:text-white/30"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-block bg-white text-[#2C2925] px-8 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
                    >
                      {submitting ? "Sending..." : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

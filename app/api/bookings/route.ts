import { NextResponse } from "next/server";
import { google } from "googleapis";

export const revalidate = 0;

// Google Sheets authentication
function getGoogleSheetsClient() {
  const base64Creds = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
  if (!base64Creds) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_BASE64 is not set");
  }

  const credentials = JSON.parse(
    Buffer.from(base64Creds, "base64").toString("utf-8")
  );

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

// Write booking to Google Sheets
async function addBookingToSheet(booking: {
  booking_id: string;
  tour_name: string;
  tour_slug: string;
  tour_date: string;
  guests: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  total_eur: string;
  paypal_order_id: string;
  special_requests?: string;
}): Promise<boolean> {
  const SHEET_ID = process.env.GOOGLE_SHEET_ID;
  
  if (!SHEET_ID) {
    console.error("GOOGLE_SHEET_ID not configured");
    return false;
  }

  try {
    const sheets = getGoogleSheetsClient();
    const now = new Date().toISOString();
    
    // Build row for Bookings tab
    // Headers: booking_id, source, status, tour_name, tour_slug, tour_date, guests, first_name, last_name, email, phone, total_eur, paypal_order_id, special_requests, created_at
    const row = [
      booking.booking_id,
      "Website",
      "confirmed",
      booking.tour_name,
      booking.tour_slug,
      booking.tour_date,
      String(booking.guests),
      booking.first_name,
      booking.last_name,
      booking.email,
      booking.phone,
      booking.total_eur,
      booking.paypal_order_id,
      booking.special_requests || "",
      now,
    ];

    // Append to Bookings tab
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Bookings!A:A",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });
    
    console.log(`Booking ${booking.booking_id} written to sheet`);
    return true;
  } catch (error) {
    console.error("Error writing booking to sheet:", error);
    return false;
  }
}

// Send confirmation emails using Resend
async function sendBookingEmails(booking: {
  booking_id: string;
  tour_name: string;
  tour_date: string;
  guests: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  total_eur: string;
  paypal_order_id: string;
  special_requests?: string;
}) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    console.log("RESEND_API_KEY not configured, skipping emails");
    return;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(RESEND_API_KEY);

    // Format date nicely
    const dateObj = new Date(booking.tour_date);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // Guest confirmation email
    const guestEmailHtml = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h1 style="font-weight: normal; font-size: 28px; margin-bottom: 24px;">Booking Confirmed</h1>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
          Dear ${booking.first_name},
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          Thank you for booking with Fab Morocco. Your tour is confirmed!
        </p>
        
        <div style="background: #f8f5f0; padding: 24px; margin-bottom: 24px;">
          <h2 style="font-size: 18px; margin: 0 0 16px 0; font-weight: normal;">Booking Details</h2>
          <p style="margin: 8px 0;"><strong>Booking ID:</strong> ${booking.booking_id}</p>
          <p style="margin: 8px 0;"><strong>Tour:</strong> ${booking.tour_name}</p>
          <p style="margin: 8px 0;"><strong>Date:</strong> ${formattedDate}</p>
          <p style="margin: 8px 0;"><strong>Guests:</strong> ${booking.guests}</p>
          <p style="margin: 8px 0;"><strong>Total Paid:</strong> ${booking.total_eur}</p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
          Mohammed will contact you within 24 hours to confirm pickup details and answer any questions.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 8px;">
          <strong>WhatsApp:</strong> <a href="https://wa.me/212618070450" style="color: #25D366;">+212 618 070 450</a>
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; margin-top: 32px;">
          We look forward to showing you Morocco!
        </p>
        
        <p style="font-size: 14px; color: #666; margin-top: 32px;">
          — The Fab Morocco Team
        </p>
      </div>
    `;

    // Send to guest
    await resend.emails.send({
      from: "Fab Morocco <bookings@fabmorocco.com>",
      to: booking.email,
      subject: `Booking Confirmed - ${booking.tour_name}`,
      html: guestEmailHtml,
    });
    console.log("Guest confirmation email sent");

    // Send notification to owner
    const ownerEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2>New Tour Booking - ${booking.booking_id}</h2>
        <p><strong>Tour:</strong> ${booking.tour_name}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Guests:</strong> ${booking.guests}</p>
        <p><strong>Guest:</strong> ${booking.first_name} ${booking.last_name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone || "Not provided"}</p>
        <p><strong>Total:</strong> ${booking.total_eur}</p>
        <p><strong>PayPal Order:</strong> ${booking.paypal_order_id}</p>
        ${booking.special_requests ? `<p><strong>Notes:</strong> ${booking.special_requests}</p>` : ""}
      </div>
    `;

    await resend.emails.send({
      from: "Fab Morocco Bookings <bookings@fabmorocco.com>",
      to: "hello@fabmorocco.com",
      subject: `New Booking: ${booking.tour_name} - ${booking.first_name} ${booking.last_name}`,
      html: ownerEmailHtml,
    });
    console.log("Owner notification email sent");
  } catch (error) {
    console.error("Failed to send booking emails:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const bookingId = `FAB-${Date.now()}`;

    const {
      tourName,
      tourSlug,
      tourDate,
      guests,
      firstName,
      lastName,
      email,
      phone,
      total,
      paypalOrderId,
      paypalStatus,
      specialRequests,
    } = body;

    // Only store if payment is confirmed
    if (paypalStatus === "COMPLETED") {
      const bookingData = {
        booking_id: bookingId,
        tour_name: tourName,
        tour_slug: tourSlug || "",
        tour_date: tourDate,
        guests: guests || 2,
        first_name: firstName,
        last_name: lastName,
        email: email || "",
        phone: phone || "",
        total_eur: `€${total || 0}`,
        paypal_order_id: paypalOrderId || "",
        special_requests: specialRequests || "",
      };

      // Write to sheet
      const sheetSuccess = await addBookingToSheet(bookingData);
      
      if (!sheetSuccess) {
        console.error("Failed to write booking to sheet - continuing anyway");
      }

      // Send confirmation emails
      if (email) {
        try {
          await sendBookingEmails(bookingData);
        } catch (emailError) {
          console.error("Failed to send booking emails:", emailError);
        }
      }
      
      return NextResponse.json({ 
        success: true, 
        bookingId,
        message: "Booking confirmed"
      });
    }
    
    // For non-completed payments
    return NextResponse.json({ 
      success: false, 
      error: "Payment not completed",
      paypalStatus 
    }, { status: 400 });
    
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Server error" 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Tour bookings endpoint" 
  });
}

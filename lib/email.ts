import { Resend } from 'resend';
import { createEvent } from 'ics';
import { format, parseISO, addHours } from 'date-fns';



type BookingDetails = {
    id: string;
    name: string;
    email: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    guests: string;
    branch: string;
    phone: string;
};

export async function sendBookingEmail(booking: BookingDetails) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is missing. Skipping email sending.");
        return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const startDateTime = parseISO(`${booking.date}T${booking.time}`);
    const endDateTime = addHours(startDateTime, 2);

    // Generate ICS
    const event = {
        start: [
            startDateTime.getFullYear(),
            startDateTime.getMonth() + 1,
            startDateTime.getDate(),
            startDateTime.getHours(),
            startDateTime.getMinutes()
        ] as [number, number, number, number, number],
        duration: { hours: 2, minutes: 0 },
        title: `Dinner Reservation at ThaanFai (${booking.branch})`,
        description: `Reservation for ${booking.guests} people.\nName: ${booking.name}\nPhone: ${booking.phone}`,
        location: booking.branch === 'rama9' ? 'ThaanFai Rama 9' : 'ThaanFai Liabduan',
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        organizer: { name: 'ThaanFai Admin', email: 'admin@thaanfai.com' },
        attendees: [
            { name: booking.name, email: booking.email, rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' }
        ]
    };

    let icsContent = '';
    // @ts-ignore - ics types might be slightly off
    createEvent(event, (error, value) => {
        if (error) {
            console.error("Error creating ICS event:", error);
            return;
        }
        icsContent = value;
    });

    const cancellationLink = `${process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/bookings/${booking.id}/cancel`;

    try {
        await resend.emails.send({
            from: 'ThaanFai Reservations <reservations@thaanfai.com>', // User needs to verify domain or use 'onboarding@resend.dev' for testing
            to: [booking.email],
            subject: 'Reservation Confirmed - ThaanFai',
            html: `
                <div style="font-family: sans-serif; max-w-600px; margin: 0 auto; color: #333;">
                    <h1 style="color: #d4a373;">Reservation Confirmed</h1>
                    <p>Dear ${booking.name},</p>
                    <p>We look forward to welcoming you to <strong>ThaanFai ${booking.branch}</strong>.</p>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>Date:</strong> ${format(startDateTime, 'PPP')}</p>
                        <p style="margin: 5px 0;"><strong>Time:</strong> ${booking.time}</p>
                        <p style="margin: 5px 0;"><strong>Guests:</strong> ${booking.guests}</p>
                    </div>
                    <p>A calendar invite has been attached to this email.</p>
                    <p style="margin-top: 30px; font-size: 0.9em; color: #666;">
                        Need to cancel? <a href="${cancellationLink}" style="color: #e63946;">Click here to cancel reservation</a>
                    </p>
                </div>
            `,
            attachments: [
                {
                    filename: 'reservation.ics',
                    content: Buffer.from(icsContent).toString('base64'),
                    // @ts-ignore
                    encoding: 'base64', // Resend expects content as string, base64 for binary
                    contentType: 'text/calendar'
                }
            ]
        });
        console.log(`Email sent to ${booking.email}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

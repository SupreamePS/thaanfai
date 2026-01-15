import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { sendBookingEmail } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { branch, date, time, guests, name, phone, email } = body;

        // Server-side validation could go here
        const timestamp = new Date().toISOString();
        const status = 'confirmed';

        const query = `
      INSERT INTO bookings (timestamp, branch, date, time, guests, name, phone, email, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `;

        const values = [timestamp, branch, date, time, guests, name, phone, email, status];

        const client = await pool.connect();
        try {
            const result = await client.query(query, values);
            const bookingId = result.rows[0].id;

            // Send confirmation email asynchronously (don't block response)
            sendBookingEmail({
                id: bookingId,
                name,
                email,
                date,
                time,
                guests,
                branch,
                phone
            }).catch(err => console.error("Failed to send email:", err));

            return NextResponse.json({ id: bookingId }, { status: 201 });
        } finally {
            client.release();
        }

    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const client = await pool.connect();
        try {
            const query = 'SELECT id, timestamp, branch, date, time, guests, name, phone, email, status FROM bookings ORDER BY id DESC';
            const result = await client.query(query);
            return NextResponse.json(result.rows);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

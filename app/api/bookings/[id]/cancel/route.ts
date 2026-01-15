import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const client = await pool.connect();
        try {
            // Update status to 'cancelled'
            await client.query('UPDATE bookings SET status = $1 WHERE id = $2', ['cancelled', id]);

            // Redirect to a cancellation success page
            const url = new URL(request.url);
            return NextResponse.redirect(new URL('/book-table?cancelled=true', url.origin));
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error cancelling booking:', error);
        return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
    }
}

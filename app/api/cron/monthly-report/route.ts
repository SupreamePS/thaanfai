import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Resend } from 'resend';
import * as XLSX from 'xlsx';
import { subMonths, startOfMonth, endOfMonth, format } from 'date-fns';


export async function GET(request: Request) {
    // 1. Authorization Check
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        // 2. Determine Date Range (Previous Month)
        const now = new Date();
        const prevMonthDate = subMonths(now, 1);
        const startDate = startOfMonth(prevMonthDate).toISOString();
        const endDate = endOfMonth(prevMonthDate).toISOString();

        // 3. Fetch Bookings
        const client = await pool.connect();
        let bookings = [];
        try {
            const query = `
                SELECT * FROM bookings 
                WHERE timestamp >= $1 AND timestamp <= $2
                ORDER BY timestamp ASC
            `;
            const result = await client.query(query, [startDate, endDate]);
            bookings = result.rows;
        } finally {
            client.release();
        }

        if (bookings.length === 0) {
            return NextResponse.json({ message: 'No bookings found for previous month.' });
        }

        // 4. Generate Excel
        const worksheet = XLSX.utils.json_to_sheet(bookings);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        // 5. Send Email
        const monthName = format(prevMonthDate, 'MMMM yyyy');
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@thaanfai.com'; // Fallback needs to be valid

        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is missing. Cannot send monthly report.");
            return NextResponse.json({ error: 'Configuration Error: Missing Email API Key' }, { status: 500 });
        }
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'ThaanFai Reports <reports@thaanfai.com>',
            to: adminEmail,
            subject: `Monthly Booking Report - ${monthName}`,
            html: `<p>Attached is the booking report for <strong>${monthName}</strong>.</p>
                   <p>Total Bookings: ${bookings.length}</p>
                   <p><em>Note: These records have been deleted from the database as per policy.</em></p>`,
            attachments: [
                {
                    filename: `bookings-report-${format(prevMonthDate, 'yyyy-MM')}.xlsx`,
                    content: excelBuffer,
                }
            ]
        });

        // 6. Delete Bookings
        const deleteClient = await pool.connect();
        try {
            // Re-run query/delete logic safely
            await deleteClient.query(
                'DELETE FROM bookings WHERE timestamp >= $1 AND timestamp <= $2',
                [startDate, endDate]
            );
        } finally {
            deleteClient.release();
        }

        return NextResponse.json({ message: `Report sent and ${bookings.length} bookings deleted.` });

    } catch (error) {
        console.error('Cron job error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

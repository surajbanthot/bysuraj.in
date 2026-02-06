import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const payload = await request.json();

        // Check if it's a Film Enquiry (has 'email' or 'project' field)
        if ('email' in payload || 'project' in payload) {
            const { name, email, project, location, date, budget, message } = payload;
            const data = await resend.emails.send({
                from: 'Portfolio Enquiry <onboarding@resend.dev>',
                to: ['surajcommercial@gmail.com'],
                subject: 'New Medium Format Film Enquiry',
                html: `
          <h2>New Film Enquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Type:</strong> ${project}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <p><strong>Project Notes:</strong></p>
          <p>${message}</p>
        `,
            });
            return NextResponse.json(data);
        }

        // Default to Phone Enquiry
        const { phone, note } = payload;
        const data = await resend.emails.send({
            from: 'Portfolio Enquiry <onboarding@resend.dev>',
            to: ['surajcommercial@gmail.com'],
            subject: 'New Phone Enquiry from Portfolio',
            html: `
        <h2>New Phone Enquiry Received</h2>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${note}</p>
      `,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const escapeHtml = (value: unknown) =>
    String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const { name, email, project, budget, message } = payload;

        if (!name || !email || typeof name !== "string" || typeof email !== "string") {
            return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });
        }

        const resend = new Resend(apiKey);
        const data = await resend.emails.send({
            from: 'Portfolio Enquiry <onboarding@resend.dev>',
            to: ['surajcommercial@gmail.com'],
            replyTo: email,
            subject: `Portfolio enquiry from ${name.slice(0, 100)}`,
            html: `
        <h2>New portfolio enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Project type:</strong> ${escapeHtml(project)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      `,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

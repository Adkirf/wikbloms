// pages/api/contact.js
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        const { name, phone, email, message } = await req.json();

        // Verify environment variables
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_RECEIVER) {
            console.error('Missing email configuration environment variables');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Create transporter with more detailed configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Contacto" <${process.env.EMAIL_USER}>`, // This format is more reliable
            replyTo: email, // The actual sender's email for replies
            to: process.env.EMAIL_RECEIVER,
            subject: `Has sido contactado por ${name}`,
            text: `
Name: ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}
            `,
            html: `
<h2>Nuevo Mensaje de</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
            `
        };

        try {
            // Verify connection configuration
            await transporter.verify();

            // Send the email
            const info = await transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);

            return NextResponse.json({
                message: 'Email sent successfully!',
                messageId: info.messageId
            });
        } catch (error) {
            console.error('Error sending email:', error);
            return NextResponse.json(
                { error: 'Failed to send email', details: error },
                { status: 500 }
            );
        }
    } else {
        return NextResponse.json(
            { error: 'Method not allowed' },
            { status: 405 }
        );
    }
}



/* export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            host: 'smtp.simply.com',
            port: 587,
            secure: false, // Use STARTTLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_RECEIVER,
            subject: `Contact Form Submission from ${name}`,
            text: `You have a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
 */
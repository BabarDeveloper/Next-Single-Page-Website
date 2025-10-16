import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Insert data into Supabase
    const { data, error } = await supabaseAdmin
      .from('contacts')
      .insert([
        {
          name,
          email,
          subject,
          message
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save contact form' },
        { status: 500 }
      )
    }

    // Send email using Resend (non-blocking)
    try {
      await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'babardeveloper2@gmail.com',
        subject: `New Contact Form: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #3B82F6; color: white; padding: 20px; text-align: center;">
              <h1>New Contact Form Submission</h1>
            </div>
            <div style="background: #f9f9f9; padding: 20px;">
              <div style="margin-bottom: 15px;">
                <strong style="color: #3B82F6;">Name:</strong> ${name}
              </div>
              <div style="margin-bottom: 15px;">
                <strong style="color: #3B82F6;">Email:</strong> ${email}
              </div>
              <div style="margin-bottom: 15px;">
                <strong style="color: #3B82F6;">Subject:</strong> ${subject}
              </div>
              <div style="margin-bottom: 15px;">
                <strong style="color: #3B82F6;">Message:</strong>
                <p style="background: white; padding: 10px; border-radius: 5px; margin-top: 5px;">${message}</p>
              </div>
              <div style="margin-bottom: 15px;">
                <strong style="color: #3B82F6;">Submitted At:</strong> ${new Date().toLocaleString()}
              </div>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      // Don't throw error if email fails, just log it
      console.error('Email sending failed:', emailError)
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        data 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
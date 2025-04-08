// pages/api/send-sms.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import Twilio from 'twilio'

// Twilio credentials - Set these in your environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID as string
const authToken = process.env.TWILIO_AUTH_TOKEN as string
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER as string

const client = new Twilio(accountSid, authToken)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phoneNumber, message } = req.body

    if (!phoneNumber || !message) {
      return res.status(400).json({ error: 'Phone number and message are required' })
    }

    try {
      // Send SMS using Twilio
      const response = await client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: phoneNumber,
      })

      return res.status(200).json({ success: true, messageSid: response.sid })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  } else {
    // Only POST requests are allowed
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}

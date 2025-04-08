// pages/index.tsx
import { useState } from 'react'

export default function SendSms() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic form validation
    if (!phoneNumber || !message) {
      setStatus('Please fill in both fields.')
      return
    }

    try {
      setStatus('Sending SMS...')
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, message }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('Message sent successfully!')
      } else {
        setStatus(`Error: ${data.error}`)
      }
    } catch (error) {
      setStatus('Error sending message.')
    }
  }

  return (
    <div>
      <h1>Send SMS</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          />
        </div>
        <button type="submit">Send SMS</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  )
}

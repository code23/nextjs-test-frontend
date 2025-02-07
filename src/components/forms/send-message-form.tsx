'use client'

import { Button, Input } from '@heroui/react'
import { useState } from 'react'

interface SendMessageProps {
  channelName: string
  recipient_id: string
}

export default function SendMessageForm({
  channelName,
  recipient_id,
}: SendMessageProps) {
  const [message, setMessage] = useState('')

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value)
  }

  const handleSendMessage = async () => {
    try {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            body: message,
            files: null,
          },
          is_update: false,
          channel_name: channelName,
          recipient_id: recipient_id,
        }),
      })

      const data = await response.json()
      if (!response.ok || data.error) throw new Error(data.error)
      setMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div className="flex gap-5 w-[50%] items-center">
      <Input
        label="Message"
        placeholder="Write a Message"
        name="message"
        type="text"
        value={message}
        onChange={handleMessageChange}
      />
      <Button
        type="button"
        className="w-[30%] flex items-center"
        onPress={handleSendMessage}
      >
        Send Message
      </Button>
    </div>
  )
}

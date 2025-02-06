'use client'
import { Button, Input } from '@heroui/react'
import { useState } from 'react'

interface SendmessageProps {
    channelName: string
}

export default function Sendmessage({ channelName }: SendmessageProps) {
    const [message, setMessage] = useState('')
    const handlemessagechange = (event: any) => {
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
                    },
                    is_update: false,
                    channel_name: channelName,
                },
                ),
            })
            const results = await response.json()
            if (!response.ok || results.error) throw new Error(results)
            setMessage('')
        } catch (error) {
            console.error('Error fetching addresses:', error)
        }
    }

    return (
        <div className="flex gap-5 w-[50%] items-center">
            <Input
                label="Message"
                placeholder="Write a Message"
                name="message"
                type="text"
                onChange={handlemessagechange}
            />
            <Button
                type="button"
                className="w-[30%] flex items-center"
                onClick={handleSendMessage}
            >
                Send Message
            </Button>
        </div>
    )
}

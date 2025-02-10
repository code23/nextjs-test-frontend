'use client'

import { Code } from '@heroui/react'
import { useState } from 'react'
import { Button } from '@heroui/react'

interface LoadMoreMessagesProps {
  initialMessages: any[]
  channelId: string
}

export default function LoadMoreMessages({
  initialMessages,
  channelId,
}: LoadMoreMessagesProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    try {
      setLoading(true)
      const nextPage = page + 1

      const response = await fetch('/api/messages/load-more', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channelId,
          page: nextPage,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to load more messages')
      }

      const result = await response.json()
      setMessages([...messages, ...result.data])
      setPage(nextPage)
    } catch (error) {
      console.error('Error loading more messages:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {messages.map((message: any, index: number) => (
          <div className="w-full" key={message.id || index}>
            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
              {JSON.stringify(message, null, 2)}
            </Code>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-6">
        <Button
          onPressStart={loadMore}
          disabled={loading}
          radius="full"
          color="secondary"
        >
          {loading ? 'Loading...' : 'Load More Messages'}
        </Button>
      </div>
    </div>
  )
}

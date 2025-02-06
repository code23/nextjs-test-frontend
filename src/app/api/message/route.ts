import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import markkoConfig from '@/config/markko'
import { NextResponse } from 'next/server'
import { getSession } from '@/app/actions'

const sdk = new MarkkoSDK(markkoConfig)

export async function POST(request: Request) {
  try {
    const { message, channel_name } = await request.json()
    const session = await getSession()
    const oauth = session.oauth
    const results = await sdk.messages.sendMessage(
      {
        message,
        channel_name,
        recipient_id: 'eb99f151-5bf3-454d-8a31-8b36d6dcd335',
      },
      oauth
    )
    return NextResponse.json(results)
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

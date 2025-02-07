import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import markkoConfig from '@/config/markko'
import { NextResponse } from 'next/server'
import { getSession } from '@/app/actions'

const sdk = new MarkkoSDK(markkoConfig)

export async function POST(request: Request) {
  try {
    const { message, is_update, channel_name, recipient_id } =
      await request.json()
    const params = {
      message,
      is_update,
      channel_name,
      recipient_id,
    }
    const session = await getSession()
    const oauth = session?.oauth
    const results = await sdk.messages.sendMessage(params, oauth)

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

import { getSession } from '@/app/actions'
import markkoConfig from '@/config/markko'
import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import { NextRequest, NextResponse } from 'next/server'

const sdk = new MarkkoSDK(markkoConfig)

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { channelId, page } = await request.json()

    const result = await sdk.messages.loadMoreMessages(
      channelId,
      { page, paginate: 3 },
      session.oauth
    )

    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    )
  }
}

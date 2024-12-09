import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import markkoConfig from '@/config/markko'
import { NextResponse } from 'next/server'

const sdk = new MarkkoSDK(markkoConfig)

export async function POST(request: Request) {
  try {
    const { charityId, donationData } = await request.json()

    const response = await sdk.donations.processDonation(
      charityId,
      donationData
    )

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error processing donation:', error)

    return NextResponse.json(
      { error: 'Failed to process donation' },
      { status: 500 }
    )
  }
}

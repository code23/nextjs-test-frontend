import { NextResponse } from 'next/server'
import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import markkoConfig from '@/config/markko'
import { getSession } from '@/app/actions'

export async function POST(request: Request) {
  try {
    const { productId, review, rating } = await request.json()

    console.log(productId, review, rating)

    // Validate inputs
    if (!review?.trim()) {
      return NextResponse.json(
        { error: 'Review cannot be empty.' },
        { status: 400 }
      )
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5.' },
        { status: 400 }
      )
    }
    const session = await getSession()
    
    const sdk = new MarkkoSDK(markkoConfig)
    await sdk.reviews.create({
      product_id: productId,
      review,
      rating
    }, session.oauth)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to submit review' },
      { status: 500 }
    )
  }
}

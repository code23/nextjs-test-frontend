import markkoConfig from '@/config/markko'
import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import { Code } from '@nextui-org/react'

const sdk = new MarkkoSDK(markkoConfig)

const bookingreviews = await sdk.bookingreviwes.listReviews({
  with: 'relationship',
  paginate: 0,
  page: 1,
  sort: '',
  ids: {},
})

export default function BookingReviewsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">All Booking review</h1>
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {bookingreviews.map((bookingreview: any, index: number) => (
          <div key={index} className="overflow-hidden col-span-1 flex flex-col">
            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
              {JSON.stringify(bookingreview, null, 2)}
            </Code>
          </div>
        ))}
      </div>
    </main>
  )
}

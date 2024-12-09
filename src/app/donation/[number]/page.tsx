import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import markkoConfig from '@/config/markko'
import { Code } from '@nextui-org/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const sdk = new MarkkoSDK(markkoConfig)

export default async function DonationDetailPage({
  params,
}: {
  params: { number: string }
}) {
  try {
    const { number } = params
    const donation = await sdk.donations.getDonation(number)
    if (!donation) {
      return notFound()
    }

    return (
      <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold">Donation: {donation.name}</h1>
        <Code className="w-full whitespace-pre-wrap overflow-scroll h-96 bg-neutral-100 text-neutral-900">
          {JSON.stringify(donation, null, 2)}
        </Code>
        <Link
          href="/donation"
          className="hover:underline hover:underline-offset-4"
        >
          ← Back to all donations
        </Link>
      </main>
    )
  } catch (error) {
    console.error('Error fetching donation:', error)
    return notFound()
  }
}

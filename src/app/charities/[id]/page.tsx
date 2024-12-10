import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import markkoConfig from '@/config/markko'
import { Code } from '@nextui-org/react'

const sdk = new MarkkoSDK(markkoConfig)

export default async function CharitiePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  try {
    const charity = await sdk.charities.getCharitiesById(
      parseInt((await params).id)
    )
    return (
      <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold">Cheritie : {charity.data.name}</h1>
        <div className="w-full h-80 relative">
          <Image
            src={charity.data.country.meta.flag}
            alt={charity.data.name}
            fill={true}
            className="rounded-lg object-cover object-top"
          />
        </div>
        <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
          {JSON.stringify(charity, null, 2)}
        </Code>
        <Link
          href="/charities"
          className="hover:underline hover:underline-offset-4"
        >
          ← Back to Charities
        </Link>
      </main>
    )
  } catch (error: any) {
    // Check if the error is a 404
    if (error?.status === 404) {
      notFound()
    }

    // Re-throw other errors to be handled by the error boundary
    throw error
  }
}

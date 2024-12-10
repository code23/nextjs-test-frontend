import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import Link from 'next/link'
import markkoConfig from '@/config/markko'
import { Code } from '@nextui-org/react'

const sdk = new MarkkoSDK(markkoConfig)

const charities = await sdk.charities.getAllCharities({})

export default function CharitiesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Charities</h1>
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {charities.data.map((charity: any, index: number) => (
          <Link
            href={`/charities/${charity.id}`}
            key={index}
            className="overflow-hidden col-span-1 flex flex-col"
          >
            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
              {JSON.stringify(charity, null, 2)}
            </Code>
          </Link>
        ))}
      </div>
    </main>
  )
}

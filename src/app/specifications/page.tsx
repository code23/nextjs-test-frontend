import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import markkoConfig from '@/config/markko'
import { Code } from '@nextui-org/react'
import Link from 'next/link'

const sdk = new MarkkoSDK(markkoConfig)

const specifications = await sdk.specifications.listSpecifications({})

export default function SpecificationsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Specifications</h1>
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {specifications.map((specification: any, index: number) => (
          <Link
            href={`/specifications/${specification.code}`}
            key={index}
            className="overflow-hidden col-span-1 flex flex-col p-2"
          >
            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
              {JSON.stringify(specification, null, 2)}
            </Code>
          </Link>
        ))}
      </div>
    </main>
  )
}

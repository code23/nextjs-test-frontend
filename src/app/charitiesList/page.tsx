import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import markkoConfig from '@/config/markko'
import React from 'react'
import Link from 'next/link'
import { Code } from '@nextui-org/react'

const sdk = new MarkkoSDK(markkoConfig)

//chairitylist
const charitiesList = await sdk.charitiesList.charitiesList([])

export default function CalenderPage() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">All charitiesList</h1>
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {charitiesList.data.map((list: any, index: number) => (
          <Link
            href={`/charitiesList/${list.slug}`}
            key={index}
            className="overflow-hidden col-span-1 flex flex-col"
          >
            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
              {JSON.stringify(list, null, 2)}
            </Code>
          </Link>
        ))}
      </div>
    </main>
  )
}

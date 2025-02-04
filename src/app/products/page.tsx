import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import { getSession } from '../actions'
import markkoConfig from '@/src/config/markko'
import Link from 'next/link'
import { Code } from '@heroui/react'

const sdk = new MarkkoSDK(markkoConfig)

export default async function ProductsPage() {
  const session = await getSession()
  const oauth = session.oauth
  const products = await sdk.products.list({}, oauth)
  const latestproduct = await sdk.products.latest(1, oauth)
  const listwithfilters = await sdk.products.listWithFilters({
    with: 'images,vendor',
    mpe_paginate: 12,
    page: 1,
    sort: 'random'
  }, oauth)

  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Products</h1>
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {products.data.map((Product: any, index: number) => (
          <Link
            href={`/products/${Product.slug}`}
            key={index}
            className="overflow-hidden col-span-1 flex flex-col"
          >
            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
              {JSON.stringify(Product, null, 2)}
            </Code>
          </Link>
        ))}
      </div>
      <h1 className="text-4xl font-bold">List with filters</h1>
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {listwithfilters.data.products.data.map((Product: any, index: number) => (
          <Link
            href={`/products/${Product.slug}`}
            key={index}
            className="overflow-hidden col-span-1 flex flex-col"
          >
            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
              {JSON.stringify(Product, null, 2)}
            </Code>
          </Link>
        ))}
      </div>
      <h1 className="text-4xl font-bold">Latest products</h1>
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {latestproduct.data.map((Product: any, index: number) => (
          <Link
            href={`/products/${Product.slug}`}
            key={index}
            className="overflow-hidden col-span-1 flex flex-col"
          >
            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
              {JSON.stringify(Product, null, 2)}
            </Code>
          </Link>
        ))}
      </div>
    </main>
  )
}

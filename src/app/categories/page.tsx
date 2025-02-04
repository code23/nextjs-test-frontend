import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import Link from 'next/link'
import { Code } from '@heroui/react'
import { getSession } from '../actions'
import markkoConfig from '@/config/markko'

const sdk = new MarkkoSDK(markkoConfig)

export default async function CategoriesPage() {
  const session = await getSession()
  const oauth = session.oauth
  const categories = await sdk.categories.list(
    {
      with: 'images',
      only_with_products: true,
    },
    oauth
  )
  const nestedCategories = await sdk.categories.listNested(
    {
      with: 'images',
      only_with_products: true,
    },
    oauth
  )

  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Categories</h1>
      <h2 className="text-2xl font-bold">List</h2>
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {categories.data.map((category: any, index: number) => (
          <Link
            href={`/categories/${category.slug}`}
            key={index}
            className="overflow-hidden col-span-1 flex flex-col p-2"
          >
            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
              {JSON.stringify(category, null, 2)}
            </Code>
          </Link>
        ))}
      </div>
      <h2 className="text-2xl font-bold">List nested</h2>
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {nestedCategories.data.map((category: any, index: number) => (
          <Link
            href={`/categories/${category.slug}`}
            key={index}
            className="overflow-hidden col-span-1 flex flex-col p-2"
          >
            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
              {JSON.stringify(category, null, 2)}
            </Code>
          </Link>
        ))}
      </div>
    </main>
  )
}

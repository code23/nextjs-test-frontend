import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Code } from '@heroui/react'
import markkoConfig from '@/src/config/markko'
import { getSession } from '../../actions'

const sdk = new MarkkoSDK(markkoConfig)

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const session = await getSession()
    const oauth = session.oauth
    const category = await sdk.categories.getBySlug(
      (await params).slug,
      {
        with: 'images',
      },
      oauth
    )

    return (
      <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold">Category: {category?.data.name}</h1>
        {category?.data.images[0]?.image_paths.original && (
          <div className="w-full h-80 relative">
            <Image
              src={category?.data.images[0]?.image_paths.original}
              alt={category?.data.name}
              fill={true}
              className="rounded-lg object-cover object-top"
            />
          </div>
        )}
        <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
          {JSON.stringify(category, null, 2)}
        </Code>
        <Link
          href="/categories"
          className="hover:underline hover:underline-offset-4"
        >
          ← Back to Categories
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

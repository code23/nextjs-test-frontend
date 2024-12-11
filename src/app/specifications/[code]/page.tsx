import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import markkoConfig from '@/config/markko'
import { Code } from '@nextui-org/react'

const sdk = new MarkkoSDK(markkoConfig)

export default async function Specification({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  try {
    const specification = await sdk.specifications.getSpecificationByCode(
      (await params).code,
      {}
    )

    return (
      <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold">
          Specification: {specification.name}
        </h1>
        <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
          {JSON.stringify(specification, null, 2)}
        </Code>
        <Link
          href="/specifications"
          className="hover:underline hover:underline-offset-4"
        >
          ← Back to Specifications
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

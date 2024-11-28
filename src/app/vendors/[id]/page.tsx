import MarkkoSDK from 'markko-nextjs-sdk'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import markkoConfig from '@/config/markko'

const sdk = new MarkkoSDK(markkoConfig)

export default async function VendorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  try {
    const vendor = await sdk.vendors.get(parseInt((await params).id))

    return (
      <main className="flex min-h-screen flex-col items-center p-24 gap-8 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold">Vendor: {vendor.data.store_name}</h1>
        <div className="w-full h-96 relative">
          <Image
            src={vendor.data.banner.image_paths.original}
            alt={vendor.data.store_name}
            fill={true}
            className="rounded-lg object-cover object-top"
          />
        </div>
        <div className="w-full max-w-4xl space-y-4 bg-neutral-700 p-4 rounded-lg">
          <pre className="whitespace-pre-wrap overflow-x-auto">
            {JSON.stringify(vendor, null, 2)}
          </pre>
        </div>
        <Link
          href="/vendors"
          className="hover:underline hover:underline-offset-4"
        >
          ← Back to Vendors
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

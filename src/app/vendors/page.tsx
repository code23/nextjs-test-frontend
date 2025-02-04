import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import Link from 'next/link'
import { Code } from '@heroui/react'
import { getSession } from '../actions'
import markkoConfig from '@/config/markko'

const sdk = new MarkkoSDK(markkoConfig)

export default async function VendorsPage() {
  const session = await getSession()
  const oauth = session.oauth
  const vendors = await sdk.vendors.list(
    {
      sort: 'created_at,desc',
      with: 'users,commission_group,currency,commission',
      paginate: 10,
      page: 1,
      is_approved: 1,
      is_onboarded: 1,
      is_rejected: 0,
      condensed: true,
    },
    oauth
  )

  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Vendors</h1>
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {vendors.data.map((vendor: any, index: number) => (
          <Link
            href={`/vendors/${vendor.id}`}
            key={index}
            className="overflow-hidden col-span-1 flex flex-col p-2"
          >
            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
              {JSON.stringify(vendor, null, 2)}
            </Code>
          </Link>
        ))}
      </div>
    </main>
  )
}

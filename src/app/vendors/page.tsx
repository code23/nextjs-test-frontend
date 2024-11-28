import MarkkoSDK from 'markko-nextjs-sdk'
import Link from 'next/link'

const config = {
  version: process.env.MPE_VERSION!,
  origin: process.env.MPE_ORIGIN!,
  apiBasePath: process.env.MPE_API_BASE_PATH!,
  passwordKey: process.env.MPE_PASSWORD_KEY!,
  passwordSecret: process.env.MPE_PASSWORD_SECRET!,
  clientCredentialKey: process.env.MPE_CLIENT_CREDENTIAL_KEY!,
  clientCredentialSecret: process.env.MPE_CLIENT_CREDENTIAL_SECRET!,
  isDevelopment: process.env.NODE_ENV === 'development',
}

const sdk = new MarkkoSDK(config)

const vendors = await sdk.vendors.list({
  sort: 'created_at,desc',
  with: 'users,commission_group,currency,commission',
  paginate: 10,
  page: 1,
  is_approved: 1,
  is_onboarded: 1,
  is_rejected: 0,
  condensed: true,
})

export default function VendorsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <Link href="/" className="hover:underline hover:underline-offset-4">
        ← Back to Home
      </Link>
      <h1 className="text-4xl font-bold">Vendors</h1>
      <div className="w-full grid grid-cols-2 gap-4">
        {vendors.data.map((vendor: any, index: number) => (
          <Link
            href={`/vendors/${vendor.id}`}
            key={index}
            className="flex p-4 bg-neutral-700 rounded-lg"
          >
            <pre className="whitespace-pre-wrap overflow-x-auto">
              {JSON.stringify(vendor, null, 2)}
            </pre>
          </Link>
        ))}
      </div>
      <Link href="/" className="hover:underline hover:underline-offset-4">
        ← Back to Home
      </Link>
    </main>
  )
}

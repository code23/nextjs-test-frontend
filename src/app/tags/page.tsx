import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import { Code } from '@heroui/react'
import { getSession } from '../actions'
import markkoConfig from '@/config/markko'

const sdk = new MarkkoSDK(markkoConfig)

export default async function TagsPage() {
  const session = await getSession()
  const oauth = session.oauth
  const tags = await sdk.tags.list({}, oauth)

  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Tags</h1>
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {tags.data.map((tag: any, index: number) => (
          <Code
            className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900"
            key={index}
          >
            {JSON.stringify(tag, null, 2)}
          </Code>
        ))}
      </div>
    </main>
  )
}

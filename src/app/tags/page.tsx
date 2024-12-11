import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import markkoConfig from '@/config/markko'
import { Code } from '@nextui-org/react'

const sdk = new MarkkoSDK(markkoConfig)

const tags = await sdk.tags.getAllTags({})

export default function TagsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Tags</h1>
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {tags.data.map((tag: any) => (
          <>
            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
              {JSON.stringify(tag, null, 2)}
            </Code>
          </>
        ))}
      </div>
    </main>
  )
}

import markkoConfig from '@/config/markko'
import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import { Code } from '@nextui-org/react'
import { notFound } from 'next/navigation'

const sdk = new MarkkoSDK(markkoConfig)

export default async function settingServicePage() {
  try {
    const settingservice = await sdk.settings.getSettingService()

    if (!settingservice) {
      return notFound()
    }

    return (
      <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold">Setting Service</h1>
        <div className="w-full grid sm:grid-cols-3 gap-4">
          {settingservice.data.map((settings: any, index: number) => (
            <Code
              key={index}
              className="w-full whitespace-pre-wrap overflow-scroll h-72 bg-neutral-100 text-neutral-900"
            >
              {JSON.stringify(settings, null, 2)}
            </Code>
          ))}
        </div>
      </main>
    )
  } catch (error) {
    console.error('Error fetching setting service:', error)
    return notFound()
  }
}

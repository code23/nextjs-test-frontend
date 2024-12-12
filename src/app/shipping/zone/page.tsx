import markkoConfig from '@/config/markko'
import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import { Code } from '@nextui-org/react'

const sdk = new MarkkoSDK(markkoConfig)
const shippingservice = await sdk.shipping.getShippingZones()

export default function shippingZonePage() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Shipping Zones</h1>
      <h2 className="text-2xl font-bold">Values</h2>
      <div className="w-full grid sm:grid-cols-3 gap-4">
        {shippingservice.data.map((shippingService: any, index: number) => (
          <Code
            key={index}
            className="w-full whitespace-pre-wrap overflow-scroll h-32 bg-neutral-100 text-neutral-900"
          >
            {JSON.stringify(shippingService, null, 2)}
          </Code>
        ))}
      </div>
    </main>
  )
}

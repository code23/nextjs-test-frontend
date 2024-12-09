import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import markkoConfig from '@/config/markko'
import { Code } from '@nextui-org/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const sdk = new MarkkoSDK(markkoConfig)

export default async function charitiesUniqueName({
  params,
}: {
  params: { id: string }
}) {
  try {
    const { id } = params
    //chairity data by slug
    const CharityBySlug = await sdk.charitiesList.getCharityBySlug(id)

    //chairity data by id
    // const CharityBySlug = await sdk.charitiesList.getCharityListById(id);

    if (!CharityBySlug) {
      return notFound()
    }

    //chairity by unique name
    const isUniqueName = await sdk.charitiesList.nameIsUnique(
      CharityBySlug.data.name
    )

    //post api of save vendor
    // const saveVendor = await sdk.charitiesList.saveVendor(CharityBySlug.data);
    return (
      <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold">CharitiesList By ID: {id}</h1>
        <Code className="w-full whitespace-pre-wrap overflow-scroll h-96 bg-neutral-100 text-neutral-900">
          {JSON.stringify(CharityBySlug, null, 2)}
        </Code>
        <h1 className="text-4xl font-bold">
          CharitiesList By UniqueName: {CharityBySlug.data.name}
        </h1>
        <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
          {JSON.stringify(isUniqueName, null, 2)}
        </Code>
        <Link
          href="/charitiesList"
          className="hover:underline hover:underline-offset-4"
        >
          ← Back to all donations
        </Link>
      </main>
    )
  } catch (error) {
    console.error('Error fetching donation:', error)
    return notFound()
  }
}

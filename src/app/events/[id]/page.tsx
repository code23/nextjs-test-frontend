import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import markkoConfig from '@/config/markko'
import { Code } from '@heroui/react'
import { getSession } from '@/app/actions'

const sdk = new MarkkoSDK(markkoConfig)

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  try {
    const session = await getSession()
    const oauth = session.oauth
    const event = session?.isLoggedIn
      ? await sdk.events.get(
          parseInt((await params).id),
          {
            with: 'categories,occasion,quotes,address',
          },
          oauth
        )
      : null

    return (
      <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
        {session?.isLoggedIn ? (
          <>
            <h1 className="text-4xl font-bold">Event: {event.data.name}</h1>
            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
              {JSON.stringify(event, null, 2)}
            </Code>
            <Link
              href="/events"
              className="hover:underline hover:underline-offset-4"
            >
              ← Back to Events
            </Link>
          </>
        ) : (
          <p>
            Please{' '}
            <Link className="underline" href="/account">
              login
            </Link>{' '}
            to view this event
          </p>
        )}
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

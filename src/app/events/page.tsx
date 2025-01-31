import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import Link from 'next/link'
import markkoConfig from '@/config/markko'
import { Code } from '@heroui/react'
import { getSession } from '@/app/actions'

const sdk = new MarkkoSDK(markkoConfig)

export default async function EventsPage() {
  const session = await getSession()
  const oauth = session.oauth
  const upcomingEvents = session?.isLoggedIn
    ? await sdk.events.list(
        {
          sort: 'start_date',
          with: 'categories,occasion,quotes,address',
          paginate: 10,
          page: 1,
          event_status: 'upcoming',
        },
        oauth
      )
    : null
  const pastEvents = session?.isLoggedIn
    ? await sdk.events.list(
        {
          sort: 'start_date',
          with: 'categories,occasion,quotes,address',
          paginate: 10,
          page: 1,
          event_status: 'past',
        },
        oauth
      )
    : null

  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Events</h1>
      {session?.isLoggedIn ? (
        <>
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <div className="w-full grid sm:grid-cols-3 gap-4">
            {upcomingEvents.data.map((event: any, index: number) => (
              <Link
                href={`/events/${event.id}`}
                key={index}
                className="overflow-hidden col-span-1 flex flex-col p-2"
              >
                <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
                  {JSON.stringify(event, null, 2)}
                </Code>
              </Link>
            ))}
          </div>
          <h2 className="text-2xl font-bold">Past Events</h2>
          <div className="w-full grid sm:grid-cols-3 gap-4">
            {pastEvents.data.map((event: any, index: number) => (
              <Link
                href={`/events/${event.id}`}
                key={index}
                className="overflow-hidden col-span-1 flex flex-col p-2"
              >
                <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
                  {JSON.stringify(event, null, 2)}
                </Code>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p>
          Please{' '}
          <Link className="underline" href="/account">
            login
          </Link>{' '}
          to view events
        </p>
      )}
    </main>
  )
}

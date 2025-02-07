import { getSession } from '@/app/actions'
import SendMessageForm from '@/components/forms/send-message-form'
import markkoConfig from '@/config/markko'
import { Code } from '@heroui/react'
import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import LoadMoreMessages from '@/components/LoadMoreMessages'

const sdk = new MarkkoSDK(markkoConfig)

export default async function MessagePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  try {
    const session = await getSession()
    const oauth = session.oauth
    const channel = session?.isLoggedIn
      ? await sdk.messages.getChannel((await params).id, { paginate: 3 }, oauth)
      : null
    const recipient_id = channel
      ? channel.data.participants.find(
          (participant: any) => participant.user.id !== session.user.id
        )?.user.id
      : null

    return (
      <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-[80px] font-[family-name:var(--font-geist-sans)]">
        {session?.isLoggedIn && channel ? (
          <>
            <div className="flex flex-col gap-6 w-full justify-center items-center">
              <h1 className="text-4xl font-bold">
                Channel: {channel.data.channel_name}
              </h1>

              <h2 className="text-3xl font-bold ">Channel details</h2>
              <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
                {JSON.stringify(channel, null, 2)}
              </Code>

              <h2 className="text-3xl font-bold">
                Last messages (paginated to 3)
              </h2>
              <div className="w-full grid sm:grid-cols-3 gap-4">
                {channel.data.messages.length > 0 &&
                  channel.data.messages.map((message: any, index: number) => (
                    <>
                      <div className="w-full" key={index}>
                        <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
                          {JSON.stringify(message, null, 2)}
                        </Code>
                      </div>
                    </>
                  ))}
              </div>

              <h2 className="text-3xl font-bold">
                Last messages (paginated to 3) - with load more
              </h2>
              <LoadMoreMessages
                initialMessages={channel.data.messages}
                channelId={channel.data.id}
              />

              <h2 className="text-3xl font-bold ">Send message</h2>
              <SendMessageForm
                channelName={channel.data.channel_name}
                recipient_id={recipient_id}
              />

              <Link
                href="/messages"
                className="hover:underline hover:underline-offset-4"
              >
                ← Back to all channels
              </Link>
            </div>
          </>
        ) : (
          <p>
            Please{' '}
            <Link className="underline" href="/account">
              login
            </Link>{' '}
            to view this channel
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

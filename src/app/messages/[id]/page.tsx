import { getSession } from "@/app/actions"
import Sendmessage from "@/components/forms/Sendmessage"
import LoadMoreMessages from "@/components/LoadMoreMessages"
import markkoConfig from "@/config/markko"
import { Code } from "@heroui/react"
import MarkkoSDK from "@meetmarkko/markko-nextjs-sdk"
import Link from "next/link"
import { notFound } from "next/navigation"


const sdk = new MarkkoSDK(markkoConfig)

export default async function MessagePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    try {
        const session = await getSession()
        const oauth = session.oauth
        const getchanel = session?.isLoggedIn
            ? await sdk.messages.getChannel(
                ((await params).id),
                { paginate: 5 },
                oauth,
            )
            : null

        return (
            <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-[80px] font-[family-name:var(--font-geist-sans)]">
                {session?.isLoggedIn ? (
                    <>
                        <div className="flex flex-col gap-6 w-full justify-center items-center">
                            <h1 className="text-4xl font-bold">chanel: {getchanel.data.channel_name}</h1>
                            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
                                {JSON.stringify(getchanel, null, 2)}
                            </Code>
                            <Link
                                href="/messages"
                                className="hover:underline hover:underline-offset-4"
                            >
                                ← Back to allchanels
                            </Link>
                        </div>
                        <div className="flex flex-col gap-6 w-full justify-center items-center">
                            <h1 className="text-4xl font-bold ">Send message</h1>
                            <Sendmessage channelName={getchanel.data.channel_name} />
                        </div>
                        <div className="flex flex-col gap-6 w-full justify-center items-center">
                            <LoadMoreMessages messages={getchanel.data.messages} />
                        </div>
                    </>
                ) : (
                    <p>
                        Please{' '}
                        <Link className="underline" href="/account">
                            login
                        </Link>{' '}
                        to view this event
                    </p>
                )
                }
            </main >
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

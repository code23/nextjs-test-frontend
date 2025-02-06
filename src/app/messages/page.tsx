import markkoConfig from "@/config/markko";
import MarkkoSDK from "@meetmarkko/markko-nextjs-sdk";
import { getSession } from "../actions";
import Link from "next/link";
import { Code } from "@heroui/react";

const sdk = new MarkkoSDK(markkoConfig)
export default async function MessagesPage() {
    const session = await getSession()
    const oauth = session.oauth
    const allchanels = session?.isLoggedIn
        ? await sdk.messages.getAllChannels({}, oauth) : null

    return (
        <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-4xl font-bold">All Chanels</h1>
            {session?.isLoggedIn ? (
                < div className="w-full grid sm:grid-cols-3 gap-4" >
                    {allchanels.data.map((chanel: any, index: number) => (
                        <Link
                            href={`/messages/${chanel.id}`}
                            key={index}
                            className="overflow-hidden col-span-1 flex flex-col"
                        >
                            <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
                                {JSON.stringify(chanel, null, 2)}
                            </Code>
                        </Link>
                    ))
                    }
                </div >
            ) : (<p>
                Please{' '}
                <Link className="underline" href="/account">
                    login
                </Link>{' '}
                to view events
            </p>
            )}
        </main >
    )
}
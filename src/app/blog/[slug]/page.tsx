import MarkkoSDK from 'markko-nextjs-sdk'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import markkoConfig from '@/config/markko'
import { Code } from '@nextui-org/react'

const sdk = new MarkkoSDK(markkoConfig)

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const post = await sdk.blogs.getPostBySlug((await params).slug, {
      with: 'images,blog_categories',
    })

    return (
      <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold">Post: {post.data.title}</h1>
        <div className="w-full h-80 relative">
          <Image
            src={post.data.image[0].image_paths.original}
            alt={post.data.title}
            fill={true}
            className="rounded-lg object-cover object-top"
          />
        </div>
        <Code className="w-full whitespace-pre-wrap overflow-scroll h-48 bg-neutral-100 text-neutral-900">
          {JSON.stringify(post, null, 2)}
        </Code>
        <Link href="/blog" className="hover:underline hover:underline-offset-4">
          ← Back to Posts
        </Link>
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

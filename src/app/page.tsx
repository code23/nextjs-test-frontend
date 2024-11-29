import Image from 'next/image'
import { Button, Snippet } from '@nextui-org/react'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Image
          src="/markko_logo.svg"
          alt="Markko"
          width={180}
          height={43}
          priority
        />
        <p className="text-center text-lg">
          This is a test site for <b>Markko Next.js SDK</b>.
        </p>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started with{' '}
            <Snippet size="sm" className="pl-3 text-white">
              npm install markko-nextjs-sdk
            </Snippet>
          </li>
          <li>Read the docs and start developing instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button
            as="a"
            radius="full"
            className="text-primary text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://www.npmjs.com/package/markko-nextjs-sdk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check it out in npm
          </Button>
          <Button
            as="a"
            radius="full"
            variant="bordered"
            className="text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://meetmarkko.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            className="brightness-[100]"
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to meetmarkko.com →
        </a>
      </footer>
    </div>
  )
}

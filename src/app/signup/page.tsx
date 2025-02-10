import { getSession } from '../actions'
import SignupForm from '@/components/forms/signup-form'

export default async function SignupPage() {
  const session = await getSession()

  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Create an Account</h1>
      {!session.isLoggedIn && <SignupForm />}
      {session.isLoggedIn && (
        <>
          <p className="text-2xl font-bold">Email: {session.user.email}</p>
        </>
      )}
    </main>
  )
}

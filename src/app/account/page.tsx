import LoginForm from '@/components/forms/login-form'
import LogoutForm from '@/components/forms/logout-form'
import { getSession } from '@/app/actions'

export default async function AccountPage() {
  const session = await getSession()

  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Account</h1>
      {!session.isLoggedIn && <LoginForm />}
      {session.isLoggedIn && (
        <>
          <p className="text-2xl font-bold">Email: {session.user.email}</p>
          <LogoutForm />
        </>
      )}
    </main>
  )
}

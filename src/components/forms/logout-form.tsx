import { getSession, logout } from '@/app/actions'
import { Button } from '@heroui/react'
import { redirect, RedirectType } from 'next/navigation'

export default async function LogoutForm() {
  const session = await getSession()

  if (session.isLoggedIn) {
    return (
      <div className="flex flex-col items-center w-full">
        <form action={logout}>
          <Button type="submit">Logout</Button>
        </form>
      </div>
    )
  }

  return redirect('/login', RedirectType.push)
}

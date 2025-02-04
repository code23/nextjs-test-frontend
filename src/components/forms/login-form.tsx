'use client'

import { useActionState } from 'react'
import { Input, Button } from '@heroui/react'
import { login } from '@/src/app/actions'

export default function LoginForm() {
  const initialState = {
    message: '',
  }
  const [loginState, loginAction] = useActionState(login, initialState)

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <form
        action={loginAction}
        className="w-full max-w-md flex flex-col gap-4"
      >
        {loginState?.message && (
          <div className="border border-white text-sm px-4 py-2 rounded-xl">
            {loginState?.message}
          </div>
        )}
        <Input label="Email" placeholder="Email" name="email" type="text" />
        <Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}

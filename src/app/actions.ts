'use server'

import { revalidatePath } from 'next/cache'
import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import markkoConfig from '@/config/markko'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { sessionOptions, SessionData } from '@/lib/session'
import { z } from 'zod'

const sdk = new MarkkoSDK(markkoConfig)

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  )

  if (!session.isLoggedIn) {
    session.isLoggedIn = false
    session.email = ''
  }

  return session
}

export async function login(prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(2, 'Password is required'),
  })

  const parsed = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    const msg = JSON.parse(parsed.error.message)
      .map((error: any) => error.message)
      .join(', ')
    return { message: 'Failed to login: ' + msg }
  }

  const parsedData = parsed.data

  try {
    const response = await sdk.auth.login({
      email: parsedData.email,
      password: parsedData.password,
    })

    if (response.status !== 200) {
      const errorData = await response.data
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      )
    }

    const data = await response.data

    if (response.status !== 200) {
      throw new Error(data.message || 'Login failed')
    }

    // after a successful login, set the oauth token in the session
    data.scope = ''

    const session = await getSession()
    session.oauth = data
    session.isLoggedIn = true
    session.email = parsedData.email
    await session.save()

    revalidatePath('/account')
    return { message: 'Login successful' }
  } catch (e) {
    return { message: 'Login failed: ' + e }
  }
}

export async function logout() {
  const session = await getSession()
  session.destroy()
  revalidatePath('/account')
}

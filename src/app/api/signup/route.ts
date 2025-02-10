import { getSession } from '@/app/actions'
import markkoConfig from '@/config/markko'
import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import { NextResponse } from 'next/server'

const sdk = new MarkkoSDK(markkoConfig)

export async function POST(request: Request) {
  try {
    const {
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
      terms,
      currency_id,
      phone,
    } = await request.json()

    const completeParams = {
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
      terms,
      currency_id,
      phone,
    }

    const signupResponse = await sdk.users.create(completeParams)
    if (signupResponse.code === 200) {
      const payload = {
        email,
        password,
      }
      const response = await sdk.auth.login(payload)
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

      const session = await getSession()
      const user = await signupResponse.data

      data.scope = ''
      session.oauth = data
      session.isLoggedIn = true
      session.user = await user
      session.user.email = email
      await session.save()

      return NextResponse.json(signupResponse, { status: 200 })
    }

    return NextResponse.json(signupResponse, { status: 500 })
  } catch (error) {
    console.error('Error during signup ', error)
    return NextResponse.json(
      { error: 'Signup failed. Please try again.' },
      { status: 500 }
    )
  }
}

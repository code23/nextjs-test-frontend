import { SessionOptions } from 'iron-session'

export interface SessionData {
  oauth?: {
    token_type: string
    expires_in: number
    access_token: string
    refresh_token: string
    scope: string
  }
  isLoggedIn: boolean
  user: {
    [key: string]: any
  }
}

export const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    'complex_password_at_least_32_characters_long',
  cookieName: 'markko_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

const markkoConfig = {
  version: process.env.MPE_VERSION!,
  origin: process.env.MPE_ORIGIN!,
  apiBasePath: process.env.MPE_API_BASE_PATH!,
  passwordKey: process.env.MPE_PASSWORD_KEY!,
  passwordSecret: process.env.MPE_PASSWORD_SECRET!,
  clientCredentialKey: process.env.MPE_CLIENT_CREDENTIAL_KEY!,
  clientCredentialSecret: process.env.MPE_CLIENT_CREDENTIAL_SECRET!,
  isDevelopment: process.env.NODE_ENV === 'development',
}

export default markkoConfig

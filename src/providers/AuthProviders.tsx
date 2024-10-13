"use client"
import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
interface AuthProvidersProps  {
  children :ReactNode
}

function AuthProviders({ children }:AuthProvidersProps) {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  )
}

export default AuthProviders

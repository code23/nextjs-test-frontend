'use client'

import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'

interface Address {
  summaryline: string
  organisation?: string
  subbuildingname?: string
  number: string
  premise: string
  street: string
  posttown: string
  county: string
  postcode: string
}

export default function AddressPage() {
  const [postcode, setPostcode] = useState('')
  const [addresses, setAddresses] = useState<Address[]>([])

  const handlePostcodeChange = (event: any) => {
    setPostcode(event.target.value)
  }

  const handleLookup = async () => {
    try {
      const response = await fetch('/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postcode }),
      })
      const results = await response.json()
      if (!response.ok || results.error) throw new Error(results.message)
      setAddresses(results.data)
    } catch (error) {
      console.error('Error fetching addresses:', error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Address lookup</h1>
      <Input
        label="Address lookup"
        value={postcode}
        onChange={handlePostcodeChange}
      />
      <Button radius="full" color="secondary" onClick={handleLookup}>
        Lookup
      </Button>
      <ul className="w-full max-w-2xl space-y-2">
        {addresses.map((address, index) => (
          <li key={index} className="p-4 rounded-lg border hover:bg-secondary">
            {address.summaryline}
          </li>
        ))}
      </ul>
    </main>
  )
}

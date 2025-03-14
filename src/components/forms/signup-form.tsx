'use client'

import { Button, Checkbox, Input } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignupForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    currency_id: '1',
    terms: false,
  })
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setFormData((prevData) => ({ ...prevData, terms: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const {
      firstName,
      lastName,
      email,
      confirmEmail,
      telephone,
      password,
      confirmPassword,
      terms,
    } = formData

    setMessage('')

    if (
      !firstName ||
      !lastName ||
      !email ||
      !confirmEmail ||
      !telephone ||
      !password ||
      !confirmPassword
    ) {
      setMessage('All fields are required')
      return
    }
    if (terms !== true) {
      setMessage('You must accept the terms and conditions')
      return
    }
    if (email !== confirmEmail) {
      setMessage('Email and confirm email must match')
      return
    }
    if (password !== confirmPassword) {
      setMessage('Password and confirm password must match')
      return
    }
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long')
      return
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      setMessage(
        'Password must contain at least one uppercase and one lowercase letter'
      )
      return
    }

    const signupData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_confirmation: password,
      terms,
      currency_id: '1',
      phone: telephone,
    }
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      })
      if (!response.ok) {
        throw new Error('Signup failed')
      } else {
        router.refresh()
        router.push('/signup')
        console.log('Signup success')
      }
    } catch (error) {
      setMessage('An error occurred during signup')
      console.error('Signup error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[700px] w-full">
      <div className="flex flex-col items-center w-full gap-4">
        <div className="flex flex-col items-start w-full">
          <Input
            label="First Name"
            placeholder="First Name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <Input
            label="Last Name"
            placeholder="Last Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <Input
            label="Email Address"
            placeholder="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <Input
            label="Confirm Email Address"
            placeholder="Confirm Email Address"
            name="confirmEmail"
            type="email"
            value={formData.confirmEmail}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <Input
            label="Telephone Number"
            placeholder="Telephone Number"
            name="telephone"
            type="tel"
            value={formData.telephone}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <Input
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div>*Password must be at least 8 characters</div>
          <div>
            *Password must contain at least one uppercase and one lowercase
            letter
          </div>
        </div>
        <div className="flex flex-col items-start w-full">
          <Input
            label="Confirm Password"
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-full items-start">
          <div className="flex gap-2">
            <Checkbox
              color="secondary"
              name="terms"
              checked={formData.terms}
              onChange={handleToggleChange}
            />
            I agree to the Terms and Conditions.
          </div>
        </div>

        {message && (
          <p className="w-full flex flex-start mt-4 text-red-500">{message}</p>
        )}
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </div>
    </form>
  )
}

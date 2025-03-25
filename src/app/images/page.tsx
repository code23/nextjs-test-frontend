'use client'

import { Button, Input, Snippet } from "@heroui/react"
import Image from "next/image"
import { useState } from "react"

export default function ImagesPage() {
  const [image, setImage] = useState<File | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async () => {
    try {
      if (!image) {
        console.error('No image selected')
        setIsSuccess(false)
        return
      }

      setIsLoading(true)

      const formData = new FormData()
      formData.append('image', image)

      const response = await fetch('/api/images', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (! data.error) {
        setIsSuccess(true)
      }
    } catch (error) {
      console.error(error)
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 sm:px-24 gap-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Images</h1>
      <div>
        <Snippet size="sm" className="pl-3 text-white">
          npm install --save-dev laravel-vapor
        </Snippet>
      </div>
      <div className="max-w-sm mx-auto flex flex-row gap-4">
        <Input type="file" onChange={(e) => setImage(e.target.files?.[0])}></Input>
        <Button color="secondary" onPress={handleSubmit} isLoading={isLoading}>Upload</Button>
      </div>
      <div>
        {image && <Image src={URL.createObjectURL(image)} alt="Uploaded image" width={100} height={100} />}
      </div>
      <div>
        {isSuccess && <p>Image uploaded successfully</p>}
      </div>
    </main>
  )
}

import { NextResponse } from 'next/server'
import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'
import markkoConfig from '@/config/markko'
import awsConfig from '@/config/aws'
import { getSession } from '@/app/actions'
import Vapor from "laravel-vapor"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get('image')

    const session = await getSession()
    const oauth = session?.oauth
    const sdk = new MarkkoSDK(markkoConfig)

    Vapor.store(image, {
      bucket: awsConfig.s3Bucket,
      headers: {
        authorization: `Bearer ${oauth?.access_token}`,
        'x-mpe-origin': markkoConfig.origin,
      },
      // progress: (progress: number) => {
      //   console.log(Math.round(progress * 100))
      // },
      signedStorageUrl: markkoConfig.apiBasePath + '/api/v1/vapor/signed-storage-url',
      visibility: 'public-read',
    }).then(async (response: any) => {
      const imageObj = {
        filename: image?.name || '',
        type: image?.type || '',
      }
      
      const res = await sdk.images.register(
      {
        uuid: response.uuid,
        key: response.key,
        bucket: response.bucket,
        image: imageObj,
        modelId: '13', // example model id
        model: 'Product', // example model name
        visibility: 'public-read',
      }, oauth)
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload image' },
      { status: 500 }
    )
  }
}

import markkoConfig from '@/config/markko'
import MarkkoSDK from '@meetmarkko/markko-nextjs-sdk'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }

  const { charityId, donationData } = req.body
  const sdk = new MarkkoSDK(markkoConfig)
  const response = await sdk.donations.processDonation(charityId, donationData)
  return res.status(200).json(response)
}

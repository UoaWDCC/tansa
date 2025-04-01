import { getPayload } from 'payload'
import config from '@/payload.config'

export async function payloadClient() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  return payload
}

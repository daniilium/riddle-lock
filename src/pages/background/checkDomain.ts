import { local } from '@/lib/storage'

export async function checkDomain(url: string) {
  const blackDomains = await local.get('blackDomains')
  const domains = Object.keys(blackDomains)
  return domains.some((domain) => url.startsWith(domain))
}

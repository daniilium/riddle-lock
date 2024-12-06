import { local } from '@/lib/storage'
import { question } from './store'

export async function validateRiddleAnswer({
  url,
  answer,
}: {
  url: string
  answer: string
}) {
  const blackDomains = await local.get('blackDomains')
  const domains = Object.keys(blackDomains)
  const findDomain = domains.find((domain) =>
    url.startsWith(domain)
  ) as keyof typeof blackDomains

  if (!findDomain) console.error('Домен не найден')

  const domain = blackDomains[findDomain]

  if (question[domain.questionId].answer !== answer) {
    return { isAnswerCorrect: false }
  }

  blackDomains[findDomain].lastAnsweredAt = new Date().getTime()
  await local.set('blackDomains', blackDomains)

  return { isAnswerCorrect: true }
}

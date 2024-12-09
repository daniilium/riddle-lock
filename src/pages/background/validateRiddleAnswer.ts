import { local } from '@/lib/storage'
import { questions } from './store'

export async function validateRiddleAnswer({
  url,
  userAnswer,
}: {
  url: string
  userAnswer: string
}) {
  const storageBlackDomains = await local.get('blackDomains')
  const allDomains = Object.keys(storageBlackDomains)
  const domainKey = allDomains.find((d) =>
    url.startsWith(d)
  ) as keyof typeof storageBlackDomains

  if (!domainKey) return console.error('Домен не найден')

  const domainValue = storageBlackDomains[domainKey]

  const correctAnswer = questions[domainValue.questionIndex].answer
  if (correctAnswer !== userAnswer) return { isAnswerCorrect: false }

  storageBlackDomains[domainKey].lastAnsweredAt = new Date().getTime()
  await local.set('blackDomains', storageBlackDomains)

  return { isAnswerCorrect: true }
}

import { question } from './store'
import { local } from '@/lib/storage'

export async function getRiddle(currentDomain: string) {
  const RIDDLE_COOLDOWN = await local.get('RIDDLE_COOLDOWN')
  const blackDomains = await local.get('blackDomains')
  console.log('getRiddle', currentDomain, RIDDLE_COOLDOWN)

  // Проверка: есть ли домен в чёрном списке
  const domains = Object.keys(blackDomains)
  const blackDomain = domains.find((url) => currentDomain.startsWith(url))
  if (!blackDomain) return { isBlackDomain: false, isShowRiddle: false }

  // Проверка: есть ли у домена время БЕЗ загадки
  const riddleAnsweredAt =
    blackDomains[blackDomain as keyof typeof blackDomains].lastAnsweredAt
  const timeWithoutRiddle = new Date().getTime() - riddleAnsweredAt
  if (timeWithoutRiddle < RIDDLE_COOLDOWN) {
    return { isBlackDomain: true, isShowRiddle: false }
  }

  // Отправляем загадку
  return {
    isBlackDomain: true,
    isShowRiddle: true,
    riddle: getQuestion(),
  }
}

function getQuestion() {
  const questionId = getRandomQuestionId()
  const currentQuestion = question[questionId]

  return {
    question: currentQuestion.question,
    options: shuffleArray(currentQuestion.options),
    answer: currentQuestion.answer,
  }
}

function getRandomQuestionId() {
  const questionId = Math.floor(Math.random() * question.length)
  return questionId
}

function shuffleArray(array: string[]) {
  const arrayCopy = [...array]

  // Алгоритм Фишера-Йетса
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))

    ;[arrayCopy[i], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[i],
    ]
  }

  return arrayCopy
}

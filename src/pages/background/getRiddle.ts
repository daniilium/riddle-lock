import { questions } from './store'
import { local } from '@/lib/storage'

export async function getRiddle(currentDomain: string) {
  const RIDDLE_COOLDOWN = await local.get('RIDDLE_COOLDOWN')
  const blackDomains = await local.get('blackDomains')

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

  // Получение случайной загадки
  const questionId = getRandomIndexFromQuestions()
  const currentQuestion = questions[questionId]
  const riddle = {
    question: currentQuestion.question,
    options: shuffleArray(currentQuestion.options),
    answer: currentQuestion.answer,
  }

  // Сохранение индекса вопроса в BlackDomains, чтобы потом проверить ответ
  blackDomains[blackDomain].questionIndex = questionId
  await local.set('blackDomains', blackDomains)

  // Отправляем загадку
  return {
    isBlackDomain: true,
    isShowRiddle: true,
    riddle,
  }
}

function getRandomIndexFromQuestions() {
  const questionId = Math.floor(Math.random() * questions.length)
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

export const RIDDLE_COOLDOWN = 1 * 60 * 1000

// у всех сайтов с самого начала нет свободного времени без загадок
export const initTime = new Date().getTime() - RIDDLE_COOLDOWN

export const blackDomains = {
  'https://example.com': {
    lastAnsweredAt: initTime,
    questionIndex: 0,
  },
}

const mathQuestion = [
  {
    question: '8 * 9 = ?',
    options: ['63', '71', '72', '69'],
    answer: '72',
  },
  {
    question: '8 * 7 = ?',
    options: ['56', '64', '49', '48'],
    answer: '56',
  },
  {
    question: '7 * 8 = ?',
    options: ['56', '54', '49', '64'],
    answer: '56',
  },
  {
    question: '6 * 9 = ?',
    options: ['54', '45', '63', '49'],
    answer: '54',
  },
]

const russianRules = [
  {
    question: 'Сер**?**зный человек подошёл к решению задачи',
    options: ['Серьёзный', 'Серйозный', 'Серьезный', 'Сирьёзный'],
    answer: 'Серьёзный',
  },
]

export const questions = [
  {
    question: '2 + 2 = ?',
    options: ['4', '5', '6', '7'],
    answer: '4',
  },
  ...russianRules,
  ...mathQuestion,
]

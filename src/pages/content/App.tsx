import { useEffect, useState } from 'react'

import { send } from '@/lib/send'
import { getRiddle } from '@/pages/background/getRiddle'

import QuestionModal from './QuestionModal'

export default function App() {
  const [result, setResult] = useState<Awaited<ReturnType<typeof getRiddle>>>()
  const [isShowRiddle, setIsShowRiddle] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  // опрос у background скрипта, нужно ли отображать QuestionModal
  useEffect(() => {
    if (!isFetching) return

    const INTERVAL_MS = 1 * 1000
    let timerId: NodeJS.Timeout | null = null

    const fetchRiddle = async () => {
      try {
        const currentUrl = window.location.href
        const response = await send('getRiddle', currentUrl)

        // выходим, если домен не подходит
        if (!response.isBlackDomain) return setIsFetching(false)

        // если есть загадка
        if (response.isShowRiddle) {
          setResult(response)
          setIsShowRiddle(true)
          setIsFetching(false)
        }
      } catch (error) {
        console.error('Ошибка при запросе загадки:', error)
      } finally {
        timerId = setTimeout(fetchRiddle, INTERVAL_MS)
      }
    }

    fetchRiddle()

    return () => {
      if (timerId) clearTimeout(timerId)
    }
  }, [isFetching])

  const signalCloseModal = () => {
    setIsShowRiddle(false)
    setIsFetching(true)
  }

  // если есть загадка, отображаем загадку
  if (isShowRiddle && result?.isShowRiddle && result.riddle) {
    return (
      <QuestionModal
        riddle={result.riddle}
        signalCloseModal={signalCloseModal}
      />
    )
  }

  // иначе ничего не нужно отображать
  return null
}

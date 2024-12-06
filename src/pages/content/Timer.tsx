import { useEffect, useState } from 'react'
import BlockedPage from './QuestionModal'

const DURING = 1 * 60 * 1000
// const DURING = 10000;

export default function Timer() {
  const [isBlocked, setIsBlocked] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsBlocked(true)
    }, DURING)

    return () => clearTimeout(timeout)
  }, [])

  if (isBlocked) return <BlockedPage />

  return null
}

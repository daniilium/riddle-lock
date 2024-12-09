import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { send } from '@/lib/send'
import { getRiddle } from '@/pages/background/getRiddle'
import { TypographyH1 } from '@/components/TypographyH1'
import { TypographyP } from '@/components/TypographyP'

type Props = {
  riddle: Awaited<ReturnType<typeof getRiddle>>['riddle']
  signalCloseModal: () => void
}

const grayBackground = 'bg-gray-200 py-0.5 px-2 rounded-md'

export default function QuestionModal(props: Props) {
  const [isOpen, setIsOpen] = useState(true)
  const [userAnswer, setUserAnswer] = useState<string>()
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | undefined>()

  const handleResolveRiddle = async (answer: string) => {
    setUserAnswer(answer)

    const currentUrl = window.location.href
    const response = await send('validateRiddleAnswer', {
      url: currentUrl,
      userAnswer: answer,
    })
    let timeoutId = setTimeout(() => {}, 0)

    if (response.isAnswerCorrect) {
      setIsCorrectAnswer(true)
      timeoutId = setTimeout(() => props.signalCloseModal(), 2000)
    } else {
      setIsCorrectAnswer(false)
      timeoutId = setTimeout(() => props.signalCloseModal(), 5000)
    }

    return () => clearTimeout(timeoutId)
  }

  const isNoAnswer = typeof isCorrectAnswer === 'undefined'

  const isGoodAnswer =
    isCorrectAnswer === true && typeof isCorrectAnswer !== 'undefined'

  const isWrongAnswer =
    isCorrectAnswer === false && typeof isCorrectAnswer !== 'undefined'

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="z-[2147483647]">
        <AlertDialogTitle>Дай правильный ответ!</AlertDialogTitle>

        <TypographyH1>{props.riddle?.question}</TypographyH1>

        {isNoAnswer && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {props.riddle?.options.map((option) => (
              <Button
                key={option}
                className="text-xl w-auto in-w-[150px]"
                size="lg"
                onClick={async () => await handleResolveRiddle(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {isGoodAnswer && (
          <>
            <TypographyH1 className="text-green-600">Правильно!</TypographyH1>

            <TypographyP>
              На вопрос
              <span className={grayBackground}>{props.riddle?.question}</span>
              ты ответил <span className={grayBackground}>{userAnswer}</span>
            </TypographyP>
          </>
        )}

        {isWrongAnswer && (
          <div>
            <TypographyH1 className="text-red-600">Неправильно!</TypographyH1>

            <TypographyP>
              На вопрос
              <span className={grayBackground}>{props.riddle?.question}</span>
              ты ответил <span className={grayBackground}>{userAnswer}</span>
            </TypographyP>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}

import { checkDomain } from '@/pages/background/checkDomain'
import { getRiddle } from '@/pages/background/getRiddle'
import { validateRiddleAnswer } from '@/pages/background/validateRiddleAnswer'

interface MessageType<Data, Response> {
  data: Data
  response: Response
}

type MessageTypeMap = {
  getRiddle: MessageType<
    Parameters<typeof getRiddle>[0],
    ReturnType<typeof getRiddle>
  >

  validateRiddleAnswer: MessageType<
    Parameters<typeof validateRiddleAnswer>[0],
    ReturnType<typeof validateRiddleAnswer>
  >

  checkDomain: MessageType<
    Parameters<typeof checkDomain>[0],
    ReturnType<typeof checkDomain>
  >
}

export async function send<T extends keyof MessageTypeMap>(
  type: T,
  data: MessageTypeMap[T]['data']
): Promise<MessageTypeMap[T]['response']> {
  const response = await chrome.runtime.sendMessage({ type, data })
  return response.data
}

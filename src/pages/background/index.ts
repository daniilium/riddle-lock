import { checkDomain } from './checkDomain'
import { getRiddle } from './getRiddle'
import { validateRiddleAnswer } from './validateRiddleAnswer'
import { blackDomains, RIDDLE_COOLDOWN } from './store'
import { local } from '@/lib/storage'

chrome.runtime.onInstalled.addListener(async () => {
  console.log('onInstalled')

  const isFirstRun = await local.get('isFirstRun')

  const isNotFirstRun = Boolean(isFirstRun) && isFirstRun !== undefined
  if (isNotFirstRun) return

  // действия для первого запуска плагина
  local.set('RIDDLE_COOLDOWN', RIDDLE_COOLDOWN)

  local.set('blackDomains', blackDomains)

  local.set('isFirstRun', true)
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type } = message

  if (type === 'getRiddle') {
    handleFunction(sendResponse, message, getRiddle)
    return true
  }

  if (type === 'validateRiddleAnswer') {
    handleFunction(sendResponse, message, validateRiddleAnswer)
    return true
  }

  if (type === 'checkDomain') {
    handleFunction(sendResponse, message, checkDomain)
    return true
  }
})

async function handleFunction<T, R>(
  sendResponse: (response: { type: string; data: R }) => void,
  // any приходит от библиотеки chrome
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any,
  callback: (data: T) => R | Promise<R>
) {
  const { type, data } = message

  const result = await callback(data)
  sendResponse({ type: type, data: result })
}

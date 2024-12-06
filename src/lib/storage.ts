import { storage } from 'webextension-polyfill'

type BlackDomain = {
  lastAnsweredAt: number
  questionId: number
}

type LocalData = {
  isFirstRun?: boolean
  RIDDLE_COOLDOWN: number
  blackDomains: Record<string, BlackDomain>
}

class CustomStorage {
  async get<K extends keyof LocalData>(key: K) {
    const result = await storage.local.get(key)

    return result[key] as LocalData[K]
  }

  async set<K extends keyof LocalData>(
    key: keyof LocalData,
    value: LocalData[K]
  ) {
    return await storage.local.set({ [key]: value })
  }

  async remove<K extends keyof LocalData>(key: K) {
    return await storage.local.remove(key)
  }
}

export const local = new CustomStorage()

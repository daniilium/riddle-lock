import { createRoot as createReactRoot } from 'react-dom/client'

import App from './App'
import { send } from '@/lib/send'

import '@/assets/styles/tailwind.css'

const main = async () => {
  const currentDomain = window.location.href
  const isBlackDomain = await send('checkDomain', currentDomain)

  if (isBlackDomain) {
    const root = await createRoot()
    root.render(<App />)
  }
}

main()

async function createRoot() {
  // Create the container for the shadow DOM
  const div = document.createElement('div')
  div.id = '__root'
  document.body.appendChild(div)
  div.style.all = 'initial'

  // Attach shadow DOM
  const shadowRoot = div.attachShadow({ mode: 'open' })

  // Create a container inside the shadow root for the React app
  const shadowContainer = document.createElement('div')
  shadowContainer.id = 'shadow-app'
  shadowContainer.classList.add('font-sans')
  shadowRoot.appendChild(shadowContainer)

  // Create styles
  await createStyles(shadowRoot)

  const root = createReactRoot(shadowContainer)
  return root
}

async function createStyles(node: ShadowRoot) {
  const stylesFile = chrome.runtime.getURL('index.css')
  const stylesText = await (await fetch(stylesFile)).text()
  const styleNode = document.createElement('style')

  styleNode.textContent = stylesText.replaceAll(':root', ':host')

  node.append(styleNode)
}

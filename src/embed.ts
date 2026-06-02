import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { injectStyles } from './styles'

function mountAll(selector: string, Component: React.ComponentType, flag: string) {
  document.querySelectorAll<HTMLElement>(selector).forEach(el => {
    if (el.dataset[flag]) return
    el.dataset[flag] = 'true'
    createRoot(el).render(createElement(Component))
  })
}

function mount() {
  injectStyles()
  mountAll('[data-el="helpdesk-roi"]', App, 'groiMounted')
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount)
} else {
  mount()
}

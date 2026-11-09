import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { CONTENT, type Lang } from './content'

const STORAGE_KEY = 'portfolio-lang'

function isLang(value: unknown): value is Lang {
  return value === 'fr' || value === 'en'
}

// The URL wins so a shared link opens in the language it was shared in, then the
// visitor's last choice, then the browser's languages. French is the default.
function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (isLang(fromUrl)) return fromUrl
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLang(stored)) return stored
  } catch {
    // Storage can be blocked (private mode); the browser language is enough.
  }
  const preferred = navigator.languages ?? [navigator.language]
  const firstKnown = preferred.map((l) => l.slice(0, 2)).find(isLang)
  return firstKnown ?? 'fr'
}

export function useLang() {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const content = CONTENT[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = content.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', content.meta.description)
  }, [lang, content])

  const setLang = useCallback((next: Lang) => {
    const apply = () => {
      flushSync(() => setLangState(next))
      const url = new URL(window.location.href)
      url.searchParams.set('lang', next)
      window.history.replaceState(null, '', url)
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Not critical: the URL already carries the choice.
      }
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if ('startViewTransition' in document && !reduceMotion) {
      document.startViewTransition(apply)
    } else {
      apply()
    }
  }, [])

  return { lang, content, setLang }
}

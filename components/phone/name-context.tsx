'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { romanizeName } from '@/lib/romanize'

export const DEFAULT_KOREAN_NAME = '여주'
export const DEFAULT_ENGLISH_NAME = 'yjooooo'

type NameState = {
  koreanName: string
  englishName: string
  applyName: (raw: string) => void
  resetName: () => void
}

const NameContext = createContext<NameState | null>(null)

/*
 * 입력한 이름은 오직 React 메모리 상태(useState)에만 보관됩니다.
 * localStorage, sessionStorage, 쿠키, 서버 DB 등 어디에도 저장하지 않으므로
 * 페이지를 새로고침하거나 링크를 벗어나면 기본값(여주 / yjooooo)으로 돌아갑니다.
 */
export function NameProvider({ children }: { children: ReactNode }) {
  const [koreanName, setKoreanName] = useState(DEFAULT_KOREAN_NAME)
  const [englishName, setEnglishName] = useState(DEFAULT_ENGLISH_NAME)

  const resetName = () => {
    setKoreanName(DEFAULT_KOREAN_NAME)
    setEnglishName(DEFAULT_ENGLISH_NAME)
  }

  const applyName = (raw: string) => {
    const trimmed = raw.trim()
    const romanized = romanizeName(trimmed)
    if (!trimmed || !romanized) {
      resetName()
      return
    }
    setKoreanName(trimmed)
    setEnglishName(romanized)
  }

  return (
    <NameContext.Provider value={{ koreanName, englishName, applyName, resetName }}>
      {children}
    </NameContext.Provider>
  )
}

export function useNames() {
  const ctx = useContext(NameContext)
  if (!ctx) throw new Error('useNames must be used within NameProvider')
  return ctx
}

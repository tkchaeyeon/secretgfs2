'use client'

import { useEffect, useState } from 'react'

const WEEKDAY_LABELS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

export function useToday() {
  const [today, setToday] = useState<Date | null>(null)

  useEffect(() => {
    const update = () =>
      setToday((prev) => {
        const now = new Date()
        return prev && prev.toDateString() === now.toDateString() ? prev : now
      })
    update()
    const id = setInterval(update, 60_000)
    document.addEventListener('visibilitychange', update)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return today
}

export function CalendarIconDate() {
  const today = useToday()

  return (
    <>
      <span className="text-[15cqw] font-semibold text-[#fa233b]">
        {today ? WEEKDAY_LABELS[today.getDay()] : '\u00a0'}
      </span>
      <span className="text-[50cqw] font-light tracking-tight text-black">
        {today ? today.getDate() : '\u00a0'}
      </span>
    </>
  )
}

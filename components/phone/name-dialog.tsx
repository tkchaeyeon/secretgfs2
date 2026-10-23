'use client'

import { useState } from 'react'
import { useNames } from './name-context'

export function NameDialog({ onDone }: { onDone: () => void }) {
  const { applyName, resetName } = useNames()
  const [value, setValue] = useState('')

  const confirm = () => {
    applyName(value)
    onDone()
  }

  const close = () => {
    resetName()
    onDone()
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-10 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="name-dialog-title"
    >
      <div className="w-full max-w-[280px] overflow-hidden rounded-[14px] bg-[#f2f2f7]/95 text-center text-black shadow-2xl backdrop-blur-xl">
        <div className="px-4 pt-5 pb-4">
          <h2 id="name-dialog-title" className="text-[17px] font-semibold">
            이름 입력하세요.
          </h2>
          <p className="mt-1 text-[12px] leading-snug text-black/60">
            입력한 이름은 이 페이지가 열려 있는 동안만 사용되며 어디에도 저장되지 않아요.
          </p>
          <label htmlFor="name-input" className="sr-only">
            이름
          </label>
          <input
            id="name-input"
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return
              if (e.nativeEvent.isComposing || e.keyCode === 229) return
              confirm()
            }}
            placeholder="여주"
            autoComplete="off"
            maxLength={10}
            className="mt-4 h-9 w-full rounded-md border border-black/15 bg-white px-2 text-[16px] outline-none focus:border-[#007aff]"
          />
        </div>
        <div className="flex border-t border-black/15">
          <button
            type="button"
            onClick={close}
            className="h-11 flex-1 text-[17px] text-[#007aff] active:bg-black/5"
          >
            닫기
          </button>
          <div className="w-px bg-black/15" aria-hidden="true" />
          <button
            type="button"
            onClick={confirm}
            className="h-11 flex-1 text-[17px] font-semibold text-[#007aff] active:bg-black/5"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

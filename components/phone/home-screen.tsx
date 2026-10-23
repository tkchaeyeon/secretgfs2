'use client'

import { useState } from 'react'
import { AppIcon, APP_LABELS, EXTERNAL_APP_URLS, type AppId } from './app-icons'
import { StatusBar } from './status-bar'

const FOLDERS = {
  basic: { name: 'basic', apps: ['photos', 'calendar'] as AppId[] },
  social: { name: 'social', apps: ['google', 'instagram', 'kakao', 'x', 'youtube'] as AppId[] },
}
type FolderKey = keyof typeof FOLDERS

const DOCK: AppId[] = ['phone', 'messages', 'music']
const APPLE_MUSIC_URL = 'https://music.apple.com/kr/album/i-spy-the-4th-mini-album-ep/6816842802'

export function HomeScreen({
  onOpenApp,
  badges = {},
}: {
  onOpenApp: (id: AppId) => void
  badges?: Partial<Record<AppId, number>>
}) {
  const [openFolder, setOpenFolder] = useState<FolderKey | null>(null)

  return (
    <div className="relative flex h-full flex-col">
      <StatusBar tone="light" />

      <div className="flex-1" />

      <div className="grid grid-cols-4 gap-x-5 px-6 pb-4">
        {(Object.keys(FOLDERS) as FolderKey[]).map((key) => (
          <FolderTile key={key} folderKey={key} onOpen={() => setOpenFolder(key)} />
        ))}
      </div>

      <div className="flex justify-center gap-2 pb-3" aria-hidden="true">
        <span className="size-[7px] rounded-full bg-white" />
        <span className="size-[7px] rounded-full bg-white/40" />
      </div>

      <nav aria-label="Dock" className="mx-3 mb-3 rounded-[32px] bg-white/25 px-4 py-4 backdrop-blur-2xl">
        <ul className="flex justify-between">
          {DOCK.map((id) => (
            <li key={id} className="w-[calc((100%-3.75rem)/4)]">
              {id === 'music' ? (
                <a
                  href={APPLE_MUSIC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-full transition-transform active:scale-90"
                  aria-label={APP_LABELS[id]}
                >
                  <AppIcon id={id} className="w-full" />
                </a>
              ) : (
              <button
                type="button"
                onClick={() => onOpenApp(id)}
                className="relative block w-full transition-transform active:scale-90"
                aria-label={badges[id] ? `${APP_LABELS[id]}, 알림 ${badges[id]}개` : APP_LABELS[id]}
              >
                <AppIcon id={id} className="w-full" />
                {badges[id] ? (
                  <span
                    className="absolute -top-1.5 -right-1.5 flex h-[23px] min-w-[23px] items-center justify-center rounded-full bg-[#ff3b30] px-1.5 text-[14px] font-medium text-white"
                    aria-hidden="true"
                  >
                    {badges[id]}
                  </span>
                ) : null}
              </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {openFolder && (
        <FolderOverlay
          folderKey={openFolder}
          onClose={() => setOpenFolder(null)}
          onOpenApp={(id) => {
            setOpenFolder(null)
            onOpenApp(id)
          }}
        />
      )}
    </div>
  )
}

function FolderTile({ folderKey, onOpen }: { folderKey: FolderKey; onOpen: () => void }) {
  const folder = FOLDERS[folderKey]
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-col items-center gap-1.5 transition-transform active:scale-90"
      aria-label={`${folder.name} 폴더 열기`}
    >
      <div className="grid aspect-square w-full grid-cols-3 content-start gap-[6%] rounded-[22.5%] bg-white/30 p-[14%] backdrop-blur-xl">
        {folder.apps.map((id) => (
          <AppIcon key={id} id={id} className="w-full shadow-none" />
        ))}
      </div>
      <span className="text-[12px] font-medium text-white drop-shadow">{folder.name}</span>
    </button>
  )
}

function FolderOverlay({
  folderKey,
  onClose,
  onOpenApp,
}: {
  folderKey: FolderKey
  onClose: () => void
  onOpenApp: (id: AppId) => void
}) {
  const folder = FOLDERS[folderKey]
  return (
    <div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/25 px-10 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${folder.name} 폴더`}
    >
      <h2 className="mb-6 w-full px-2 text-left text-[30px] font-bold text-white">{folder.name}</h2>
      <div
        className="grid w-full grid-cols-3 gap-x-6 gap-y-5 rounded-[38px] bg-white/30 p-6 backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {folder.apps.map((id) => {
          const content = (
            <>
              <AppIcon id={id} className="w-full" />
              <span className="truncate text-[12px] font-medium text-white">{APP_LABELS[id]}</span>
            </>
          )
          const externalUrl = EXTERNAL_APP_URLS[id]
          return externalUrl ? (
            <a
              key={id}
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 transition-transform active:scale-90"
            >
              {content}
            </a>
          ) : (
            <button
              key={id}
              type="button"
              onClick={() => onOpenApp(id)}
              className="flex flex-col items-center gap-1.5 transition-transform active:scale-90"
            >
              {content}
            </button>
          )
        })}
      </div>
    </div>
  )
}

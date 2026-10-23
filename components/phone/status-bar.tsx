import { cn } from '@/lib/utils'

export function StatusBar({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const color = tone === 'light' ? 'text-white' : 'text-black'
  return (
    <div
      className={cn(
        'relative z-10 flex h-[50px] shrink-0 items-center justify-between px-8 pt-1 text-[16px] font-semibold',
        color,
      )}
    >
      <span className="w-14 tabular-nums">2:43</span>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <svg viewBox="0 0 18 12" className="h-3 w-[18px]" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 16 12" className="h-3 w-4" fill="currentColor">
          <path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.3A10.3 10.3 0 0 0 8 .6 10.3 10.3 0 0 0 .8 3.5L2 4.8a8.5 8.5 0 0 1 6-2.4Z" />
          <path d="M8 5.8c1.4 0 2.6.5 3.6 1.4l1.2-1.3A7 7 0 0 0 8 4a7 7 0 0 0-4.8 1.9l1.2 1.3c1-.9 2.2-1.4 3.6-1.4Z" />
          <path d="M8 9.2c.5 0 1 .2 1.3.5L8 11.2 6.7 9.7c.3-.3.8-.5 1.3-.5Z" />
        </svg>
        <div className="flex items-center">
          <div className="relative h-[12px] w-[25px] rounded-[4px] border border-current/40 p-[1.5px]">
            <div className="h-full w-[72%] rounded-[2px] bg-current" />
          </div>
          <div className="ml-[1px] h-[4px] w-[1.5px] rounded-r bg-current/40" />
        </div>
      </div>
    </div>
  )
}

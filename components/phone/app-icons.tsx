import { MessageCircle, Music, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

export type AppId =
  | 'phone'
  | 'messages'
  | 'music'
  | 'photos'
  | 'calendar'
  | 'google'
  | 'instagram'
  | 'kakao'
  | 'x'
  | 'youtube'

export const EXTERNAL_APP_URLS: Partial<Record<AppId, string>> = {
  music: 'https://music.apple.com/kr/album/i-spy-the-4th-mini-album-ep/6816842802',
  youtube: 'https://youtu.be/CJ8DspyQiOo?si=cWXZb_9ZOBmMFUAI',
}

export const APP_LABELS: Record<AppId, string> = {
  phone: '전화',
  messages: '메시지',
  music: '음악',
  photos: '사진',
  calendar: '캘린더',
  google: 'Google',
  instagram: 'Instagram',
  kakao: '카카오톡',
  x: 'X',
  youtube: 'YouTube',
}

export function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

export function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function PhotosFlower() {
  const petals = ['#f9a825', '#fb8c00', '#e53935', '#d81b60', '#8e24aa', '#3949ab', '#039be5', '#43a047']
  return (
    <svg viewBox="0 0 100 100" className="size-[78%]" aria-hidden="true">
      {petals.map((color, i) => (
        <ellipse
          key={color}
          cx="50"
          cy="27"
          rx="13"
          ry="22"
          fill={color}
          opacity="0.85"
          transform={`rotate(${i * 45} 50 50)`}
          style={{ mixBlendMode: 'multiply' }}
        />
      ))}
    </svg>
  )
}

export function AppIcon({ id, className }: { id: AppId; className?: string }) {
  const base = cn(
    '@container relative flex aspect-square items-center justify-center overflow-hidden rounded-[22.5%] shadow-sm',
    className,
  )

  switch (id) {
    case 'phone':
      return (
        <div className={cn(base, 'bg-gradient-to-b from-[#5bf675] to-[#0cbd2a]')}>
          <Phone className="size-[55%] fill-white text-white" strokeWidth={0} />
        </div>
      )
    case 'messages':
      return (
        <div className={cn(base, 'bg-gradient-to-b from-[#5bf675] to-[#0cbd2a]')}>
          <MessageCircle className="size-[62%] fill-white text-white" strokeWidth={0} />
        </div>
      )
    case 'music':
      return (
        <div className={cn(base, 'bg-gradient-to-b from-[#fb5c74] to-[#fa233b]')}>
          <Music className="size-[55%] text-white" strokeWidth={2.6} />
        </div>
      )
    case 'photos':
      return (
        <div className={cn(base, 'bg-white')}>
          <PhotosFlower />
        </div>
      )
    case 'calendar':
      return (
        <div className={cn(base, 'flex-col bg-white leading-none')}>
          <span className="text-[15cqw] font-semibold text-[#fa233b]">수요일</span>
          <span className="text-[50cqw] font-light tracking-tight text-black">21</span>
        </div>
      )
    case 'google':
      return (
        <div className={cn(base, 'bg-white')}>
          <GoogleG className="size-[58%]" />
        </div>
      )
    case 'instagram':
      return (
        <div
          className={cn(base)}
          style={{
            background:
              'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
          }}
        >
          <InstagramGlyph className="size-[62%] text-white" />
        </div>
      )
    case 'kakao':
      return (
        <div className={cn(base, 'bg-[#fee500]')}>
          <div className="relative flex h-[50%] w-[66%] items-center justify-center rounded-[50%] bg-[#3a1d1d]">
            <span className="text-[14cqw] font-black tracking-tight text-[#fee500]">TALK</span>
            <span className="absolute -bottom-[12%] left-[22%] h-0 w-0 border-t-[8cqw] border-r-[6cqw] border-t-[#3a1d1d] border-r-transparent" />
          </div>
        </div>
      )
    case 'x':
      return (
        <div className={cn(base, 'bg-black')}>
          <XLogo className="size-[50%] text-white" />
        </div>
      )
    case 'youtube':
      return (
        <div className={cn(base, 'bg-white')}>
          <svg viewBox="0 0 28 20" className="w-[66%]" aria-hidden="true">
            <rect width="28" height="20" rx="5.5" fill="#ff0000" />
            <path d="M11.2 5.8 18.6 10l-7.4 4.2z" fill="#fff" />
          </svg>
        </div>
      )
  }
}

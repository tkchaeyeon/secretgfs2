'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Bookmark,
  ChevronDown,
  ChevronLeft,
  Clapperboard,
  Ellipsis,
  Grid3x3,
  Heart,
  House,
  Lock,
  Menu,
  MessageCircle,
  Search,
  Send,
  SquarePlus,
  User,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useNames } from '../name-context'
import { InstagramReels } from './instagram-reels'

const FOLLOW_REQUESTS = [
  '@yushi_mine 님 외 50명이 팔로우를 요청했습니다.',
  '@myam_myam 님 외 132명이 팔로우를 요청했습니다.',
  '@milk_shi 님 외 91명이 팔로우를 요청했습니다.',
]

const NOTIFICATION_INTERVAL_MS = 3000

const IDOLNEWS_CAPTION = `엔시티 위시 유우시의 열애설이 터졌습니다. 유우시의 데이트 현장을 포착한 기자의 사진으로 인해 열애설이 붉어졌는데요. 상대는 일반인이라는 이야기가 나오네요!

⚠️모든 저작권은 원작자에게 있으며, 저작권 관련 문제나 삭제 요청은 DM 주시면 즉시 처리하겠습니다.
❤️좋아요 | ➕ 팔로우 |📍저장 | 📥 공유

오늘의 정보가 흥미로우셨다면 좋아요와 저장으로 응원해 주세요!
더 많은 핫이슈는 팔로우하고 받아보세요🤍`

const IDOLNEWS_COMMENTS = [
  { user: 'yushigirlfriend', text: '구라까지마 진짜', time: '2분', avatar: '/images/comment-avatar-1.jpeg' },
  { user: 'tokuno_suki', text: '네 그게 바로 접니다', time: '1분', avatar: '/images/comment-avatar-2.jpeg' },
  { user: 'tokuno_suki', text: '저예요 믿어주세요', time: '1분', avatar: '/images/comment-avatar-2.jpeg' },
]

type Tab = 'home' | 'reels' | 'profile'

export function InstagramApp() {
  const [tab, setTab] = useState<Tab>('home')

  return (
    <div className="relative flex h-full flex-col bg-white">
      <FollowRequestBanners />
      {tab === 'reels' ? (
        <div className="min-h-0 flex-1">
          <InstagramReels />
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto">{tab === 'home' ? <HomeFeed /> : <Profile />}</div>
      )}
      <nav className="flex shrink-0 items-center justify-around border-t border-black/10 bg-white text-black">
        <TabButton label="홈" active={tab === 'home'} onClick={() => setTab('home')}>
          <House className="size-[26px]" strokeWidth={tab === 'home' ? 2.6 : 1.8} />
        </TabButton>
        <span className="flex size-11 items-center justify-center" aria-hidden="true">
          <Search className="size-[26px]" strokeWidth={1.8} />
        </span>
        <span className="flex size-11 items-center justify-center" aria-hidden="true">
          <SquarePlus className="size-[26px]" strokeWidth={1.8} />
        </span>
        <TabButton label="릴스" active={tab === 'reels'} onClick={() => setTab('reels')}>
          <Clapperboard className="size-[26px]" strokeWidth={tab === 'reels' ? 2.6 : 1.8} />
        </TabButton>
        <TabButton label="내 프로필" active={tab === 'profile'} onClick={() => setTab('profile')}>
          <span
            className={cn(
              'flex size-7 items-end justify-center overflow-hidden rounded-full bg-[#dbdbdb]',
              tab === 'profile' && 'ring-2 ring-black ring-offset-1',
            )}
          >
            <User className="size-[85%] translate-y-[12%] fill-white text-white" strokeWidth={0} />
          </span>
        </TabButton>
      </nav>
    </div>
  )
}

function TabButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className="flex size-11 items-center justify-center"
    >
      {children}
    </button>
  )
}

function FollowRequestBanners() {
  const [current, setCurrent] = useState<number | null>(null)

  useEffect(() => {
    const timers = FOLLOW_REQUESTS.map((_, i) =>
      setTimeout(() => setCurrent(i), 500 + i * NOTIFICATION_INTERVAL_MS),
    )
    const lastRequestEnd = 500 + FOLLOW_REQUESTS.length * NOTIFICATION_INTERVAL_MS - 300
    timers.push(setTimeout(() => setCurrent(null), lastRequestEnd))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-x-2 top-1 z-30 flex flex-col" aria-live="polite">
      {current !== null && [current].map((i) => (
        <div
          key={i}
          role="status"
          className="flex items-center gap-2.5 rounded-[22px] bg-white/85 p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl animate-in fade-in slide-in-from-top-6 duration-500"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]">
            <span className="size-[18px] rounded-[6px] border-2 border-white" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-black">Instagram</span>
              <span className="text-[12px] text-black/45">지금</span>
            </div>
            <p className="text-[14px] leading-snug text-black">{FOLLOW_REQUESTS[i]}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const FOLLOW_REQUEST_USERS = [
  { id: 'yushi_mine', time: '1분' },
  { id: 'myam_myam', time: '2분' },
  { id: 'milk_shi', time: '3분' },
  { id: 'tokuno_suki', time: '5분' },
  { id: 'wish_for_yushi', time: '8분' },
  { id: 'sion_dduk', time: '12분' },
  { id: 'nctwish.daily', time: '15분' },
  { id: 'yushi_my_love', time: '21분' },
  { id: 'gogumahyang_', time: '34분' },
  { id: 'who.is.she__', time: '47분' },
]

function NotificationsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <header className="flex h-11 items-center gap-1 px-1">
        <button
          type="button"
          onClick={onBack}
          aria-label="뒤로"
          className="flex size-11 items-center justify-center text-black"
        >
          <ChevronLeft className="size-7" />
        </button>
        <h2 className="text-[20px] font-bold text-black">알림</h2>
      </header>
      <p className="px-4 pt-3 pb-2 text-[16px] font-bold text-black">팔로우 요청</p>
      <ul>
        {FOLLOW_REQUEST_USERS.map((u) => (
          <li key={u.id} className="flex items-center gap-3 px-4 py-2">
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-end justify-center overflow-hidden rounded-full bg-[#dbdbdb]"
            >
              <User className="size-[85%] translate-y-[12%] fill-white text-white" strokeWidth={0} />
            </span>
            <p className="min-w-0 flex-1 text-[14px] leading-snug text-black">
              <span className="font-semibold break-all">{u.id}</span>
              <span>님이 팔로우를 요청했습니다. </span>
              <span className="text-black/45">{u.time}</span>
            </p>
            <span className="flex shrink-0 gap-1.5">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="h-8 rounded-[8px] bg-[#0095f6] px-3 text-[14px] font-semibold text-white"
              >
                확인
              </button>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="h-8 rounded-[8px] bg-[#efefef] px-3 text-[14px] font-semibold text-black"
              >
                삭제
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function HomeFeed() {
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  const [storyOpen, setStoryOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  if (notificationsOpen) return <NotificationsView onBack={() => setNotificationsOpen(false)} />

  return (
    <>
      <header className="flex items-center justify-between px-4 pb-2">
        <span className="flex items-center gap-1 font-serif text-[26px] font-semibold italic tracking-tight text-black">
          Instagram
          <ChevronDown className="size-4" />
        </span>
        <span className="flex items-center gap-2 text-black">
          <button
            type="button"
            onClick={() => setNotificationsOpen(true)}
            aria-label="알림"
            className="relative flex size-11 items-center justify-center"
          >
            <Heart className="size-6" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-[#ff3040]" aria-hidden="true" />
          </button>
          <Send className="size-6" />
        </span>
      </header>

      <StoriesRow onOpen={() => setStoryOpen(true)} />

      <article className="pb-4">
        <div className="flex items-center gap-2.5 px-3 py-2">
          <IdolnewsAvatar />
          <span className="flex-1 text-[14px] font-semibold text-black">idolnews</span>
          <Ellipsis className="size-5 text-black" />
        </div>
        <div className="relative aspect-[1199/1443] w-full bg-[#efefef]">
          <Image
            src="/images/idolnews.jpeg"
            alt="엔위시 유우시 일반인 여친과 열애설 뜸"
            fill
            sizes="390px"
            className="object-cover"
            priority
          />
        </div>
        <div className="flex items-center gap-1 px-1.5 pt-1 text-black">
          <button
            type="button"
            onClick={() => setLiked((l) => !l)}
            aria-label={liked ? '좋아요 취소' : '좋아요'}
            aria-pressed={liked}
            className="flex size-11 items-center justify-center"
          >
            <Heart className={cn('size-6', liked && 'fill-[#ff3040] text-[#ff3040]')} />
          </button>
          <button
            type="button"
            onClick={() => setCommentsOpen(true)}
            aria-label="댓글 보기"
            className="flex size-11 items-center justify-center"
          >
            <MessageCircle className="size-6 -scale-x-100" />
          </button>
          <Send className="mx-2.5 size-6" />
          <Bookmark className="mr-2.5 ml-auto size-6" />
        </div>
        <div className="px-3 text-[14px] leading-snug text-black">
          <p className="font-semibold">좋아요 {liked ? '12,849' : '12,848'}개</p>
          <p className="mt-1 whitespace-pre-line">
            <span className="mr-1 font-semibold">idolnews</span>
            {IDOLNEWS_CAPTION}
          </p>
          <button
            type="button"
            onClick={() => setCommentsOpen(true)}
            className="mt-1 min-h-11 text-[14px] text-black/50"
          >
            댓글 {IDOLNEWS_COMMENTS.length}개 모두 보기
          </button>
          <p className="text-[12px] text-black/45">5분 전</p>
        </div>
      </article>

      {commentsOpen && <CommentsSheet onClose={() => setCommentsOpen(false)} />}
      {storyOpen && <StoryViewer onClose={() => setStoryOpen(false)} />}
    </>
  )
}

const STORIES = [
  { user: 'wish_fan', viewable: true },
  { user: 'godbanin_1', viewable: false },
  { user: 'godbanin_2', viewable: false },
  { user: 'godbanin_3', viewable: false },
]

const STORY_DURATION_MS = 5000

function StoryRing({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-[66px] items-center justify-center rounded-full bg-[conic-gradient(from_200deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5,#feda75)] p-[2.5px]">
      <span className="flex size-full items-center justify-center rounded-full bg-white p-[2.5px]">
        <span className="flex size-full items-end justify-center overflow-hidden rounded-full bg-[#dbdbdb]">
          {children}
        </span>
      </span>
    </span>
  )
}

function StoriesRow({ onOpen }: { onOpen: () => void }) {
  return (
    <ul className="flex gap-3.5 overflow-x-auto border-b border-black/10 px-3 pb-3" aria-label="스토리">
      {STORIES.map((s) => {
        const content = (
          <>
            <StoryRing>
              <User className="size-[85%] translate-y-[12%] fill-white text-white" strokeWidth={0} />
            </StoryRing>
            <span className="w-[70px] truncate text-center text-[12px] text-black">{s.user}</span>
          </>
        )
        return (
          <li key={s.user} className="shrink-0">
            {s.viewable ? (
              <button
                type="button"
                onClick={onOpen}
                aria-label={`${s.user} 스토리 보기`}
                className="flex flex-col items-center gap-1 transition-transform active:scale-95"
              >
                {content}
              </button>
            ) : (
              <div className="flex flex-col items-center gap-1" aria-label={`${s.user} 스토리`}>
                {content}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function StoryViewer({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const id = setTimeout(onClose, STORY_DURATION_MS)
    return () => clearTimeout(id)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="wish_fan 스토리"
      className="absolute inset-0 z-40 flex flex-col bg-black animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="absolute inset-x-2 top-2 z-10 h-[2.5px] overflow-hidden rounded-full bg-white/35">
        <div
          className="h-full origin-left bg-white"
          style={{ animation: `story-progress ${STORY_DURATION_MS}ms linear forwards` }}
        />
      </div>
      <div className="absolute inset-x-3 top-5 z-10 flex items-center gap-2">
        <span className="flex size-8 items-end justify-center overflow-hidden rounded-full bg-[#dbdbdb]">
          <User className="size-[85%] translate-y-[12%] fill-white text-white" strokeWidth={0} />
        </span>
        <span className="text-[14px] font-semibold text-white drop-shadow">wish_fan</span>
        <span className="text-[14px] text-white/70 drop-shadow">1시간</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="스토리 닫기"
          className="ml-auto flex size-11 items-center justify-center text-white"
        >
          <X className="size-7" />
        </button>
      </div>
      <button type="button" onClick={onClose} className="relative flex-1" aria-label="스토리 닫기">
        <Image src="/images/story-wish-fan.jpeg" alt="먼저 갑니다" fill sizes="390px" className="object-contain" />
      </button>
      <style>{`@keyframes story-progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </div>
  )
}

function IdolnewsAvatar() {
  return (
    <span
      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-black text-center text-[8px] font-bold leading-none text-white"
      aria-hidden="true"
    >
      IDOL
      <br />
      NEWS
    </span>
  )
}

function CommentsSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-end bg-black/40" role="dialog" aria-label="댓글">
      <button type="button" className="flex-1" onClick={onClose} aria-label="댓글 닫기" />
      <div className="flex max-h-[70%] flex-col rounded-t-2xl bg-white animate-in slide-in-from-bottom duration-300">
        <div className="relative flex items-center justify-center border-b border-black/10 py-3">
          <span className="absolute top-1.5 h-1 w-10 rounded-full bg-black/20" aria-hidden="true" />
          <h2 className="pt-1 text-[15px] font-semibold text-black">댓글</h2>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-1 flex size-11 items-center justify-center text-black"
            aria-label="닫기"
          >
            <X className="size-5" />
          </button>
        </div>
        <ul className="overflow-y-auto px-4 py-3">
          {IDOLNEWS_COMMENTS.map((c, i) => (
            <li key={i} className="flex gap-3 py-2.5">
              <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-[#dbdbdb]">
                <Image src={c.avatar} alt="" fill sizes="36px" className="object-cover" />
              </span>
              <div className="min-w-0 flex-1 text-[14px] leading-snug text-black">
                <p>
                  <span className="mr-1.5 font-semibold">{c.user}</span>
                  <span className="text-[12px] text-black/45">{c.time}</span>
                </p>
                <p>{c.text}</p>
                <p className="mt-1 text-[12px] font-semibold text-black/45">답글 달기</p>
              </div>
              <Heart className="mt-2 size-3.5 shrink-0 text-black/45" />
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 border-t border-black/10 px-4 py-3">
          <span className="flex size-8 shrink-0 items-end justify-center overflow-hidden rounded-full bg-[#dbdbdb]">
            <User className="size-[85%] translate-y-[12%] fill-white text-white" strokeWidth={0} />
          </span>
          <span className="text-[15px] text-black/40">idolnews님에게 댓글 추가...</span>
        </div>
      </div>
    </div>
  )
}

type MyPostData = { id: string; src: string; caption?: string; date: string; likes: number }

const MY_POSTS: MyPostData[] = [
  { id: 'sep17', src: '/images/gallery-sep17.jpeg', caption: '❤︎', date: '9월 17일', likes: 112 },
  { id: 'feb14', src: '/images/my-post-feb14.jpeg', caption: "V's day", date: '2월 14일', likes: 134 },
  { id: 'aug13-2025', src: '/images/my-post-2.jpeg', date: '2025년 8월 13일', likes: 87 },
]

function Profile() {
  const { koreanName, englishName } = useNames()
  const [openPost, setOpenPost] = useState<MyPostData | null>(null)

  if (openPost) return <MyPost post={openPost} onBack={() => setOpenPost(null)} />

  return (
    <>
      <header className="flex items-center justify-between px-4 pb-2">
        <span className="flex items-center gap-1 text-[22px] font-bold text-black">
          <Lock className="size-4" />
          {englishName}
          <ChevronDown className="size-4" />
        </span>
        <span className="flex items-center gap-5 text-black">
          <SquarePlus className="size-6" />
          <Menu className="size-6" />
        </span>
      </header>

      <section className="flex items-center gap-6 px-4 pt-2">
        <span className="flex size-[84px] shrink-0 items-end justify-center overflow-hidden rounded-full bg-[#dbdbdb]">
          <User className="size-[80%] translate-y-[12%] fill-white text-white" strokeWidth={0} />
        </span>
        <dl className="flex flex-1 justify-around text-center">
          {[
            ['게시물', String(MY_POSTS.length)],
    ['팔로워', '120'],
    ['팔로잉', '120'],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col-reverse">
              <dt className="text-[13px] text-black">{label}</dt>
              <dd className="text-[17px] font-semibold text-black">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="px-4 pt-3 text-[14px] leading-snug text-black">
        <p className="font-semibold">{koreanName}</p>
      </div>

      <div className="flex gap-1.5 px-4 pt-3">
        <span className="flex h-8 flex-1 items-center justify-center rounded-lg bg-[#efefef] text-[14px] font-semibold">
          프로필 편집
        </span>
        <span className="flex h-8 flex-1 items-center justify-center rounded-lg bg-[#efefef] text-[14px] font-semibold">
          프로필 공유
        </span>
      </div>

      <div className="mt-4 flex justify-center border-b border-black pb-2">
        <Grid3x3 className="size-6 text-black" />
      </div>
      <div className="grid grid-cols-3 gap-0.5">
        {MY_POSTS.map((post) => (
          <button
            key={post.id}
            type="button"
            onClick={() => setOpenPost(post)}
            className="relative aspect-[3/4] bg-[#efefef]"
            aria-label={`${koreanName}의 ${post.date} 게시물 보기`}
          >
            <Image src={post.src} alt="" fill sizes="130px" className="object-cover" />
          </button>
        ))}
      </div>
    </>
  )
}

function MyPost({ post, onBack }: { post: MyPostData; onBack: () => void }) {
  const { englishName } = useNames()

  return (
    <article>
      <header className="flex items-center px-1 pb-1">
        <button
          type="button"
          onClick={onBack}
          className="flex size-11 items-center justify-center text-black"
          aria-label="뒤로"
        >
          <ChevronLeft className="size-7" />
        </button>
        <div className="flex flex-1 flex-col items-center pr-11 leading-tight">
          <span className="text-[12px] font-semibold text-black/50 uppercase">{englishName}</span>
          <span className="text-[16px] font-bold text-black">게시물</span>
        </div>
      </header>
      <div className="flex items-center gap-2.5 px-3 py-2">
        <span className="flex size-8 shrink-0 items-end justify-center overflow-hidden rounded-full bg-[#dbdbdb]">
          <User className="size-[85%] translate-y-[12%] fill-white text-white" strokeWidth={0} />
        </span>
        <span className="flex-1 text-[14px] font-semibold text-black">{englishName}</span>
        <Ellipsis className="size-5 text-black" />
      </div>
      <div className="relative aspect-[3/4] w-full bg-[#efefef]">
        <Image src={post.src} alt={`${englishName}의 게시물`} fill sizes="390px" className="object-cover" />
      </div>
      <div className="flex items-center gap-4 px-3 pt-3 text-black">
        <Heart className="size-6" />
        <MessageCircle className="size-6 -scale-x-100" />
        <Send className="size-6" />
        <Bookmark className="ml-auto size-6" />
      </div>
      <div className="px-3 pt-2 pb-4 text-[14px] leading-snug text-black">
        <p className="font-semibold">좋아요 {post.likes}개</p>
        {post.caption && (
          <p className="mt-1">
            <span className="font-semibold">{englishName}</span> {post.caption}
          </p>
        )}
        <p className="mt-1 text-[12px] text-black/45">{post.date}</p>
      </div>
    </article>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, CloudSun, Ellipsis, Mic, Camera, Search, Share, Sunrise } from 'lucide-react'
import { GoogleG } from '../app-icons'
import { useNames } from '../name-context'

const TITLE = '[단독] NCT WISH 유우시, 새벽 데이트 목격담 확산… 상대 정체 두고 팬들 ‘발칵’'
const SUBTITLE = '늦은 밤 함께 있었다는 목격담 등장… 상대는 일반인 여성 추정, 사실 여부는 확인되지 않아'
const BODY = [
  '그룹 NCT WISH의 유우시가 때아닌 열애설에 휩싸였다. 최근 온라인 커뮤니티와 SNS를 중심으로 유우시의 새벽 데이트 목격담이 확산하면서 팬들의 이목이 집중되고 있다.',
  '21일 온라인상에서는 유우시가 한 여성과 늦은 시간 함께 있었다는 내용의 글이 퍼지며 화제를 모았다. 해당 글에는 두 사람이 함께 시간을 보냈다는 취지의 주장이 담긴 것으로 알려졌지만, 이를 뒷받침할 만한 명확한 증거나 구체적인 정황은 확인되지 않은 상태다.',
  '특히 상대 여성의 정체를 두고 관심이 쏠리고 있다. 일부에서는 연예계 종사자가 아닌 일반인일 가능성을 제기하고 있으나, 여성의 신원이나 유우시와의 관계를 확인할 수 있는 정보는 아직 알려지지 않았다.',
  '목격담이 확산하자 팬들 사이에서는 다양한 반응이 나오고 있다. 갑작스러운 소문에 놀라움을 드러내는 반응이 있는가 하면, 확인되지 않은 이야기만으로 열애를 단정해서는 안 된다는 신중한 의견도 이어지고 있다.',
  '다만 현재까지 해당 목격담의 진위와 두 사람의 관계는 확인되지 않았다. 소문이 온라인을 통해 빠르게 퍼지고 있는 만큼, 사실관계가 밝혀지기 전까지는 섣부른 추측을 경계할 필요가 있다.',
  '과연 이번 열애설이 단순한 해프닝으로 끝날지, 추가적인 사실이 밝혀질지 관심이 모이고 있다.',
]

export function GoogleApp() {
  const [articleOpen, setArticleOpen] = useState(false)
  return articleOpen ? <Article onBack={() => setArticleOpen(false)} /> : <Feed onOpen={() => setArticleOpen(true)} />
}

function BispatchMark() {
  return (
    <span className="flex size-4 items-center justify-center rounded-[3px] bg-black text-[9px] font-black text-white">
      B
    </span>
  )
}

function Feed({ onOpen }: { onOpen: () => void }) {
  const { englishName } = useNames()
  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="flex items-center justify-between px-4 pt-2">
        <span className="flex size-9 items-center justify-center rounded-full text-[#5f6368]">
          <Ellipsis className="size-5" />
        </span>
        <span className="flex size-8 items-center justify-center rounded-full bg-[#f4b400] text-[14px] font-semibold text-white">
          {englishName.charAt(0).toUpperCase()}
        </span>
      </div>

      <div className="flex justify-center pt-6 pb-6">
        <span className="text-[44px] font-medium tracking-tight" aria-label="Google">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
        </span>
      </div>

      <div className="px-4">
        <div className="flex h-12 items-center gap-3 rounded-full bg-[#f1f3f4] px-4">
          <Search className="size-5 text-[#5f6368]" />
          <span className="flex-1 text-[16px] text-[#5f6368]">검색</span>
          <Mic className="size-5 text-[#4285F4]" />
          <Camera className="size-5 text-[#34A853]" />
        </div>
      </div>

      <div className="mt-4 flex gap-2 px-4">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-black/10 px-3 py-2.5">
          <CloudSun className="size-7 text-[#f4b400]" />
          <div className="leading-tight">
            <p className="text-[15px] font-medium text-[#202124]">18°</p>
            <p className="text-[12px] text-[#5f6368]">서울 · 대체로 맑음</p>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-black/10 px-3 py-2.5">
          <Sunrise className="size-7 text-[#ea8600]" />
          <div className="leading-tight">
            <p className="text-[15px] font-medium text-[#202124]">오전 6:24</p>
            <p className="text-[12px] text-[#5f6368]">오늘 일출</p>
          </div>
        </div>
      </div>

      <div className="mt-5 px-4 pb-6">
        <button
          type="button"
          onClick={onOpen}
          className="block w-full overflow-hidden rounded-2xl border border-black/10 text-left active:bg-black/5"
        >
          <div className="relative aspect-[16/10] w-full">
            <Image src="/images/article.jpeg" alt="NCT WISH 유우시" fill sizes="390px" className="object-cover" />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-1.5 text-[12px] text-[#5f6368]">
              <BispatchMark />
              <span className="font-medium text-[#202124]">bispatch</span>
            </div>
            <h3 className="mt-2 text-[17px] leading-snug font-medium text-[#202124]">{TITLE}</h3>
            <p className="mt-2 text-[12px] text-[#5f6368]">32분 전</p>
          </div>
        </button>

        <div className="mt-4 block w-full overflow-hidden rounded-2xl border border-black/10" aria-disabled="true">
          <div className="relative aspect-[16/10] w-full">
            <Image src="/images/article-2.jpeg" alt="NCT WISH 유우시" fill sizes="390px" className="object-cover object-[50%_30%]" />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-1.5 text-[12px] text-[#5f6368]">
              <span className="flex size-4 items-center justify-center rounded-[3px] bg-[#6d28d9] text-[8px] font-black text-white">
                K
              </span>
              <span className="font-medium text-[#202124]">케이팝뉴스</span>
            </div>
            <h3 className="mt-2 text-[17px] leading-snug font-medium text-[#202124]">
              {'[충격] 유우시, 일반인 여친 집 드나드는 모습 포착… "얼굴 다 나온 사진까지" 열애설 일파만파'}
            </h3>
            <p className="mt-2 text-[12px] text-[#5f6368]">14분 전</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Article({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-black/10 px-2">
        <button
          type="button"
          onClick={onBack}
          className="flex size-11 items-center justify-center text-[#1a73e8]"
          aria-label="뒤로"
        >
          <ChevronLeft className="size-6" />
        </button>
        <div className="flex items-center gap-1.5 text-[14px] font-semibold">
          <BispatchMark />
          bispatch
        </div>
        <span className="flex size-11 items-center justify-center text-[#5f6368]">
          <Share className="size-5" />
        </span>
      </div>
      <article className="flex-1 overflow-y-auto px-5 pt-5 pb-8">
        <p className="text-[13px] font-semibold text-[#d93025]">연예 · 단독</p>
        <h1 className="mt-2 text-[22px] leading-snug font-bold text-[#202124] text-pretty">{TITLE}</h1>
        <p className="mt-3 border-l-[3px] border-[#202124] pl-3 text-[15px] leading-relaxed font-medium text-[#3c4043]">
          {SUBTITLE}
        </p>
        <p className="mt-3 text-[12px] text-[#5f6368]">bispatch 연예팀 · 입력 2026.10.21 02:15</p>
        <figure className="mt-5">
          <div className="relative aspect-[2048/1582] w-full overflow-hidden rounded-lg">
            <Image src="/images/article.jpeg" alt="NCT WISH 유우시" fill sizes="390px" className="object-cover" />
          </div>
          <figcaption className="mt-1.5 text-[12px] text-[#5f6368]">NCT WISH 유우시 ⓒ bispatch DB</figcaption>
        </figure>
        <div className="mt-5 space-y-4 text-[16px] leading-[1.75] text-[#202124]">
          {BODY.map((p) => (
            <p key={p.slice(0, 16)}>{p}</p>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-2 border-t border-black/10 pt-4 text-[12px] text-[#5f6368]">
          <GoogleG className="size-4" />
          Google 뉴스에서 더 보기
        </div>
      </article>
    </div>
  )
}

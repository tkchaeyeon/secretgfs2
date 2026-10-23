const HANGUL_START = 0xac00
const HANGUL_END = 0xd7a3

export function hasFinalConsonant(word: string) {
  const code = word.trim().charCodeAt(word.trim().length - 1)
  if (Number.isNaN(code) || code < HANGUL_START || code > HANGUL_END) return false
  return (code - HANGUL_START) % 28 !== 0
}

/** 여주 → 여주야, 채연 → 채연아 */
export function vocative(name: string) {
  return `${name}${hasFinalConsonant(name) ? '아' : '야'}`
}

/** 여주 → 여주, 채연 → 채연이 */
export function casualName(name: string) {
  return hasFinalConsonant(name) ? `${name}이` : name
}

/** 여주 → 여주가, 채연 → 채연이가 */
export function subject(name: string) {
  return `${name}${hasFinalConsonant(name) ? '이가' : '가'}`
}

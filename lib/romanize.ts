const INITIALS = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h']
const MEDIALS = [
  'a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo',
  'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i',
]
const FINALS = [
  '', 'k', 'k', 'k', 'n', 'n', 'n', 't', 'l', 'k', 'm', 'l', 'l', 'l', 'p', 'l',
  'm', 'p', 'p', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 't',
]

const HANGUL_START = 0xac00
const HANGUL_END = 0xd7a3

/** Korean name → lowercase Revised Romanization handle (e.g. 채연 → chaeyeon). */
export function romanizeName(input: string): string {
  let result = ''
  for (const char of input.trim()) {
    const code = char.charCodeAt(0)
    if (code >= HANGUL_START && code <= HANGUL_END) {
      const offset = code - HANGUL_START
      const initial = Math.floor(offset / 588)
      const medial = Math.floor((offset % 588) / 28)
      const final = offset % 28
      // Word-initial ㄹ is romanized as "r" in names (e.g. 리아 → ria), which INITIALS already does.
      result += INITIALS[initial] + MEDIALS[medial] + FINALS[final]
    } else if (/[a-zA-Z0-9._]/.test(char)) {
      result += char.toLowerCase()
    }
  }
  return result
}

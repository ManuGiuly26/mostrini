import type { Mostrino, Stato } from '../types'
import { SPECIE, MONDI, INIZIALI, maxHp, casellaDi } from './gioco.tsx'

// Pixel art per l'app desktop: ogni disegno è un SVG fatto di quadratini.

type Tavolozza = Record<string, string>

const NERO = '#2a2230'

// Ogni mostrino: 4 righe di "cappello" sopra un corpo comune, occhi a scelta.
const CORPO = [
  '...kkkkkk...',
  '..kbbbbbbk..',
  '.kbbbbbbbbk.',
  'OCCHI1',
  'OCCHI2',
  '.kbbbbbbbbk.',
  '.kbbllllbbk.',
  '..kbllllbk..',
  '..kbbbbbbk..',
  '...kk..kk...',
]

const OCCHI: Record<string, [string, string]> = {
  tondi: ['.kbwkbbwkbk.', '.kbkkbbkkbk.'],
  sonno: ['.kbbbbbbbbk.', '.kkkbbbbkkk.'],
  felici: ['.kbbkbbkbbk.', '.kbkbkkbkbk.'],
  stelle: ['.kbybbbbybk.', '.kyyybbyyyk.'],
}

type Disegno = { cappello: string[]; occhi: keyof typeof OCCHI; colori: Tavolozza }

const DISEGNI: Record<string, Disegno> = {
  braciotto: {
    cappello: ['....r..r....', '...ryr.yr...', '...ryyryr...', '....ryyr....'],
    occhi: 'tondi',
    colori: { b: '#ff8a4c', l: '#ffd2a6', r: '#ff4a3c', y: '#ffd84c' },
  },
  fumarello: {
    cappello: ['..gg...gg...', '.g..g.g..g..', '..gg...gg...', '............'],
    occhi: 'sonno',
    colori: { b: '#e0784a', l: '#f7c6a3', g: '#b8b0b0' },
  },
  goccetto: {
    cappello: ['............', '.....kk.....', '....kbbk....', '....kbbk....'],
    occhi: 'tondi',
    colori: { b: '#4cb4ff', l: '#c6ecff' },
  },
  ondina: {
    cappello: ['...r.r.r....', '..rrrrrrr...', '...rrrrr....', '............'],
    occhi: 'felici',
    colori: { b: '#3c8ce0', l: '#bfe3ff', r: '#8fd8ff' },
  },
  germoglio: {
    cappello: ['..rr..rr....', '...rrrr.....', '.....k......', '.....k......'],
    occhi: 'felici',
    colori: { b: '#6fd36f', l: '#d6f7c6', r: '#2f9e48' },
  },
  muschietto: {
    cappello: ['............', '....rrrr....', '..rrlrrlrr..', '...rrrrrr...'],
    occhi: 'sonno',
    colori: { b: '#5aa85a', l: '#cfe8b0', r: '#3d7d3d' },
  },
  zampetto: {
    cappello: ['............', '..k......k..', '..kk....kk..', '..kbk..kbk..'],
    occhi: 'tondi',
    colori: { b: '#d6c7b0', l: '#f5ecdc' },
  },
  piumino: {
    cappello: ['....kk......', '.....kk.....', '......k.....', '............'],
    occhi: 'tondi',
    colori: { b: '#c8b8a0', l: '#f7f0e6' },
  },
  scintillo: {
    cappello: ['.r.......r..', '..r.....r...', '.rr.....rr..', '..r.....r...'],
    occhi: 'stelle',
    colori: { b: '#ffd84c', l: '#fff3b0', r: '#ffb000', y: NERO },
  },
  gelino: {
    cappello: ['..r.....r...', '.rrr...rrr..', '..r.....r...', '............'],
    occhi: 'tondi',
    colori: { b: '#9fe6ff', l: '#effbff', r: '#5cc8f0' },
  },
  nevischio: {
    cappello: ['............', '...wwwwww...', '..wwwwwwww..', '...w.ww.w...'],
    occhi: 'sonno',
    colori: { b: '#bfe0f5', l: '#ffffff', w: '#f4fbff' },
  },
  sassolo: {
    cappello: ['............', '............', '....rr......', '...rrrr.....'],
    occhi: 'tondi',
    colori: { b: '#b89a72', l: '#d9c4a3', r: '#8a7050' },
  },
  macigno: {
    cappello: ['............', '..rr....rr..', '..rrr..rrr..', '...rrrrrr...'],
    occhi: 'sonno',
    colori: { b: '#8f8a84', l: '#bdb7ae', r: '#6a655f' },
  },
  lavotto: {
    cappello: ['...r..r..r..', '..ryrryrry..', '..ryyyyyyr..', '...rrrrrr...'],
    occhi: 'felici',
    colori: { b: '#c8402c', l: '#ffb27a', r: '#ff7a1a', y: '#ffe14c' },
  },
  brinella: {
    cappello: ['.....w......', '....wrw.....', '.....w......', '............'],
    occhi: 'felici',
    colori: { b: '#6fa8e8', l: '#dcefff', r: '#ffffff', w: '#bfe6ff' },
  },
  licheno: {
    cappello: ['............', '...r.r.r....', '..rlrrrlr...', '...rrrrr....'],
    occhi: 'tondi',
    colori: { b: '#7fae8a', l: '#d8ecd0', r: '#c9d84a' },
  },
  yetino: {
    cappello: ['............', '...w.ww.w...', '..wwwwwwww..', '..wwwwwwww..'],
    occhi: 'tondi',
    colori: { b: '#e8eef5', l: '#c7d3e0', w: '#ffffff' },
  },
  tuonello: {
    cappello: ['....rr......', '.....rr.....', '....rr......', '.....rr.....'],
    occhi: 'stelle',
    colori: { b: '#7a5cff', l: '#c9b8ff', r: '#ffd84c', y: '#ffd84c' },
  },
}

function griglia(sp: string): { righe: string[]; colori: Tavolozza } {
  const d = DISEGNI[sp] ?? DISEGNI.zampetto!
  const [o1, o2] = OCCHI[d.occhi]!
  const righe = [...d.cappello, ...CORPO.map(r => (r === 'OCCHI1' ? o1 : r === 'OCCHI2' ? o2 : r))]

  return { righe, colori: { k: NERO, w: '#ffffff', y: '#ffd84c', ...d.colori } }
}

// Trasforma una griglia di lettere in rettangoli, unendo i pixel vicini dello stesso colore.
function pixel(righe: string[], colori: Tavolozza, x0: number, y0: number, p: number, specchio = false) {
  const larg = Math.max(...righe.map(r => r.length))
  let out = ''
  righe.forEach((riga, y) => {
    const r = specchio ? riga.padEnd(larg, '.').split('').reverse().join('') : riga
    let x = 0
    while (x < r.length) {
      const c = r[x]!
      let fine = x + 1
      while (fine < r.length && r[fine] === c) fine++
      const colore = colori[c]
      if (colore) {
        out += `<rect x="${x0 + x * p}" y="${y0 + y * p}" width="${(fine - x) * p}" height="${p}" fill="${colore}"/>`
      }
      x = fine
    }
  })

  return out
}

function mostro(sp: string, x: number, y: number, p: number, specchio = false) {
  const { righe, colori } = griglia(sp)

  return pixel(righe, colori, x, y, p, specchio)
}

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const FONT = `font-family="ui-monospace, Menlo, monospace" font-weight="bold"`

function svg(w: number, h: number, corpo: string) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w * 1.6}" height="${h * 1.6}" shape-rendering="crispEdges">` +
    corpo +
    '</svg>'
  )
}

// ---------- Mappa ----------

const T = 16

const GIOCATORE = [
  '..rrrr..',
  '.rrrrrr.',
  '..sksk..',
  '..ssss..',
  '.bbbbbb.',
  's.bbbb.s',
  '..bbbb..',
  '..k..k..',
]

// Colori delle caselle per ogni mondo: la Prateria verde, le Vette Gelate innevate.
const TERRENI = [
  {
    fondo: '#6fbf5f', chioma: '#2f7d4f', luce: '#4fa060', tronco: '#6b4a2b',
    erba: '#7fd36b', fili: '#3f9a3c', acqua: '#4ca3e0', onde: '#a8dcff',
    terra: '#e8d8a8', sassi: '#c9b47e',
  },
  {
    fondo: '#dfeaf2', chioma: '#2e5e55', luce: '#ffffff', tronco: '#5a4030',
    erba: '#c4e4f2', fili: '#6aa8c8', acqua: '#a9d8f0', onde: '#ffffff',
    terra: '#f4f8ff', sassi: '#c9d6e8',
  },
]

function casella(t: string, x: number, y: number, mondo: number): string {
  const X = x * T
  const Y = y * T
  const c = TERRENI[mondo] ?? TERRENI[0]!
  if (t === '#') {
    return (
      `<rect x="${X}" y="${Y}" width="${T}" height="${T}" fill="${c.fondo}"/>` +
      `<rect x="${X + 6}" y="${Y + 11}" width="4" height="5" fill="${c.tronco}"/>` +
      `<rect x="${X + 2}" y="${Y + 2}" width="12" height="10" rx="5" fill="${c.chioma}" shape-rendering="auto"/>` +
      `<rect x="${X + 4}" y="${Y + 3}" width="4" height="3" fill="${c.luce}"/>`
    )
  }
  if (t === ',') {
    return (
      `<rect x="${X}" y="${Y}" width="${T}" height="${T}" fill="${c.erba}"/>` +
      [2, 7, 12]
        .map(
          (dx, i) =>
            `<rect x="${X + dx}" y="${Y + 4 + (i % 2) * 5}" width="2" height="4" fill="${c.fili}"/>` +
            `<rect x="${X + dx + 2}" y="${Y + 2 + (i % 2) * 5}" width="1" height="3" fill="${c.fili}"/>`,
        )
        .join('')
    )
  }
  if (t === '~') {
    return (
      `<rect x="${X}" y="${Y}" width="${T}" height="${T}" fill="${c.acqua}"/>` +
      `<rect x="${X + 2}" y="${Y + 4}" width="5" height="1" fill="${c.onde}"/>` +
      `<rect x="${X + 9}" y="${Y + 10}" width="5" height="1" fill="${c.onde}"/>`
    )
  }
  const terra =
    `<rect x="${X}" y="${Y}" width="${T}" height="${T}" fill="${c.terra}"/>` +
    `<rect x="${X + 3}" y="${Y + 5}" width="1" height="1" fill="${c.sassi}"/>` +
    `<rect x="${X + 11}" y="${Y + 12}" width="1" height="1" fill="${c.sassi}"/>`
  if (t === 'C') {
    return (
      terra +
      `<rect x="${X + 1}" y="${Y + 7}" width="14" height="9" fill="#fff6ee"/>` +
      `<rect x="${X}" y="${Y + 2}" width="16" height="6" fill="#ff6b81"/>` +
      `<rect x="${X + 6}" y="${Y + 11}" width="4" height="5" fill="#6b4a2b"/>` +
      `<rect x="${X + 7}" y="${Y + 3}" width="2" height="4" fill="#ffffff"/>` +
      `<rect x="${X + 6}" y="${Y + 4}" width="4" height="2" fill="#ffffff"/>`
    )
  }
  if (t === 'P') {
    return (
      terra +
      `<ellipse cx="${X + 8}" cy="${Y + 8}" rx="7" ry="7" fill="#7a3cff" shape-rendering="auto"/>` +
      `<ellipse cx="${X + 8}" cy="${Y + 8}" rx="4.5" ry="4.5" fill="#b98cff" shape-rendering="auto"/>` +
      `<ellipse cx="${X + 8}" cy="${Y + 8}" rx="2" ry="2" fill="#f2e8ff" shape-rendering="auto"/>`
    )
  }

  return terra
}

// La sfera: metà rossa, metà bianca, bottone al centro.
const SFERA = ['..kkkk..', '.krrrrk.', 'krrrrrrk', 'kkkwwkkk', 'kwwkkwwk', 'kwwwwwwk', '.kwwwwk.', '..kkkk..']

function sfera(x: number, y: number, p: number) {
  return pixel(SFERA, { k: NERO, r: '#e8483c', w: '#ffffff' }, x, y, p)
}

function sferaVuota(x: number, y: number, p: number) {
  return pixel(SFERA, { k: '#6a6470', r: '#a8a2ad', w: '#d8d4db' }, x, y, p)
}

export function svgMappa(s: Stato): string {
  const mappa = MONDI[s.mondo]!.mappa
  let corpo = ''
  mappa.forEach((riga, y) => riga.split('').forEach((_, x) => (corpo += casella(casellaDi(s, x, y) ?? '#', x, y, s.mondo))))
  corpo += pixel(GIOCATORE, { r: '#e83a3a', s: '#ffd2a6', b: '#3a6be8', k: NERO }, s.x * T, s.y * T, 2)

  return svg(mappa[0]!.length * T, mappa.length * T, corpo)
}

// ---------- Lotta ----------

// preso: la specie è già nel catalogo, e una piccola sfera lo segna accanto al nome.
function riquadro(m: Mostrino, x: number, y: number, w: number, mostraNumeri: boolean, preso = false) {
  const d = SPECIE[m.sp]!
  const r = m.hp / maxHp(m)
  const colore = r > 0.5 ? '#4fc35a' : r > 0.2 ? '#f2c230' : '#e8483c'
  const bw = w - 40
  const h = mostraNumeri ? 42 : 32

  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#fffbe8" stroke="${NERO}" stroke-width="2" shape-rendering="auto"/>` +
    (preso ? sfera(x + 6, y + 5, 1.1) : '') +
    `<text x="${x + (preso ? 18 : 7)}" y="${y + 13}" font-size="10" fill="${NERO}" ${FONT}>${esc(d.nome)}</text>` +
    `<text x="${x + w - 7}" y="${y + 13}" font-size="9" fill="${NERO}" text-anchor="end" ${FONT}>Lv${m.lvl}</text>` +
    `<text x="${x + 7}" y="${y + 25}" font-size="7" fill="#c06a1a" ${FONT}>PS</text>` +
    `<rect x="${x + 22}" y="${y + 19}" width="${bw}" height="6" fill="#4a4250"/>` +
    `<rect x="${x + 22}" y="${y + 19}" width="${Math.round(bw * r)}" height="6" fill="${colore}"/>` +
    (mostraNumeri
      ? `<text x="${x + w - 7}" y="${y + 37}" font-size="9" fill="${NERO}" text-anchor="end" ${FONT}>${m.hp}/${maxHp(m)}</text>`
      : '')
  )
}

export function svgLotta(s: Stato): string {
  const nem = s.nemico!
  const io = s.squadra[0]!
  const neve = s.mondo === 1
  const prato = neve ? '#eef5fb' : '#c8f0b0'
  const pedana = neve ? '#c4dcec' : '#9ed88a'
  const corpo =
    `<rect width="320" height="200" fill="${neve ? '#cfe3f5' : '#e4f6ff'}"/>` +
    `<rect y="110" width="320" height="90" fill="${prato}"/>` +
    `<ellipse cx="235" cy="92" rx="58" ry="13" fill="${pedana}" shape-rendering="auto"/>` +
    `<ellipse cx="85" cy="178" rx="66" ry="15" fill="${pedana}" shape-rendering="auto"/>` +
    mostro(nem.sp, 205, 22, 5) +
    mostro(io.sp, 49, 94, 6, true) +
    (s.lancio ? sfera(270, 84, 2) : '') +
    riquadro(nem, 10, 12, 140, false, s.catalogo.includes(nem.sp)) +
    riquadro(io, 168, 140, 142, true) +
    // Una sfera per ogni Mostrino della squadra (al massimo 3), grigia se è esausto.
    s.squadra.map((m, i) => (m.hp > 0 ? sfera(170 + i * 13, 186, 1.5) : sferaVuota(170 + i * 13, 186, 1.5))).join('')

  return svg(320, 200, corpo)
}

// ---------- Scelta iniziale ----------

export function svgInizio(): string {
  const corpo =
    `<rect width="320" height="120" fill="#e4f6ff"/>` +
    INIZIALI.map((sp, i) => {
      const cx = 55 + i * 105
      const d = SPECIE[sp]!

      return (
        `<ellipse cx="${cx}" cy="86" rx="38" ry="8" fill="#9ed88a" shape-rendering="auto"/>` +
        mostro(sp, cx - 24, 16, 4) +
        `<text x="${cx}" y="110" font-size="10" fill="${NERO}" text-anchor="middle" ${FONT}>${i + 1} ${esc(d.nome)}</text>`
      )
    }).join('')

  return svg(320, 120, corpo)
}

export function svgPer(s0: Stato): { source: string; alt: string } {
  // Uno stato di una versione precedente può non avere mondo e box.
  const s: Stato = { ...s0, mondo: MONDI[s0.mondo] ? s0.mondo : 0, box: s0.box ?? [], cure: s0.cure ?? 0, cureForti: s0.cureForti ?? 0, monete: s0.monete ?? 0 }
  if (s.modo === 'inizio') return { source: svgInizio(), alt: 'Scegli il tuo primo Mostrino' }
  if (s.modo === 'lotta' && s.nemico && s.squadra[0]) {
    return { source: svgLotta(s), alt: `Lotta contro ${SPECIE[s.nemico.sp]?.nome}` }
  }

  return { source: svgMappa(s), alt: 'Mappa del mondo dei Mostrini' }
}

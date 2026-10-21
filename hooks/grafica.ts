import type { Mostrino, Stato } from '../types'
import { SPECIE, MONDI, INIZIALI, maxHp, casellaDi, nome } from './gioco.tsx'

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
  // la forma evoluta: sopracciglia decise
  fieri: ['.kkkbbbbkkk.', '.kbwkbbkwbk.'],
}

type Disegno = { cappello: string[]; occhi: keyof typeof OCCHI; colori: Tavolozza }

export const DISEGNI: Record<string, Disegno> = {
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
  // Deserto Rovente
  sabbiotto: {
    cappello: ['............', '............', '....rrr.....', '..rrrrrrr...'],
    occhi: 'tondi',
    colori: { b: '#e0b870', l: '#f6e2b0', r: '#c89850' },
  },
  dunetto: {
    cappello: ['............', '.......rr...', '.....rrrr...', '..rrrrrrrr..'],
    occhi: 'sonno',
    colori: { b: '#d9a85c', l: '#f2d9a6', r: '#b8863c' },
  },
  cactello: {
    cappello: ['.....yy.....', '.r...rr...r.', '.rr..rr..rr.', '..rrrrrrrr..'],
    occhi: 'felici',
    colori: { b: '#5cb85c', l: '#d6f0b8', r: '#2f8f3f', y: '#ff7ab8' },
  },
  pungiglio: {
    cappello: ['......rrr...', '.........r..', '........rr..', '.......rr...'],
    occhi: 'tondi',
    colori: { b: '#a86cc8', l: '#e6c8f2', r: '#6a3c8c' },
  },
  solletto: {
    cappello: ['.r...rr...r.', '..r..rr..r..', '...r....r...', '............'],
    occhi: 'felici',
    colori: { b: '#ffb03c', l: '#ffe6a6', r: '#ff7a1a' },
  },
  cammellino: {
    cappello: ['............', '...rr..rr...', '..rrrrrrrr..', '...rrrrrr...'],
    occhi: 'sonno',
    colori: { b: '#d2b48c', l: '#f2e2c6', r: '#b08c5c' },
  },
  oasina: {
    cappello: ['..rrr..rrr..', '.r...tt...r.', '.....tt.....', '.....tt.....'],
    occhi: 'felici',
    colori: { b: '#3cb4c8', l: '#c6f2f6', r: '#3c9e48', t: '#8a6a3a' },
  },
  pietrolo: {
    cappello: ['............', '.....r......', '....rrr.r...', '...rrrrrrr..'],
    occhi: 'tondi',
    colori: { b: '#c8a078', l: '#e8d2b4', r: '#9a7a58' },
  },
  mummietto: {
    cappello: ['............', '..wwwwwwww..', '..w.ww.www..', '...wwwwww...'],
    occhi: 'stelle',
    colori: { b: '#e0d6c2', l: '#f4efe4', w: '#ffffff', y: '#3cffd8' },
  },
  // Palude Nebbiosa
  melmino: {
    cappello: ['............', '....r..r....', '...rrrrrr...', '..rr.rr.rr..'],
    occhi: 'sonno',
    colori: { b: '#9c6cc8', l: '#d8c0ee', r: '#6c3c9c' },
  },
  fanghetto: {
    cappello: ['............', '............', '...rr..rr...', '..rrrrrrrr..'],
    occhi: 'tondi',
    colori: { b: '#8a6a4a', l: '#c8a888', r: '#5c4430' },
  },
  rospetto: {
    cappello: ['............', '..bbb..bbb..', '.bwkb..bkwb.', '..bbb..bbb..'],
    occhi: 'felici',
    colori: { b: '#4cc4a0', l: '#d0f4e4' },
  },
  tossilla: {
    cappello: ['....rrrr....', '..rrwrrwrr..', '.rrrrrrrrrr.', '....llll....'],
    occhi: 'tondi',
    colori: { b: '#c49ad8', l: '#efe0f6', r: '#9c3cc8', w: '#ffffff' },
  },
  ninfeo: {
    cappello: ['.....yy.....', '....yyyy....', '..rrrrrrrr..', '.rrr.rrrrrr.'],
    occhi: 'felici',
    colori: { b: '#6cc88a', l: '#d8f4d8', r: '#3c9e58', y: '#ff9ad0' },
  },
  zanzarello: {
    cappello: ['..r......r..', '...r....r...', '....r..r....', '............'],
    occhi: 'tondi',
    colori: { b: '#a8a090', l: '#e0dcd0', r: '#5a5248' },
  },
  lucciolo: {
    cappello: ['..y......y..', '...r....r...', '....r..r....', '............'],
    occhi: 'stelle',
    colori: { b: '#6c6c8c', l: '#fff36c', r: '#5a5248', y: '#fff36c' },
  },
  nebbietta: {
    cappello: ['..w...w.....', '.w.w.w.w....', '....w...w...', '............'],
    occhi: 'sonno',
    colori: { b: '#a8b4c8', l: '#e4e8f0', w: '#ffffff' },
  },
  draghetto: {
    cappello: ['..r......r..', '..rr....rr..', '...rrrrrr...', '....r..r....'],
    occhi: 'stelle',
    colori: { b: '#5c9c7a', l: '#c8e8b8', r: '#9c3cc8', y: '#ffd84c' },
  },
  // Rovine Spettrali
  fantasmino: {
    cappello: ['............', '.....r......', '......r.....', '.....r......'],
    occhi: 'tondi',
    colori: { b: '#e8e4f4', l: '#ffffff', r: '#b8b0d8' },
  },
  lumicino: {
    cappello: ['......r.....', '.....rr.....', '....ryyr....', '....ryyr....'],
    occhi: 'felici',
    colori: { b: '#5c6cc8', l: '#c6d0ff', r: '#3c8cff', y: '#bfe6ff' },
  },
  ossicino: {
    cappello: ['............', '..ww....ww..', '...wwwwww...', '..ww....ww..'],
    occhi: 'sonno',
    colori: { b: '#c8b89a', l: '#efe6d2', w: '#f4f0e6' },
  },
  pipistrillo: {
    cappello: ['............', '..r......r..', '..rr....rr..', '..rrr..rrr..'],
    occhi: 'tondi',
    colori: { b: '#7c5c9c', l: '#c8b0e0', r: '#4c3c6c' },
  },
  gargolino: {
    cappello: ['............', '..r......r..', '...r....r...', '...rr..rr...'],
    occhi: 'tondi',
    colori: { b: '#8c8c98', l: '#bcbcc8', r: '#5a5a64' },
  },
  ombretta: {
    cappello: ['............', '.....rr.....', '....rrrr....', '...rrrrrr...'],
    occhi: 'stelle',
    colori: { b: '#5c4c8c', l: '#9c8cc8', r: '#2a2240', y: '#ff4c8c' },
  },
  corvetto: {
    cappello: ['...r........', '....rr......', '.....rr.....', '............'],
    occhi: 'tondi',
    colori: { b: '#4a4a5c', l: '#8c8ca0', r: '#2a2a3a' },
  },
  brividino: {
    cappello: ['............', '..w.w..w.w..', '..wwwwwwww..', '...wwwwww...'],
    occhi: 'sonno',
    colori: { b: '#7cc8e8', l: '#dff4ff', w: '#e6f8ff' },
  },
  eclissino: {
    cappello: ['....yyy.....', '...yy.......', '...yy.......', '....yyy.....'],
    occhi: 'stelle',
    colori: { b: '#3c2c6c', l: '#8c7cc8', y: '#ffe68c' },
  },
}

// La forma evoluta: una corona sopra il cappello, sguardo deciso e colori più intensi.
const CORONA = ['...z.zz.z...', '...ZZZZZZ...']
// Le righe di un Mostrino non evoluto: i disegni più alti si alzano per tenere i piedi sulla pedana.
const RIGHE_BASE = 14

function intenso(hex: string): string {
  const n = parseInt(hex.slice(1), 16)

  return '#' + [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(v * 0.85).toString(16).padStart(2, '0')).join('')
}

function griglia(m: { sp: string; evo?: boolean }): { righe: string[]; colori: Tavolozza } {
  const d = DISEGNI[m.sp] ?? DISEGNI.zampetto!
  const [o1, o2] = OCCHI[m.evo ? 'fieri' : d.occhi]!
  const corpo = CORPO.map(r => (r === 'OCCHI1' ? o1 : r === 'OCCHI2' ? o2 : r))
  const righe = [...(m.evo ? CORONA : []), ...d.cappello, ...corpo]
  const colori: Tavolozza = { k: NERO, w: '#ffffff', y: '#ffd84c', z: '#ffd84c', Z: '#e8a81c', ...d.colori }
  if (m.evo) colori.b = intenso(colori.b!)

  return { righe, colori }
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

function mostro(m: { sp: string; evo?: boolean }, x: number, y: number, p: number, specchio = false) {
  const { righe, colori } = griglia(m)

  return pixel(righe, colori, x, y - (righe.length - RIGHE_BASE) * p, p, specchio)
}

// L'alone dorato dietro un Mostrino evoluto, con qualche scintilla.
function alone(cx: number, cy: number, rx: number, ry: number) {
  return (
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff3b0" opacity="0.55" shape-rendering="auto"/>` +
    [[-0.8, -0.6], [0.85, -0.3], [-0.6, 0.5], [0.7, 0.65]]
      .map(([dx, dy]) => `<rect x="${Math.round(cx + dx! * rx)}" y="${Math.round(cy + dy! * ry)}" width="3" height="3" fill="#ffd84c"/>`)
      .join('')
  )
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

// Colori delle caselle per ogni mondo: la Prateria verde, le Vette Gelate innevate, il Deserto di sabbia,
// la Palude scura e le Rovine di pietra. forma: cosa blocca il passo (alberi, cactus o colonne spezzate).
type Terreno = {
  fondo: string; chioma: string; luce: string; tronco: string; erba: string; fili: string
  acqua: string; onde: string; terra: string; sassi: string; forma: 'albero' | 'cactus' | 'colonna'
}

const TERRENI: Terreno[] = [
  {
    fondo: '#6fbf5f', chioma: '#2f7d4f', luce: '#4fa060', tronco: '#6b4a2b',
    erba: '#7fd36b', fili: '#3f9a3c', acqua: '#4ca3e0', onde: '#a8dcff',
    terra: '#e8d8a8', sassi: '#c9b47e', forma: 'albero',
  },
  {
    fondo: '#dfeaf2', chioma: '#2e5e55', luce: '#ffffff', tronco: '#5a4030',
    erba: '#c4e4f2', fili: '#6aa8c8', acqua: '#a9d8f0', onde: '#ffffff',
    terra: '#f4f8ff', sassi: '#c9d6e8', forma: 'albero',
  },
  {
    fondo: '#ecd29a', chioma: '#4f9e4f', luce: '#8fd08f', tronco: '#3c7a3c',
    erba: '#e2c27a', fili: '#b8903c', acqua: '#3cb4c8', onde: '#c6f2f6',
    terra: '#f4e2b4', sassi: '#d2b47a', forma: 'cactus',
  },
  {
    fondo: '#4f6b4a', chioma: '#2a4a32', luce: '#5f8a5a', tronco: '#4a3a2a',
    erba: '#6f8f4a', fili: '#3a5a2a', acqua: '#4f8088', onde: '#a8d0c8',
    terra: '#9a9a72', sassi: '#7a7a52', forma: 'albero',
  },
  {
    fondo: '#5a5468', chioma: '#8c889c', luce: '#b4b0c4', tronco: '#6c687c',
    erba: '#6c5c8c', fili: '#4a3c6c', acqua: '#3c2c5c', onde: '#8c7cc8',
    terra: '#8c8698', sassi: '#6c6878', forma: 'colonna',
  },
]

function portale(X: number, Y: number, colori: [string, string, string]) {
  return (
    `<ellipse cx="${X + 8}" cy="${Y + 8}" rx="7" ry="7" fill="${colori[0]}" shape-rendering="auto"/>` +
    `<ellipse cx="${X + 8}" cy="${Y + 8}" rx="4.5" ry="4.5" fill="${colori[1]}" shape-rendering="auto"/>` +
    `<ellipse cx="${X + 8}" cy="${Y + 8}" rx="2" ry="2" fill="${colori[2]}" shape-rendering="auto"/>`
  )
}

function casella(t: string, x: number, y: number, mondo: number): string {
  const X = x * T
  const Y = y * T
  const c = TERRENI[mondo] ?? TERRENI[0]!
  if (t === '#' && c.forma === 'cactus') {
    return (
      `<rect x="${X}" y="${Y}" width="${T}" height="${T}" fill="${c.fondo}"/>` +
      `<rect x="${X + 6}" y="${Y + 2}" width="4" height="13" fill="${c.chioma}"/>` +
      `<rect x="${X + 2}" y="${Y + 5}" width="2" height="5" fill="${c.chioma}"/>` +
      `<rect x="${X + 2}" y="${Y + 9}" width="5" height="2" fill="${c.chioma}"/>` +
      `<rect x="${X + 12}" y="${Y + 4}" width="2" height="5" fill="${c.chioma}"/>` +
      `<rect x="${X + 9}" y="${Y + 7}" width="5" height="2" fill="${c.chioma}"/>` +
      `<rect x="${X + 7}" y="${Y + 3}" width="1" height="10" fill="${c.luce}"/>`
    )
  }
  if (t === '#' && c.forma === 'colonna') {
    return (
      `<rect x="${X}" y="${Y}" width="${T}" height="${T}" fill="${c.fondo}"/>` +
      `<rect x="${X + 3}" y="${Y + 13}" width="10" height="3" fill="${c.tronco}"/>` +
      `<rect x="${X + 4}" y="${Y + 4}" width="8" height="10" fill="${c.chioma}"/>` +
      `<rect x="${X + 5}" y="${Y + 4}" width="2" height="10" fill="${c.luce}"/>` +
      `<rect x="${X + 3}" y="${Y + 2}" width="6" height="2" fill="${c.chioma}"/>` +
      `<rect x="${X + 9}" y="${Y + 3}" width="3" height="1" fill="${c.chioma}"/>`
    )
  }
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
  // P viola porta al mondo dopo, R verde acqua riporta al mondo prima.
  if (t === 'P') return terra + portale(X, Y, ['#7a3cff', '#b98cff', '#f2e8ff'])
  if (t === 'R') return terra + portale(X, Y, ['#1c9c8c', '#4cd6c8', '#e0fffa'])

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
  const r = m.hp / maxHp(m)
  const colore = r > 0.5 ? '#4fc35a' : r > 0.2 ? '#f2c230' : '#e8483c'
  const bw = w - 40
  const h = mostraNumeri ? 42 : 32

  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#fffbe8" stroke="${NERO}" stroke-width="2" shape-rendering="auto"/>` +
    (preso ? sfera(x + 6, y + 5, 1.1) : '') +
    `<text x="${x + (preso ? 18 : 7)}" y="${y + 13}" font-size="10" fill="${NERO}" ${FONT}>${esc(nome(m))}</text>` +
    `<text x="${x + w - 7}" y="${y + 13}" font-size="9" fill="${NERO}" text-anchor="end" ${FONT}>Lv${m.lvl}</text>` +
    `<text x="${x + 7}" y="${y + 25}" font-size="7" fill="#c06a1a" ${FONT}>PS</text>` +
    `<rect x="${x + 22}" y="${y + 19}" width="${bw}" height="6" fill="#4a4250"/>` +
    `<rect x="${x + 22}" y="${y + 19}" width="${Math.round(bw * r)}" height="6" fill="${colore}"/>` +
    (mostraNumeri
      ? `<text x="${x + w - 7}" y="${y + 37}" font-size="9" fill="${NERO}" text-anchor="end" ${FONT}>${m.hp}/${maxHp(m)}</text>`
      : '')
  )
}

// Il fondo della lotta in ogni mondo; testo è il colore delle scritte sul cielo.
const SCENE = [
  { cielo: '#e4f6ff', prato: '#c8f0b0', pedana: '#9ed88a', testo: NERO },
  { cielo: '#cfe3f5', prato: '#eef5fb', pedana: '#c4dcec', testo: NERO },
  { cielo: '#ffe9c2', prato: '#f2dca4', pedana: '#e0c27c', testo: NERO },
  { cielo: '#c8d4c8', prato: '#8aa878', pedana: '#6a8a5a', testo: NERO },
  { cielo: '#3c3458', prato: '#6c6480', pedana: '#8c84a0', testo: '#f2e8ff' },
]

export function svgLotta(s: Stato): string {
  const nem = s.nemico!
  const io = s.squadra[0]!
  const sc = SCENE[s.mondo] ?? SCENE[0]!
  const corpo =
    `<rect width="320" height="200" fill="${sc.cielo}"/>` +
    `<rect y="110" width="320" height="90" fill="${sc.prato}"/>` +
    `<ellipse cx="235" cy="92" rx="58" ry="13" fill="${sc.pedana}" shape-rendering="auto"/>` +
    `<ellipse cx="85" cy="178" rx="66" ry="15" fill="${sc.pedana}" shape-rendering="auto"/>` +
    (nem.evo ? alone(235, 54, 40, 44) : '') +
    (io.evo ? alone(85, 132, 48, 52) : '') +
    mostro(nem, 205, 22, 5) +
    mostro(io, 49, 94, 6, true) +
    (s.lancio ? sfera(270, 84, 2) : '') +
    riquadro(nem, 10, 12, 140, false, s.catalogo.includes(nem.sp)) +
    riquadro(io, 168, 140, 142, true) +
    // Contro un allenatore: una sfera per ogni Mostrino che gli resta, e il suo nome.
    (s.allenatore
      ? Array.from({ length: s.allenatore.squadra.length + 1 }, (_, i) => sfera(12 + i * 13, 48, 1.5)).join('') +
        `<text x="${12 + (s.allenatore.squadra.length + 1) * 13 + 4}" y="57" font-size="8" fill="${sc.testo}" ${FONT}>${esc(s.allenatore.nome)}</text>`
      : '') +
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
        mostro({ sp }, cx - 24, 16, 4) +
        `<text x="${cx}" y="110" font-size="10" fill="${NERO}" text-anchor="middle" ${FONT}>${i + 1} ${esc(d.nome)}</text>`
      )
    }).join('')

  return svg(320, 120, corpo)
}

// Il menu principale: il titolo con i tre Mostrini iniziali.
export function svgMenu(): string {
  const corpo =
    `<rect width="320" height="120" fill="#e4f6ff"/>` +
    `<rect y="84" width="320" height="36" fill="#c8f0b0"/>` +
    `<text x="160" y="28" font-size="22" fill="${NERO}" text-anchor="middle" ${FONT}>MOSTRINI</text>` +
    INIZIALI.map((sp, i) => {
      const cx = 70 + i * 90

      return `<ellipse cx="${cx}" cy="104" rx="30" ry="6" fill="#9ed88a" shape-rendering="auto"/>` + mostro({ sp }, cx - 18, 62, 3)
    }).join('')

  return svg(320, 120, corpo)
}

export function svgPer(s0: Stato): { source: string; alt: string } {
  // Uno stato di una versione precedente può non avere mondo e box.
  const s: Stato = { ...s0, mondo: MONDI[s0.mondo] ? s0.mondo : 0, box: s0.box ?? [], cure: s0.cure ?? 0, cureForti: s0.cureForti ?? 0, monete: s0.monete ?? 0 }
  if (s.modo === 'menu') return { source: svgMenu(), alt: 'Mostrini: menu principale' }
  if (s.modo === 'inizio') return { source: svgInizio(), alt: 'Scegli il tuo primo Mostrino' }
  if (s.modo === 'lotta' && s.nemico && s.squadra[0]) {
    return { source: svgLotta(s), alt: `Lotta contro ${nome(s.nemico)}` }
  }

  return { source: svgMappa(s), alt: 'Mappa del mondo dei Mostrini' }
}

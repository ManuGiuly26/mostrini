import type { Mostrino, Stato } from '../types'
import { SPECIE, MONDI, INIZIALI, maxHp, casellaDi, nome, stadio, vociCatalogo, VERSIONE, COLORE_SFERA } from './gioco.tsx'

// Pixel art per l'app desktop, a risoluzione doppia. Ogni disegno nasce su una tela di pixel e
// diventa un SVG con un solo path per colore: il pannello accetta SVG fino a 131072 caratteri.

type Tavolozza = Record<string, string>

const NERO = '#2a2230'

// Occhi e bocche dei Mostrini. Di ogni occhio c'è il sinistro: il destro è allo specchio.
const OCCHI = {
  tondi: ['.kk.', 'kwkk', 'kkkk', 'kkkk', '.kk.'],
  sonno: ['....', '....', 'kkkk', '.kk.', '....'],
  felici: ['....', '.kk.', 'k..k', '....', '....'],
  stelle: ['..y..', '.yyy.', 'yyyyy', '.yyy.', '.y.y.'],
  // dall'evoluzione in poi: sopracciglio deciso
  fieri: ['kk...', '.kkk.', '..kkk', '.kwkk', '.kkk.'],
}

const BOCCHE = {
  sorriso: ['k....k', '.kkkk.'],
  aperta: ['.kkkk.', 'krrrrk', '.kkkk.'],
  piatta: ['.kkkk.'],
  grinta: ['kkkkkk', '.w..w.'],
}

const BOCCA_DI: Record<keyof typeof OCCHI, keyof typeof BOCCHE> = {
  tondi: 'sorriso', sonno: 'piatta', felici: 'aperta', stelle: 'aperta', fieri: 'grinta',
}

// Ogni Mostrino: un corpo tondo con viso, pancia e piedi, e sopra il suo cappello di 12 colonne,
// raddoppiato e smussato. b è il colore del corpo, l quello della pancia, r il colore d'accento.
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

// ---------- Colori ----------

function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)

  return [n >> 16, (n >> 8) & 255, n & 255]
}

// Mescola due colori: t 0 dà il primo, 1 il secondo.
function mescola(a: string, b: string, t: number): string {
  const x = rgb(a)
  const y = rgb(b)

  return '#' + x.map((v, i) => Math.round(v + (y[i]! - v) * t).toString(16).padStart(2, '0')).join('')
}

const chiaro = (c: string, t = 0.3) => mescola(c, '#ffffff', t)
const scuro = (c: string, t = 0.3) => mescola(c, NERO, t)

// Un generatore pseudo-casuale con seme: la stessa casella si disegna sempre uguale.
function seme(n: number): () => number {
  let s = (n * 2654435761) >>> 0 || 1

  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296
}

// ---------- La tela di pixel ----------

type Tela = { w: number; h: number; px: (string | null)[] }
// Il colore di un punto; nx e ny vanno da -1 a 1 dal centro al bordo della figura.
type Pennello = string | ((x: number, y: number, nx: number, ny: number) => string | null)

const tela = (w: number, h: number): Tela => ({ w, h, px: new Array<string | null>(w * h).fill(null) })
const leggi = (t: Tela, x: number, y: number) => (x < 0 || y < 0 || x >= t.w || y >= t.h ? null : (t.px[y * t.w + x] ?? null))

function metti(t: Tela, x: number, y: number, c: string | null) {
  if (c && x >= 0 && y >= 0 && x < t.w && y < t.h) t.px[y * t.w + x] = c
}

const tinta = (c: Pennello, x: number, y: number, nx: number, ny: number) => (typeof c === 'string' ? c : c(x, y, nx, ny))

function ellisse(t: Tela, cx: number, cy: number, rx: number, ry: number, c: Pennello) {
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
    for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
      const nx = (x + 0.5 - cx) / rx
      const ny = (y + 0.5 - cy) / ry
      if (nx * nx + ny * ny <= 1) metti(t, x, y, tinta(c, x, y, nx, ny))
    }
  }
}

function rett(t: Tela, x0: number, y0: number, w: number, h: number, c: Pennello) {
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) metti(t, x, y, tinta(c, x, y, ((x - x0 + 0.5) / w) * 2 - 1, ((y - y0 + 0.5) / h) * 2 - 1))
  }
}

// Un poligono riempito riga per riga (regola pari-dispari).
function poligono(t: Tela, punti: [number, number][], c: Pennello) {
  const ys = punti.map(p => p[1])
  for (let y = Math.floor(Math.min(...ys)); y <= Math.ceil(Math.max(...ys)); y++) {
    const yc = y + 0.5
    const xs: number[] = []
    punti.forEach(([x1, y1], i) => {
      const [x2, y2] = punti[(i + 1) % punti.length]!
      if ((y1 <= yc && y2 > yc) || (y2 <= yc && y1 > yc)) xs.push(x1 + ((yc - y1) / (y2 - y1)) * (x2 - x1))
    })
    xs.sort((a, b) => a - b)
    for (let i = 0; i + 1 < xs.length; i += 2) {
      for (let x = Math.round(xs[i]!); x < Math.round(xs[i + 1]!); x++) metti(t, x, y, tinta(c, x, y, 0, 0))
    }
  }
}

// Righe di lettere: ogni lettera è un colore della tavolozza, '.' è trasparente.
function lettere(t: Tela, righe: string[], colori: Tavolozza, x0: number, y0: number, specchio = false) {
  righe.forEach((riga, y) => {
    const r = specchio ? riga.split('').reverse().join('') : riga
    for (let x = 0; x < r.length; x++) metti(t, x0 + x, y0 + y, colori[r[x]!] ?? null)
  })
}

// Un'ellisse in tre toni, con la luce che arriva da in alto a sinistra.
function sfera(t: Tela, cx: number, cy: number, rx: number, ry: number, base: string, alto = chiaro(base, 0.28), basso = scuro(base, 0.25)) {
  ellisse(t, cx, cy, rx, ry, (_x, _y, nx, ny) => {
    const l = -(nx * 0.6 + ny * 0.8)

    return l > 0.5 ? alto : l < -0.45 ? basso : base
  })
}

// Il contorno: ogni pixel vuoto accanto al disegno prende una versione scura del colore vicino.
function contorno(t: Tela, forza = 0.72) {
  const prima = t.px.slice()
  const a = (x: number, y: number) => (x < 0 || y < 0 || x >= t.w || y >= t.h ? null : (prima[y * t.w + x] ?? null))
  for (let y = 0; y < t.h; y++) {
    for (let x = 0; x < t.w; x++) {
      if (a(x, y)) continue
      const vicino = a(x, y + 1) ?? a(x - 1, y) ?? a(x + 1, y) ?? a(x, y - 1)
      if (vicino) metti(t, x, y, mescola(vicino, NERO, forza))
    }
  }
}

// Copia una tela sopra un'altra, lasciando passare i pixel vuoti.
function componi(sotto: Tela, sopra: Tela, ox = 0, oy = 0) {
  for (let y = 0; y < sopra.h; y++) for (let x = 0; x < sopra.w; x++) metti(sotto, ox + x, oy + y, leggi(sopra, x, y))
}

// Il rettangolo occupato dal disegno.
function ingombro(t: Tela): { x: number; y: number; w: number; h: number } {
  let x0 = t.w, y0 = t.h, x1 = -1, y1 = -1
  for (let y = 0; y < t.h; y++) {
    for (let x = 0; x < t.w; x++) {
      if (!leggi(t, x, y)) continue
      x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y)
    }
  }

  return x1 < 0 ? { x: 0, y: 0, w: 0, h: 0 } : { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 }
}

// La tela diventa SVG: un path per colore, una striscia per ogni tratto di riga dello stesso colore.
function svgTela(t: Tela, x0: number, y0: number, p: number, specchio = false): string {
  const perColore = new Map<string, string[]>()
  for (let y = 0; y < t.h; y++) {
    let x = 0
    while (x < t.w) {
      const c = leggi(t, x, y)
      if (!c) {
        x++
        continue
      }
      let fine = x + 1
      while (fine < t.w && leggi(t, fine, y) === c) fine++
      const lista = perColore.get(c) ?? []
      lista.push(`M${x} ${y}h${fine - x}v1h${x - fine}z`)
      perColore.set(c, lista)
      x = fine
    }
  }
  const sposta = specchio ? `translate(${x0 + t.w * p} ${y0}) scale(${-p} ${p})` : `translate(${x0} ${y0}) scale(${p})`

  return `<g transform="${sposta}">` + [...perColore].map(([c, d]) => `<path fill="${c}" d="${d.join('')}"/>`).join('') + '</g>'
}

// Scale2x: raddoppia un disegno a lettere smussando le diagonali invece di fare gli scalini.
function scale2x(righe: string[]): string[] {
  const h = righe.length
  const w = Math.max(...righe.map(r => r.length))
  const at = (x: number, y: number) => (x < 0 || y < 0 || y >= h || x >= w ? '.' : (righe[y]![x] ?? '.'))
  const out: string[] = []
  for (let y = 0; y < h; y++) {
    let su = ''
    let giu = ''
    for (let x = 0; x < w; x++) {
      const p = at(x, y), a = at(x, y - 1), b = at(x + 1, y), c = at(x - 1, y), d = at(x, y + 1)
      su += (c === a && c !== d && a !== b ? a : p) + (a === b && a !== c && b !== d ? b : p)
      giu += (d === c && d !== b && c !== a ? c : p) + (b === d && b !== a && d !== c ? d : p)
    }
    out.push(su, giu)
  }

  return out
}

// ---------- I Mostrini ----------

// La tela di un Mostrino; i piedi stanno sempre sulla stessa riga.
const SW = 40
const SH = 48
const PIEDI = 47

// Il corpo cresce a ogni stadio: braccia dall'evoluzione, corona e ali nella forma finale.
const CORPI = [{ rx: 8.5, ry: 7.5 }, { rx: 10, ry: 8.75 }, { rx: 11.5, ry: 10 }]

const CORONA = ['z.....zz.....z', 'zz...zzzz...zz', 'zzzzzzzzzzzzzz', 'zZgZZZZZZZZgZz', 'zzzzzzzzzzzzzz']
// L'ala sinistra della forma finale: la punta in alto a sinistra, le piume in basso; la destra è allo specchio.
const ALA = [
  'lll.........',
  'aalll.......',
  '.aaaall.....',
  '.aaaaaall...',
  '..aAaaaaall.',
  '..A.aAaaaaal',
  '.....A.aAaaa',
  '........A.aa',
]

const SAGOMA = '#463e58'

const cacheMostri = new Map<string, Tela>()

// sagoma: il Mostrino tutto scuro, per quelli che mancano nel catalogo.
function mostrino(m: { sp: string; evo?: number | boolean }, sagoma = false): Tela {
  const st = Math.min(2, Number(m.evo ?? 0))
  const chiave = `${m.sp}:${st}:${sagoma}`
  const pronto = cacheMostri.get(chiave)
  if (pronto) return pronto
  const d = DISEGNI[m.sp] ?? DISEGNI.zampetto!
  const t = tela(SW, SH)
  const base0 = d.colori.b ?? '#d6c7b0'
  // a ogni stadio i colori si fanno più intensi
  const base = st === 0 ? base0 : scuro(base0, st === 1 ? 0.1 : 0.18)
  const pancia = d.colori.l ?? chiaro(base, 0.5)
  const accento = d.colori.r ?? chiaro(base, 0.35)
  const { rx, ry } = CORPI[st]!
  const cx = SW / 2
  const cy = PIEDI - 1.5 - ry
  if (st === 2) {
    const ala = { a: accento, A: scuro(accento, 0.3), l: chiaro(accento, 0.45) }
    const ax = Math.round(cx - rx) - ALA[0]!.length + 4
    const ay = Math.round(cy - ry) - 3
    lettere(t, ALA, ala, ax, ay)
    lettere(t, ALA, ala, SW - ax - ALA[0]!.length, ay, true)
  }
  for (const s of [-1, 1]) sfera(t, cx + s * rx * 0.5, cy + ry - 1, 3.4, 2.4, scuro(base, 0.3), scuro(base, 0.15), scuro(base, 0.45))
  sfera(t, cx, cy, rx, ry, base)
  // dall'evoluzione: due braccine sui fianchi, col bordo scuro per staccarle dal corpo
  if (st >= 1) {
    for (const s of [-1, 1]) {
      ellisse(t, cx + s * (rx - 0.2), cy + ry * 0.2, 3.1, 3.9, scuro(base, 0.35))
      sfera(t, cx + s * (rx - 0.2), cy + ry * 0.2, 2.3, 3.1, base)
    }
  }
  ellisse(t, cx, cy + ry * 0.42, rx * 0.58, ry * 0.46, (_x, _y, nx, ny) => (-(nx * 0.6 + ny * 0.8) > 0.6 ? chiaro(pancia, 0.4) : pancia))
  // il riflesso di luce in alto a sinistra
  for (const [x, y] of [[0, 0], [1, 0], [0, 1]] as const) {
    const px = Math.round(cx - rx * 0.6) + x
    const py = Math.round(cy - ry * 0.62) + y
    if (leggi(t, px, py)) metti(t, px, py, chiaro(base, 0.65))
  }
  // il viso
  const occhi = st >= 1 ? 'fieri' : d.occhi
  const occhio = OCCHI[occhi]
  const ow = occhio[0]!.length
  const scarto = st === 2 ? 3 : 2
  const ey = Math.round(cy - ry * 0.25) - 2
  const viso = { k: NERO, w: '#ffffff', y: d.colori.y ?? '#ffd84c', r: '#e8485c' }
  lettere(t, occhio, viso, cx - scarto - ow, ey)
  lettere(t, occhio, viso, cx + scarto, ey, true)
  const guancia = mescola(base, '#ff6f91', 0.45)
  if (occhi !== 'fieri') {
    rett(t, cx - scarto - ow - 2, ey + 5, 2, 1, guancia)
    rett(t, cx + scarto + ow, ey + 5, 2, 1, guancia)
  }
  lettere(t, BOCCHE[BOCCA_DI[occhi]], viso, cx - 3, ey + 6)
  // il cappello, appoggiato sulla testa
  let cima = 0
  while (cima < SH && !leggi(t, cx, cima)) cima++
  const cappello = scale2x(d.cappello)
  lettere(t, cappello, { k: NERO, w: '#ffffff', y: '#ffd84c', ...d.colori, b: base }, cx - 12, cima - cappello.length + 1)
  if (st === 2) {
    const sopra = ingombro(t).y
    lettere(t, CORONA, { z: '#ffd84c', Z: '#e8a81c', g: '#ff4c6c' }, cx - 7, sopra - CORONA.length + 1)
  }
  if (sagoma) t.px = t.px.map(c => (c ? SAGOMA : null))
  contorno(t)
  cacheMostri.set(chiave, t)

  return t
}

// Un Mostrino in un punto del disegno: (x, y) è l'angolo in alto a sinistra della sua tela.
const mostro = (m: { sp: string; evo?: number | boolean }, x: number, y: number, p: number, specchio = false, sagoma = false) =>
  svgTela(mostrino(m, sagoma), x, y, p, specchio)

// Il Mostrino ritagliato e centrato in un riquadro (catalogo, scelta iniziale).
function mostroIn(m: { sp: string; evo?: number | boolean }, cx: number, piedi: number, p: number, sagoma = false) {
  const t = mostrino(m, sagoma)
  const b = ingombro(t)

  return svgTela(t, Math.round(cx - (b.x + b.w / 2) * p), Math.round(piedi - (b.y + b.h) * p), p, false)
}

// L'alone dorato dietro alla forma finale, con qualche scintilla.
function alone(cx: number, cy: number, rx: number, ry: number) {
  return (
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff3b0" opacity="0.5"/>` +
    `<ellipse cx="${cx}" cy="${cy}" rx="${Math.round(rx * 0.7)}" ry="${Math.round(ry * 0.7)}" fill="#fff8d8" opacity="0.5"/>` +
    [[-0.85, -0.55], [0.9, -0.3], [-0.65, 0.55], [0.75, 0.65], [0.1, -0.95]]
      .map(([dx, dy]) => `<path fill="#ffd84c" d="M${Math.round(cx + dx! * rx)} ${Math.round(cy + dy! * ry)}m-2 0h4v1h-4zm1-2h2v5h-2z"/>`)
      .join('')
  )
}

// ---------- Testo ----------

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const FONT = `font-family="ui-monospace, Menlo, Consolas, monospace" font-weight="bold"`

function scritta(x: number, y: number, testo: string, dim: number, colore = NERO, ancora = 'start', bordo?: string) {
  const b = bordo ? ` stroke="${bordo}" stroke-width="${Math.round(dim / 5)}" paint-order="stroke" stroke-linejoin="round"` : ''

  return `<text x="${x}" y="${y}" font-size="${dim}" fill="${colore}" text-anchor="${ancora}"${b} ${FONT}>${esc(testo)}</text>`
}

// Il disegno intero: viewBox a risoluzione doppia, mostrato alla stessa grandezza di prima.
function svg(w: number, h: number, corpo: string) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${Math.round(w * 0.8)}" height="${Math.round(h * 0.8)}" shape-rendering="crispEdges">` +
    corpo +
    '</svg>'
  )
}

// ---------- Mappa ----------

const T = 32

// Colori di ogni mondo, e cosa blocca il passo: latifoglie, abeti innevati, cactus, salici o colonne.
type Terreno = {
  fondo: string; chioma: string; luce: string; tronco: string; erba: string; fili: string
  acqua: string; onde: string; terra: string; sassi: string
  forma: 'albero' | 'abete' | 'cactus' | 'salice' | 'colonna'
}

const TERRENI: Terreno[] = [
  {
    fondo: '#6fbf5f', chioma: '#2f8a4f', luce: '#5cb86a', tronco: '#7a5232',
    erba: '#7fd36b', fili: '#3f9a3c', acqua: '#4ca3e0', onde: '#bfe6ff',
    terra: '#e8d8a8', sassi: '#c9b47e', forma: 'albero',
  },
  {
    fondo: '#e6eff6', chioma: '#2e5e55', luce: '#4f8a7c', tronco: '#5a4030',
    erba: '#c4e4f2', fili: '#6aa8c8', acqua: '#8cc8ea', onde: '#ffffff',
    terra: '#f4f8ff', sassi: '#c9d6e8', forma: 'abete',
  },
  {
    fondo: '#ecd29a', chioma: '#4f9e4f', luce: '#8fd08f', tronco: '#3c7a3c',
    erba: '#e2c27a', fili: '#b8903c', acqua: '#3cb4c8', onde: '#c6f2f6',
    terra: '#f4e2b4', sassi: '#d2b47a', forma: 'cactus',
  },
  {
    fondo: '#56724f', chioma: '#2f5238', luce: '#55805a', tronco: '#4a3a2a',
    erba: '#6f8f4a', fili: '#3a5a2a', acqua: '#4f8088', onde: '#a8d0c8',
    terra: '#9a9a72', sassi: '#7a7a52', forma: 'salice',
  },
  {
    fondo: '#5a5468', chioma: '#9a96aa', luce: '#c4c0d4', tronco: '#6c687c',
    erba: '#6c5c8c', fili: '#4a3c6c', acqua: '#3c2c5c', onde: '#8c7cc8',
    terra: '#8c8698', sassi: '#6c6878', forma: 'colonna',
  },
]

// Un fondo a tinta unita con qualche puntino.
function fondoCasella(colore: string, puntini: string, quanti: number, n: number): Tela {
  const t = tela(T, T)
  rett(t, 0, 0, T, T, colore)
  const r = seme(n)
  for (let i = 0; i < quanti; i++) metti(t, Math.floor(r() * T), Math.floor(r() * T), puntini)

  return t
}

function sentiero(c: Terreno, n: number): Tela {
  const t = fondoCasella(c.terra, c.sassi, 14, n)
  const r = seme(n + 7)
  for (let i = 0; i < 3; i++) {
    const x = 3 + Math.floor(r() * 24)
    const y = 3 + Math.floor(r() * 24)
    rett(t, x, y, 3, 2, c.sassi)
    metti(t, x, y, chiaro(c.sassi, 0.4))
    rett(t, x, y + 2, 3, 1, scuro(c.terra, 0.12))
  }

  return t
}

function erbaAlta(c: Terreno, n: number): Tela {
  const t = fondoCasella(c.erba, scuro(c.erba, 0.12), 20, n)
  const r = seme(n + 3)
  for (let i = 0; i < 9; i++) {
    const x = 4 + (i % 3) * 10 + Math.floor(r() * 4)
    const y = 3 + Math.floor(i / 3) * 10 + Math.floor(r() * 3)
    rett(t, x - 3, y + 6, 7, 1, scuro(c.erba, 0.18))
    for (const [dx, alto] of [[-2, 3], [0, 0], [2, 2]] as const) {
      rett(t, x + dx, y + alto, 1, 6 - alto, c.fili)
      metti(t, x + dx, y + alto, chiaro(c.erba, 0.35))
    }
  }

  return t
}

function acqua(c: Terreno, n: number): Tela {
  const t = tela(T, T)
  rett(t, 0, 0, T, T, c.acqua)
  const r = seme(n + 11)
  for (let i = 0; i < 4; i++) {
    const x = Math.floor(r() * 24)
    const y = 3 + i * 7 + Math.floor(r() * 3)
    rett(t, x, y, 6, 1, c.onde)
    rett(t, x + 1, y + 1, 5, 1, scuro(c.acqua, 0.12))
  }
  metti(t, Math.floor(r() * T), Math.floor(r() * T), '#ffffff')

  return t
}

// La riva: una striscia di spuma sul lato dell'acqua che tocca la terra.
function riva(c: Terreno, lato: 'n' | 's' | 'e' | 'o'): Tela {
  const t = tela(T, T)
  const spuma = c.onde
  const ombra = scuro(c.acqua, 0.2)
  if (lato === 'n') { rett(t, 0, 0, T, 2, spuma); rett(t, 0, 2, T, 1, ombra) }
  if (lato === 's') { rett(t, 0, T - 2, T, 2, ombra) }
  if (lato === 'o') { rett(t, 0, 0, 2, T, spuma); rett(t, 2, 0, 1, T, ombra) }
  if (lato === 'e') { rett(t, T - 2, 0, 2, T, ombra) }

  return t
}

// Ciò che blocca il passo, diverso in ogni mondo.
function ostacolo(c: Terreno): Tela {
  const t = fondoCasella(c.fondo, scuro(c.fondo, 0.1), 16, 5)
  ellisse(t, 16, 29, 11, 2.6, scuro(c.fondo, 0.22))
  const s = tela(T, T)
  if (c.forma === 'albero') {
    rett(s, 13, 20, 6, 9, (x: number) => (x < 15 ? chiaro(c.tronco, 0.2) : x > 16 ? scuro(c.tronco, 0.25) : c.tronco))
    sfera(s, 9, 16, 6.5, 6, c.chioma, c.luce)
    sfera(s, 23, 16, 6.5, 6, c.chioma, c.luce)
    sfera(s, 16, 11, 9.5, 8.5, c.chioma, c.luce)
    for (const [x, y] of [[11, 7], [12, 6], [8, 13], [19, 9]] as const) metti(s, x, y, chiaro(c.luce, 0.35))
  } else if (c.forma === 'abete') {
    rett(s, 14, 25, 4, 5, c.tronco)
    const ombra = scuro(c.chioma, 0.3)
    for (const [cima, base, mezzo] of [[2, 13, 6], [7, 20, 9], [12, 27, 12]] as const) {
      poligono(s, [[16, cima], [16 - mezzo - 1, base], [16 + mezzo + 1, base]], (x: number) => (x < 16 ? c.chioma : ombra))
      poligono(s, [[16, cima], [16 - 3, cima + 3], [16 + 3, cima + 3]], '#ffffff')
      for (let x = 16 - mezzo; x <= 16 + mezzo; x += 3) metti(s, x, base - 1, '#ffffff')
    }
  } else if (c.forma === 'cactus') {
    const corpo = (x: number) => (x % 4 === 0 ? scuro(c.chioma, 0.2) : x % 4 === 1 ? c.luce : c.chioma)
    rett(s, 12, 7, 8, 22, corpo)
    ellisse(s, 16, 7.5, 4, 3.5, corpo)
    rett(s, 5, 11, 4, 8, corpo)
    ellisse(s, 7, 11, 2, 2, corpo)
    rett(s, 5, 17, 8, 4, corpo)
    rett(s, 23, 8, 4, 8, corpo)
    ellisse(s, 25, 8, 2, 2, corpo)
    rett(s, 19, 14, 8, 4, corpo)
    for (const [x, y] of [[13, 10], [18, 14], [14, 20], [6, 13], [25, 10], [17, 25]] as const) metti(s, x, y, '#fff6d8')
    rett(s, 15, 3, 2, 2, '#ff7ab8')
  } else if (c.forma === 'salice') {
    rett(s, 14, 16, 5, 13, (x: number) => (x < 16 ? c.tronco : scuro(c.tronco, 0.25)))
    rett(s, 11, 27, 11, 2, scuro(c.tronco, 0.15))
    sfera(s, 16, 11, 13, 8.5, c.chioma, c.luce)
    const r = seme(9)
    for (const x of [5, 8, 11, 21, 24, 27]) {
      const lungo = 6 + Math.floor(r() * 7)
      rett(s, x, 14, 1, lungo, scuro(c.chioma, 0.1))
      metti(s, x, 14 + lungo, c.luce)
    }
  } else {
    const pietra = (x: number) => (x < 12 ? c.luce : x > 19 ? scuro(c.chioma, 0.25) : x % 3 === 0 ? scuro(c.chioma, 0.12) : c.chioma)
    rett(s, 7, 25, 18, 5, (x: number) => (x < 10 ? c.luce : x > 21 ? scuro(c.tronco, 0.2) : c.tronco))
    rett(s, 6, 24, 20, 1, c.luce)
    rett(s, 10, 9, 12, 16, pietra)
    poligono(s, [[10, 9], [10, 6], [13, 4], [15, 7], [18, 3], [20, 6], [22, 5], [22, 9]], pietra)
    for (const [x, y] of [[15, 12], [16, 13], [16, 14], [17, 15], [13, 19], [14, 20]] as const) metti(s, x, y, scuro(c.chioma, 0.35))
  }
  contorno(s)
  componi(t, s)

  return t
}

function centroCure(c: Terreno): Tela {
  const t = sentiero(c, 2)
  ellisse(t, 16, 29.5, 14, 2.5, scuro(c.terra, 0.2))
  const s = tela(T, T)
  rett(s, 4, 13, 24, 17, (x: number) => (x > 24 ? '#e8dccc' : '#fff6ee'))
  rett(s, 6, 17, 6, 5, '#9fd8ff')
  rett(s, 20, 17, 6, 5, '#9fd8ff')
  rett(s, 6, 17, 2, 2, '#e6f6ff')
  rett(s, 20, 17, 2, 2, '#e6f6ff')
  rett(s, 13, 20, 6, 10, (x: number) => (x < 15 ? '#a8744a' : '#8a5a3a'))
  metti(s, 17, 25, '#ffd84c')
  poligono(s, [[2, 14], [30, 14], [26, 3], [6, 3]], (_x: number, y: number) => (y < 6 ? '#ff98a8' : y > 12 ? '#c84a5c' : '#ff6b81'))
  ellisse(s, 16, 8.5, 4, 4, '#ffffff')
  rett(s, 15, 6, 2, 6, '#ff4a5c')
  rett(s, 13, 8, 6, 2, '#ff4a5c')
  contorno(s)
  componi(t, s)

  return t
}

// La palestra: tetto blu con la medaglia d'oro, colonne e una porta doppia.
function palestraCasella(c: Terreno): Tela {
  const t = sentiero(c, 6)
  ellisse(t, 16, 29.5, 15, 2.5, scuro(c.terra, 0.2))
  const s = tela(T, T)
  rett(s, 2, 12, 28, 18, (x: number) => (x > 26 ? '#b8b4c8' : '#dcd8ea'))
  for (const x of [3, 27]) rett(s, x, 13, 2, 17, (xx: number) => (xx === x ? '#f4f2fa' : '#c4c0d4'))
  rett(s, 6, 17, 4, 4, '#9fd8ff')
  rett(s, 22, 17, 4, 4, '#9fd8ff')
  rett(s, 12, 19, 8, 11, (x: number) => (x < 16 ? '#6a5a8c' : '#5a4a7a'))
  rett(s, 15, 19, 2, 11, '#463a60')
  metti(s, 14, 25, '#ffd84c')
  metti(s, 17, 25, '#ffd84c')
  poligono(s, [[0, 13], [32, 13], [28, 3], [4, 3]], (_x: number, y: number) => (y < 6 ? '#6c9cf0' : y > 11 ? '#2a4ca0' : '#3c6cd8'))
  ellisse(s, 16, 8, 4, 4, '#e8a81c')
  ellisse(s, 16, 8, 2.6, 2.6, '#ffd84c')
  metti(s, 15, 7, '#fff3b0')
  contorno(s)
  componi(t, s)

  return t
}

// P viola porta al mondo dopo, R verde acqua riporta al mondo prima.
function portaleCasella(c: Terreno, colori: [string, string, string]): Tela {
  const t = sentiero(c, 4)
  const s = tela(T, T)
  sfera(s, 16, 27, 12, 3.5, '#8a8498')
  ellisse(s, 16, 15, 11, 12, colori[0])
  ellisse(s, 16, 15, 8, 9, colori[1])
  ellisse(s, 16, 15, 5, 6, colori[2])
  ellisse(s, 16, 15, 2, 3, '#ffffff')
  for (const [x, y] of [[11, 9], [12, 8], [20, 21], [21, 20], [9, 16], [23, 13]] as const) metti(s, x, y, colori[2])
  contorno(s)
  componi(t, s)
  for (const [x, y] of [[3, 5], [28, 8], [26, 25], [5, 21]] as const) metti(t, x, y, '#ffffff')

  return t
}

const GIOCATORE = [
  '.....rrrrrr.....',
  '...rrrrrrrrrr...',
  '..rrrrrwwrrrrr..',
  '..rrrrwwwwrrrr..',
  '.RRRRRRRRRRRRRR.',
  '..hssssssssssh..',
  '..hssksssskssh..',
  '..hssksssskssh..',
  '...ssssssssss...',
  '....sssMMsss....',
  '...bbbbbbbbbb...',
  '..bbbbbwwbbbbb..',
  '.sbbbbbwwbbbbbs.',
  '.sbbbbbbbbbbbbs.',
  '..bbbbbbbbbbbb..',
  '...nnnnnnnnnn...',
  '...nnnnnnnnnn...',
  '...nnnn..nnnn...',
  '...nnnn..nnnn...',
  '..kkkkk..kkkkk..',
]

const GIOCATORE_COLORI = {
  r: '#e83a3a', w: '#ffffff', R: '#b8282a', h: '#4a3020', s: '#ffd2a6', k: NERO,
  M: '#c86a5a', b: '#3a6be8', n: '#2a3a6a',
}

let cacheGiocatore: Tela | null = null

function giocatore(): Tela {
  if (cacheGiocatore) return cacheGiocatore
  const t = tela(18, 22)
  lettere(t, GIOCATORE, GIOCATORE_COLORI, 1, 1)
  contorno(t)
  cacheGiocatore = t

  return t
}

const cacheCaselle = new Map<number, string>()

// Le caselle di un mondo, disegnate una volta sola e richiamate con <use>.
function caselle(mondo: number): string {
  const pronte = cacheCaselle.get(mondo)
  if (pronte) return pronte
  const c = TERRENI[mondo] ?? TERRENI[0]!
  const defs: [string, Tela][] = [
    ['s0', sentiero(c, 1)], ['s1', sentiero(c, 2)],
    ['e0', erbaAlta(c, 1)], ['e1', erbaAlta(c, 2)],
    ['a0', acqua(c, 1)], ['a1', acqua(c, 2)],
    ['rn', riva(c, 'n')], ['rs', riva(c, 's')], ['re', riva(c, 'e')], ['ro', riva(c, 'o')],
    ['o', ostacolo(c)], ['c', centroCure(c)], ['g', palestraCasella(c)],
    ['p', portaleCasella(c, ['#7a3cff', '#b98cff', '#f2e8ff'])],
    ['r', portaleCasella(c, ['#1c9c8c', '#4cd6c8', '#e0fffa'])],
  ]
  const out = '<defs>' + defs.map(([id, t]) => `<g id="${id}">${svgTela(t, 0, 0, 1)}</g>`).join('') + '</defs>'
  cacheCaselle.set(mondo, out)

  return out
}

const usa = (id: string, x: number, y: number) => `<use href="#${id}" x="${x * T}" y="${y * T}"/>`

export function svgMappa(s: Stato): string {
  const mappa = MONDI[s.mondo]!.mappa
  let corpo = caselle(s.mondo)
  mappa.forEach((riga, y) =>
    riga.split('').forEach((_, x) => {
      const t = casellaDi(s, x, y) ?? '#'
      const v = (x * 7 + y * 13) % 2
      if (t === ',') corpo += usa('e' + v, x, y)
      else if (t === '~') {
        corpo += usa('a' + v, x, y)
        const terra = (dx: number, dy: number) => (casellaDi(s, x + dx, y + dy) ?? '~') !== '~'
        if (terra(0, -1)) corpo += usa('rn', x, y)
        if (terra(0, 1)) corpo += usa('rs', x, y)
        if (terra(-1, 0)) corpo += usa('ro', x, y)
        if (terra(1, 0)) corpo += usa('re', x, y)
      } else if (t === '#') corpo += usa('o', x, y)
      else if (t === 'C') corpo += usa('c', x, y)
      else if (t === 'G') corpo += usa('g', x, y)
      else if (t === 'P') corpo += usa('p', x, y)
      else if (t === 'R') corpo += usa('r', x, y)
      else corpo += usa('s' + v, x, y)
    }),
  )
  corpo += `<ellipse cx="${s.x * T + 16}" cy="${s.y * T + 29}" rx="8" ry="2.5" fill="${NERO}" opacity="0.3"/>`
  corpo += svgTela(giocatore(), s.x * T + 7, s.y * T + 9, 1)

  return svg(mappa[0]!.length * T, mappa.length * T, corpo)
}

// ---------- Lotta ----------

// Gli sfondi delle lotte: cielo a fasce, paesaggio del bioma, terreno e pedane.
type Scena = { cielo: string[]; prato: string; pedana: string; testo: string }

const SCENE: Scena[] = [
  { cielo: ['#8fd0ff', '#acdcff', '#c8e8ff', '#e0f3ff'], prato: '#a8e090', pedana: '#8fd07a', testo: NERO },
  { cielo: ['#a8c8e8', '#bcd6ee', '#cfe3f5', '#e2eefa'], prato: '#eef5fb', pedana: '#cfe0ee', testo: NERO },
  { cielo: ['#ffc070', '#ffd090', '#ffe0ac', '#fff0cc'], prato: '#f2dca4', pedana: '#e6c886', testo: NERO },
  { cielo: ['#8ea494', '#a0b4a4', '#b4c4b4', '#c8d4c8'], prato: '#7a9868', pedana: '#62845a', testo: NERO },
  { cielo: ['#1c1630', '#241c3c', '#2e2648', '#3c3458'], prato: '#6c6480', pedana: '#8c84a0', testo: '#f2e8ff' },
]

const ORIZZONTE = 110

function pedana(t: Tela, cx: number, cy: number, rx: number, ry: number, sc: Scena) {
  ellisse(t, cx, cy + 4, rx, ry, scuro(sc.prato, 0.3))
  ellisse(t, cx, cy + 2, rx, ry, scuro(sc.pedana, 0.2))
  ellisse(t, cx, cy, rx, ry - 1, sc.pedana)
  ellisse(t, cx - rx * 0.12, cy - ry * 0.2, rx * 0.62, ry * 0.42, chiaro(sc.pedana, 0.18))
}

function nuvola(t: Tela, cx: number, cy: number, s: number) {
  const tinta = (_x: number, _y: number, _nx: number, ny: number) => (ny > 0.35 ? '#dcefff' : '#ffffff')
  ellisse(t, cx - 8 * s, cy + 2 * s, 7 * s, 4 * s, tinta)
  ellisse(t, cx + 9 * s, cy + 2 * s, 8 * s, 4 * s, tinta)
  ellisse(t, cx, cy, 10 * s, 6 * s, tinta)
}

const cacheSfondi = new Map<number, Tela>()

function sfondo(mondo: number): Tela {
  const pronto = cacheSfondi.get(mondo)
  if (pronto) return pronto
  const sc = SCENE[mondo] ?? SCENE[0]!
  const t = tela(320, 200)
  const fascia = ORIZZONTE / sc.cielo.length
  sc.cielo.forEach((c, i) => rett(t, 0, Math.round(i * fascia), 320, Math.round((i + 1) * fascia) - Math.round(i * fascia), c))
  const r = seme(mondo + 40)
  if (mondo === 0) {
    nuvola(t, 60, 30, 1.2)
    nuvola(t, 200, 18, 0.9)
    nuvola(t, 290, 44, 0.8)
    ellisse(t, 70, 118, 100, 26, '#9fd88a')
    ellisse(t, 260, 120, 110, 30, '#8ccf78')
  } else if (mondo === 1) {
    for (const [a, b, cima] of [[-20, 120, 34], [80, 240, 22], [200, 340, 44]] as const) {
      const mezzo = (a + b) / 2
      poligono(t, [[mezzo, cima], [a, ORIZZONTE], [b, ORIZZONTE]], (x: number) => (x < mezzo ? '#8aa4c4' : '#6f88aa'))
      poligono(t, [[mezzo, cima], [mezzo - 14, cima + 16], [mezzo - 4, cima + 12], [mezzo + 4, cima + 18], [mezzo + 14, cima + 16]], '#ffffff')
    }
    for (let i = 0; i < 40; i++) metti(t, Math.floor(r() * 320), Math.floor(r() * ORIZZONTE), '#ffffff')
  } else if (mondo === 2) {
    ellisse(t, 250, 40, 30, 30, '#ffe68c')
    ellisse(t, 250, 40, 22, 22, '#fff3b0')
    ellisse(t, 80, 124, 130, 26, '#e8c27c')
    ellisse(t, 270, 122, 110, 22, '#f0d090')
  } else if (mondo === 3) {
    for (let i = 0; i < 9; i++) {
      const x = 10 + i * 38 + Math.floor(r() * 14)
      const alto = 30 + Math.floor(r() * 30)
      rett(t, x - 2, ORIZZONTE - alto + 14, 4, alto, '#4f6656')
      ellisse(t, x, ORIZZONTE - alto + 8, 16, 12, i % 2 ? '#5f7866' : '#56705e')
    }
    rett(t, 0, 92, 320, 3, '#c8d4c8')
    rett(t, 0, 100, 320, 2, '#d4ddd4')
  } else {
    for (let i = 0; i < 60; i++) metti(t, Math.floor(r() * 320), Math.floor(r() * 90), r() > 0.3 ? '#ffffff' : '#fff3a0')
    ellisse(t, 256, 34, 16, 16, '#fff3c4')
    ellisse(t, 250, 30, 3, 3, '#e8d8a0')
    ellisse(t, 262, 40, 4, 3, '#e8d8a0')
    for (const [x, alto] of [[30, 50], [62, 34], [150, 58], [230, 40], [290, 52]] as const) {
      rett(t, x - 7, ORIZZONTE - alto, 14, alto, (xx: number) => (xx < x - 3 ? '#5a5078' : '#4a4064'))
      poligono(t, [[x - 7, ORIZZONTE - alto], [x - 3, ORIZZONTE - alto - 6], [x + 1, ORIZZONTE - alto - 2], [x + 7, ORIZZONTE - alto - 5], [x + 7, ORIZZONTE - alto]], '#4a4064')
    }
  }
  rett(t, 0, ORIZZONTE, 320, 200 - ORIZZONTE, sc.prato)
  rett(t, 0, ORIZZONTE, 320, 2, chiaro(sc.prato, 0.2))
  for (let i = 0; i < 140; i++) {
    const x = Math.floor(r() * 318)
    const y = ORIZZONTE + 4 + Math.floor(r() * 92)
    rett(t, x, y, 2 + Math.floor(r() * 3), 1, r() > 0.5 ? scuro(sc.prato, 0.1) : chiaro(sc.prato, 0.15))
  }
  pedana(t, 235, 92, 58, 13, sc)
  pedana(t, 85, 178, 70, 16, sc)
  cacheSfondi.set(mondo, t)

  return t
}

// La sfera: metà rossa, metà bianca, bottone al centro.
const SFERA = ['..kkkk..', '.krrrrk.', 'krrwrrrk', 'kkkwwkkk', 'kwwkkwwk', 'kwwwwwwk', '.kwwwwk.', '..kkkk..']

// colore: la metà di sopra, diversa per ogni tipo di sfera.
const sfera8 = (x: number, y: number, p: number, vuota = false, colore = '#e8483c') => {
  const t = tela(8, 8)
  lettere(t, SFERA, vuota ? { k: '#6a6470', r: '#a8a2ad', w: '#d8d4db' } : { k: NERO, r: colore, w: '#ffffff' }, 0, 0)

  return svgTela(t, x, y, p)
}

function barra(x: number, y: number, w: number, h: number, r: number, colore: string) {
  return (
    `<rect x="${x - 2}" y="${y - 2}" width="${w + 4}" height="${h + 4}" fill="${NERO}"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#5a5260"/>` +
    `<rect x="${x}" y="${y}" width="${Math.round(w * r)}" height="${h}" fill="${colore}"/>` +
    `<rect x="${x}" y="${y}" width="${Math.round(w * r)}" height="${Math.max(2, Math.round(h / 3))}" fill="${chiaro(colore, 0.4)}"/>`
  )
}

function pannello(x: number, y: number, w: number, h: number) {
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${NERO}" shape-rendering="auto"/>` +
    `<rect x="${x + 4}" y="${y + 4}" width="${w - 8}" height="${h - 8}" rx="5" fill="#fffbe8" shape-rendering="auto"/>` +
    `<rect x="${x + 4}" y="${y + h - 12}" width="${w - 8}" height="6" fill="#efe6c8"/>`
  )
}

// preso: la specie è già nel catalogo, e una piccola sfera lo segna accanto al nome.
function riquadro(m: Mostrino, x: number, y: number, w: number, mio: boolean, preso = false) {
  const r = m.hp / maxHp(m)
  const colore = r > 0.5 ? '#4fc35a' : r > 0.2 ? '#f2c230' : '#e8483c'
  const h = mio ? 100 : 74
  const bw = w - 92
  let out =
    pannello(x, y, w, h) +
    (preso ? sfera8(x + 14, y + 14, 2) : '') +
    scritta(x + (preso ? 36 : 16), y + 30, nome(m), 22) +
    scritta(x + w - 16, y + 30, `Lv${m.lvl}`, 18, NERO, 'end') +
    `<rect x="${x + 16}" y="${y + 40}" width="44" height="20" rx="4" fill="#c06a1a" shape-rendering="auto"/>` +
    scritta(x + 38, y + 55, 'PS', 15, '#fff6e0', 'middle') +
    barra(x + 70, y + 45, bw, 10, r, colore)
  if (mio) {
    out += scritta(x + w - 16, y + 80, `${m.hp}/${maxHp(m)}`, 18, NERO, 'end')
    out += barra(x + 16, y + 86, Math.round(w * 0.45), 4, Math.min(1, m.xp / (m.lvl * 8)), '#4c9cff')
  }

  return out
}

export function svgLotta(s: Stato): string {
  const nem = s.nemico!
  const io = s.squadra[0]!
  const sc = SCENE[s.mondo] ?? SCENE[0]!
  const corpo =
    svgTela(sfondo(s.mondo), 0, 0, 2) +
    (stadio(nem) === 2 ? alone(470, 120, 84, 100) : '') +
    (stadio(io) === 2 ? alone(170, 282, 104, 118) : '') +
    mostro(nem, 470 - (SW * 4) / 2, 190 - PIEDI * 4, 4) +
    mostro(io, 170 - (SW * 5) / 2, 366 - PIEDI * 5, 5, true) +
    (s.lancio ? sfera8(548, 160, 3, false, COLORE_SFERA[s.lanciata ?? 0]) : '') +
    riquadro(nem, 20, 24, 300, false, !!s.catturati?.includes(nem.sp)) +
    riquadro(io, 324, 262, 300, true) +
    // Contro un allenatore: una sfera per ogni Mostrino che gli resta, e il suo nome.
    (s.allenatore
      ? Array.from({ length: s.allenatore.squadra.length + 1 }, (_, i) => sfera8(24 + i * 28, 106, 3)).join('') +
        scritta(24 + (s.allenatore.squadra.length + 1) * 28 + 6, 125, s.allenatore.nome, 18, sc.testo)
      : '') +
    // Una sfera per ogni Mostrino della squadra (al massimo 3), grigia se è esausto.
    s.squadra.map((m, i) => sfera8(330 + i * 28, 370, 3, m.hp === 0)).join('')

  return svg(640, 400, corpo)
}

// ---------- Menu, scelta iniziale e catalogo ----------

function prato(alto: number): string {
  const t = tela(320, alto)
  const sc = SCENE[0]!
  sc.cielo.forEach((c, i) => rett(t, 0, Math.round((i * alto * 0.6) / 4), 320, Math.ceil((alto * 0.6) / 4) + 1, c))
  nuvola(t, 50, 20, 1)
  nuvola(t, 270, 14, 0.8)
  ellisse(t, 60, alto * 0.66, 90, 20, '#9fd88a')
  ellisse(t, 260, alto * 0.68, 100, 22, '#8ccf78')
  rett(t, 0, Math.round(alto * 0.7), 320, alto, sc.prato)
  rett(t, 0, Math.round(alto * 0.7), 320, 2, chiaro(sc.prato, 0.2))
  for (const cx of [75, 160, 245]) pedana(t, cx, alto - 14, 34, 6, sc)

  return svgTela(t, 0, 0, 2)
}

// Il menu principale: il titolo con i tre Mostrini iniziali.
export function svgMenu(): string {
  const corpo =
    prato(130) +
    scritta(320, 66, 'MOSTRINI', 56, '#ffd84c', 'middle', NERO) +
    scritta(628, 252, `versione ${VERSIONE}`, 14, '#ffffff', 'end', NERO) +
    INIZIALI.map((sp, i) => mostroIn({ sp }, 150 + i * 170, 238, 3)).join('')

  return svg(640, 260, corpo)
}

export function svgInizio(): string {
  const corpo =
    prato(130) +
    scritta(320, 40, 'Scegli il tuo primo Mostrino', 26, '#ffffff', 'middle', NERO) +
    INIZIALI.map((sp, i) => {
      const cx = 150 + i * 170
      const d = SPECIE[sp]!

      return mostroIn({ sp }, cx, 222, 3) + scritta(cx, 252, `${i + 1} ${d.nome}`, 20, '#ffffff', 'middle', NERO)
    }).join('')

  return svg(640, 260, corpo)
}

const COLORE_TIPO: Record<string, string> = {
  fuoco: '#e8662c', acqua: '#3c8ce0', erba: '#3fa84a', elettro: '#d8a800', normale: '#9a8a70',
  ghiaccio: '#4cb4d8', roccia: '#9a7a52', terra: '#b8863c', veleno: '#9c4cc8', spettro: '#6c5cc8',
}

// Il catalogo: una pagina per mondo, nove schede con il Mostrino, il numero, il nome e il tipo.
export function svgCatalogo(s: Stato): string {
  const cv = s.catalogoVista ?? { mondo: s.mondo, sel: 0 }
  const voci = vociCatalogo(s, cv.mondo)
  const presi = voci.filter(v => v.registrato).length
  let corpo =
    `<rect width="640" height="580" fill="#2c2a48"/>` +
    `<rect width="640" height="52" fill="#423e6c"/>` +
    scritta(20, 34, `Catalogo · ${MONDI[cv.mondo]!.nome}`, 22, '#ffffff') +
    scritta(470, 34, `${presi}/${voci.length}`, 22, presi === voci.length ? '#ffd84c' : '#ffffff', 'end') +
    MONDI.map((_, i) =>
      `<rect x="${492 + i * 28}" y="16" width="22" height="22" rx="4" fill="${i === cv.mondo ? '#ffd84c' : '#6c6898'}" shape-rendering="auto"/>` +
      scritta(503 + i * 28, 33, String(i + 1), 15, i === cv.mondo ? NERO : '#ffffff', 'middle'),
    ).join('')
  voci.forEach((v, i) => {
    const x = 14 + (i % 3) * 206
    const y = 62 + Math.floor(i / 3) * 118
    const scelto = i === cv.sel
    const d = SPECIE[v.sp]!
    // nel catalogo: crema (con la sfera se catturato); visto: a colori su fondo chiaro; mancante: ombra; mondo chiuso: ???
    const fondo = v.registrato ? '#fbf5e4' : v.visto ? '#ebe7f3' : v.noto ? '#d8d4e4' : '#a8a4bc'
    corpo +=
      `<rect x="${x}" y="${y}" width="198" height="110" rx="8" fill="${scelto ? '#ffd84c' : '#5a5680'}" shape-rendering="auto"/>` +
      `<rect x="${x + 4}" y="${y + 4}" width="190" height="102" rx="5" fill="${fondo}" shape-rendering="auto"/>` +
      `<ellipse cx="${x + 46}" cy="${y + 92}" rx="32" ry="6" fill="${scuro(fondo, 0.15)}"/>` +
      mostroIn({ sp: v.sp }, x + 46, y + 94, 2, !v.visto) +
      scritta(x + 92, y + 28, '#' + String(v.numero).padStart(2, '0'), 15, '#6c6880') +
      scritta(x + 92, y + 52, v.noto ? d.nome : '???', 17, v.visto ? NERO : '#4a4660') +
      (v.visto && !v.registrato ? scritta(x + 186, y + 100, 'visto', 13, '#6c6880', 'end') : '')
    if (v.noto) {
      corpo +=
        `<rect x="${x + 92}" y="${y + 62}" width="84" height="22" rx="5" fill="${COLORE_TIPO[d.tipo] ?? '#888'}" shape-rendering="auto"/>` +
        scritta(x + 134, y + 78, d.tipo, 14, '#ffffff', 'middle')
    }
    if (v.preso) corpo += sfera8(x + 166, y + 14, 2)
    if (v.raro && v.noto) corpo += scritta(x + 92, y + 100, 'raro', 13, '#b8862c')
  })
  // Sotto le schede, la linea evolutiva del Mostrino scelto: la forma base a colori se è nel catalogo,
  // le evoluzioni a colori solo se un tuo Mostrino le ha raggiunte, le altre in ombra.
  const v = voci[cv.sel] ?? voci[0]!
  const d = SPECIE[v.sp]!
  corpo += `<rect x="14" y="420" width="612" height="150" rx="8" fill="#423e6c" shape-rendering="auto"/>`
  if (!v.registrato) {
    corpo += scritta(320, 500, v.noto ? `Sconfiggi o cattura ${d.nome} per vedere le sue evoluzioni` : '???', 17, '#d8d4e4', 'middle')
  } else {
    const nomi = [d.nome, d.evo[0], d.evo[1]]
    const livelli = ['base', 'Lv 15', 'Lv 35']
    nomi.forEach((n, k) => {
      const cx = 118 + k * 202
      const avuta = k === 0 || v.stadio >= k
      corpo +=
        `<ellipse cx="${cx}" cy="530" rx="44" ry="7" fill="#2c2a48"/>` +
        mostroIn({ sp: v.sp, evo: k }, cx, 532, k === 2 ? 1.6 : 1.8, !avuta) +
        scritta(cx, 552, avuta ? n : '???', 15, avuta ? '#ffffff' : '#a8a4bc', 'middle') +
        scritta(cx, 566, livelli[k]!, 12, '#a8a4bc', 'middle') +
        (k < 2 ? scritta(cx + 101, 500, '→', 22, '#a8a4bc', 'middle') : '')
    })
  }

  return svg(640, 580, corpo)
}

export function svgPer(s0: Stato): { source: string; alt: string } {
  // Uno stato di una versione precedente può non avere mondo e box.
  const s: Stato = { ...s0, mondo: MONDI[s0.mondo] ? s0.mondo : 0, box: s0.box ?? [], catalogo: s0.catalogo ?? [] }
  if (s.modo === 'menu') return { source: svgMenu(), alt: 'Mostrini: menu principale' }
  if (s.modo === 'inizio') return { source: svgInizio(), alt: 'Scegli il tuo primo Mostrino' }
  if (s.modo === 'lotta' && s.nemico && s.squadra[0]) {
    return { source: svgLotta(s), alt: `Lotta contro ${nome(s.nemico)}` }
  }
  if (s.catalogoVista) return { source: svgCatalogo(s), alt: `Catalogo dei Mostrini: ${MONDI[s.catalogoVista.mondo]?.nome ?? ''}` }

  return { source: svgMappa(s), alt: 'Mappa del mondo dei Mostrini' }
}

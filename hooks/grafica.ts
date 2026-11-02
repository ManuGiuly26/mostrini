import type { Mostrino, Stato } from '../types'
import type { Rarita } from './gioco.tsx'
import {
  SPECIE, MONDI, INIZIALI, maxHp, casellaDi, nome, stadio, vociCatalogo, VERSIONE, COLORE_SFERA, SCONOSCIUTO,
  COLORE_RARITA, rarita, raroDel, formaDi,
  FORME, PER_PAGINA_CATALOGO, paginaCatalogo, nomeForma, numeroVoce, BIO, fortiContro, deboliContro, LIVELLI_EVO, saloneLargo, SALONE_ALTO, TAPPETO, casellaSalone,
} from './gioco.tsx'

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
  stillino: {
    cappello: ['............', '.....ww.....', '....wbbw....', '.....bb.....'],
    occhi: 'sonno',
    colori: { b: '#6c9cc8', l: '#dcecff', w: '#ffffff' },
  },
  // Gli epici e i leggendari dei cinque mondi
  trifoglio: {
    cappello: ['..rr....rr..', '.rrrr..rrrr.', '.rrrrttrrrr.', '..rr.tt.rr..'],
    occhi: 'felici',
    colori: { b: '#b4e070', l: '#f2fcd8', r: '#1f9a48', t: '#146a30' },
  },
  carpadoro: {
    cappello: ['.....rr.....', '....rrrr....', '...rryyrr...', '..rr.rr.rr..'],
    occhi: 'tondi',
    colori: { b: '#f2c230', l: '#fff6cc', r: '#ff8a3c', y: '#fff3b0' },
  },
  cristallino: {
    cappello: ['.....rr.....', '....rwwr....', '.r..rwwr..r.', 'rwr.rrrr.rwr'],
    occhi: 'stelle',
    colori: { b: '#bfe6ff', l: '#f4fcff', r: '#5cb4f0', w: '#ffffff', y: '#3c8ce0' },
  },
  aurorino: {
    cappello: ['..r..gg..r..', '.rr.gggg.rr.', '..r..gg..r..', '............'],
    occhi: 'stelle',
    colori: { b: '#5c4cc8', l: '#c8bcff', r: '#4cf0b0', g: '#ff7ad0', y: '#ffd84c' },
  },
  scarabello: {
    cappello: ['.....rr.....', '....rr......', '....rrr.....', '...rrrrr....'],
    occhi: 'tondi',
    colori: { b: '#3c9e8c', l: '#c8f0e0', r: '#ffcc3c' },
  },
  fenicino: {
    cappello: ['.r..y..y..r.', '.rr.yrry.rr.', '..ryyrryyr..', '...rryyrr...'],
    occhi: 'stelle',
    colori: { b: '#ff6c3c', l: '#ffe0a0', r: '#ff2c1c', y: '#ffd84c' },
  },
  anguillo: {
    cappello: ['............', '..r.r.r.r...', '..rrrrrrrr..', '............'],
    occhi: 'tondi',
    colori: { b: '#4c8cc8', l: '#c8e4ff', r: '#ffd84c' },
  },
  basiliscolo: {
    cappello: ['..y.y..y.y..', '..yryyyyry..', '...rrrrrr...', '............'],
    occhi: 'stelle',
    colori: { b: '#5c8c3c', l: '#d0e8a0', r: '#9c3cc8', y: '#ffd84c' },
  },
  golemino: {
    cappello: ['............', '..rr.rr.rr..', '..rrrrrrrr..', '...r.rr.r...'],
    occhi: 'tondi',
    colori: { b: '#a09888', l: '#d8d0c0', r: '#6c8c5c' },
  },
  chimerino: {
    cappello: ['..k......k..', '..kr.rr.rk..', '.rrrrrrrrrr.', '..rrrrrrrr..'],
    occhi: 'stelle',
    colori: { b: '#e89c3c', l: '#ffe0b0', r: '#c84c2c', y: '#ff4c4c' },
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

const cacheMostri = new Map<string, Tela>()

function mostrino(m: { sp: string; evo?: number | boolean }): Tela {
  const st = Math.min(2, Number(m.evo ?? 0))
  const chiave = `${m.sp}:${st}`
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
  contorno(t)
  cacheMostri.set(chiave, t)

  return t
}

// Un Mostrino in un punto del disegno: (x, y) è l'angolo in alto a sinistra della sua tela.
const mostro = (m: { sp: string; evo?: number | boolean }, x: number, y: number, p: number, specchio = false) =>
  svgTela(mostrino(m), x, y, p, specchio)

// Il Mostrino ritagliato e centrato in un riquadro (catalogo, scelta iniziale).
function mostroIn(m: { sp: string; evo?: number | boolean }, cx: number, piedi: number, p: number) {
  const t = mostrino(m)
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

// Il disegno intero: viewBox a risoluzione doppia, mostrato alla stessa grandezza di prima
// (o largo quanto si chiede, come il salone della palestra, che così è grande come la mappa).
function svg(w: number, h: number, corpo: string, largo = w * 0.8) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${Math.round(largo)}" height="${Math.round((h * largo) / w)}" shape-rendering="crispEdges">` +
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
  // la canna da pesca e il galleggiante bianco e rosso, con i cerchi nell'acqua
  if (s.pesca) {
    const bx = s.pesca.x * T + 16
    const by = s.pesca.y * T + 18
    const mx = s.x * T + 16 + Math.sign(bx - s.x * T - 16) * 12
    const my = s.y * T + 6
    corpo +=
      `<path stroke="#7a5230" stroke-width="2" d="M${s.x * T + 18} ${s.y * T + 20}L${mx} ${my}"/>` +
      `<path stroke="#f4f0e6" stroke-width="1" fill="none" d="M${mx} ${my}L${bx} ${by - 3}"/>` +
      `<ellipse cx="${bx}" cy="${by + 2}" rx="9" ry="3" fill="none" stroke="#dcf2ff" stroke-width="1" opacity="0.8"/>` +
      `<rect x="${bx - 3}" y="${by - 4}" width="6" height="4" fill="#e8483c"/>` +
      `<rect x="${bx - 3}" y="${by}" width="6" height="3" fill="#ffffff"/>`
  }

  return svg(mappa[0]!.length * T, mappa.length * T, corpo)
}

// ---------- La palestra dentro ----------

// Il capopalestra: capelli al posto del berretto, un mantello e la medaglia sul petto.
const CAPO = [
  '................',
  '....hhhhhhhh....',
  '...hhhhhhhhhh...',
  '..hhhhhhhhhhhh..',
  '..hhhhhhhhhhhh..',
  '..hssssssssssh..',
  '..hssksssskssh..',
  '..hssksssskssh..',
  '...ssssssssss...',
  '....sssMMsss....',
  '.cbbbbbbbbbbbbc.',
  'ccbbbbbzzbbbbbcc',
  'csbbbbbbbbbbbbsc',
  'csbbbbbbbbbbbbsc',
  'ccbbbbbbbbbbbbcc',
  'cc.nnnnnnnnnn.cc',
  'cc.nnnnnnnnnn.cc',
  '...nnnn..nnnn...',
  '...nnnn..nnnn...',
  '..kkkkk..kkkkk..',
]

// I capelli dei cinque capipalestra.
const CAPELLI = ['#3f9a3c', '#bfe6ff', '#c8862c', '#9c4cc8', '#2a2240']

function personaggio(righe: string[], colori: Tavolozza): Tela {
  const t = tela(18, 22)
  lettere(t, righe, colori, 1, 1)
  contorno(t)

  return t
}

function pavimento(tinta: string): Tela {
  const t = tela(T, T)
  const a = mescola('#e6e2ee', tinta, 0.08)
  const b = mescola('#d2cede', tinta, 0.14)
  rett(t, 0, 0, T, T, (x: number, y: number) => ((Math.floor(x / 16) + Math.floor(y / 16)) % 2 ? a : b))
  rett(t, 0, 0, T, 1, chiaro(a, 0.3))

  return t
}

function muroSalone(tinta: string): Tela {
  const t = tela(T, T)
  const base = mescola('#4a4460', tinta, 0.3)
  rett(t, 0, 0, T, T, base)
  for (let y = 0; y < T; y += 8) {
    rett(t, 0, y, T, 1, scuro(base, 0.3))
    rett(t, 0, y + 1, T, 1, chiaro(base, 0.12))
    for (let x = (y / 8) % 2 ? 8 : 0; x < T; x += 16) rett(t, x, y, 1, 8, scuro(base, 0.3))
  }

  return t
}

function tappeto(tinta: string): Tela {
  const t = pavimento(tinta)
  rett(t, 0, 3, T, 26, '#ffd84c')
  rett(t, 0, 5, T, 22, '#c83a4a')
  rett(t, 0, 15, T, 2, '#a82a3a')
  for (const x of [4, 20]) rett(t, x, 9, 8, 2, '#e85a6a')

  return t
}

function colonnaSalone(tinta: string): Tela {
  const t = pavimento(tinta)
  ellisse(t, 16, 28, 10, 3, scuro(mescola('#d2cede', tinta, 0.14), 0.2))
  const s = tela(T, T)
  const pietra = (x: number) => (x < 13 ? '#f2f0f8' : x > 19 ? '#a8a4b8' : '#d8d4e4')
  rett(s, 9, 24, 14, 5, pietra)
  rett(s, 11, 7, 10, 17, pietra)
  rett(s, 9, 3, 14, 4, pietra)
  rett(s, 9, 6, 14, 1, mescola('#a8a4b8', tinta, 0.3))
  contorno(s)
  componi(t, s)

  return t
}

function portaSalone(tinta: string): Tela {
  const t = muroSalone(tinta)
  ellisse(t, 16, 12, 9, 6, '#ffd84c')
  rett(t, 7, 12, 18, 20, '#ffd84c')
  ellisse(t, 16, 12, 7, 5, '#1c1828')
  rett(t, 9, 12, 14, 20, '#1c1828')

  return t
}

function pedanaCapo(tinta: string): Tela {
  const t = tappeto(tinta)
  ellisse(t, 16, 25, 15, 5.5, '#c88a1c')
  ellisse(t, 16, 24, 13, 4, '#ffd84c')
  ellisse(t, 13, 23, 5, 1.5, '#fff3b0')

  return t
}

const cacheSaloni = new Map<number, string>()

function pezziSalone(mondo: number): string {
  const pronti = cacheSaloni.get(mondo)
  if (pronti) return pronti
  const tinta = COLORE_TIPO[MONDI[mondo]!.palestra.tipo] ?? '#888888'
  const allievo = { ...GIOCATORE_COLORI, r: tinta, R: scuro(tinta, 0.3), b: '#6a6478', n: '#3a3448', h: '#5a3a24' }
  const capo = { ...GIOCATORE_COLORI, h: CAPELLI[mondo] ?? '#4a3020', b: tinta, c: scuro(tinta, 0.35), z: '#ffd84c', n: '#3a3448' }
  const defs: [string, Tela][] = [
    ['sm', muroSalone(tinta)], ['sd', portaSalone(tinta)], ['sp', pavimento(tinta)], ['st', tappeto(tinta)],
    ['so', colonnaSalone(tinta)], ['sk', pedanaCapo(tinta)],
  ]
  const out =
    '<defs>' +
    defs.map(([id, t]) => `<g id="${id}">${svgTela(t, 0, 0, 1)}</g>`).join('') +
    `<g id="pa">${svgTela(personaggio(GIOCATORE, allievo), 0, 0, 1)}</g>` +
    `<g id="pc">${svgTela(personaggio(CAPO, capo), 0, 0, 1)}</g>` +
    '</defs>'
  cacheSaloni.set(mondo, out)

  return out
}

// Il salone della palestra: il tappeto con gli allievi in fila, il capopalestra in fondo sulla pedana.
export function svgPalestra(s: Stato): string {
  const largo = saloneLargo(s.mondo)
  let corpo = pezziSalone(s.mondo)
  let figure = ''
  const persona = (id: string, x: number, y: number, attenuato = false) =>
    `<ellipse cx="${x * T + 16}" cy="${y * T + 29}" rx="8" ry="2.5" fill="${NERO}" opacity="0.3"/>` +
    `<use href="#${id}" x="${x * T + 6}" y="${y * T + 8}"${attenuato ? ' opacity="0.55"' : ''}/>`
  for (let y = 0; y < SALONE_ALTO; y++) {
    for (let x = 0; x < largo; x++) {
      const c = casellaSalone(s, x, y)
      const id = c === '#' ? 'sm' : c === '<' ? 'sd' : c === 'o' ? 'so' : c === 'K' ? 'sk' : c === '=' || c === 'a' ? 'st' : 'sp'
      corpo += `<use href="#${id}" x="${x * T}" y="${y * T}"/>`
      if (c === 'a') figure += persona('pa', x, y)
      if (c === 'b') figure += persona('pa', x, y, true)
      if (c === 'K') figure += persona('pc', x, y)
    }
  }
  const p = s.inPalestra ?? { x: 1, y: TAPPETO }
  figure += `<ellipse cx="${p.x * T + 16}" cy="${p.y * T + 29}" rx="8" ry="2.5" fill="${NERO}" opacity="0.3"/>`
  figure += svgTela(giocatore(), p.x * T + 7, p.y * T + 9, 1)

  return svg(largo * T, SALONE_ALTO * T, corpo + figure, 512)
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
  // i nomi lunghi un po' più piccoli, per lasciare posto alle gemme e al livello
  const dim = nome(m).length > 10 ? 19 : 22
  let out =
    pannello(x, y, w, h) +
    (preso ? sfera8(x + 14, y + 14, 2) : '') +
    scritta(x + (preso ? 36 : 16), y + 30, nome(m), dim) +
    // la rarità dopo il nome: una gemma azzurra il raro, due viola l'epico, tre d'oro il leggendario
    gemme(x + (preso ? 36 : 16) + Math.ceil(nome(m).length * dim * 0.6) + 8, y + 14, rarita(m.sp)) +
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

const GEMME: Record<Rarita, number> = { comune: 0, raro: 1, epico: 2, leggendario: 3 }

function gemme(x: number, y: number, r: Rarita): string {
  return Array.from({ length: GEMME[r] }, (_, i) => {
    const gx = x + i * 14

    return (
      `<path fill="${COLORE_RARITA[r]}" stroke="${NERO}" stroke-width="2" d="M${gx + 6} ${y}L${gx + 12} ${y + 7}L${gx + 6} ${y + 14}L${gx} ${y + 7}Z"/>` +
      `<path fill="#ffffff" d="M${gx + 5} ${y + 4}h2v3h-2z"/>`
    )
  }).join('')
}

// ---------- I colpi in lotta ----------

// Chi attacca si muove (la Botta è uno scatto in avanti, le mosse un salto con slancio), chi è colpito
// trema e lampeggia, e sopra di lui compare l'effetto della mossa: fiamme, schizzi d'acqua, foglie,
// fulmini, schegge di ghiaccio, massi, polvere, bolle velenose, spettri, raffiche di vento.
// La Botta è uguale per tutti: un grande SBAM!. I due colpi del turno partono uno dopo l'altro.
type Colpo = NonNullable<Stato['colpi']>[number]

// Il centro del corpo dei due Mostrini in lotta, e quanto è grande l'effetto su di loro.
const POSTI = { nemico: { cx: 470, cy: 140, k: 1 }, io: { cx: 170, cy: 290, k: 1.3 } }
const DURATA_COLPO = 1.3
const impatto = (c: Colpo) => (c.mossa === 'botta' ? 0.25 : 0.45)

const fra = (t: number) => t.toFixed(2)

function slancio(c: Colpo, t: number): string {
  const v = c.chi === 'io' ? 1 : -1
  const valori =
    c.mossa === 'botta'
      ? `0 0;${-8 * v} ${5 * v};${48 * v} ${-28 * v};0 0`
      : `0 0;0 10;${16 * v} -34;${26 * v} ${-14 * v};0 0`

  return (
    `<animateTransform attributeName="transform" type="translate" values="${valori}" ` +
    `keyTimes="${c.mossa === 'botta' ? '0;0.3;0.6;1' : '0;0.2;0.5;0.75;1'}" begin="${fra(t)}s" dur="${c.mossa === 'botta' ? 0.45 : 0.65}s"/>`
  )
}

function scossa(t: number): string {
  return (
    `<animateTransform attributeName="transform" type="translate" values="0 0;-10 0;10 0;-7 0;7 0;-3 0;0 0" begin="${fra(t)}s" dur="0.5s"/>` +
    `<animate attributeName="opacity" values="1;0.2;1;0.2;1;0.4;1" begin="${fra(t)}s" dur="0.6s"/>`
  )
}

// Un pezzo dell'effetto che si sposta di (dx, dy) e intanto si accende e si spegne.
const vola = (dx: number, dy: number, t: number, d: number) =>
  `<animateTransform attributeName="transform" type="translate" values="0 0;${Math.round(dx)} ${Math.round(dy)}" begin="${fra(t)}s" dur="${d}s" fill="freeze"/>` +
  `<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.7;1" begin="${fra(t)}s" dur="${d}s" fill="freeze"/>`

// Un pezzo che si gonfia (raggio da 0 a r) e svanisce.
const gonfia = (r: number, t: number, d: number, ry = r, picco = 0.75) =>
  `<animate attributeName="rx" values="0;${r}" begin="${fra(t)}s" dur="${d}s" fill="freeze"/>` +
  `<animate attributeName="ry" values="0;${ry}" begin="${fra(t)}s" dur="${d}s" fill="freeze"/>` +
  `<animate attributeName="opacity" values="0;${picco};0" begin="${fra(t)}s" dur="${d}s" fill="freeze"/>`

const angoli = (n: number, da = 0) => Array.from({ length: n }, (_, i) => da + (i * Math.PI * 2) / n)

function effetto(mossa: Colpo['mossa'], p: { cx: number; cy: number; k: number }, t: number): string {
  const { cx, cy, k } = p
  const X = (d: number) => Math.round(cx + d * k)
  const Y = (d: number) => Math.round(cy + d * k)
  let pezzi = ''
  if (mossa === 'botta') {
    const punte = angoli(12).map((a, i) => `${Math.round(Math.cos(a) * (i % 2 ? 26 : 50) * k)} ${Math.round(Math.sin(a) * (i % 2 ? 26 : 50) * k)}`)
    const raggi = angoli(8, 0.2)
      .map(a => `<path stroke="#ffffff" stroke-width="5" d="M${X(Math.cos(a) * 54)} ${Y(Math.sin(a) * 54)}L${X(Math.cos(a) * 80)} ${Y(Math.sin(a) * 80)}"/>`)
      .join('')
    pezzi =
      `<g opacity="0">${raggi}<animate attributeName="opacity" values="0;1;0" begin="${fra(t)}s" dur="0.5s"/></g>` +
      `<g transform="translate(${cx} ${cy})"><g>` +
      `<path fill="#ffd84c" stroke="${NERO}" stroke-width="5" stroke-linejoin="round" d="M${punte.join('L')}Z"/>` +
      `<path fill="#ff5a3c" d="M${punte.map(q => q.split(' ').map(n => Math.round(Number(n) * 0.6)).join(' ')).join('L')}Z"/>` +
      scritta(0, Math.round(10 * k), 'SBAM!', Math.round(26 * k), '#ffffff', 'middle', NERO) +
      `<animateTransform attributeName="transform" type="scale" values="0.2;1.25;1" keyTimes="0;0.4;1" begin="${fra(t)}s" dur="0.3s" fill="freeze"/>` +
      `</g></g>`

    return `<g opacity="0">${pezzi}<set attributeName="opacity" to="1" begin="${fra(t)}s" dur="0.8s"/></g>`
  }
  if (mossa === 'fuoco') {
    pezzi = [[-40, 34], [-20, 40], [0, 30], [20, 40], [40, 34], [-30, 8], [30, 8], [0, 4], [-12, -20], [14, -18]]
      .map(([dx, dy], i) => {
        const x = X(dx!)
        const y = Y(dy!)
        const h = Math.round((20 + (i % 3) * 6) * k)

        return (
          `<g opacity="0"><path fill="#ff6a1a" d="M${x} ${y - h}L${x + 11} ${y}L${x + 6} ${y + 9}L${x - 6} ${y + 9}L${x - 11} ${y}Z"/>` +
          `<path fill="#ffd84c" d="M${x} ${y - Math.round(h / 2)}L${x + 5} ${y + 2}L${x} ${y + 7}L${x - 5} ${y + 2}Z"/>${vola(0, -26 * k, t + i * 0.04, 0.7)}</g>`
        )
      })
      .join('')
  } else if (mossa === 'acqua') {
    pezzi =
      angoli(12)
        .map((a, i) => `<g opacity="0"><ellipse cx="${cx}" cy="${cy}" rx="${Math.round(7 * k)}" ry="${Math.round(9 * k)}" fill="${i % 2 ? '#4cb4ff' : '#9fdcff'}"/>${vola(Math.cos(a) * 80 * k, Math.sin(a) * 56 * k - 10, t, 0.7)}</g>`)
        .join('') +
      [0, 0.18].map(d => `<ellipse cx="${cx}" cy="${Y(30)}" rx="0" ry="0" fill="none" stroke="#bfe6ff" stroke-width="6">${gonfia(Math.round(90 * k), t + d, 0.6, Math.round(34 * k))}</ellipse>`).join('') +
      [-30, 0, 30].map((dx, i) => `<g opacity="0"><ellipse cx="${X(dx)}" cy="${Y(-120)}" rx="${Math.round(8 * k)}" ry="${Math.round(12 * k)}" fill="#3c8ce0"/>${vola(0, 110 * k, t - 0.25 + i * 0.06, 0.35)}</g>`).join('')
  } else if (mossa === 'erba') {
    const foglie = angoli(8)
      .map((a, i) => {
        const x = X(Math.cos(a) * 62)
        const y = Y(Math.sin(a) * 46)

        return `<ellipse cx="${x}" cy="${y}" rx="${Math.round(11 * k)}" ry="${Math.round(5 * k)}" fill="${i % 2 ? '#3fa84a' : '#7fd36b'}" stroke="#1f6a2c" stroke-width="2" transform="rotate(${Math.round((a * 180) / Math.PI) + 90} ${x} ${y})"/>`
      })
      .join('')
    pezzi = `<g opacity="0">${foglie}<animateTransform attributeName="transform" type="rotate" values="0 ${cx} ${cy};300 ${cx} ${cy}" begin="${fra(t)}s" dur="0.8s" fill="freeze"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" begin="${fra(t)}s" dur="0.8s" fill="freeze"/></g>`
  } else if (mossa === 'elettro') {
    const fulmine = (ox: number) => {
      const punti = [[ox, -130], [ox + 18, -90], [ox - 6, -70], [ox + 20, -30], [ox * 0.2, 0]].map(([dx, dy]) => `${X(dx!)} ${Y(dy!)}`).join('L')

      return `<path fill="none" stroke="#ffd84c" stroke-width="${Math.round(9 * k)}" stroke-linejoin="round" d="M${punti}"/><path fill="none" stroke="#ffffff" stroke-width="${Math.round(3 * k)}" d="M${punti}"/>`
    }
    pezzi =
      `<g opacity="0">${fulmine(-40)}${fulmine(0)}${fulmine(40)}<animate attributeName="opacity" values="0;1;0;1;0;1;0" begin="${fra(t)}s" dur="0.7s" fill="freeze"/></g>` +
      `<ellipse cx="${cx}" cy="${cy}" rx="0" ry="0" fill="#fff6a0">${gonfia(Math.round(70 * k), t, 0.5, Math.round(60 * k), 0.55)}</ellipse>`
  } else if (mossa === 'ghiaccio') {
    pezzi =
      angoli(8, 0.4)
        .map(a => {
          const x = X(Math.cos(a) * 96)
          const y = Y(Math.sin(a) * 70)
          const r = Math.round(9 * k)

          return `<g opacity="0"><path fill="#bfe6ff" stroke="#4cb4d8" stroke-width="2" d="M${x} ${y - r * 2}L${x + r} ${y}L${x} ${y + r * 2}L${x - r} ${y}Z"/><path fill="#ffffff" d="M${x - 1} ${y - r}h3v${r}h-3z"/>${vola(-Math.cos(a) * 76 * k, -Math.sin(a) * 54 * k, t, 0.55)}</g>`
        })
        .join('') +
      `<g opacity="0"><rect x="${X(-50)}" y="${Y(-56)}" width="${Math.round(100 * k)}" height="${Math.round(108 * k)}" rx="8" fill="#cfefff" opacity="0.55" stroke="#ffffff" stroke-width="3"/><set attributeName="opacity" to="1" begin="${fra(t + 0.45)}s" dur="0.35s"/></g>`
  } else if (mossa === 'roccia') {
    pezzi = [[-36, 20], [0, 30], [34, 18], [-16, -6], [20, -10]]
      .map(([dx, dy], i) => {
        const x = X(dx!)
        const y = Y(dy! - 150)
        const r = Math.round((13 + (i % 2) * 5) * k)

        return `<g opacity="0"><path fill="#9a8a70" stroke="${NERO}" stroke-width="3" d="M${x - r} ${y}L${x - r / 2} ${y - r}L${x + r / 2} ${y - r}L${x + r} ${y}L${x + r / 2} ${y + r}L${x - r / 2} ${y + r}Z"/><path fill="#c8b89a" d="M${x - r / 2} ${y - r + 3}h${r / 2}v${r / 2}h-${r / 2}z"/>${vola(0, 150 * k, t - 0.2 + i * 0.07, 0.45)}</g>`
      })
      .join('')
  } else if (mossa === 'terra') {
    pezzi =
      [[-40, 40], [-14, 46], [14, 46], [40, 40], [0, 30], [-26, 20], [26, 20]]
        .map(([dx, dy], i) => `<ellipse cx="${X(dx!)}" cy="${Y(dy!)}" rx="0" ry="0" fill="${i % 2 ? '#c89850' : '#e0b870'}">${gonfia(Math.round(30 * k), t + i * 0.05, 0.7, Math.round(20 * k))}</ellipse>`)
        .join('') +
      angoli(6, 0.3)
        .map(a => `<g opacity="0"><rect x="${cx}" y="${Y(40)}" width="${Math.round(6 * k)}" height="${Math.round(6 * k)}" fill="#7a5a30"/>${vola(Math.cos(a) * 70 * k, -60 * k - Math.abs(Math.sin(a)) * 30, t, 0.6)}</g>`)
        .join('')
  } else if (mossa === 'veleno') {
    pezzi =
      `<ellipse cx="${cx}" cy="${Y(10)}" rx="0" ry="0" fill="#9c4cc8">${gonfia(Math.round(70 * k), t, 0.8, Math.round(50 * k), 0.45)}</ellipse>` +
      [[-40, 40], [-20, 30], [0, 44], [20, 30], [40, 40], [-30, 10], [30, 10], [-8, 20], [10, 0], [0, -10]]
        .map(([dx, dy], i) => {
          const r = Math.round((7 + (i % 3) * 3) * k)
          const x = X(dx!)
          const y = Y(dy!)

          return `<g opacity="0"><ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r}" fill="#c46cd9" stroke="#6a2c8c" stroke-width="2"/><rect x="${x - Math.round(r / 2)}" y="${y - Math.round(r / 2)}" width="3" height="3" fill="#ffffff"/>${vola(0, -70 * k, t + i * 0.05, 0.7)}</g>`
        })
        .join('')
  } else if (mossa === 'spettro') {
    const fantasma = (a: number) => {
      const x = X(Math.cos(a) * 58)
      const y = Y(Math.sin(a) * 40)
      const r = Math.round(14 * k)

      return (
        `<path fill="#e8e4f8" opacity="0.9" d="M${x - r} ${y + r}L${x - r} ${y - r / 2}L${x - r / 2} ${y - r}L${x + r / 2} ${y - r}L${x + r} ${y - r / 2}L${x + r} ${y + r}L${x + r / 2} ${y + r / 2}L${x} ${y + r}L${x - r / 2} ${y + r / 2}Z"/>` +
        `<rect x="${x - 6}" y="${y - 4}" width="4" height="5" fill="${NERO}"/><rect x="${x + 3}" y="${y - 4}" width="4" height="5" fill="${NERO}"/>`
      )
    }
    pezzi =
      `<ellipse cx="${cx}" cy="${cy}" rx="0" ry="0" fill="#3c2c6c">${gonfia(Math.round(80 * k), t, 0.8, Math.round(70 * k), 0.55)}</ellipse>` +
      `<g opacity="0">${angoli(3).map(fantasma).join('')}<animateTransform attributeName="transform" type="rotate" values="0 ${cx} ${cy};-240 ${cx} ${cy}" begin="${fra(t)}s" dur="0.8s" fill="freeze"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.75;1" begin="${fra(t)}s" dur="0.8s" fill="freeze"/></g>`
  } else {
    // normale: raffiche di vento che attraversano il bersaglio
    pezzi = [[-30, 0], [-10, -1], [12, 1], [30, 0], [-22, 1], [20, -1]]
      .map(([dy, verso], i) => {
        const y = Y(dy! * 1.4)
        const x = X(-90)
        const w = Math.round(60 * k)

        return `<g opacity="0"><path fill="none" stroke="${i % 2 ? '#ffffff' : '#dcefff'}" stroke-width="${Math.round(5 * k)}" stroke-linecap="round" d="M${x} ${y}Q${x + w / 2} ${y - 16 * (verso || 1)} ${x + w} ${y}"/>${vola(120 * k, 0, t + i * 0.06, 0.55)}</g>`
      })
      .join('')
  }

  return pezzi
}

export function svgLotta(s: Stato): string {
  const nem = s.nemico!
  const io = s.squadra[0]!
  const sc = SCENE[s.mondo] ?? SCENE[0]!
  // i colpi del turno: chi attacca scatta, chi è colpito trema, e sopra l'effetto della mossa
  let animaNem = ''
  let animaIo = ''
  const effetti = (s.colpi ?? [])
    .map((c, i) => {
      const t = 0.15 + i * DURATA_COLPO
      const quando = t + impatto(c)
      if (c.chi === 'io') {
        animaIo += slancio(c, t)
        animaNem += scossa(quando)
      } else {
        animaNem += slancio(c, t)
        animaIo += scossa(quando)
      }

      return effetto(c.mossa, POSTI[c.chi === 'io' ? 'nemico' : 'io'], quando)
    })
    .join('')
  const corpo =
    svgTela(sfondo(s.mondo), 0, 0, 2) +
    `<g>${stadio(nem) === 2 ? alone(470, 120, 84, 100) : ''}${mostro(nem, 470 - (SW * 4) / 2, 190 - PIEDI * 4, 4)}${animaNem}</g>` +
    `<g>${stadio(io) === 2 ? alone(170, 282, 104, 118) : ''}${mostro(io, 170 - (SW * 5) / 2, 366 - PIEDI * 5, 5, true)}${animaIo}</g>` +
    (s.lancio ? sfera8(548, 160, 3, false, COLORE_SFERA[s.lanciata ?? 0]) : '') +
    riquadro(nem, 20, 24, 300, false, s.catalogo.includes(formaDi(nem))) +
    riquadro(io, 324, 262, 300, true) +
    // Contro un allenatore: una sfera per ogni Mostrino che gli resta, e il suo nome.
    (s.allenatore
      ? Array.from({ length: s.allenatore.squadra.length + 1 }, (_, i) => sfera8(24 + i * 28, 106, 3)).join('') +
        scritta(24 + (s.allenatore.squadra.length + 1) * 28 + 6, 125, s.allenatore.nome, 18, sc.testo)
      : '') +
    // Una sfera per ogni Mostrino della squadra (al massimo 3), grigia se è esausto.
    s.squadra.map((m, i) => sfera8(330 + i * 28, 370, 3, m.hp === 0)).join('') +
    effetti

  return svg(640, 400, corpo)
}

// ---------- Evoluzione ----------

// L'animazione dell'evoluzione (SVG animato, circa 3 secondi, una volta sola):
// il vecchio Mostrino lampeggia, una nuvola di sbuffi lo copre con un grande POUF!,
// e quando la nuvola svanisce c'è il nuovo Mostrino.
export function svgEvoluzione(e: { sp: string; da: number; a: number }): string {
  const cx = 320
  const piedi = 340
  // compare e scompare a un dato momento (in secondi)
  const quando = (da: number, a = 99) =>
    `<set attributeName="opacity" to="1" begin="${da}s" fill="freeze"/>` + (a < 99 ? `<set attributeName="opacity" to="0" begin="${a}s" fill="freeze"/>` : '')
  const sbuffi: [number, number, number][] = [[0, 0, 62], [-62, 22, 44], [62, 22, 46], [-34, -40, 42], [38, -36, 44], [0, 46, 50], [-80, -6, 30], [84, -4, 30]]
  const nuvola =
    `<g>` +
    sbuffi
      .map(([dx, dy, r], i) =>
        `<circle cx="${cx + dx}" cy="${240 + dy}" r="0" fill="${i % 2 ? '#f4f2fa' : '#ffffff'}" stroke="#c8c4dc" stroke-width="4" shape-rendering="auto">` +
        `<animate attributeName="r" values="0;${Math.round(r * 1.15)};${r}" keyTimes="0;0.7;1" begin="${1.3 + i * 0.04}s" dur="0.5s" fill="freeze"/></circle>`,
      )
      .join('') +
    `<animate attributeName="opacity" values="1;0" begin="2.5s" dur="0.7s" fill="freeze"/></g>`
  const stelle = [[90, 60], [560, 80], [140, 250], [520, 240], [250, 40], [400, 30], [60, 170], [590, 170]]
    .map(([x, y]) => `<path fill="#ffd84c" d="M${x! - 3} ${y}h7v2h-7zM${x} ${y! - 3}h2v8h-2z"/>`)
    .join('')
  const corpo =
    `<rect width="640" height="400" fill="#2c2a48"/>` +
    `<ellipse cx="${cx}" cy="215" rx="270" ry="185" fill="#3c3864"/>` +
    `<ellipse cx="${cx}" cy="215" rx="180" ry="130" fill="#4a4678"/>` +
    stelle +
    `<ellipse cx="${cx}" cy="${piedi + 6}" rx="130" ry="24" fill="#6c6898"/>` +
    `<ellipse cx="${cx}" cy="${piedi + 2}" rx="118" ry="18" fill="#8c88b8"/>` +
    // il vecchio Mostrino lampeggia e poi sparisce dentro la nuvola
    `<g>${mostroIn({ sp: e.sp, evo: e.da }, cx, piedi, 5)}` +
    `<animate attributeName="opacity" values="1;0.15;1;0.15;1;0.15;1" begin="0.3s" dur="1.2s"/>` +
    `<set attributeName="opacity" to="0" begin="1.8s" fill="freeze"/></g>` +
    // il nuovo compare quando la nuvola copre tutto (con l'alone se è la forma finale)
    `<g opacity="0">${e.a === 2 ? alone(cx, 236, 120, 110) : ''}${mostroIn({ sp: e.sp, evo: e.a }, cx, piedi, 5)}${quando(1.8)}</g>` +
    nuvola +
    `<g opacity="0">${scritta(cx, 110, 'POUF!', 64, '#ffd84c', 'middle', NERO)}${quando(1.6, 2.8)}</g>` +
    `<g>${scritta(cx, 52, `Cosa succede? ${nomeForma(e.sp, e.da)} si evolve...`, 22, '#ffffff', 'middle', NERO)}${`<set attributeName="opacity" to="0" begin="2.8s" fill="freeze"/>`}</g>` +
    `<g opacity="0">${scritta(cx, 52, `${nomeForma(e.sp, e.da)} è diventato ${nomeForma(e.sp, e.a)}!`, 22, '#ffd84c', 'middle', NERO)}${quando(2.8)}</g>`

  return svg(640, 400, corpo)
}

// ---------- Feste ----------

// Coriandoli che cadono dall'alto senza fine, ognuno col suo ritmo.
function coriandoli(): string {
  const r = seme(77)
  const colori = ['#ffd84c', '#e8483c', '#4c9cff', '#6fd36f', '#c46cd9', '#ffffff']

  return Array.from({ length: 46 }, (_, i) => {
    const x = Math.floor(r() * 630)
    const dur = (2.4 + r() * 2).toFixed(2)
    const inizio = (r() * 3).toFixed(2)

    return (
      `<rect x="${x}" y="-12" width="${4 + Math.floor(r() * 4)}" height="${7 + Math.floor(r() * 5)}" fill="${colori[i % colori.length]}">` +
      `<animate attributeName="y" from="-12" to="410" begin="${inizio}s" dur="${dur}s" repeatCount="indefinite"/></rect>`
    )
  }).join('')
}

// Il fondo delle feste: notte stellata con una luce dorata al centro.
const fondoFesta = (titolo: string, sotto: string) =>
  `<rect width="640" height="400" fill="#2c2a48"/>` +
  `<ellipse cx="320" cy="210" rx="290" ry="190" fill="#3c3864"/>` +
  `<ellipse cx="320" cy="210" rx="190" ry="130" fill="#4a4678"/>` +
  `<g>${scritta(320, 64, titolo, 40, '#ffd84c', 'middle', NERO)}` +
  `<animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="1.2s" repeatCount="indefinite"/></g>` +
  scritta(320, 100, sotto, 18, '#ffffff', 'middle', NERO)

// Tutte le medaglie: le cinque medaglie compaiono una alla volta, sotto la tua squadra.
export function svgFestaMedaglie(s: Stato): string {
  const medaglie = MONDI.map((m, i) => {
    const x = 128 + i * 96
    const colore = COLORE_TIPO[m.palestra.tipo] ?? '#888888'

    return (
      `<g opacity="0">` +
      `<path fill="${scuro(colore, 0.2)}" d="M${x - 12} 128h10l4 26h-10zM${x + 2} 128h10l-4 26h-10z"/>` +
      `<ellipse cx="${x}" cy="176" rx="28" ry="28" fill="#c88a1c" shape-rendering="auto"/>` +
      `<ellipse cx="${x}" cy="176" rx="23" ry="23" fill="#ffd84c" shape-rendering="auto"/>` +
      `<ellipse cx="${x}" cy="176" rx="14" ry="14" fill="${colore}" shape-rendering="auto"/>` +
      `<ellipse cx="${x - 7}" cy="168" rx="4" ry="4" fill="#fff3b0" shape-rendering="auto"/>` +
      scritta(x, 224, m.palestra.medaglia.replace('Medaglia ', ''), 13, '#ffffff', 'middle', NERO) +
      `<set attributeName="opacity" to="1" begin="${(0.3 + i * 0.35).toFixed(2)}s" fill="freeze"/></g>`
    )
  }).join('')
  const squadra = s.squadra
    .slice(0, 3)
    .map((m, i) => {
      const x = 320 + (i - (Math.min(3, s.squadra.length) - 1) / 2) * 140

      return `<ellipse cx="${x}" cy="378" rx="50" ry="10" fill="#6c6898"/>` + mostroIn(m, x, 378, 3)
    })
    .join('')
  const corpo = fondoFesta('CAMPIONE DI MOSTRINI!', `Hai vinto tutte e ${MONDI.length} le medaglie delle palestre`) + medaglie + squadra + coriandoli()

  return svg(640, 400, corpo)
}

// Il catalogo completo: i leggendari dei cinque mondi nella forma finale, che saltellano a turno.
export function svgFestaCatalogo(s: Stato): string {
  const rari = MONDI.map((_, i) => {
    const x = 96 + i * 112

    return (
      `<ellipse cx="${x}" cy="306" rx="46" ry="9" fill="#6c6898"/>` +
      `<g>${mostroIn({ sp: raroDel(i, 'leggendario'), evo: FORME - 1 }, x, 304, 2)}` +
      `<animateTransform attributeName="transform" type="translate" values="0 0;0 -14;0 0" begin="${(i * 0.2).toFixed(1)}s" dur="1s" repeatCount="indefinite"/></g>`
    )
  }).join('')
  const tot = Object.keys(SPECIE).length * FORME
  const corpo =
    fondoFesta('CATALOGO COMPLETO!', `Hai catturato tutte le ${tot} forme dei Mostrini`) +
    rari +
    `<rect x="210" y="330" width="220" height="44" rx="8" fill="${NERO}" shape-rendering="auto"/>` +
    `<rect x="214" y="334" width="212" height="36" rx="6" fill="#fffbe8" shape-rendering="auto"/>` +
    sfera8(226, 340, 3) +
    scritta(340, 360, `${s.catalogo.length}/${tot}`, 24, NERO, 'middle') +
    coriandoli()

  return svg(640, 400, corpo)
}

// ---------- Menu, scelta iniziale e catalogo ----------

// Il paesaggio del menu e della scelta iniziale: cielo a fasce col sole e qualche uccellino, montagne
// innevate in lontananza, colline con gli alberi, un laghetto con la ninfea, il prato pieno di fiori
// e farfalle, e le tre pedane dei Mostrini.
function prato(alto: number): string {
  const t = tela(320, alto)
  const sc = SCENE[0]!
  const r = seme(7)
  const orizzonte = Math.round(alto * 0.7)
  const cielo = ['#5cb4f0', '#70c0f4', '#86ccf8', '#9cd6fb', '#b4e2fd', '#cdecff', '#e2f5ff']
  const fascia = orizzonte / cielo.length
  cielo.forEach((c, i) => rett(t, 0, Math.round(i * fascia), 320, Math.round((i + 1) * fascia) - Math.round(i * fascia), c))
  // il sole con i raggi
  for (const [dx, dy] of [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]] as const) {
    for (let k = 15; k < 20; k++) rett(t, Math.round(286 + dx * k), Math.round(22 + dy * k), 2, 2, '#ffe68c')
  }
  ellisse(t, 286, 22, 12, 12, '#ffc83c')
  ellisse(t, 285, 21, 10, 10, '#ffe68c')
  ellisse(t, 283, 19, 5, 5, '#fff6c8')
  nuvola(t, 46, 18, 1)
  nuvola(t, 150, 10, 0.6)
  nuvola(t, 222, 30, 0.7)
  // uccellini in volo
  for (const [x, y] of [[112, 26], [122, 20], [196, 14]] as const) {
    for (const [dx, dy] of [[-2, -1], [-1, 0], [0, 1], [1, 0], [2, -1]] as const) metti(t, x + dx, y + dy, '#4a5a7a')
  }
  // le montagne lontane, con la neve in cima
  for (const [a, b, cima] of [[20, 150, 42], [110, 240, 32], [200, 330, 46]] as const) {
    const mezzo = (a + b) / 2
    poligono(t, [[mezzo, cima], [a, orizzonte - 4], [b, orizzonte - 4]], (x: number) => (x < mezzo ? '#a4bce0' : '#8ea8d4'))
    poligono(t, [[mezzo, cima], [mezzo - 9, cima + 10], [mezzo - 3, cima + 7], [mezzo + 3, cima + 11], [mezzo + 9, cima + 10]], '#ffffff')
  }
  // le colline, con gli alberi sopra
  ellisse(t, 160, alto * 0.72, 90, 16, '#b4e4a0')
  ellisse(t, 60, alto * 0.66, 90, 20, '#9fd88a')
  ellisse(t, 260, alto * 0.68, 100, 22, '#8ccf78')
  for (const [x, y, s] of [[14, 74, 1], [30, 79, 0.8], [296, 76, 1], [312, 81, 0.85], [228, 80, 0.7]] as const) {
    rett(t, x - 1, y, 3, Math.round(9 * s), '#7a5230')
    ellisse(t, x, y - 3 * s, 8 * s, 9 * s, '#3f9a3c')
    ellisse(t, x - 2 * s, y - 6 * s, 4 * s, 4 * s, '#5fb85a')
  }
  // il prato, più chiaro verso l'orizzonte, con ciuffi d'erba
  rett(t, 0, orizzonte, 320, alto - orizzonte, sc.prato)
  rett(t, 0, orizzonte, 320, 6, chiaro(sc.prato, 0.12))
  rett(t, 0, orizzonte, 320, 2, chiaro(sc.prato, 0.25))
  for (let i = 0; i < 70; i++) {
    const x = Math.floor(r() * 318)
    const y = orizzonte + 4 + Math.floor(r() * (alto - orizzonte - 5))
    metti(t, x, y, '#6cbc5a')
    metti(t, x + 1, y - 1, '#6cbc5a')
    metti(t, x + 2, y, '#6cbc5a')
  }
  // il laghetto con la ninfea, in basso a sinistra
  ellisse(t, 16, alto - 10, 24, 8, '#3a8ac8')
  ellisse(t, 16, alto - 11, 22, 6, '#4ca3e0')
  rett(t, 4, alto - 13, 8, 1, '#9fdcff')
  rett(t, 20, alto - 9, 6, 1, '#9fdcff')
  ellisse(t, 28, alto - 12, 4, 2, '#3fa84a')
  metti(t, 28, alto - 13, '#ff9ad0')
  // i fiori, lontano dalle pedane
  const colori = ['#ff5a4c', '#ffffff', '#ff9ad0', '#c46cd9', '#ff9a3c', '#4cb4ff']
  for (let i = 0; i < 46; i++) {
    const x = 2 + Math.floor(r() * 316)
    const y = orizzonte + 4 + Math.floor(r() * (alto - orizzonte - 6))
    const suPedana = [75, 160, 245].some(cx => Math.abs(x - cx) < 40 && y > alto - 24)
    if (suPedana || (x < 44 && y > alto - 20)) continue
    const c = colori[i % colori.length]!
    for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]] as const) metti(t, x + dx, y + dy, c)
    metti(t, x, y, '#ffd84c')
  }
  // due farfalle
  for (const [x, y, c] of [[118, 84, '#ff9a3c'], [206, 80, '#c46cd9']] as const) {
    rett(t, x - 3, y - 2, 2, 2, c)
    rett(t, x + 2, y - 2, 2, 2, c)
    rett(t, x - 2, y, 1, 1, chiaro(c, 0.4))
    rett(t, x + 2, y, 1, 1, chiaro(c, 0.4))
    rett(t, x, y - 2, 1, 3, NERO)
  }
  for (const cx of [75, 160, 245]) pedana(t, cx, alto - 14, 34, 6, sc)

  return svgTela(t, 0, 0, 2)
}

// Il titolo a lettere colorate, un po' ondeggiante, con l'ombra sotto e qualche scintilla.
function titolo(cx: number, y: number, testo: string, dim: number): string {
  const colori = ['#ff5a4c', '#ff9a3c', '#ffd84c', '#6fd36f', '#4cb4ff', '#7a8cff', '#c46cd9', '#ff7ab8']
  const passo = dim * 0.6
  const x0 = cx - (testo.length * passo) / 2 + passo / 2
  const lettere = testo
    .split('')
    .map((c, i) => {
      const x = Math.round(x0 + i * passo)
      const yy = y + (i % 2 ? 4 : -2)

      return scritta(x + 4, yy + 5, c, dim, NERO, 'middle') + scritta(x, yy, c, dim, colori[i % colori.length]!, 'middle', NERO)
    })
    .join('')
  const scintille = [[cx - 190, y - 34], [cx + 186, y - 30], [cx - 160, y + 14], [cx + 200, y + 8]]
    .map(([x, yy]) => `<path fill="#fff3b0" d="M${x! - 5} ${yy! - 1}h11v3h-11zM${x! - 1} ${yy! - 5}h3v11h-3z"/>`)
    .join('')

  return scintille + lettere
}

// Il menu principale: il titolo con i tre Mostrini iniziali.
export function svgMenu(): string {
  const corpo =
    prato(130) +
    titolo(320, 64, 'MOSTRINI', 58) +
    scritta(320, 100, 'Acchiappali nei cinque mondi!', 16, '#ffffff', 'middle', NERO) +
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

// Il testo spezzato in righe di al più max caratteri, a parole intere.
function aCapo(testo: string, max: number): string[] {
  const righe: string[] = []
  for (const parola of testo.split(' ')) {
    const ultima = righe[righe.length - 1]
    if (ultima !== undefined && ultima.length + 1 + parola.length <= max) righe[righe.length - 1] = `${ultima} ${parola}`
    else righe.push(parola)
  }

  return righe
}

// Il punto di domanda dei Mostrini mai visti.
const DOMANDA = ['.kkkk.', 'kk..kk', '....kk', '...kk.', '..kk..', '..kk..', '......', '..kk..']

// Il catalogo: per ogni mondo tre pagine da tre righe; ogni riga è una specie con le sue tre forme
// (base, evoluta, finale), e ogni scheda ha il Mostrino, il numero, il nome e il tipo.
// In fondo la linea evolutiva del Mostrino scelto, con la sua bio.
export function svgCatalogo(s: Stato): string {
  const cv = s.catalogoVista ?? { mondo: s.mondo, sel: 0 }
  const voci = vociCatalogo(s, cv.mondo)
  const presi = voci.filter(v => v.preso).length
  const pagina = paginaCatalogo(cv.sel)
  const pagine = Math.ceil(voci.length / PER_PAGINA_CATALOGO)
  const domanda = tela(6, 8)
  lettere(domanda, DOMANDA, { k: '#8a86a0' }, 0, 0)
  let corpo =
    `<rect width="640" height="614" fill="#2c2a48"/>` +
    `<rect width="640" height="52" fill="#423e6c"/>` +
    scritta(20, 34, `Catalogo · ${MONDI[cv.mondo]!.nome}`, 22, '#ffffff') +
    scritta(330, 33, `pag. ${pagina + 1}/${pagine}`, 15, '#c8c4e0') +
    scritta(476, 34, `${presi}/${voci.length}`, 22, presi === voci.length ? '#ffd84c' : '#ffffff', 'end') +
    MONDI.map((_, i) =>
      `<rect x="${492 + i * 28}" y="16" width="22" height="22" rx="4" fill="${i === cv.mondo ? '#ffd84c' : '#6c6898'}" shape-rendering="auto"/>` +
      scritta(503 + i * 28, 33, String(i + 1), 15, i === cv.mondo ? NERO : '#ffffff', 'middle'),
    ).join('')
  voci.slice(pagina * PER_PAGINA_CATALOGO, (pagina + 1) * PER_PAGINA_CATALOGO).forEach((v, i) => {
    const x = 14 + (i % FORME) * 206
    const y = 62 + Math.floor(i / FORME) * 118
    const scelto = pagina * PER_PAGINA_CATALOGO + i === cv.sel
    const d = SPECIE[v.sp]!
    // catturato: crema con la sfera; visto: a colori su fondo chiaro; mai visto: solo ? e ?????
    const fondo = v.preso ? '#fbf5e4' : v.visto ? '#ebe7f3' : '#d0ccdc'
    corpo +=
      `<rect x="${x}" y="${y}" width="198" height="110" rx="8" fill="${scelto ? '#ffd84c' : '#5a5680'}" shape-rendering="auto"/>` +
      `<rect x="${x + 4}" y="${y + 4}" width="190" height="102" rx="5" fill="${fondo}" shape-rendering="auto"/>` +
      `<ellipse cx="${x + 46}" cy="${y + 92}" rx="32" ry="6" fill="${scuro(fondo, 0.15)}"/>` +
      (v.visto ? mostroIn({ sp: v.sp, evo: v.st }, x + 46, y + 94, 2) : svgTela(domanda, x + 31, y + 46, 5)) +
      scritta(x + 92, y + 28, numeroVoce(v), 15, '#6c6880') +
      scritta(x + 92, y + 52, v.visto ? nomeForma(v.sp, v.st) : SCONOSCIUTO, v.visto && nomeForma(v.sp, v.st).length > 10 ? 14 : 17, v.visto ? NERO : '#6c6880') +
      (v.visto && !v.preso ? scritta(x + 186, y + 100, 'visto', 13, '#6c6880', 'end') : '')
    // la freccia verso la forma dopo, tra una scheda e l'altra
    if (v.st < FORME - 1) corpo += `<path fill="#c8c4e0" d="M${x + 200} ${y + 49}l5 6l-5 6z"/>`
    if (v.visto) {
      corpo +=
        `<rect x="${x + 92}" y="${y + 62}" width="84" height="22" rx="5" fill="${COLORE_TIPO[d.tipo] ?? '#888'}" shape-rendering="auto"/>` +
        scritta(x + 134, y + 78, d.tipo, 14, '#ffffff', 'middle')
    }
    if (v.preso) corpo += sfera8(x + 166, y + 14, 2)
    if (v.rarita !== 'comune' && v.visto) corpo += gemme(x + 92, y + 88, v.rarita)
  })
  // In fondo la linea evolutiva del Mostrino scelto (base, evoluta, finale) con la forma scelta
  // evidenziata, e a lato la sua scheda: nome, tipo e bio.
  const scelta = voci[cv.sel]!
  corpo += `<rect x="14" y="424" width="612" height="160" rx="8" fill="#3a3660" shape-rendering="auto"/>`
  voci.filter(v => v.sp === scelta.sp).forEach(v => {
    const cx = 74 + v.st * 116
    const fondo = v.preso ? '#fbf5e4' : v.visto ? '#ebe7f3' : '#d0ccdc'
    const scelto = v.st === scelta.st
    corpo +=
      `<rect x="${cx - 52}" y="432" width="104" height="108" rx="8" fill="${scelto ? '#ffd84c' : '#5a5680'}" shape-rendering="auto"/>` +
      `<rect x="${cx - 48}" y="436" width="96" height="100" rx="5" fill="${fondo}" shape-rendering="auto"/>` +
      `<ellipse cx="${cx}" cy="522" rx="32" ry="6" fill="${scuro(fondo, 0.15)}"/>` +
      (v.visto ? mostroIn({ sp: v.sp, evo: v.st }, cx, 524, 2) : svgTela(domanda, cx - 15, 474, 5)) +
      (v.preso ? sfera8(cx + 28, 442, 2) : '') +
      scritta(cx, 560, v.visto ? nomeForma(v.sp, v.st) : SCONOSCIUTO, 15, scelto ? '#ffd84c' : '#ffffff', 'middle') +
      scritta(cx, 577, v.st === 0 ? 'base' : `Lv ${LIVELLI_EVO[v.st - 1]}`, 12, '#c8c4e0', 'middle')
    if (v.st < FORME - 1) corpo += `<path fill="#c8c4e0" d="M${cx + 56} 478L${cx + 64} 486L${cx + 56} 494Z"/>`
  })
  const d = SPECIE[scelta.sp]!
  corpo += scritta(372, 452, `${numeroVoce(scelta)} ${scelta.visto ? nomeForma(scelta.sp, scelta.st) : SCONOSCIUTO}`, 17, '#ffffff')
  if (scelta.visto) {
    const stato = [scelta.preso ? (scelta.rarita === 'comune' ? 'catturato' : 'preso') : 'visto', scelta.rarita !== 'comune' ? scelta.rarita : ''].filter(Boolean).join(' · ')
    corpo +=
      `<rect x="372" y="462" width="84" height="22" rx="5" fill="${COLORE_TIPO[d.tipo] ?? '#888'}" shape-rendering="auto"/>` +
      scritta(414, 478, d.tipo, 14, '#ffffff', 'middle') +
      scritta(466, 478, stato, 13, scelta.rarita !== 'comune' ? COLORE_RARITA[scelta.rarita] : '#c8c4e0')
  }
  const bio = scelta.visto
    ? `${BIO[scelta.sp] ?? ''} Forte contro ${fortiContro(d.tipo).join(' e ')}, debole contro ${deboliContro(d.tipo).join(' e ')}.`
    : `Non l'hai ancora incontrato. Vive ${MONDI[d.mondo]!.nel}.`
  // il carattere è monospace: a 12 px ogni lettera è larga circa 7 px, e nel pannello ce ne stanno 34
  aCapo(bio, 34).slice(0, 6).forEach((r, i) => (corpo += scritta(372, 504 + i * 15, r, 12, '#e8e4f8')))
  const visti = MONDI.flatMap((_, m) => vociCatalogo(s, m)).filter(v => v.visto && !v.preso).length
  corpo += scritta(14, 604, `Tutte le ${Object.keys(SPECIE).length * FORME} forme · prese ${s.catalogo.length} · viste ${visti}`, 14, '#c8c4e0')

  return svg(640, 614, corpo)
}

// Le misure scritte nell'SVG (512 x 320 la lotta, 512 x 256 la mappa, e così via): il pannello le
// riceve esplicite per ogni disegno, fermo o animato, così lo schermo resta grande uguale.
const MISURE = /^<svg ([^>]*?)width="(\d+)" height="(\d+)"/

export function misureDi(source: string): { largo: number; alto: number } | null {
  const m = MISURE.exec(source)

  return m ? { largo: Number(m[2]), alto: Number(m[3]) } : null
}

// Il disegno animato senza misure proprie: riempie il riquadro interattivo che lo contiene,
// scalato senza deformarsi, qualunque misura il pannello gli dia.
export function riempie(source: string): string {
  return source.replace(MISURE, '<svg $1width="100%" height="100%"')
}

// animato: il disegno contiene un'animazione, e il pannello deve mostrarlo in modo interattivo perché parta.
export function svgPer(s0: Stato): { source: string; alt: string; animato?: boolean } {
  // Uno stato di una versione precedente può non avere mondo e box.
  const s: Stato = { ...s0, mondo: MONDI[s0.mondo] ? s0.mondo : 0, box: s0.box ?? [], catalogo: s0.catalogo ?? [] }
  const evo = s.evoluzioni?.[0]
  if (evo) {
    return { source: svgEvoluzione(evo), alt: `${nomeForma(evo.sp, evo.da)} si evolve in ${nomeForma(evo.sp, evo.a)}`, animato: true }
  }
  const festa = s.feste?.[0]
  if (festa === 'medaglie') return { source: svgFestaMedaglie(s), alt: 'Campione di Mostrini: tutte le medaglie', animato: true }
  if (festa === 'catalogo') return { source: svgFestaCatalogo(s), alt: 'Catalogo completo', animato: true }
  if (s.modo === 'menu') return { source: svgMenu(), alt: 'Mostrini: menu principale' }
  if (s.modo === 'inizio') return { source: svgInizio(), alt: 'Scegli il tuo primo Mostrino' }
  if (s.modo === 'lotta' && s.nemico && s.squadra[0]) {
    return { source: svgLotta(s), alt: `Lotta contro ${nome(s.nemico)}`, ...(s.colpi?.length ? { animato: true } : {}) }
  }
  if (s.catalogoVista) return { source: svgCatalogo(s), alt: `Catalogo dei Mostrini: ${MONDI[s.catalogoVista.mondo]?.nome ?? ''}` }
  if (s.inPalestra) return { source: svgPalestra(s), alt: `Palestra ${MONDI[s.mondo]!.del}` }

  return { source: svgMappa(s), alt: 'Mappa del mondo dei Mostrini' }
}

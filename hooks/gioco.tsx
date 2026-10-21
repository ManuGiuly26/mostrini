import type { ClientModule, ClientKeyEvent } from 'claude-code'
import type { Tipo, Mostrino, Stato } from '../types'

export type { Tipo, Mostrino, Modo, Stato } from '../types'

// ---------- Dati di gioco ----------

// mondo: 0 la Prateria, 1 le Vette Gelate, 2 il Deserto Rovente, 3 la Palude Nebbiosa, 4 le Rovine Spettrali.
// Ogni mondo si apre col catalogo del mondo prima completo. evo: il nome della forma evoluta.
export type Specie = { nome: string; evo: string; tipo: Tipo; hp: number; atk: number; mondo: number; arte: [string, string] }

export const SPECIE: Record<string, Specie> = {
  braciotto: { nome: 'Braciotto', evo: 'Bracione', tipo: 'fuoco', hp: 19, atk: 7, mondo: 0, arte: [' ,^^, ', '(o.o)~'] },
  fumarello: { nome: 'Fumarello', evo: 'Fumarone', tipo: 'fuoco', hp: 22, atk: 6, mondo: 0, arte: ['  )) ', '(-_-)'] },
  goccetto: { nome: 'Goccetto', evo: 'Goccione', tipo: 'acqua', hp: 21, atk: 6, mondo: 0, arte: ['  ^  ', '(o_o)'] },
  ondina: { nome: 'Ondina', evo: 'Maroso', tipo: 'acqua', hp: 18, atk: 7, mondo: 0, arte: [' ~~~ ', '<°_°>'] },
  germoglio: { nome: 'Germoglio', evo: 'Fogliardo', tipo: 'erba', hp: 22, atk: 6, mondo: 0, arte: [' \\|/ ', '(^.^)'] },
  muschietto: { nome: 'Muschietto', evo: 'Muschione', tipo: 'erba', hp: 25, atk: 5, mondo: 0, arte: [' .:. ', '{u_u}'] },
  zampetto: { nome: 'Zampetto', evo: 'Zampardo', tipo: 'normale', hp: 20, atk: 6, mondo: 0, arte: [' /\\_/\\', '( •ᴗ•)'] },
  piumino: { nome: 'Piumino', evo: 'Piumastro', tipo: 'normale', hp: 17, atk: 7, mondo: 0, arte: ['  __ ', '<(v)>'] },
  scintillo: { nome: 'Scintillo', evo: 'Saettone', tipo: 'elettro', hp: 18, atk: 8, mondo: 0, arte: [' /\\/ ', '[*_*]'] },
  gelino: { nome: 'Gelino', evo: 'Gelone', tipo: 'ghiaccio', hp: 20, atk: 7, mondo: 1, arte: [' * * ', '(o~o)'] },
  nevischio: { nome: 'Nevischio', evo: 'Bufera', tipo: 'ghiaccio', hp: 23, atk: 6, mondo: 1, arte: [' .*. ', '(-.-)'] },
  sassolo: { nome: 'Sassolo', evo: 'Sassone', tipo: 'roccia', hp: 26, atk: 6, mondo: 1, arte: ['  __ ', '[o_o]'] },
  macigno: { nome: 'Macigno', evo: 'Montagnone', tipo: 'roccia', hp: 30, atk: 5, mondo: 1, arte: [' /--\\', '[=_=]'] },
  lavotto: { nome: 'Lavotto', evo: 'Magmotto', tipo: 'fuoco', hp: 21, atk: 8, mondo: 1, arte: [' ^^^ ', '(>_<)'] },
  brinella: { nome: 'Brinella', evo: 'Galaverna', tipo: 'acqua', hp: 22, atk: 7, mondo: 1, arte: [' ~*~ ', '(o.o)'] },
  licheno: { nome: 'Licheno', evo: 'Tundrone', tipo: 'erba', hp: 24, atk: 6, mondo: 1, arte: [' ,., ', '{o_o}'] },
  yetino: { nome: 'Yetino', evo: 'Yetone', tipo: 'normale', hp: 27, atk: 6, mondo: 1, arte: [' MMM ', '(o_O)'] },
  tuonello: { nome: 'Tuonello', evo: 'Tuonardo', tipo: 'elettro', hp: 22, atk: 9, mondo: 1, arte: [' >>> ', '[@_@]'] },
  sabbiotto: { nome: 'Sabbiotto', evo: 'Sabbione', tipo: 'terra', hp: 24, atk: 8, mondo: 2, arte: ['  ∴  ', '(°.°)'] },
  dunetto: { nome: 'Dunetto', evo: 'Dunastro', tipo: 'terra', hp: 27, atk: 7, mondo: 2, arte: [' ~-~ ', '(-.-)'] },
  cactello: { nome: 'Cactello', evo: 'Cactone', tipo: 'erba', hp: 25, atk: 8, mondo: 2, arte: [' _|_ ', '|(^_^)|'] },
  pungiglio: { nome: 'Pungiglio', evo: 'Scorpione', tipo: 'veleno', hp: 22, atk: 9, mondo: 2, arte: ['  __/', '(>.<)'] },
  solletto: { nome: 'Solletto', evo: 'Solleone', tipo: 'fuoco', hp: 23, atk: 9, mondo: 2, arte: [' \\ | / ', '-(^o^)-'] },
  cammellino: { nome: 'Cammellino', evo: 'Dromedone', tipo: 'normale', hp: 30, atk: 7, mondo: 2, arte: [' n n ', '(u.u)'] },
  oasina: { nome: 'Oasina', evo: 'Oasirena', tipo: 'acqua', hp: 24, atk: 8, mondo: 2, arte: [' \\Y/ ', '(o~o)'] },
  pietrolo: { nome: 'Pietrolo', evo: 'Pietrone', tipo: 'roccia', hp: 29, atk: 7, mondo: 2, arte: ['  /\\ ', '[o.o]'] },
  mummietto: { nome: 'Mummietto', evo: 'Faraone', tipo: 'spettro', hp: 24, atk: 10, mondo: 2, arte: [' #=# ', '(*_*)'] },
  melmino: { nome: 'Melmino', evo: 'Melmone', tipo: 'veleno', hp: 28, atk: 8, mondo: 3, arte: ['  o  ', '(~_~)'] },
  fanghetto: { nome: 'Fanghetto', evo: 'Fangone', tipo: 'terra', hp: 30, atk: 8, mondo: 3, arte: [' ~.~ ', '(ò_ó)'] },
  rospetto: { nome: 'Rospetto', evo: 'Rospone', tipo: 'acqua', hp: 27, atk: 9, mondo: 3, arte: [' @ @ ', '(___)'] },
  tossilla: { nome: 'Tossilla', evo: 'Tossicona', tipo: 'veleno', hp: 25, atk: 10, mondo: 3, arte: [' .-o-. ', ' (^_^) '] },
  ninfeo: { nome: 'Ninfeo', evo: 'Lotone', tipo: 'erba', hp: 29, atk: 8, mondo: 3, arte: ['  *  ', '~(^‿^)~'] },
  zanzarello: { nome: 'Zanzarello', evo: 'Zanzarone', tipo: 'normale', hp: 24, atk: 10, mondo: 3, arte: [' \\ / ', '-(o>o)-'] },
  lucciolo: { nome: 'Lucciolo', evo: 'Luccicone', tipo: 'elettro', hp: 25, atk: 10, mondo: 3, arte: [' * * ', '(°o°)'] },
  nebbietta: { nome: 'Nebbietta', evo: 'Foschiona', tipo: 'spettro', hp: 26, atk: 9, mondo: 3, arte: [' ~ ~ ', '(-o-)'] },
  draghetto: { nome: 'Draghetto', evo: 'Paludrago', tipo: 'veleno', hp: 30, atk: 11, mondo: 3, arte: [' /\\/\\ ', '<(ò.ó)>'] },
  fantasmino: { nome: 'Fantasmino', evo: 'Fantasmone', tipo: 'spettro', hp: 28, atk: 10, mondo: 4, arte: [' .-. ', '(o o)'] },
  lumicino: { nome: 'Lumicino', evo: 'Fuocofatuo', tipo: 'fuoco', hp: 27, atk: 11, mondo: 4, arte: ['  )  ', '(°w°)'] },
  ossicino: { nome: 'Ossicino', evo: 'Scheletrone', tipo: 'terra', hp: 31, atk: 9, mondo: 4, arte: [' o=o ', '(x.x)'] },
  pipistrillo: { nome: 'Pipistrillo', evo: 'Vampirone', tipo: 'veleno', hp: 27, atk: 11, mondo: 4, arte: ['/\\ /\\', '(o^o)'] },
  gargolino: { nome: 'Gargolino', evo: 'Gargolone', tipo: 'roccia', hp: 34, atk: 9, mondo: 4, arte: [' ^ ^ ', '[ò_ó]'] },
  ombretta: { nome: 'Ombretta', evo: 'Tenebra', tipo: 'spettro', hp: 26, atk: 12, mondo: 4, arte: [' ▒▒▒ ', '(•_•)'] },
  corvetto: { nome: 'Corvetto', evo: 'Corvaccio', tipo: 'normale', hp: 28, atk: 11, mondo: 4, arte: ['  ,  ', '(o>o)'] },
  brividino: { nome: 'Brividino', evo: 'Brividone', tipo: 'ghiaccio', hp: 29, atk: 10, mondo: 4, arte: [' *^* ', '(>.<)'] },
  eclissino: { nome: 'Eclissino', evo: 'Eclissone', tipo: 'spettro', hp: 32, atk: 12, mondo: 4, arte: [' C . ', '(*.*)'] },
}

export const INIZIALI = ['braciotto', 'goccetto', 'germoglio']

const MOSSA: Record<Tipo, string> = {
  fuoco: 'Fiammata',
  acqua: 'Spruzzo',
  erba: 'Frustata',
  elettro: 'Scossa',
  normale: 'Rotolone',
  ghiaccio: 'Gelo',
  roccia: 'Frana',
  terra: 'Polverone',
  veleno: 'Tossina',
  spettro: 'Spavento',
}

const COLORE_TIPO: Record<Tipo, string> = {
  fuoco: '#ff8a4c',
  acqua: '#4cb4ff',
  erba: '#6fd36f',
  elettro: '#ffd84c',
  normale: '#d6c7b0',
  ghiaccio: '#9fe6ff',
  roccia: '#b89a72',
  terra: '#d9a85c',
  veleno: '#c46cd9',
  spettro: '#9c8cf0',
}

export function efficacia(att: Tipo, dif: Tipo): number {
  const forte: Record<string, Tipo[]> = {
    fuoco: ['erba', 'ghiaccio'],
    acqua: ['fuoco', 'roccia', 'terra'],
    erba: ['acqua', 'roccia', 'terra'],
    elettro: ['acqua'],
    ghiaccio: ['erba', 'terra'],
    roccia: ['fuoco', 'ghiaccio', 'elettro'],
    terra: ['fuoco', 'elettro', 'roccia', 'veleno'],
    veleno: ['erba'],
    spettro: ['spettro', 'veleno'],
  }
  const debole: Record<string, Tipo[]> = {
    fuoco: ['acqua', 'fuoco', 'roccia'],
    acqua: ['erba', 'acqua'],
    erba: ['fuoco', 'erba', 'veleno'],
    elettro: ['erba', 'elettro', 'roccia', 'terra'],
    ghiaccio: ['fuoco', 'ghiaccio', 'roccia'],
    roccia: ['roccia'],
    normale: ['spettro'],
    terra: ['erba', 'terra'],
    veleno: ['veleno', 'terra', 'roccia', 'spettro'],
    spettro: ['normale', 'roccia'],
  }
  if (forte[att]?.includes(dif)) return 1.5
  if (debole[att]?.includes(dif)) return 0.6

  return 1
}

// Ogni casella occupa due caratteri a schermo.
// # albero  , erba alta  ~ acqua  . sentiero  C centro cure  P portale verso il mondo dopo  R portale verso il mondo prima
// lvlMin e lvlMax: la fascia di livelli dei Mostrini di quel mondo.
// forti e deboli: il bioma potenzia del 5% le mosse dei tipi forti e indebolisce del 5% quelle dei tipi deboli.
export type Mondo = {
  nome: string
  nel: string
  del: string
  mappa: string[]
  raro: string
  lvlMin: number
  lvlMax: number
  forti: Tipo[]
  deboli: Tipo[]
}

export const MONDI: Mondo[] = [
  {
    nome: 'Prateria',
    nel: 'nella Prateria',
    del: 'della Prateria',
    raro: 'scintillo',
    lvlMin: 2,
    lvlMax: 7,
    forti: ['erba', 'normale'],
    deboli: ['ghiaccio', 'spettro'],
    mappa: [
      '####################',
      '#....,,,,,,....~~~~#',
      '#.C..,,,,,,.....~~~#',
      '#....,,,,,,,,.....,#',
      '#..........,,,,..,,#',
      '#,,,,..##.....,,,,,#',
      '#,,,,..##..~~..,,,,#',
      '#,,,,,.....~~..,,,,#',
      '#,,,,,,,,......,,,P#',
      '####################',
    ],
  },
  {
    nome: 'Vette Gelate',
    nel: 'sulle Vette Gelate',
    del: 'delle Vette Gelate',
    raro: 'tuonello',
    lvlMin: 8,
    lvlMax: 14,
    forti: ['ghiaccio', 'roccia'],
    deboli: ['fuoco', 'erba'],
    mappa: [
      '####################',
      '#...,,,,,..##,,,,,P#',
      '#.C.,,,,,..##,,,,,,#',
      '#...,,,,,......,,,,#',
      '#.....~~~~...,,,,,,#',
      '#,,,..~~~~..,,,..,,#',
      '#,,,,......,,,,..,,#',
      '#,,,,,,..##..,,,,,,#',
      '#R,,,,,..##.....,,,#',
      '####################',
    ],
  },
  {
    nome: 'Deserto Rovente',
    nel: 'nel Deserto Rovente',
    del: 'del Deserto Rovente',
    raro: 'mummietto',
    lvlMin: 15,
    lvlMax: 21,
    forti: ['fuoco', 'terra'],
    deboli: ['acqua', 'ghiaccio'],
    mappa: [
      '####################',
      '#R..,,,,,....,,,,,.#',
      '#.C.,,,,,..#.,,,,,.#',
      '#...,,,,,....,,,,,.#',
      '#.......~~.........#',
      '#,,,,...~~..,,,,,,,#',
      '#,,,,,......,,,,#,,#',
      '#,,#,,,,..,,,,,,,,,#',
      '#,,,,,,,..,,,,,,,,P#',
      '####################',
    ],
  },
  {
    nome: 'Palude Nebbiosa',
    nel: 'nella Palude Nebbiosa',
    del: 'della Palude Nebbiosa',
    raro: 'draghetto',
    lvlMin: 22,
    lvlMax: 28,
    forti: ['veleno', 'acqua'],
    deboli: ['fuoco', 'roccia'],
    mappa: [
      '####################',
      '#...,,,~~~,,,,..,,R#',
      '#.C.,,,~~~,,,,..,,.#',
      '#...,,,,,,,,~~.....#',
      '#~~..,,,,,..~~,,,,,#',
      '#~~..,,#,,......,,,#',
      '#,,,,,,#,,,~~~,,,,,#',
      '#,,,,......~~~,,,,,#',
      '#P,,,,,,,......,,,,#',
      '####################',
    ],
  },
  {
    nome: 'Rovine Spettrali',
    nel: 'tra le Rovine Spettrali',
    del: 'delle Rovine Spettrali',
    raro: 'eclissino',
    lvlMin: 29,
    lvlMax: 36,
    forti: ['spettro', 'roccia'],
    deboli: ['normale', 'erba'],
    mappa: [
      '####################',
      '#...,,,,#,,,,,,,,,R#',
      '#.C.,,,,#,,,,#,,,,.#',
      '#...,,,,...,,#,,,,.#',
      '#.....##.....#.....#',
      '#,,,,,##,,,,...,,,,#',
      '#,,,,,,,,,~~~,,#,,,#',
      '#,,#,,,,,,~~~,,#,,,#',
      '#,,#,,,,,,,,,,,,,,,#',
      '####################',
    ],
  },
]
export const MAPPA = MONDI[0]!.mappa
export const CENTRO = { x: 2, y: 2 }
export const SFERE_MAX = 10
export const CURE_MAX = 5
const CURA_PS = 20
export const CURA_PREZZO = 15
// La super cura e la mega sfera si vendono solo dal secondo mondo in poi.
const SUPER_PS = 50
export const SUPER_PREZZO = 40
export const SFERA_PREZZO = 10
export const MEGA_PREZZO = 25
export const SQUADRA_MAX = 3
export const PARTITE = 3

// Dal livello 15 un Mostrino si evolve: nome nuovo, PS e attacco più alti del 20%.
export const LVL_EVO = 15
const EVO_BONUS = 1.2

export const maxHp = (m: Mostrino) => Math.round((SPECIE[m.sp].hp + m.lvl * 3) * (m.evo ? EVO_BONUS : 1))
const atk = (m: Mostrino) => Math.round((SPECIE[m.sp].atk + m.lvl * 2) * (m.evo ? EVO_BONUS : 1))
export const nome = (m: Mostrino) => (m.evo ? SPECIE[m.sp].evo : SPECIE[m.sp].nome)

export const specieDel = (mondo: number) => Object.keys(SPECIE).filter(k => SPECIE[k].mondo === mondo)

// Il catalogo di un mondo conta le specie di quel mondo e dei mondi prima: 9 nella Prateria, 18 nelle Vette e così via.
export function catalogoDel(s: Stato): { presi: number; tot: number } {
  const specie = Object.keys(SPECIE).filter(k => SPECIE[k].mondo <= s.mondo)

  return { presi: specie.filter(k => s.catalogo.includes(k)).length, tot: specie.length }
}

// Il portale P di un mondo si apre quando il suo catalogo è completo; l'ultimo mondo non ne ha.
export function portaleAperto(s: Stato, mondo = s.mondo): boolean {
  return mondo + 1 < MONDI.length && specieDel(mondo).every(sp => s.catalogo.includes(sp))
}

// +5% o -5% a seconda del tipo della mossa e del bioma del mondo.
export function bioma(mondo: number, tipo: Tipo): number {
  const m = MONDI[mondo]
  if (m?.forti.includes(tipo)) return 1.05
  if (m?.deboli.includes(tipo)) return 0.95

  return 1
}

export const affinita = (mondo: number) =>
  `${MONDI[mondo]!.forti.join(' e ')} +5%, ${MONDI[mondo]!.deboli.join(' e ')} -5%`

function nuovo(sp: string, lvl: number, evo = false): Mostrino {
  const m: Mostrino = evo ? { sp, lvl, xp: 0, hp: 0, evo } : { sp, lvl, xp: 0, hp: 0 }
  m.hp = maxHp(m)

  return m
}

// I Mostrini di un mondo hanno i livelli della sua fascia; gli allenatori stanno nella metà alta.
export function livelloNel(mondo: number, rnd: () => number, allenatore = false): number {
  const { lvlMin, lvlMax } = MONDI[mondo]!
  const da = allenatore ? Math.ceil((lvlMin + lvlMax) / 2) : lvlMin

  return da + Math.floor(rnd() * (lvlMax - da + 1))
}

export function statoIniziale(): Stato {
  return {
    modo: 'inizio',
    mondo: 0,
    x: CENTRO.x + 1,
    y: CENTRO.y,
    squadra: [],
    box: [],
    catalogo: [],
    sfere: 5,
    megaSfere: 0,
    cure: 2,
    cureForti: 0,
    monete: 0,
    log: ['Scegli il tuo primo Mostrino: premi 1, 2 o 3.'],
    nemico: null,
    scelta: 0,
  }
}

// Il menu principale: da qui si sceglie quale partita giocare.
export function statoMenu(): Stato {
  return { ...statoIniziale(), modo: 'menu', log: ['Scegli una partita con il suo numero.'] }
}

// Le partite salvate prima delle ultime novità: squadra oltre 3 nel box, campi nuovi ai valori iniziali.
export function normalizza(salvato: Partial<Stato>): Stato {
  const s: Stato = { ...statoIniziale(), ...salvato }
  const box = s.box ?? []
  const squadra = s.squadra.slice(0, SQUADRA_MAX)

  return {
    ...s,
    modo: s.modo === 'lotta' || s.modo === 'menu' ? 'mappa' : s.modo,
    nemico: null,
    lancio: false,
    scambio: null,
    cambio: false,
    negozio: false,
    allenatore: null,
    cancella: false,
    daCancellare: null,
    megaSfere: s.megaSfere ?? 0,
    squadra,
    box: [...box, ...s.squadra.slice(SQUADRA_MAX)],
    mondo: MONDI[s.mondo ?? 0] ? (s.mondo ?? 0) : 0,
  }
}

function conLog(s: Stato, ...righe: string[]): Stato {
  return { ...s, log: [...s.log, ...righe].slice(-3) }
}

// Il Centro cure rimette in forma la squadra; le sfere invece si comprano al negozio.
function curaTutti(s: Stato): Stato {
  return { ...s, squadra: s.squadra.map(m => ({ ...m, hp: maxHp(m) })) }
}

// Registra una specie nel catalogo e annuncia il portale quando il catalogo di un mondo è completo.
function registra(s: Stato, sp: string): { s: Stato; righe: string[] } {
  if (s.catalogo.includes(sp)) return { s, righe: [] }
  const n = { ...s, catalogo: [...s.catalogo, sp] }
  const righe = [`Nuovo nel catalogo: ${SPECIE[sp].nome}!`]
  MONDI.forEach((m, i) => {
    if (!portaleAperto(s, i) && portaleAperto(n, i)) {
      righe.push(`Catalogo ${m.del} completo: si è aperto un portale (P) verso ${MONDI[i + 1]!.nome}!`)
    }
  })
  if (n.catalogo.length === Object.keys(SPECIE).length) righe.push('Hai trovato tutti i Mostrini. Sei un campione!')

  return { s: n, righe }
}

// ---------- Logica ----------

export function scegliIniziale(s: Stato, i: number): Stato {
  const sp = INIZIALI[i]
  if (!sp) return s

  return {
    ...s,
    modo: 'mappa',
    squadra: [nuovo(sp, 5)],
    catalogo: [sp],
    log: [`Hai scelto ${SPECIE[sp].nome}! Cammina nell'erba alta per trovare Mostrini.`],
  }
}

function incontro(s: Stato, rnd: () => number): Stato {
  const mondo = MONDI[s.mondo]!
  const pool = specieDel(s.mondo).filter(k => k !== mondo.raro)
  const sp = rnd() < 0.08 ? mondo.raro : pool[Math.floor(rnd() * pool.length)]
  const lvl = livelloNel(s.mondo, rnd)
  // Dal livello 15 circa un selvatico su tre è già nella forma evoluta.
  const nemico = nuovo(sp, lvl, lvl >= LVL_EVO && rnd() < 0.35)

  return conLog(
    { ...s, modo: 'lotta', nemico, scelta: 0, lancio: false, cambio: false, allenatore: null },
    `Un ${nome(nemico)} selvatico (Lv ${lvl}) ti sbarra la strada!`,
  )
}

// Gli allenatori che si incontrano per strada e sfidano con la loro squadra.
const ALLENATORI = [
  'Allenatrice Lia', 'Allenatore Teo', 'Esploratrice Gea', 'Ranger Bruno', 'Campionessa Vera', 'Montanaro Ugo',
  'Nomade Sami', 'Erborista Nora', 'Custode Elio',
]

export function sfida(s: Stato, rnd: () => number = Math.random): Stato {
  const mondo = MONDI[s.mondo]!
  const pool = specieDel(s.mondo).filter(k => k !== mondo.raro)
  const quanti = s.mondo === 0 ? 2 : 3
  // Gli allenatori fanno evolvere i loro Mostrini appena possono.
  const squadra = Array.from({ length: quanti }, () => {
    const sp = pool[Math.floor(rnd() * pool.length)]!
    const lvl = livelloNel(s.mondo, rnd, true)

    return nuovo(sp, lvl, lvl >= LVL_EVO)
  })
  const nomeAll = ALLENATORI[Math.floor(rnd() * ALLENATORI.length)]!
  const [primo, ...resto] = squadra

  return conLog(
    { ...s, modo: 'lotta', nemico: primo!, scelta: 0, lancio: false, cambio: false, allenatore: { nome: nomeAll, squadra: resto } },
    `${nomeAll} ti sfida con ${quanti} Mostrini! Manda in campo ${nome(primo!)} (Lv ${primo!.lvl}).`,
  )
}

export function casellaDi(s: Stato, x: number, y: number): string | undefined {
  const t = MONDI[s.mondo]!.mappa[y]?.[x]
  // Il portale chiuso è un muro.
  if (t === 'P' && !portaleAperto(s)) return '#'

  return t
}

export function muovi(s: Stato, dx: number, dy: number, rnd: () => number = Math.random): Stato {
  const nx = s.x + dx
  const ny = s.y + dy
  const t = casellaDi(s, nx, ny)
  if (t === undefined || t === '#' || t === '~') return s
  const n: Stato = { ...s, x: nx, y: ny }
  if (t === 'C') return conLog(curaTutti(n), 'Centro cure: squadra in forma. Premi M per il negozio.')
  if (t === 'P' || t === 'R') {
    const mondo = s.mondo + (t === 'P' ? 1 : -1)
    if (!MONDI[mondo]) return s

    return conLog(
      { ...n, mondo, x: CENTRO.x + 1, y: CENTRO.y },
      `Attraversi il portale: benvenuto ${MONDI[mondo]!.nel}!`,
      `Il bioma qui: ${affinita(mondo)}.`,
    )
  }
  // Nell'erba alta spuntano Mostrini selvatici, e a volte un allenatore; sul sentiero solo gli allenatori.
  if (t === ',' && rnd() < 0.14) return rnd() > 0.85 ? sfida(n, rnd) : incontro(n, rnd)
  if (t === '.' && rnd() < 0.02) return sfida(n, rnd)

  return n
}

function danno(a: Mostrino, d: Mostrino, potenza: number, tipo: Tipo, mondo: number, rnd: () => number) {
  const eff = efficacia(tipo, SPECIE[d.sp].tipo)
  const val = Math.max(1, Math.round(((atk(a) * potenza) / 10) * eff * bioma(mondo, tipo) * (0.85 + rnd() * 0.3)))

  return { val, eff }
}

function nota(eff: number) {
  if (eff > 1) return ' È superefficace!'
  if (eff < 1) return ' Non è molto efficace.'

  return ''
}

function turnoNemico(s: Stato, rnd: () => number): Stato {
  const nem = s.nemico!
  const io = s.squadra[0]
  const tipoMossa: Tipo = rnd() < 0.5 ? SPECIE[nem.sp].tipo : 'normale'
  const nomeMossa = tipoMossa === 'normale' ? 'Botta' : MOSSA[tipoMossa]
  const { val, eff } = danno(nem, io, tipoMossa === 'normale' ? 5 : 7, tipoMossa, s.mondo, rnd)
  const hp = Math.max(0, io.hp - val)
  const squadra = [{ ...io, hp }, ...s.squadra.slice(1)]
  let n = conLog({ ...s, squadra }, `${nome(nem)} usa ${nomeMossa}: -${val} PS.${nota(eff)}`)
  if (hp > 0) return n
  const vivo = n.squadra.findIndex(m => m.hp > 0)
  if (vivo === -1) {
    n = curaTutti({ ...n, modo: 'mappa', nemico: null, lancio: false, allenatore: null, x: CENTRO.x + 1, y: CENTRO.y })

    return conLog(n, `${nome(io)} è esausto. Corri al Centro cure!`)
  }
  const ordinata = [n.squadra[vivo], ...n.squadra.filter((_, i) => i !== vivo)]

  return conLog({ ...n, squadra: ordinata }, `${nome(io)} è esausto. Vai, ${nome(ordinata[0])}!`)
}

// evoluzioni: dove annunciare le evoluzioni, che vanno in fondo al registro per non perderle.
function cresce(m: Mostrino, xp: number, righe: string[], evoluzioni: string[]): Mostrino {
  let io = { ...m, xp: m.xp + xp }
  while (io.xp >= io.lvl * 8) {
    io = { ...io, xp: io.xp - io.lvl * 8, lvl: io.lvl + 1 }
    io.hp = Math.min(maxHp(io), io.hp + 4)
    righe.push(`${nome(io)} sale al livello ${io.lvl}!`)
  }

  return evolve(io, evoluzioni)
}

// Un Mostrino che arriva al livello 15 si evolve; i PS in più arrivano già pieni.
export function evolve(m: Mostrino, righe: string[]): Mostrino {
  if (m.evo || m.lvl < LVL_EVO) return m
  const evoluto: Mostrino = { ...m, evo: true }
  righe.push(`Cosa succede? ${nome(m)} si evolve in ${nome(evoluto)}!`)

  return { ...evoluto, hp: m.hp + maxHp(evoluto) - maxHp(m) }
}

// Chi combatte prende tutta l'esperienza, il resto della squadra in forma la metà.
// Contro un allenatore la lotta continua finché ha Mostrini, poi arriva il premio.
function vittoria(s: Stato, rnd: () => number): Stato {
  const nem = s.nemico!
  const xp = nem.lvl * 4
  const vinte = nem.lvl * 2
  const righe = [`${nome(nem)} è sconfitto! +${xp} esperienza, +${vinte} monete.`]
  const evoluzioni: string[] = []
  const squadra = s.squadra.map((m, i) =>
    i === 0 ? cresce(m, xp, righe, evoluzioni) : m.hp > 0 ? cresce(m, Math.ceil(xp / 2), righe, evoluzioni) : m,
  )
  const monete = s.monete + vinte
  const all = s.allenatore
  if (all && all.squadra.length > 0) {
    const [prossimo, ...resto] = all.squadra
    const r = registra({ ...s, nemico: prossimo!, lancio: false, squadra, monete, allenatore: { ...all, squadra: resto } }, nem.sp)

    return conLog(r.s, ...righe, ...r.righe, ...evoluzioni, `${all.nome} manda in campo ${nome(prossimo!)} (Lv ${prossimo!.lvl}).`)
  }
  if (all) {
    const premio = nem.lvl * 10
    righe.push(`Hai battuto ${all.nome}! Premio: +${premio} monete.`)
    const r = registra({ ...s, modo: 'mappa', nemico: null, lancio: false, squadra, monete: monete + premio, allenatore: null }, nem.sp)

    return conLog(r.s, ...righe, ...r.righe, ...evoluzioni)
  }
  // A volte il Mostrino selvatico sconfitto lascia una cura.
  const trovata = s.cure < CURE_MAX && rnd() < 0.25
  if (trovata) righe.push('Hai trovato una cura!')
  const cure = trovata ? s.cure + 1 : s.cure
  const r = registra({ ...s, modo: 'mappa', nemico: null, lancio: false, squadra, cure, monete }, nem.sp)

  return conLog(r.s, ...righe, ...r.righe, ...evoluzioni)
}

// 5 in lotta: scegli con il numero chi della squadra prende il posto di chi combatte. Costa il turno.
export function cambiaInLotta(s: Stato, i: number, rnd: () => number = Math.random): Stato {
  if (s.modo !== 'lotta' || !s.nemico) return s
  const nuovo = s.squadra[i]
  if (i === 0 || !nuovo) return conLog(s, `${nome(s.squadra[0]!)} sta già combattendo.`)
  if (nuovo.hp === 0) return conLog(s, `${nome(nuovo)} è esausto e non può combattere.`)
  const vecchio = s.squadra[0]!
  const squadra = [nuovo, ...s.squadra.filter((_, j) => j !== i)]

  return turnoNemico(conLog({ ...s, cambio: false, lancio: false, squadra }, `Torna, ${nome(vecchio)}! Vai, ${nome(nuovo)}!`), rnd)
}

// Lancia una sfera (3) o una mega sfera (G): la mega cattura più facilmente.
export function lancia(s: Stato, mega: boolean, rnd: () => number = Math.random): Stato {
  if (s.modo !== 'lotta' || !s.nemico) return s
  const nem = s.nemico
  if (s.allenatore) return conLog(s, `Non puoi catturare i Mostrini di ${s.allenatore.nome}!`)
  const quante = mega ? (s.megaSfere ?? 0) : s.sfere
  if (quante <= 0) {
    return conLog(s, mega ? 'Niente mega sfere: si comprano al Centro cure delle Vette Gelate (M).' : 'Niente sfere: comprale al negozio del Centro cure (M).')
  }
  const n = mega ? { ...s, lancio: false, megaSfere: quante - 1 } : { ...s, lancio: false, sfere: quante - 1 }
  const prob = Math.min(0.95, 0.25 + 0.6 * (1 - nem.hp / maxHp(nem)) + (mega ? 0.25 : 0))
  if (rnd() < prob) {
    const preso = { ...nem, hp: maxHp(nem) }
    const pieno = n.squadra.length >= SQUADRA_MAX
    const r = registra({ ...n, modo: 'mappa', nemico: null }, nem.sp)
    const fine = pieno ? { ...r.s, box: [...r.s.box, preso] } : { ...r.s, squadra: [...r.s.squadra, preso] }

    return conLog(
      fine,
      `Preso! ${nome(nem)} è tuo.${pieno ? ' Squadra piena: va nel box (B per scambiare).' : ' Entra in squadra.'}`,
      ...r.righe,
    )
  }

  return turnoNemico(conLog({ ...n, lancio: true }, `${nome(nem)} è uscito dalla ${mega ? 'mega sfera' : 'sfera'}!`), rnd)
}

export function azione(s0: Stato, i: number, rnd: () => number = Math.random): Stato {
  if (s0.modo !== 'lotta' || !s0.nemico) return s0
  if (i === 4) {
    if (s0.squadra.filter(m => m.hp > 0).length < 2) return conLog(s0, 'Non hai altri Mostrini in forma per dare il cambio.')

    return { ...s0, cambio: true }
  }
  if (i === 2) return lancia(s0, false, rnd)
  const s = { ...s0, lancio: false }
  const io = s.squadra[0]
  const nem = s.nemico!
  if (i === 0 || i === 1) {
    const tipo: Tipo = i === 0 ? 'normale' : SPECIE[io.sp].tipo
    const nomeMossa = i === 0 ? 'Botta' : MOSSA[tipo]
    const { val, eff } = danno(io, nem, i === 0 ? 5 : 7, tipo, s.mondo, rnd)
    const hp = Math.max(0, nem.hp - val)
    const n = conLog({ ...s, nemico: { ...nem, hp } }, `${nome(io)} usa ${nomeMossa}: -${val} PS.${nota(eff)}`)

    return hp === 0 ? vittoria(n, rnd) : turnoNemico(n, rnd)
  }
  if (s.allenatore) return conLog(s, `Non puoi scappare dalla sfida di ${s.allenatore.nome}!`)
  if (rnd() < 0.8) return conLog({ ...s, modo: 'mappa', nemico: null }, 'Sei scappato.')

  return turnoNemico(conLog(s, 'Fuga fallita!'), rnd)
}

// C: una cura ridà 20 PS al Mostrino in testa, X una super cura 50. In lotta costano il turno.
export function usaCura(s: Stato, rnd: () => number = Math.random, forte = false): Stato {
  const quante = forte ? s.cureForti : s.cure
  if (quante <= 0) {
    return conLog(
      s,
      forte
        ? 'Nessuna super cura: comprala al Centro cure delle Vette Gelate (M).'
        : 'Nessuna cura: comprala al Centro cure (M) o trovala sconfiggendo i Mostrini.',
    )
  }
  const io = s.squadra[0]
  if (!io) return s
  if (io.hp === 0) return conLog(s, `${nome(io)} è esausto: portalo al Centro cure.`)
  if (io.hp >= maxHp(io)) return conLog(s, `${nome(io)} è già in forma.`)
  const hp = Math.min(maxHp(io), io.hp + (forte ? SUPER_PS : CURA_PS))
  const scorte = forte ? { cureForti: s.cureForti - 1 } : { cure: s.cure - 1 }
  const n = conLog(
    { ...s, ...scorte, lancio: false, squadra: [{ ...io, hp }, ...s.squadra.slice(1)] },
    `Usi una ${forte ? 'super cura' : 'cura'}: ${nome(io)} recupera ${hp - io.hp} PS.`,
  )

  return s.modo === 'lotta' && s.nemico ? turnoNemico(n, rnd) : n
}

export const alCentro = (s: Stato) => casellaDi(s, s.x, s.y) === 'C'

// Il negozio del Centro cure: cosa si vende in ogni mondo, a che prezzo e quanto se ne può tenere.
export type Articolo = { id: 'cura' | 'super' | 'sfera' | 'mega'; nome: string; descr: string; prezzo: number; max: number }

export function articoli(s: Stato): Articolo[] {
  const lista: Articolo[] = [
    { id: 'cura', nome: 'Cura', descr: '+20 PS', prezzo: CURA_PREZZO, max: CURE_MAX },
    { id: 'sfera', nome: 'Sfera', descr: 'per catturare', prezzo: SFERA_PREZZO, max: SFERE_MAX },
  ]
  if (s.mondo >= 1) {
    lista.push({ id: 'super', nome: 'Super cura', descr: '+50 PS', prezzo: SUPER_PREZZO, max: CURE_MAX })
    lista.push({ id: 'mega', nome: 'Mega sfera', descr: 'cattura più facile', prezzo: MEGA_PREZZO, max: SFERE_MAX })
  }

  return lista
}

const scorta = (s: Stato, id: Articolo['id']) =>
  id === 'cura' ? s.cure : id === 'super' ? s.cureForti : id === 'sfera' ? s.sfere : (s.megaSfere ?? 0)

export function compra(s: Stato, id: Articolo['id']): Stato {
  const a = articoli(s).find(x => x.id === id)
  if (!a) return conLog(s, 'Questo si vende solo nelle Vette Gelate.')
  if (!alCentro(s)) return conLog(s, 'Si compra al negozio del Centro cure.')
  const quante = scorta(s, id)
  if (quante >= a.max) return conLog(s, `Hai già ${a.max} ${a.nome.toLowerCase()}, il massimo.`)
  if (s.monete < a.prezzo) return conLog(s, `${a.nome} costa ${a.prezzo} monete, ne hai ${s.monete}. Vinci qualche lotta!`)
  const campo = id === 'cura' ? 'cure' : id === 'super' ? 'cureForti' : id === 'sfera' ? 'sfere' : 'megaSfere'

  return conLog({ ...s, [campo]: quante + 1, monete: s.monete - a.prezzo }, `Hai comprato: ${a.nome} (-${a.prezzo} monete).`)
}

// Come prima: compra una cura o una super cura (usata anche dai test).
export function compraCura(s: Stato, forte = false): Stato {
  if (forte && s.mondo < 1) return conLog(s, 'Le super cure si vendono solo nelle Vette Gelate.')

  return compra(s, forte ? 'super' : 'cura')
}

export function ruotaSquadra(s: Stato): Stato {
  if (s.squadra.length < 2) return s
  const squadra = [...s.squadra.slice(1), s.squadra[0]]

  return conLog({ ...s, squadra }, `In testa ora c'è ${nome(squadra[0])}.`)
}

// B apre lo scambio col box: prima scegli chi entra (1-9 nel box), poi chi esce dalla squadra (1-3).
// Con la squadra non piena il Mostrino scelto entra senza che nessuno esca. R passa a "rilascia".
export const PER_PAGINA = 9

export function apriScambio(s: Stato): Stato {
  if (s.box.length === 0) return conLog(s, 'Il box è vuoto: cattura altri Mostrini con le sfere.')

  return { ...s, scambio: { entra: null, pagina: 0 } }
}

export function scambia(s: Stato, entra: number, esce: number | null): Stato {
  const nuovo = s.box[entra]
  if (!nuovo) return s
  const box = s.box.filter((_, i) => i !== entra)
  if (esce === null || s.squadra.length < SQUADRA_MAX) {
    return conLog({ ...s, scambio: null, squadra: [...s.squadra, nuovo], box }, `${nome(nuovo)} entra in squadra.`)
  }
  const vecchio = s.squadra[esce]
  if (!vecchio) return s
  const squadra = s.squadra.map((m, i) => (i === esce ? nuovo : m))

  return conLog(
    { ...s, scambio: null, squadra, box: [...box, vecchio] },
    `${nome(nuovo)} entra in squadra al posto di ${nome(vecchio)}, che va nel box.`,
  )
}

// Rilascia un Mostrino del box: torna libero e lascia il box. Resta nel catalogo.
export function rilascia(s: Stato, i: number): Stato {
  const m = s.box[i]
  if (!m) return s
  const box = s.box.filter((_, j) => j !== i)

  return conLog({ ...s, box, scambio: box.length > 0 ? s.scambio : null }, `${nome(m)} è tornato in libertà. Ciao ${nome(m)}!`)
}

function tastoScambio(s: Stato, key: string): Stato {
  const sc = s.scambio!
  if (key === 'b' || key === '0' || key === 'backspace') return { ...s, scambio: null }
  const n = Number(key)
  if (sc.entra === null) {
    const pagine = Math.ceil(s.box.length / PER_PAGINA)
    if (key === 'r') return { ...s, scambio: { ...sc, rilascia: !sc.rilascia } }
    if (key === 'down' || key === 's' || key === 'right' || key === 'd') {
      return { ...s, scambio: { ...sc, pagina: (sc.pagina + 1) % pagine } }
    }
    if (key === 'up' || key === 'w' || key === 'left' || key === 'a') {
      return { ...s, scambio: { ...sc, pagina: (sc.pagina + pagine - 1) % pagine } }
    }
    if (!Number.isInteger(n) || n < 1 || n > PER_PAGINA) return s
    const i = sc.pagina * PER_PAGINA + n - 1
    if (!s.box[i]) return s
    if (sc.rilascia) {
      const dopo = rilascia(s, i)
      const pagineDopo = Math.max(1, Math.ceil(dopo.box.length / PER_PAGINA))

      return dopo.scambio ? { ...dopo, scambio: { ...dopo.scambio, pagina: Math.min(sc.pagina, pagineDopo - 1) } } : dopo
    }
    // Squadra non piena: entra subito.
    if (s.squadra.length < SQUADRA_MAX) return scambia(s, i, null)

    return { ...s, scambio: { ...sc, entra: i } }
  }
  if (!Number.isInteger(n) || n < 1 || n > s.squadra.length) return s

  return scambia(s, sc.entra, n - 1)
}

function tastoNegozio(s: Stato, key: string): Stato {
  if (key === 'm' || key === '0' || key === 'backspace') return { ...s, negozio: false }
  const n = Number(key)
  const a = articoli(s)[n - 1]

  return Number.isInteger(n) && a ? compra(s, a.id) : s
}

// Il menu principale: un numero apre la partita in quella casella (o ne inizia una nuova),
// Invio riprende l'ultima, D e poi un numero (premuto due volte, per conferma) cancella una partita.
export function tastoMenu(
  s: Stato,
  key: string,
  partite: (Stato | null)[],
  attiva: number,
): { s: Stato; cancella?: number } {
  // La conferma: lo stesso numero cancella, qualsiasi altro tasto annulla.
  if (s.daCancellare !== undefined && s.daCancellare !== null) {
    const i = s.daCancellare
    if (key === String(i + 1)) return { s: conLog({ ...s, cancella: false, daCancellare: null }, `Partita ${i + 1} cancellata.`), cancella: i }

    return { s: conLog({ ...s, cancella: false, daCancellare: null }, 'Cancellazione annullata.') }
  }
  if (key === 'd') return { s: { ...s, cancella: !s.cancella } }
  if ((key === 'return' || key === ' ' || key === 'space') && partite[attiva]) {
    return { s: { ...normalizza(partite[attiva]!), slot: attiva } }
  }
  const n = Number(key)
  if (!Number.isInteger(n) || n < 1 || n > PARTITE) return { s }
  const i = n - 1
  if (s.cancella) {
    if (!partite[i]) return { s: conLog({ ...s, cancella: false }, `La partita ${n} è già vuota.`) }

    return { s: conLog({ ...s, daCancellare: i }, `Vuoi davvero cancellare la Partita ${n}? Premi di nuovo ${n} per confermare, un altro tasto annulla.`) }
  }
  const p = partite[i]

  return { s: p ? { ...normalizza(p), slot: i } : { ...statoIniziale(), slot: i } }
}

export function riassunto(p: Stato | null): string {
  if (!p || p.squadra.length === 0) return 'vuota'
  const io = p.squadra[0]!
  const cat = catalogoDel(p)

  return `${nome(io)} Lv${io.lvl} · ${MONDI[p.mondo]?.nome ?? 'Prateria'} · catalogo ${cat.presi}/${cat.tot} · ${p.monete} monete`
}

// Frecce o WASD: il passo sulla mappa.
const PASSI: Record<string, [number, number]> = {
  up: [0, -1], w: [0, -1], down: [0, 1], s: [0, 1], left: [-1, 0], a: [-1, 0], right: [1, 0], d: [1, 0],
}

export function tasto(s: Stato, k: ClientKeyEvent): Stato {
  const key = k.key.toLowerCase()
  if (s.modo === 'inizio') {
    const i = ['1', '2', '3'].indexOf(key)

    return i >= 0 ? scegliIniziale(s, i) : s
  }
  if (s.modo === 'mappa') {
    if (s.scambio) return tastoScambio(s, key)
    const passo = PASSI[key]
    // Il negozio non blocca il movimento: un passo lo chiude.
    if (passo) return muovi(s.negozio ? { ...s, negozio: false } : s, passo[0], passo[1])
    if (s.negozio) return tastoNegozio(s, key)
    if (key === 'tab' || key === 'q') return ruotaSquadra(s)
    if (key === 'b') return apriScambio(s)
    if (key === 'c') return usaCura(s)
    if (key === 'x') return usaCura(s, Math.random, true)
    if (key === 'm') return alCentro(s) ? { ...s, negozio: true } : conLog(s, 'Il negozio è al Centro cure.')
    if (key === 'p') return { ...statoMenu(), slot: s.slot }

    return s
  }
  if (s.modo !== 'lotta') return s
  if (s.cambio) {
    if (key === '0' || key === '5' || key === 'backspace') return { ...s, cambio: false }
    const j = Number(key)

    return Number.isInteger(j) && j >= 1 && j <= s.squadra.length ? cambiaInLotta(s, j - 1) : s
  }
  const n = ['1', '2', '3', '4', '5'].indexOf(key)
  if (n >= 0) return azione(s, n)
  if (key === 'g') return lancia(s, true)
  if (key === 'c') return usaCura(s)
  if (key === 'x') return usaCura(s, Math.random, true)
  if (key === 'up' || key === 'w') return { ...s, scelta: (s.scelta + 4) % 5 }
  if (key === 'down' || key === 's') return { ...s, scelta: (s.scelta + 1) % 5 }
  if (key === 'return' || key === ' ' || key === 'space') return azione(s, s.scelta)

  return s
}

// ---------- Disegno ----------

const COL = {
  albero: '#2f7d4f',
  erba: '#7fd36b',
  acqua: '#4ca3e0',
  sentiero: '#8a7f6a',
  centro: '#ff6b81',
  io: '#ffd84c',
  portale: '#b98cff',
  ritorno: '#4cd6c8',
}

function barra(m: Mostrino, larghezza = 10) {
  const r = m.hp / maxHp(m)
  const pieni = Math.round(r * larghezza)
  const colore = r > 0.5 ? '#6fd36f' : r > 0.2 ? '#ffd84c' : '#ff6b6b'

  return { pieni: '█'.repeat(pieni), vuoti: '░'.repeat(larghezza - pieni), colore }
}

// grafica: il pannello disegna mappa e lotte in pixel art (app desktop),
// qui restano solo menu, squadra e messaggi.
type Props = { partite?: (Stato | null)[]; attiva?: number; grafica?: boolean } | null

// Un solo messaggio per volta arriva al pannello, quindi stato e salvataggio viaggiano insieme.
// partita: la partita da salvare quando non è lo stato mostrato (P salva la posizione e torna al menu).
type Messaggio =
  | { type: 'vista'; stato: Stato; salva: boolean; partita?: Stato }
  | { type: 'cancella'; slot: number; stato: Stato }

let grafica = false
// Le partite salvate come le vede il gioco: si aggiornano a ogni salvataggio e cancellazione.
let partite: (Stato | null)[] = []
let attiva = 0

const Gioco: ClientModule<any, Stato> = (props: Props, surface) => {
  const { Box, Text } = surface.elements
  grafica = !!props?.grafica
  const invia = (m: Messaggio) => {
    if (m.type === 'vista' && !grafica && !m.salva) return
    surface.post(m as any)
  }
  if (surface.state === undefined) {
    partite = Array.from({ length: PARTITE }, (_, i) => props?.partite?.[i] ?? null)
    attiva = props?.attiva ?? 0
    surface.onKey(k => {
      const prima = surface.state ?? statoMenu()
      if (prima.modo === 'menu') {
        const r = tastoMenu(prima, k.key.toLowerCase(), partite, attiva)
        if (r.cancella !== undefined) {
          partite[r.cancella] = null
          surface.setState({ ...r.s })
          surface.post({ type: 'cancella', slot: r.cancella, stato: r.s } as any)

          return
        }
        if (r.s === prima) return
        surface.setState(r.s)
        invia({ type: 'vista', stato: r.s, salva: false })

        return
      }
      const dopo = tasto(prima, k)
      if (dopo === prima) return
      surface.setState(dopo)
      const salva =
        dopo.modo !== prima.modo ||
        dopo.squadra !== prima.squadra ||
        dopo.sfere !== prima.sfere ||
        dopo.megaSfere !== prima.megaSfere ||
        dopo.cure !== prima.cure ||
        dopo.cureForti !== prima.cureForti ||
        dopo.monete !== prima.monete ||
        dopo.catalogo !== prima.catalogo ||
        dopo.box !== prima.box ||
        dopo.mondo !== prima.mondo
      // P: torna al menu salvando la partita com'era, posizione sulla mappa compresa.
      if (prima.modo === 'mappa' && dopo.modo === 'menu' && prima.slot !== undefined) {
        partite[prima.slot] = prima
        attiva = prima.slot
        surface.post({ type: 'vista', stato: dopo, salva: false, partita: prima } as any)

        return
      }
      const daSalvare = salva && dopo.modo === 'mappa' && dopo.slot !== undefined
      if (daSalvare) {
        partite[dopo.slot!] = dopo
        attiva = dopo.slot!
      }
      invia({ type: 'vista', stato: dopo, salva: daSalvare })
    })
    const inizio = statoMenu()
    surface.setState(inizio)
    invia({ type: 'vista', stato: inizio, salva: false })
  }
  const s = surface.state ?? statoMenu()
  const cat = catalogoDel(s)

  const registro = (
    <Box flexDirection="column" marginTop={1}>
      {s.log.map((r, i) => (
        <Text mono key={'l' + i} dimColor={i < s.log.length - 1} wrap="wrap">
          {r}
        </Text>
      ))}
    </Box>
  )

  if (s.modo === 'menu') {
    return (
      <Box flexDirection="column">
        <Text mono bold color={COL.io}>MOSTRINI · menu principale</Text>
        <Box flexDirection="column" marginTop={1}>
          {partite.map((p, i) => (
            <Text mono key={'p' + i} bold={i === attiva && !!p}>
              <Text mono bold>{i + 1}</Text> Partita {i + 1}: {riassunto(p)}
            </Text>
          ))}
        </Box>
        {registro}
        <Text mono dimColor>
          {s.daCancellare !== undefined && s.daCancellare !== null
            ? `Premi di nuovo ${s.daCancellare + 1} per cancellare la Partita ${s.daCancellare + 1}, un altro tasto annulla`
            : s.cancella
            ? 'Quale partita cancello? Premi il numero (D annulla)'
            : `Numero: gioca o inizia quella partita${partite[attiva] ? ' · Invio: continua l\'ultima' : ''} · D: cancella una partita`}
        </Text>
        <Text mono dimColor>Clicca qui sul pannello, poi usa la tastiera.</Text>
      </Box>
    )
  }

  const testa = (
    <Box flexDirection="row" justifyContent="space-between">
      <Text mono bold color={COL.io}>MOSTRINI</Text>
      <Text mono dimColor>
        {MONDI[s.mondo]!.nome} · Sfere {s.sfere}{s.mondo >= 1 || (s.megaSfere ?? 0) > 0 ? ` · Mega ${s.megaSfere ?? 0}` : ''} · Cure {s.cure}{s.mondo >= 1 || s.cureForti > 0 ? ` · Super ${s.cureForti}` : ''} · Monete {s.monete} · Catalogo {cat.presi}/{cat.tot}
      </Text>
    </Box>
  )

  if (s.modo === 'inizio') {
    return (
      <Box flexDirection="column">
        {testa}
        <Box flexDirection="column" marginTop={1}>
          {INIZIALI.map((sp, i) => {
            const d = SPECIE[sp]

            return (
              <Box key={sp} flexDirection="row" marginBottom={1}>
                {!grafica && (
                  <Box flexDirection="column" width={9}>
                    <Text mono color={COLORE_TIPO[d.tipo]}>{d.arte[0]}</Text>
                    <Text mono color={COLORE_TIPO[d.tipo]}>{d.arte[1]}</Text>
                  </Box>
                )}
                <Text mono>
                  <Text mono bold>{i + 1}</Text> {d.nome} <Text mono color={COLORE_TIPO[d.tipo]}>({d.tipo})</Text>
                </Text>
              </Box>
            )
          })}
        </Box>
        {registro}
      </Box>
    )
  }

  if (s.modo === 'lotta' && s.nemico) {
    const nem = s.nemico
    const io = s.squadra[0]
    const bn = barra(nem)
    const bi = barra(io)
    const dn = SPECIE[nem.sp]
    const di = SPECIE[io.sp]
    // ▲ o ▼: la mossa è potenziata o indebolita del 5% dal bioma del mondo.
    const segno = (t: Tipo) => (bioma(s.mondo, t) > 1 ? ' ▲5%' : bioma(s.mondo, t) < 1 ? ' ▼5%' : '')
    const voci = ['Botta' + segno('normale'), MOSSA[di.tipo] + segno(di.tipo), s.allenatore ? 'Sfera (non contro un allenatore)' : `Sfera (${s.sfere})`, s.allenatore ? 'Scappa (non da una sfida)' : 'Scappa', 'Cambia Mostrino']
    const giaPreso = s.catalogo.includes(nem.sp)

    return (
      <Box flexDirection="column">
        {testa}
        {s.allenatore && (
          <Text mono bold color={COL.centro}>
            Sfida di {s.allenatore.nome} · gli restano {s.allenatore.squadra.length + 1} Mostrini
          </Text>
        )}
        {!grafica && (
        <Box flexDirection="column">
        <Box flexDirection="row" justifyContent="space-between" marginTop={1}>
          <Box flexDirection="column">
            <Text mono>
              {giaPreso && <Text mono color="#e8483c">◓ </Text>}<Text mono bold>{nome(nem)}</Text> Lv {nem.lvl} <Text mono color={COLORE_TIPO[dn.tipo]}>{dn.tipo}</Text>
            </Text>
            <Text mono>
              <Text mono color={bn.colore}>{bn.pieni}</Text>
              <Text mono dimColor>{bn.vuoti}</Text> {nem.hp}/{maxHp(nem)}
            </Text>
          </Box>
          <Box flexDirection="column">
            <Text mono color={COLORE_TIPO[dn.tipo]}>{dn.arte[0]}</Text>
            <Text mono color={COLORE_TIPO[dn.tipo]}>{dn.arte[1]}</Text>
          </Box>
        </Box>
        <Box flexDirection="row" justifyContent="space-between" marginTop={1}>
          <Box flexDirection="column">
            <Text mono color={COLORE_TIPO[di.tipo]}>{di.arte[0]}</Text>
            <Text mono color={COLORE_TIPO[di.tipo]}>{di.arte[1]}</Text>
          </Box>
          <Box flexDirection="column">
            <Text mono>
              <Text mono bold>{nome(io)}</Text> Lv {io.lvl} <Text mono color={COLORE_TIPO[di.tipo]}>{di.tipo}</Text>
            </Text>
            <Text mono>
              <Text mono color={bi.colore}>{bi.pieni}</Text>
              <Text mono dimColor>{bi.vuoti}</Text> {io.hp}/{maxHp(io)}
            </Text>
          </Box>
        </Box>
        </Box>
        )}
        {s.cambio ? (
          <Box flexDirection="column" marginTop={1}>
            <Text mono bold color={COL.io}>Chi entra in lotta? Premi il numero (0 annulla)</Text>
            {s.squadra.map((m, i) => (
              <Text mono key={'c' + i} dimColor={i === 0 || m.hp === 0}>
                <Text mono bold>{i + 1}</Text> <Text mono color={COLORE_TIPO[SPECIE[m.sp].tipo]}>{nome(m)}</Text> Lv{m.lvl} {m.hp}/{maxHp(m)}
                {i === 0 ? ' (in lotta)' : m.hp === 0 ? ' (esausto)' : ''}
              </Text>
            ))}
          </Box>
        ) : (
        <Box flexDirection="column" marginTop={1}>
          {grafica && giaPreso && <Text mono dimColor>◓ {dn.nome} è già nel tuo catalogo</Text>}
          <Text mono dimColor>Bioma {MONDI[s.mondo]!.nome}: {affinita(s.mondo)}</Text>
          {voci.map((v, i) => (
            <Text mono key={'v' + i} inverse={i === s.scelta}>
              {' '}
              {i + 1} {v}{' '}
            </Text>
          ))}
          {!s.allenatore && (s.megaSfere ?? 0) > 0 && <Text mono dimColor>G lancia una mega sfera ({s.megaSfere})</Text>}
          {s.cure > 0 && <Text mono dimColor>C usa una cura ({s.cure})</Text>}
          {s.cureForti > 0 && <Text mono dimColor>X usa una super cura ({s.cureForti})</Text>}
        </Box>
        )}
        {registro}
      </Box>
    )
  }

  const righe = MONDI[s.mondo]!.mappa.map((riga, y) => {
    const celle = riga.split('').map((_, x) => {
      const t = casellaDi(s, x, y)
      if (x === s.x && y === s.y) return <Text mono key={'c' + x} bold color={COL.io}>@ </Text>
      if (t === '#') return <Text mono key={'c' + x} color={COL.albero}>^^</Text>
      if (t === ',') return <Text mono key={'c' + x} color={COL.erba}>,,</Text>
      if (t === '~') return <Text mono key={'c' + x} color={COL.acqua}>~~</Text>
      if (t === 'C') return <Text mono key={'c' + x} bold color={COL.centro}>C </Text>
      if (t === 'P') return <Text mono key={'c' + x} bold color={COL.portale}>()</Text>
      if (t === 'R') return <Text mono key={'c' + x} bold color={COL.ritorno}>{'<>'}</Text>

      return <Text mono key={'c' + x} color={COL.sentiero}>· </Text>
    })

    return <Text mono key={'r' + y}>{celle}</Text>
  })

  return (
    <Box flexDirection="column">
      {testa}
      {!grafica && (
        <Box flexDirection="column" marginTop={1}>
          {righe}
        </Box>
      )}
      <Box flexDirection="row" marginTop={1}>
        {s.squadra.map((m, i) => {
          const d = SPECIE[m.sp]

          return (
            <Text mono key={'s' + i} bold={i === 0} dimColor={m.hp === 0}>
              <Text mono color={COLORE_TIPO[d.tipo]}>{nome(m)}</Text> Lv{m.lvl} {m.hp}/{maxHp(m)}
              {'  '}
            </Text>
          )
        })}
      </Box>
      {registro}
      {s.scambio ? (
        <Box flexDirection="column" marginTop={1}>
          {s.scambio.entra === null ? (
            <Box flexDirection="column">
              <Text mono bold color={s.scambio.rilascia ? COL.centro : COL.io}>
                {s.scambio.rilascia ? 'Box: chi rilasci? Premi il numero' : 'Box: chi entra in squadra? Premi il numero'}
                {s.box.length > PER_PAGINA ? ` · pagina ${s.scambio.pagina + 1}/${Math.ceil(s.box.length / PER_PAGINA)} (frecce)` : ''}
              </Text>
              {s.box.slice(s.scambio.pagina * PER_PAGINA, (s.scambio.pagina + 1) * PER_PAGINA).map((m, i) => (
                <Text mono key={'b' + i}>
                  <Text mono bold>{i + 1}</Text> <Text mono color={COLORE_TIPO[SPECIE[m.sp].tipo]}>{nome(m)}</Text> Lv{m.lvl} {m.hp}/{maxHp(m)}
                </Text>
              ))}
              <Text mono dimColor>{s.scambio.rilascia ? 'R torna a scambiare' : 'R per rilasciare un Mostrino'} · B o 0 chiude il box</Text>
            </Box>
          ) : (
            <Box flexDirection="column">
              <Text mono bold color={COL.io}>
                Entra {nome(s.box[s.scambio.entra]!)}: chi esce dalla squadra? Premi il numero
              </Text>
              {s.squadra.map((m, i) => (
                <Text mono key={'q' + i}>
                  <Text mono bold>{i + 1}</Text> <Text mono color={COLORE_TIPO[SPECIE[m.sp].tipo]}>{nome(m)}</Text> Lv{m.lvl} {m.hp}/{maxHp(m)}
                </Text>
              ))}
              <Text mono dimColor>B o 0 annulla lo scambio</Text>
            </Box>
          )}
        </Box>
      ) : s.negozio ? (
        <Box flexDirection="column" marginTop={1}>
          <Text mono bold color={COL.centro}>Negozio del Centro cure · hai {s.monete} monete</Text>
          {articoli(s).map((a, i) => (
            <Text mono key={'a' + i}>
              <Text mono bold>{i + 1}</Text> {a.nome} ({a.descr}) · {a.prezzo} monete · ne hai {scorta(s, a.id)}/{a.max}
            </Text>
          ))}
          <Text mono dimColor>Premi il numero per comprare · M o 0 chiude il negozio · muoviti per uscire</Text>
        </Box>
      ) : (
        s.box.length > 0 && <Text mono dimColor>Box: {s.box.map(m => nome(m) + ' Lv' + m.lvl).join(', ')}</Text>
      )}
      {alCentro(s) && !s.scambio && !s.negozio && <Text mono color={COL.centro}>Sei al Centro cure: M apre il negozio</Text>}
      {!s.scambio && !s.negozio && <Text mono dimColor>Bioma {MONDI[s.mondo]!.nome}: {affinita(s.mondo)} · Lv {MONDI[s.mondo]!.lvlMin}-{MONDI[s.mondo]!.lvlMax}</Text>}
      {!s.scambio && !s.negozio && <Text mono dimColor>Frecce/WASD muovi · Q capofila · B box{s.cure > 0 ? ` · C cura (${s.cure})` : ''}{s.cureForti > 0 ? ` · X super cura (${s.cureForti})` : ''} · P menu{portaleAperto(s) ? ' · portale aperto' : ''}</Text>}
    </Box>
  )
}

export default Gioco

import type { ClientModule, ClientKeyEvent } from 'claude-code'
import type { Tipo, Mostrino, Stato } from '../types'

export type { Tipo, Mostrino, Modo, Stato } from '../types'

// ---------- Dati di gioco ----------

// mondo: 0 la Prateria, 1 le Vette Gelate, 2 il Deserto Rovente, 3 la Palude Nebbiosa, 4 le Rovine Spettrali.
// Per aprire il portale di un mondo servono la medaglia della sua palestra e il suo catalogo completo.
// evo: i nomi della forma evoluta e di quella finale.
export type Specie = { nome: string; evo: [string, string]; tipo: Tipo; hp: number; atk: number; mondo: number; arte: [string, string] }

export const SPECIE: Record<string, Specie> = {
  braciotto: { nome: 'Braciotto', evo: ['Bracione', 'Pirodrago'], tipo: 'fuoco', hp: 19, atk: 7, mondo: 0, arte: [' ,^^, ', '(o.o)~'] },
  fumarello: { nome: 'Fumarello', evo: ['Fumarone', 'Ciminiero'], tipo: 'fuoco', hp: 22, atk: 6, mondo: 0, arte: ['  )) ', '(-_-)'] },
  goccetto: { nome: 'Goccetto', evo: ['Goccione', 'Diluvione'], tipo: 'acqua', hp: 21, atk: 6, mondo: 0, arte: ['  ^  ', '(o_o)'] },
  ondina: { nome: 'Ondina', evo: ['Maroso', 'Maremagno'], tipo: 'acqua', hp: 18, atk: 7, mondo: 0, arte: [' ~~~ ', '<°_°>'] },
  germoglio: { nome: 'Germoglio', evo: ['Fogliardo', 'Arborone'], tipo: 'erba', hp: 22, atk: 6, mondo: 0, arte: [' \\|/ ', '(^.^)'] },
  muschietto: { nome: 'Muschietto', evo: ['Muschione', 'Muschiosauro'], tipo: 'erba', hp: 25, atk: 5, mondo: 0, arte: [' .:. ', '{u_u}'] },
  zampetto: { nome: 'Zampetto', evo: ['Zampardo', 'Zampaleone'], tipo: 'normale', hp: 20, atk: 6, mondo: 0, arte: [' /\\_/\\', '( •ᴗ•)'] },
  piumino: { nome: 'Piumino', evo: ['Piumastro', 'Aquilastro'], tipo: 'normale', hp: 17, atk: 7, mondo: 0, arte: ['  __ ', '<(v)>'] },
  scintillo: { nome: 'Scintillo', evo: ['Saettone', 'Fulminardo'], tipo: 'elettro', hp: 18, atk: 8, mondo: 0, arte: [' /\\/ ', '[*_*]'] },
  gelino: { nome: 'Gelino', evo: ['Gelone', 'Glaciardo'], tipo: 'ghiaccio', hp: 20, atk: 7, mondo: 1, arte: [' * * ', '(o~o)'] },
  nevischio: { nome: 'Nevischio', evo: ['Bufera', 'Tormenta'], tipo: 'ghiaccio', hp: 23, atk: 6, mondo: 1, arte: [' .*. ', '(-.-)'] },
  sassolo: { nome: 'Sassolo', evo: ['Sassone', 'Granitone'], tipo: 'roccia', hp: 26, atk: 6, mondo: 1, arte: ['  __ ', '[o_o]'] },
  macigno: { nome: 'Macigno', evo: ['Montagnone', 'Colossasso'], tipo: 'roccia', hp: 30, atk: 5, mondo: 1, arte: [' /--\\', '[=_=]'] },
  lavotto: { nome: 'Lavotto', evo: ['Magmotto', 'Eruttone'], tipo: 'fuoco', hp: 21, atk: 8, mondo: 1, arte: [' ^^^ ', '(>_<)'] },
  brinella: { nome: 'Brinella', evo: ['Galaverna', 'Borealia'], tipo: 'acqua', hp: 22, atk: 7, mondo: 1, arte: [' ~*~ ', '(o.o)'] },
  licheno: { nome: 'Licheno', evo: ['Tundrone', 'Taigone'], tipo: 'erba', hp: 24, atk: 6, mondo: 1, arte: [' ,., ', '{o_o}'] },
  yetino: { nome: 'Yetino', evo: ['Yetone', 'Yetirex'], tipo: 'normale', hp: 27, atk: 6, mondo: 1, arte: [' MMM ', '(o_O)'] },
  tuonello: { nome: 'Tuonello', evo: ['Tuonardo', 'Uraganone'], tipo: 'elettro', hp: 22, atk: 9, mondo: 1, arte: [' >>> ', '[@_@]'] },
  sabbiotto: { nome: 'Sabbiotto', evo: ['Sabbione', 'Ghiblone'], tipo: 'terra', hp: 24, atk: 8, mondo: 2, arte: ['  ∴  ', '(°.°)'] },
  dunetto: { nome: 'Dunetto', evo: ['Dunastro', 'Sirocco'], tipo: 'terra', hp: 27, atk: 7, mondo: 2, arte: [' ~-~ ', '(-.-)'] },
  cactello: { nome: 'Cactello', evo: ['Cactone', 'Saguarone'], tipo: 'erba', hp: 25, atk: 8, mondo: 2, arte: [' _|_ ', '|(^_^)|'] },
  pungiglio: { nome: 'Pungiglio', evo: ['Scorpione', 'Scorpiorex'], tipo: 'veleno', hp: 22, atk: 9, mondo: 2, arte: ['  __/', '(>.<)'] },
  solletto: { nome: 'Solletto', evo: ['Solleone', 'Solarca'], tipo: 'fuoco', hp: 23, atk: 9, mondo: 2, arte: [' \\ | / ', '-(^o^)-'] },
  cammellino: { nome: 'Cammellino', evo: ['Dromedone', 'Carovaniere'], tipo: 'normale', hp: 30, atk: 7, mondo: 2, arte: [' n n ', '(u.u)'] },
  oasina: { nome: 'Oasina', evo: ['Oasirena', 'Miraggia'], tipo: 'acqua', hp: 24, atk: 8, mondo: 2, arte: [' \\Y/ ', '(o~o)'] },
  pietrolo: { nome: 'Pietrolo', evo: ['Pietrone', 'Monolito'], tipo: 'roccia', hp: 29, atk: 7, mondo: 2, arte: ['  /\\ ', '[o.o]'] },
  mummietto: { nome: 'Mummietto', evo: ['Faraone', 'Sfingeo'], tipo: 'spettro', hp: 24, atk: 10, mondo: 2, arte: [' #=# ', '(*_*)'] },
  melmino: { nome: 'Melmino', evo: ['Melmone', 'Melmastro'], tipo: 'veleno', hp: 28, atk: 8, mondo: 3, arte: ['  o  ', '(~_~)'] },
  fanghetto: { nome: 'Fanghetto', evo: ['Fangone', 'Pantanone'], tipo: 'terra', hp: 30, atk: 8, mondo: 3, arte: [' ~.~ ', '(ò_ó)'] },
  rospetto: { nome: 'Rospetto', evo: ['Rospone', 'Rosporex'], tipo: 'acqua', hp: 27, atk: 9, mondo: 3, arte: [' @ @ ', '(___)'] },
  tossilla: { nome: 'Tossilla', evo: ['Tossicona', 'Tossiregina'], tipo: 'veleno', hp: 25, atk: 10, mondo: 3, arte: [' .-o-. ', ' (^_^) '] },
  ninfeo: { nome: 'Ninfeo', evo: ['Lotone', 'Lotoregale'], tipo: 'erba', hp: 29, atk: 8, mondo: 3, arte: ['  *  ', '~(^‿^)~'] },
  zanzarello: { nome: 'Zanzarello', evo: ['Zanzarone', 'Zanzarex'], tipo: 'normale', hp: 24, atk: 10, mondo: 3, arte: [' \\ / ', '-(o>o)-'] },
  lucciolo: { nome: 'Lucciolo', evo: ['Luccicone', 'Lanternone'], tipo: 'elettro', hp: 25, atk: 10, mondo: 3, arte: [' * * ', '(°o°)'] },
  nebbietta: { nome: 'Nebbietta', evo: ['Foschiona', 'Caligine'], tipo: 'spettro', hp: 26, atk: 9, mondo: 3, arte: [' ~ ~ ', '(-o-)'] },
  draghetto: { nome: 'Draghetto', evo: ['Paludrago', 'Idragone'], tipo: 'veleno', hp: 30, atk: 11, mondo: 3, arte: [' /\\/\\ ', '<(ò.ó)>'] },
  fantasmino: { nome: 'Fantasmino', evo: ['Fantasmone', 'Spettrarca'], tipo: 'spettro', hp: 28, atk: 10, mondo: 4, arte: [' .-. ', '(o o)'] },
  lumicino: { nome: 'Lumicino', evo: ['Fuocofatuo', 'Lumarca'], tipo: 'fuoco', hp: 27, atk: 11, mondo: 4, arte: ['  )  ', '(°w°)'] },
  ossicino: { nome: 'Ossicino', evo: ['Scheletrone', 'Ossidrago'], tipo: 'terra', hp: 31, atk: 9, mondo: 4, arte: [' o=o ', '(x.x)'] },
  pipistrillo: { nome: 'Pipistrillo', evo: ['Vampirone', 'Draculone'], tipo: 'veleno', hp: 27, atk: 11, mondo: 4, arte: ['/\\ /\\', '(o^o)'] },
  gargolino: { nome: 'Gargolino', evo: ['Gargolone', 'Gargantuo'], tipo: 'roccia', hp: 34, atk: 9, mondo: 4, arte: [' ^ ^ ', '[ò_ó]'] },
  ombretta: { nome: 'Ombretta', evo: ['Tenebra', 'Notturna'], tipo: 'spettro', hp: 26, atk: 12, mondo: 4, arte: [' ▒▒▒ ', '(•_•)'] },
  corvetto: { nome: 'Corvetto', evo: ['Corvaccio', 'Corvomante'], tipo: 'normale', hp: 28, atk: 11, mondo: 4, arte: ['  ,  ', '(o>o)'] },
  brividino: { nome: 'Brividino', evo: ['Brividone', 'Assiderato'], tipo: 'ghiaccio', hp: 29, atk: 10, mondo: 4, arte: [' *^* ', '(>.<)'] },
  eclissino: { nome: 'Eclissino', evo: ['Eclissone', 'Eclissarca'], tipo: 'spettro', hp: 32, atk: 12, mondo: 4, arte: [' C . ', '(*.*)'] },
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
// # albero  , erba alta  ~ acqua  . sentiero  C centro cure  G palestra
// P portale verso il mondo dopo (si apre con la medaglia della palestra)  R portale verso il mondo prima
// lvlMin e lvlMax: la fascia di livelli dei Mostrini di quel mondo.
// forti e deboli: il bioma potenzia del 5% le mosse dei tipi forti e indebolisce del 5% quelle dei tipi deboli.
// palestra: il capopalestra, il tipo dei suoi Mostrini e la medaglia che dà.
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
  palestra: { capo: string; tipo: Tipo; medaglia: string }
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
    palestra: { capo: 'Capopalestra Flora', tipo: 'erba', medaglia: 'Medaglia Foglia' },
    mappa: [
      '####################',
      '#....,,,,,,.G..~~~~#',
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
    palestra: { capo: 'Capopalestra Brina', tipo: 'ghiaccio', medaglia: 'Medaglia Cristallo' },
    mappa: [
      '####################',
      '#G..,,,,,..##,,,,,P#',
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
    palestra: { capo: 'Capopalestra Ambra', tipo: 'terra', medaglia: 'Medaglia Duna' },
    mappa: [
      '####################',
      '#R..,,,,,....,,,,,G#',
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
    palestra: { capo: 'Capopalestra Ortica', tipo: 'veleno', medaglia: 'Medaglia Miasma' },
    mappa: [
      '####################',
      '#G..,,,~~~,,,,..,,R#',
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
    palestra: { capo: 'Capopalestra Corvino', tipo: 'spettro', medaglia: 'Medaglia Eclisse' },
    mappa: [
      '####################',
      '#G..,,,,#,,,,,,,,,R#',
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

// La versione mostrata nel menu: la stessa di version in .claude-plugin/plugin.json.
export const VERSIONE = '0.8.1'

// Le sfere e le cure: ogni mondo ne aggiunge una al negozio, più forte di quelle prima.
// cattura: quanto moltiplica la probabilità di catturare; ps: i PS che ridà (Infinity: tutti).
export const SFERE = [
  { nome: 'Sfera', plurale: 'Sfere', cattura: 1, prezzo: 10 },
  { nome: 'Mega sfera', plurale: 'Mega sfere', cattura: 1.5, prezzo: 25 },
  { nome: 'Ultra sfera', plurale: 'Ultra sfere', cattura: 2, prezzo: 45 },
  { nome: 'Iper sfera', plurale: 'Iper sfere', cattura: 2.6, prezzo: 70 },
  { nome: 'Sfera stellare', plurale: 'Sfere stellari', cattura: 3.5, prezzo: 100 },
]
export const CURE = [
  { nome: 'Cura', plurale: 'Cure', ps: 20, prezzo: 15 },
  { nome: 'Super cura', plurale: 'Super cure', ps: 50, prezzo: 40 },
  { nome: 'Iper cura', plurale: 'Iper cure', ps: 100, prezzo: 80 },
  { nome: 'Mega cura', plurale: 'Mega cure', ps: 180, prezzo: 130 },
  { nome: 'Cura totale', plurale: 'Cure totali', ps: Infinity, prezzo: 200 },
]
// Quante se ne possono tenere di ogni tipo.
export const SFERE_MAX = 20
export const CURE_MAX = 10
// Più si va avanti, più è difficile catturare: la probabilità si moltiplica per questo valore in ogni mondo.
export const CATTURA_MONDO = [1, 0.85, 0.7, 0.58, 0.48]
export const SQUADRA_MAX = 3
export const PARTITE = 3

// Al livello 15 un Mostrino si evolve e al 35 arriva alla forma finale: ogni volta nome nuovo,
// PS e attacco più alti (+20% la prima evoluzione, +45% la forma finale).
export const LIVELLI_EVO = [15, 35]
const EVO_BONUS = [1, 1.2, 1.45]

// Lo stadio di un Mostrino: 0 base, 1 evoluto, 2 forma finale (true nelle partite vecchie vale 1).
export const stadio = (m: Mostrino) => Number(m.evo ?? 0)
// Lo stadio a cui arriva un Mostrino di quel livello.
export const stadioPer = (lvl: number) => LIVELLI_EVO.filter(l => lvl >= l).length

export const maxHp = (m: Mostrino) => Math.round((SPECIE[m.sp]!.hp + m.lvl * 3) * EVO_BONUS[stadio(m)]!)
const atk = (m: Mostrino) => Math.round((SPECIE[m.sp]!.atk + m.lvl * 2) * EVO_BONUS[stadio(m)]!)
export const nome = (m: Mostrino) => (stadio(m) > 0 ? SPECIE[m.sp]!.evo[stadio(m) - 1]! : SPECIE[m.sp]!.nome)

export const specieDel = (mondo: number) => Object.keys(SPECIE).filter(k => SPECIE[k].mondo === mondo)

// Il catalogo di un mondo conta le specie di quel mondo e dei mondi prima: 9 nella Prateria, 18 nelle Vette e così via.
export function catalogoDel(s: Stato): { presi: number; tot: number } {
  const specie = Object.keys(SPECIE).filter(k => SPECIE[k].mondo <= s.mondo)

  return { presi: specie.filter(k => s.catalogo.includes(k)).length, tot: specie.length }
}

// La palestra del mondo n (contando da 1) ha n+2 allievi e poi il capopalestra.
export const allievi = (mondo: number) => mondo + 3
export const vinteIn = (s: Stato, mondo: number) => s.palestre?.[mondo] ?? 0
export const medaglia = (s: Stato, mondo: number) => vinteIn(s, mondo) > allievi(mondo)

// Quanti Mostrini di quel mondo mancano ancora nel catalogo.
export const mancantiIn = (s: Stato, mondo: number) => specieDel(mondo).filter(sp => !s.catalogo.includes(sp)).length

// Il portale P di un mondo si apre con la medaglia della sua palestra e col catalogo del mondo completo;
// l'ultimo mondo non ne ha.
export function portaleAperto(s: Stato, mondo = s.mondo): boolean {
  return mondo + 1 < MONDI.length && medaglia(s, mondo) && mancantiIn(s, mondo) === 0
}

// Cosa manca per aprire il portale del mondo dove sei.
export function perIlPortale(s: Stato): string {
  const servono: string[] = []
  if (!medaglia(s, s.mondo)) servono.push(`la ${MONDI[s.mondo]!.palestra.medaglia} (palestra G)`)
  const mancano = mancantiIn(s, s.mondo)
  if (mancano > 0) servono.push(`${mancano} Mostrini nel catalogo di questo mondo`)

  return `Il portale è chiuso: ti mancano ${servono.join(' e ')}.`
}

// La forma più evoluta che hai avuto di ogni specie, per il catalogo.
function ricordaStadi(s: Stato, ...altri: Mostrino[]): Stato {
  const stadi = { ...(s.stadi ?? {}) }
  let cambiato = false
  for (const m of [...s.squadra, ...s.box, ...altri]) {
    if ((stadi[m.sp] ?? -1) < stadio(m)) {
      stadi[m.sp] = stadio(m)
      cambiato = true
    }
  }

  return cambiato || !s.stadi ? { ...s, stadi } : s
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

function nuovo(sp: string, lvl: number, evo = 0): Mostrino {
  const m: Mostrino = evo > 0 ? { sp, lvl, xp: 0, hp: 0, evo } : { sp, lvl, xp: 0, hp: 0 }
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
    catturati: [],
    visti: [],
    stadi: {},
    versioneCatalogo: 2,
    sfere: [5, 0, 0, 0, 0],
    cure: [2, 0, 0, 0, 0],
    palestre: MONDI.map(() => 0),
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

// Le partite salvate prima delle ultime novità: squadra oltre 3 nel box, campi nuovi ai valori iniziali,
// e l'evoluzione salvata come true diventa lo stadio 1.
// Prima delle palestre e degli zaini a caselle: sfere e cure diventano caselle (con mega sfere e super cure
// nella seconda), il catalogo tiene solo le specie che hai ancora in squadra o nel box (le altre restano
// viste), e le palestre dei mondi già lasciati alle spalle contano come vinte.
export function normalizza(salvato: Partial<Stato>): Stato {
  const s: Stato = { ...statoIniziale(), ...salvato }
  const conStadio = (m: Mostrino): Mostrino => (m.evo === true ? { ...m, evo: 1 } : m)
  const box = [...(s.box ?? []), ...s.squadra.slice(SQUADRA_MAX)].map(conStadio)
  const squadra = s.squadra.slice(0, SQUADRA_MAX).map(conStadio)
  const mondo = MONDI[s.mondo ?? 0] ? (s.mondo ?? 0) : 0
  const caselle = (v: unknown, seconda: number | undefined, prima: number) =>
    Array.isArray(v) ? MONDI.map((_, i) => Number(v[i] ?? 0)) : [Number(v ?? prima), seconda ?? 0, 0, 0, 0]
  const vecchia = salvato.visti === undefined
  const posseduti = [...new Set([...squadra, ...box].map(m => m.sp))]

  return {
    ...s,
    modo: s.modo === 'lotta' || s.modo === 'menu' ? 'mappa' : s.modo,
    nemico: null,
    lancio: false,
    zaino: null,
    scambio: null,
    cambio: false,
    negozio: false,
    allenatore: null,
    cancella: false,
    daCancellare: null,
    catalogoVista: null,
    sfere: caselle(salvato.sfere, salvato.megaSfere, 5),
    cure: caselle(salvato.cure, salvato.cureForti, 2),
    megaSfere: undefined,
    cureForti: undefined,
    // Dalla 0.8.1 il catalogo conta anche chi hai sconfitto: le partite precedenti recuperano
    // nel catalogo i Mostrini rimasti tra i visti, e i catturati tengono la sfera.
    catalogo: (salvato.versioneCatalogo ?? 0) >= 2 ? s.catalogo : [...new Set([...s.catalogo, ...(s.visti ?? []), ...posseduti])],
    catturati:
      (salvato.versioneCatalogo ?? 0) >= 2
        ? (salvato.catturati ?? [])
        : [...new Set([...(vecchia ? [] : s.catalogo), ...posseduti])],
    versioneCatalogo: 2,
    stadi: (() => {
      const st: Record<string, number> = { ...(salvato.stadi ?? {}) }
      for (const m of [...squadra, ...box]) st[m.sp] = Math.max(st[m.sp] ?? 0, stadio(m))

      return st
    })(),
    visti: vecchia ? [...new Set([...s.catalogo, ...posseduti])] : (s.visti ?? []),
    palestre: MONDI.map((_, i) => (salvato.palestre ? (salvato.palestre[i] ?? 0) : i < mondo ? allievi(i) + 1 : 0)),
    squadra,
    box,
    mondo,
  }
}

function conLog(s: Stato, ...righe: string[]): Stato {
  return { ...s, log: [...s.log, ...righe].slice(-3) }
}

// Il Centro cure rimette in forma la squadra; le sfere invece si comprano al negozio.
function curaTutti(s: Stato): Stato {
  return { ...s, squadra: s.squadra.map(m => ({ ...m, hp: maxHp(m) })) }
}

// Una specie incontrata in lotta diventa vista: nel catalogo si vede a colori, ma senza la sfera.
function vedi(s: Stato, sp: string): Stato {
  return s.visti?.includes(sp) ? s : { ...s, visti: [...(s.visti ?? []), sp] }
}

// Sconfiggere o catturare mette una specie nel catalogo; catturarla le dà anche la sfera accanto al nome.
// Quando il catalogo del mondo si completa e hai già la medaglia, si apre il portale.
function registra(s: Stato, sp: string, catturato = false): { s: Stato; righe: string[] } {
  let n = vedi(s, sp)
  if (catturato && !(n.catturati ?? []).includes(sp)) n = { ...n, catturati: [...(n.catturati ?? []), sp] }
  if (s.catalogo.includes(sp)) return { s: n, righe: [] }
  n = { ...n, catalogo: [...s.catalogo, sp] }
  const righe = [`Nuovo nel catalogo: ${SPECIE[sp].nome}!`]
  const mondo = SPECIE[sp]!.mondo
  if (mancantiIn(n, mondo) === 0) {
    righe.push(`Catalogo ${MONDI[mondo]!.nel} completo!`)
    if (!portaleAperto(s) && portaleAperto(n)) righe.push(`Il portale (P) verso ${MONDI[s.mondo + 1]!.nome} è aperto.`)
  }
  if (n.catalogo.length === Object.keys(SPECIE).length) righe.push('Hai trovato tutti i Mostrini. Il catalogo è completo!')

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
    catturati: [sp],
    visti: [sp],
    stadi: { [sp]: 0 },
    log: [`Hai scelto ${SPECIE[sp].nome}! Cammina nell'erba alta per trovare Mostrini.`],
  }
}

function incontro(s: Stato, rnd: () => number): Stato {
  const mondo = MONDI[s.mondo]!
  const pool = specieDel(s.mondo).filter(k => k !== mondo.raro)
  const sp = rnd() < 0.08 ? mondo.raro : pool[Math.floor(rnd() * pool.length)]
  const lvl = livelloNel(s.mondo, rnd)
  // Dal livello 15 circa un selvatico su tre è già evoluto; dal 35 uno su tre è nella forma finale
  // e uno su quattro nella prima evoluzione.
  const max = stadioPer(lvl)
  const r = max > 0 ? rnd() : 1
  const nemico = nuovo(sp, lvl, r < 0.35 ? max : r < 0.6 ? max - 1 : 0)

  return conLog(
    vedi({ ...s, modo: 'lotta', nemico, scelta: 0, lancio: false, zaino: null, cambio: false, allenatore: null }, nemico.sp),
    `Un ${nome(nemico)} selvatico (Lv ${lvl}) ti sbarra la strada!`,
  )
}

// L'inizio di una lotta contro un allenatore: il primo Mostrino della sua squadra scende in campo.
function controAllenatore(s: Stato, nomeAll: string, squadra: Mostrino[], palestra?: 'allievo' | 'capo'): Stato {
  const [primo, ...resto] = squadra
  const allenatore = palestra ? { nome: nomeAll, squadra: resto, palestra } : { nome: nomeAll, squadra: resto }

  return vedi({ ...s, modo: 'lotta', nemico: primo!, scelta: 0, lancio: false, zaino: null, cambio: false, allenatore }, primo!.sp)
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

    return nuovo(sp, lvl, stadioPer(lvl))
  })
  const nomeAll = ALLENATORI[Math.floor(rnd() * ALLENATORI.length)]!

  return conLog(
    controAllenatore(s, nomeAll, squadra),
    `${nomeAll} ti sfida con ${quanti} Mostrini! Manda in campo ${nome(squadra[0]!)} (Lv ${squadra[0]!.lvl}).`,
  )
}

// Gli allievi delle palestre.
const ALLIEVI = ['Allievo Dario', 'Allieva Sole', 'Allievo Nino', 'Allieva Lara', 'Allievo Pietro', 'Allieva Viola', 'Allievo Enea']

// La squadra del capopalestra: Mostrini del suo tipo un livello sopra la fascia del mondo,
// e per ultimo il Mostrino raro del mondo, ancora più forte. Ogni due mondi ne ha uno in più.
export function squadraCapo(mondo: number): Mostrino[] {
  const m = MONDI[mondo]!
  const comuni = specieDel(mondo).filter(sp => sp !== m.raro)
  const ordinati = [...comuni.filter(sp => SPECIE[sp]!.tipo === m.palestra.tipo), ...comuni.filter(sp => SPECIE[sp]!.tipo !== m.palestra.tipo)]
  const quanti = 3 + Math.floor(mondo / 2)
  const lvl = m.lvlMax + 1

  return [...ordinati.slice(0, quanti - 1).map(sp => nuovo(sp, lvl, stadioPer(lvl))), nuovo(m.raro, lvl + 2, stadioPer(lvl + 2))]
}

// Entrare in palestra (G) fa partire la sfida successiva: prima gli allievi, uno alla volta, poi il capopalestra.
// Le vittorie restano anche se perdi: torni al Centro cure e riprendi dalla sfida dove eri.
export function sfidaPalestra(s: Stato, rnd: () => number = Math.random): Stato {
  const m = MONDI[s.mondo]!
  const vinte = vinteIn(s, s.mondo)
  const tot = allievi(s.mondo)
  if (vinte > tot) return conLog(s, `Palestra ${m.del}: hai già la ${m.palestra.medaglia}.`)
  if (vinte === tot) {
    const squadra = squadraCapo(s.mondo)

    return conLog(
      controAllenatore(s, m.palestra.capo, squadra, 'capo'),
      `${m.palestra.capo} ti aspetta con ${squadra.length} Mostrini! Manda in campo ${nome(squadra[0]!)} (Lv ${squadra[0]!.lvl}).`,
    )
  }
  const comuni = specieDel(s.mondo).filter(sp => sp !== m.raro)
  const delTipo = comuni.filter(sp => SPECIE[sp]!.tipo === m.palestra.tipo)
  const squadra = Array.from({ length: s.mondo === 0 ? 2 : 3 }, () => {
    const lista = delTipo.length > 0 && rnd() < 0.5 ? delTipo : comuni
    const lvl = livelloNel(s.mondo, rnd, true)

    return nuovo(lista[Math.floor(rnd() * lista.length)]!, lvl, stadioPer(lvl))
  })
  const nomeAll = ALLIEVI[(vinte + s.mondo * 2) % ALLIEVI.length]!

  return conLog(
    controAllenatore(s, nomeAll, squadra, 'allievo'),
    `Palestra ${m.del}, sfida ${vinte + 1} di ${tot}: ${nomeAll} manda in campo ${nome(squadra[0]!)} (Lv ${squadra[0]!.lvl}).`,
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
  if (MONDI[s.mondo]!.mappa[ny]?.[nx] === 'P' && t === '#' && s.mondo + 1 < MONDI.length) return conLog(s, perIlPortale(s))
  if (t === undefined || t === '#' || t === '~') return s
  const n: Stato = { ...s, x: nx, y: ny }
  if (t === 'C') return conLog(curaTutti(n), 'Centro cure: squadra in forma. Premi M per il negozio.')
  if (t === 'G') return sfidaPalestra(n, rnd)
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
    n = curaTutti({ ...n, modo: 'mappa', nemico: null, lancio: false, zaino: null, allenatore: null, x: CENTRO.x + 1, y: CENTRO.y })

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

// Un Mostrino si evolve al livello 15 e arriva alla forma finale al 35; i PS in più arrivano già pieni.
export function evolve(m: Mostrino, righe: string[]): Mostrino {
  let io = m
  while (stadio(io) < stadioPer(io.lvl)) {
    const evoluto: Mostrino = { ...io, evo: stadio(io) + 1 }
    righe.push(
      stadio(evoluto) === 2
        ? `Incredibile! ${nome(io)} raggiunge la forma finale: ${nome(evoluto)}!`
        : `Cosa succede? ${nome(io)} si evolve in ${nome(evoluto)}!`,
    )
    io = { ...evoluto, hp: io.hp + maxHp(evoluto) - maxHp(io) }
  }

  return io
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
  // Lo sconfitto entra nel catalogo; ricordaStadi tiene le evoluzioni raggiunte dalla tua squadra.
  const reg = registra(ricordaStadi({ ...s, squadra }), nem.sp)
  const visto = reg.s
  righe.push(...reg.righe)
  if (all && all.squadra.length > 0) {
    const [prossimo, ...resto] = all.squadra
    const n = vedi({ ...visto, nemico: prossimo!, lancio: false, squadra, monete, allenatore: { ...all, squadra: resto } }, prossimo!.sp)

    return conLog(n, ...righe, ...evoluzioni, `${all.nome} manda in campo ${nome(prossimo!)} (Lv ${prossimo!.lvl}).`)
  }
  if (all) {
    // Il capopalestra paga più degli altri allenatori.
    const premio = nem.lvl * (all.palestra === 'capo' ? 25 : 10)
    righe.push(`Hai battuto ${all.nome}! Premio: +${premio} monete.`)
    const palestre = MONDI.map((_, i) => vinteIn(s, i) + (all.palestra && i === s.mondo ? 1 : 0))
    const n = { ...visto, modo: 'mappa' as const, nemico: null, lancio: false, squadra, monete: monete + premio, allenatore: null, palestre }
    const m = MONDI[s.mondo]!
    if (all.palestra === 'capo') {
      const dopo = MONDI[s.mondo + 1]
      const mancano = mancantiIn(n, s.mondo)
      righe.push(
        `Hai vinto la ${m.palestra.medaglia}! ${
          !dopo
            ? 'Sei il campione di Mostrini!'
            : mancano === 0
              ? `Il portale (P) verso ${dopo.nome} è aperto.`
              : `Per aprire il portale (P) ti mancano ancora ${mancano} Mostrini nel catalogo di questo mondo.`
        }`,
      )
    } else if (all.palestra) {
      const fatte = palestre[s.mondo]!
      righe.push(fatte === allievi(s.mondo) ? `Allievi battuti: ora ti aspetta ${m.palestra.capo} (G).` : `Palestra: ${fatte}/${allievi(s.mondo)} allievi battuti.`)
    }

    return conLog(n, ...righe, ...evoluzioni)
  }
  // A volte il Mostrino selvatico sconfitto lascia una cura.
  const trovata = (s.cure[0] ?? 0) < CURE_MAX && rnd() < 0.25
  if (trovata) righe.push('Hai trovato una cura!')
  const cure = trovata ? s.cure.map((q, i) => (i === 0 ? q + 1 : q)) : s.cure

  return conLog({ ...visto, modo: 'mappa', nemico: null, lancio: false, squadra, cure, monete }, ...righe, ...evoluzioni)
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

// La probabilità di catturare: più alta se il Mostrino è stanco, più bassa nei mondi avanti,
// moltiplicata dalla sfera scelta.
export function probCattura(s: Stato, nem: Mostrino, sfera: number): number {
  const base = 0.25 + 0.6 * (1 - nem.hp / maxHp(nem))

  return Math.min(0.95, base * (CATTURA_MONDO[s.mondo] ?? 1) * (SFERE[sfera]?.cattura ?? 1))
}

// Lancia la sfera scelta nello zaino.
export function lancia(s: Stato, i: number, rnd: () => number = Math.random): Stato {
  if (s.modo !== 'lotta' || !s.nemico) return s
  const nem = s.nemico
  const sf = SFERE[i]
  if (!sf) return s
  if (s.allenatore) return conLog({ ...s, zaino: null }, `Non puoi catturare i Mostrini di ${s.allenatore.nome}!`)
  if ((s.sfere[i] ?? 0) <= 0) return conLog(s, `Non hai ${sf.plurale}: comprale al negozio del Centro cure (M).`)
  const n = { ...s, lancio: false, zaino: null, sfere: s.sfere.map((q, j) => (j === i ? q - 1 : q)) }
  if (rnd() < probCattura(s, nem, i)) {
    const preso = { ...nem, hp: maxHp(nem) }
    const pieno = n.squadra.length >= SQUADRA_MAX
    const r = registra(ricordaStadi({ ...n, modo: 'mappa', nemico: null }, preso), nem.sp, true)
    const fine = pieno ? { ...r.s, box: [...r.s.box, preso] } : { ...r.s, squadra: [...r.s.squadra, preso] }

    return conLog(
      fine,
      `Preso con la ${sf.nome}! ${nome(nem)} è tuo.${pieno ? ' Squadra piena: va nel box (B per scambiare).' : ' Entra in squadra.'}`,
      ...r.righe,
    )
  }

  return turnoNemico(conLog({ ...n, lancio: true, lanciata: i }, `${nome(nem)} è uscito dalla ${sf.nome}!`), rnd)
}

// Le caselle dello zaino che hanno almeno un oggetto: lo zaino aperto le numera da 1.
export const nelloZaino = (quante: number[]) => quante.map((q, i) => ({ i, q })).filter(x => x.q > 0)

// Apre lo zaino delle sfere o delle cure, per scegliere quale usare.
export function apriZaino(s: Stato, cosa: 'sfere' | 'cure'): Stato {
  if (cosa === 'sfere' && s.allenatore) return conLog(s, `Non puoi catturare i Mostrini di ${s.allenatore.nome}!`)
  if (nelloZaino(s[cosa]).length === 0) {
    return conLog(s, cosa === 'sfere' ? 'Non hai sfere: comprale al negozio del Centro cure (M).' : 'Non hai cure: comprale al negozio del Centro cure (M).')
  }

  return { ...s, zaino: cosa }
}

// Lotta: 1 Botta, 2 mossa del tipo, 3 sfere, 4 cure, 5 cambio, 6 fuga.
export const VOCI_LOTTA = 6

export function azione(s0: Stato, i: number, rnd: () => number = Math.random): Stato {
  if (s0.modo !== 'lotta' || !s0.nemico) return s0
  if (i === 4) {
    if (s0.squadra.filter(m => m.hp > 0).length < 2) return conLog(s0, 'Non hai altri Mostrini in forma per dare il cambio.')

    return { ...s0, cambio: true }
  }
  if (i === 2) return apriZaino(s0, 'sfere')
  if (i === 3) return apriZaino(s0, 'cure')
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

// Usa la cura scelta nello zaino sul Mostrino in testa. In lotta costa il turno.
export function usaCura(s: Stato, i: number, rnd: () => number = Math.random): Stato {
  const c = CURE[i]
  if (!c) return s
  if ((s.cure[i] ?? 0) <= 0) return conLog(s, `Non hai ${c.plurale}: comprale al negozio del Centro cure (M).`)
  const io = s.squadra[0]
  if (!io) return s
  if (io.hp === 0) return conLog(s, `${nome(io)} è esausto: portalo al Centro cure.`)
  if (io.hp >= maxHp(io)) return conLog(s, `${nome(io)} è già in forma.`)
  const hp = Math.min(maxHp(io), io.hp + c.ps)
  const n = conLog(
    { ...s, cure: s.cure.map((q, j) => (j === i ? q - 1 : q)), zaino: null, lancio: false, squadra: [{ ...io, hp }, ...s.squadra.slice(1)] },
    `Usi una ${c.nome}: ${nome(io)} recupera ${hp - io.hp} PS.`,
  )

  return s.modo === 'lotta' && s.nemico ? turnoNemico(n, rnd) : n
}

export const alCentro = (s: Stato) => casellaDi(s, s.x, s.y) === 'C'

// Il negozio del Centro cure: in ogni mondo le sfere e le cure di quel mondo e dei mondi prima.
export type Articolo = { cosa: 'sfere' | 'cure'; i: number; nome: string; descr: string; prezzo: number; max: number }

export function articoli(s: Stato, cosa: 'sfere' | 'cure'): Articolo[] {
  const lista = cosa === 'sfere' ? SFERE : CURE

  return lista.slice(0, s.mondo + 1).map((a, i) => ({
    cosa,
    i,
    nome: a.nome,
    descr: 'cattura' in a ? (a.cattura === 1 ? 'per catturare' : `cattura x${a.cattura}`) : a.ps === Infinity ? 'tutti i PS' : `+${a.ps} PS`,
    prezzo: a.prezzo,
    max: cosa === 'sfere' ? SFERE_MAX : CURE_MAX,
  }))
}

export function compra(s: Stato, cosa: 'sfere' | 'cure', i: number): Stato {
  const a = articoli(s, cosa)[i]
  if (!a) return conLog(s, `Questo si vende solo ${MONDI[i]?.nel ?? 'più avanti'} e nei mondi dopo.`)
  if (!alCentro(s)) return conLog(s, 'Si compra al negozio del Centro cure.')
  const quante = s[cosa][i] ?? 0
  if (quante >= a.max) return conLog(s, `Hai già ${a.max} ${(cosa === 'sfere' ? SFERE : CURE)[i]!.plurale}, il massimo.`)
  if (s.monete < a.prezzo) return conLog(s, `${a.nome} costa ${a.prezzo} monete, ne hai ${s.monete}. Vinci qualche lotta!`)

  return conLog(
    { ...s, [cosa]: s[cosa].map((q, j) => (j === i ? q + 1 : q)), monete: s.monete - a.prezzo },
    `Hai comprato: ${a.nome} (-${a.prezzo} monete).`,
  )
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

// L apre il catalogo: una pagina per mondo con i suoi 9 Mostrini, presi o ancora da trovare.
export function apriCatalogo(s: Stato): Stato {
  return { ...s, catalogoVista: { mondo: s.mondo, sel: 0 } }
}

// Un mondo è sbloccato quando ci sei arrivato o il suo portale è aperto: dei suoi Mostrini mancanti
// si vede il nome; nei mondi ancora chiusi restano ???.
export const mondoSbloccato = (s: Stato, mondo: number) => mondo <= s.mondo || portaleAperto(s, mondo - 1)

// registrato: nel catalogo (sconfitto o catturato); preso: catturato, con la sfera;
// visto: almeno incontrato, a colori; noto: se ne vede almeno il nome;
// stadio: la forma più evoluta che hai avuto (-1 se non l'hai mai avuto).
export type Voce = { sp: string; numero: number; registrato: boolean; preso: boolean; visto: boolean; noto: boolean; raro: boolean; stadio: number }

export function vociCatalogo(s: Stato, mondo: number): Voce[] {
  const tutte = Object.keys(SPECIE)

  return specieDel(mondo).map(sp => {
    const registrato = s.catalogo.includes(sp)
    const preso = !!s.catturati?.includes(sp)
    const visto = registrato || preso || !!s.visti?.includes(sp)

    return {
      sp,
      numero: tutte.indexOf(sp) + 1,
      registrato,
      preso,
      visto,
      noto: visto || mondoSbloccato(s, mondo),
      raro: MONDI[mondo]!.raro === sp,
      stadio: s.stadi?.[sp] ?? (preso ? 0 : -1),
    }
  })
}

// La scheda del Mostrino scelto nel catalogo: la sua linea evolutiva se l'hai preso, dove cercarlo se manca.
export function descrizione(v: Voce): string {
  const d = SPECIE[v.sp]!
  const num = '#' + String(v.numero).padStart(2, '0')
  const dove = MONDI[d.mondo]!
  if (!v.noto) return `${num} ???: vive ${dove.nel}, che non hai ancora aperto.`
  if (v.visto && !v.registrato) {
    return `${num} ${d.nome} (${d.tipo}): l'hai visto ma non ancora sconfitto né catturato. Vive ${dove.nel}${v.raro ? ' ed è raro' : ''}.`
  }
  if (!v.registrato) {
    return `${num} ${d.nome} (${d.tipo}): manca! Vive ${dove.nel}${v.raro ? ' ed è raro' : ''}. Sconfiggilo o catturalo per registrarlo.`
  }
  const forme = ['la forma base', `${d.evo[0]}`, `${d.evo[1]}`]

  return (
    `${num} ${d.nome} (${d.tipo})${v.raro ? ', raro' : ''}: ${v.preso ? 'catturato' : 'sconfitto, non ancora catturato'}. ` +
    `Si evolve in ${d.evo[0]} al Lv ${LIVELLI_EVO[0]} e in ${d.evo[1]} al Lv ${LIVELLI_EVO[1]}.` +
    (v.stadio >= 0 ? ` La forma più evoluta che hai avuto: ${forme[v.stadio]}.` : '')
  )
}

// Frecce: sinistra e destra scorrono i Mostrini (e passano al mondo vicino), su e giù di una riga;
// 1-5 saltano al mondo, L o 0 chiudono.
function tastoCatalogo(s: Stato, key: string): Stato {
  const cv = s.catalogoVista!
  if (key === 'l' || key === '0' || key === 'backspace' || key === 'escape') return { ...s, catalogoVista: null }
  const n = Number(key)
  if (Number.isInteger(n) && n >= 1 && n <= MONDI.length) return { ...s, catalogoVista: { mondo: n - 1, sel: 0 } }
  const per = specieDel(cv.mondo).length
  const passo = key === 'right' || key === 'd' ? 1 : key === 'left' || key === 'a' ? -1 : 0
  if (passo !== 0) {
    const sel = cv.sel + passo
    if (sel >= 0 && sel < per) return { ...s, catalogoVista: { ...cv, sel } }
    const mondo = (cv.mondo + passo + MONDI.length) % MONDI.length

    return { ...s, catalogoVista: { mondo, sel: passo > 0 ? 0 : specieDel(mondo).length - 1 } }
  }
  if (key === 'down' || key === 's') return { ...s, catalogoVista: { ...cv, sel: (cv.sel + 3) % per } }
  if (key === 'up' || key === 'w') return { ...s, catalogoVista: { ...cv, sel: (cv.sel + per - 3) % per } }

  return s
}

// Il negozio: prima 1 sfere o 2 cure, poi il numero compra. 0 torna indietro, M chiude.
function tastoNegozio(s: Stato, key: string): Stato {
  if (key === 'm' || key === 'escape') return { ...s, negozio: false }
  const n = Number(key)
  if (s.negozio === 'scelta') {
    if (key === '0' || key === 'backspace') return { ...s, negozio: false }
    if (key === '1') return { ...s, negozio: 'sfere' }
    if (key === '2') return { ...s, negozio: 'cure' }

    return s
  }
  if (key === '0' || key === 'backspace') return { ...s, negozio: 'scelta' }
  const cosa = s.negozio === 'cure' ? 'cure' : 'sfere'

  return Number.isInteger(n) && n >= 1 && articoli(s, cosa)[n - 1] ? compra(s, cosa, n - 1) : s
}

// Lo zaino aperto: il numero usa quella sfera o quella cura (tra quelle che hai), 0 lo chiude.
function tastoZaino(s: Stato, key: string): Stato {
  if (key === '0' || key === 'backspace' || key === 'escape') return { ...s, zaino: null }
  const cosa = s.zaino!
  const scelta = nelloZaino(s[cosa])[Number(key) - 1]
  if (!Number.isInteger(Number(key)) || !scelta) return s

  return cosa === 'sfere' ? lancia(s, scelta.i) : usaCura(s, scelta.i)
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
    if (s.catalogoVista) return tastoCatalogo(s, key)
    if (s.scambio) return tastoScambio(s, key)
    const passo = PASSI[key]
    // Il negozio e lo zaino non bloccano il movimento: un passo li chiude.
    if (passo) return muovi(s.negozio || s.zaino ? { ...s, negozio: false, zaino: null } : s, passo[0], passo[1])
    if (s.negozio) return tastoNegozio(s, key)
    if (s.zaino) return tastoZaino(s, key)
    if (key === 'tab' || key === 'q') return ruotaSquadra(s)
    if (key === 'b') return apriScambio(s)
    if (key === 'l') return apriCatalogo(s)
    if (key === 'c') return apriZaino(s, 'cure')
    if (key === 'm') return alCentro(s) ? { ...s, negozio: 'scelta' } : conLog(s, 'Il negozio è al Centro cure.')
    if (key === 'p') return { ...statoMenu(), slot: s.slot }

    return s
  }
  if (s.modo !== 'lotta') return s
  if (s.cambio) {
    if (key === '0' || key === '5' || key === 'backspace') return { ...s, cambio: false }
    const j = Number(key)

    return Number.isInteger(j) && j >= 1 && j <= s.squadra.length ? cambiaInLotta(s, j - 1) : s
  }
  if (s.zaino) return tastoZaino(s, key)
  const n = Number(key)
  if (Number.isInteger(n) && n >= 1 && n <= VOCI_LOTTA) return azione(s, n - 1)
  if (key === 'c') return apriZaino(s, 'cure')
  if (key === 'up' || key === 'w') return { ...s, scelta: (s.scelta + VOCI_LOTTA - 1) % VOCI_LOTTA }
  if (key === 'down' || key === 's') return { ...s, scelta: (s.scelta + 1) % VOCI_LOTTA }
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
  palestra: '#4c9cff',
}

const somma = (quante: number[]) => quante.reduce((a, q) => a + q, 0)

// I colori delle sfere, come nella pixel art.
export const COLORE_SFERA = ['#e8483c', '#3c7ce8', '#f2c230', '#9c4cc8', '#ffd84c']
const COLORE_CURA = ['#6fd36f', '#4cc4c4', '#4c9cff', '#c46cd9', '#ffd84c']

// Le righe dello zaino aperto: numero, nome, quante ne hai e cosa fa (con la probabilità di cattura in lotta).
function righeZaino(s: Stato) {
  const cosa = s.zaino!

  return nelloZaino(s[cosa]).map(({ i, q }, k) => {
    const sfera = SFERE[i]!
    const cura = CURE[i]!
    const dettaglio =
      cosa === 'sfere'
        ? s.nemico ? `cattura ~${Math.round(probCattura(s, s.nemico, i) * 100)}%` : ''
        : cura.ps === Infinity ? 'tutti i PS' : `+${cura.ps} PS`

    return { k, i, q, nome: cosa === 'sfere' ? sfera.nome : cura.nome, dettaglio, colore: (cosa === 'sfere' ? COLORE_SFERA : COLORE_CURA)[i]! }
  })
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
        dopo.cure !== prima.cure ||
        dopo.monete !== prima.monete ||
        dopo.catalogo !== prima.catalogo ||
        dopo.visti !== prima.visti ||
        dopo.palestre !== prima.palestre ||
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
        <Box flexDirection="row" justifyContent="space-between">
          <Text mono bold color={COL.io}>MOSTRINI · menu principale</Text>
          <Text mono dimColor>versione {VERSIONE}</Text>
        </Box>
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
        {MONDI[s.mondo]!.nome} · Sfere {somma(s.sfere)} · Cure {somma(s.cure)} · Monete {s.monete} · Catalogo {cat.presi}/{cat.tot} · Medaglie {MONDI.filter((_, i) => medaglia(s, i)).length}/{MONDI.length}
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
    const voci = [
      'Botta' + segno('normale'),
      MOSSA[di.tipo] + segno(di.tipo),
      s.allenatore ? 'Sfera (non contro un allenatore)' : `Sfera… (${somma(s.sfere)})`,
      `Cura… (${somma(s.cure)})`,
      'Cambia Mostrino',
      s.allenatore ? 'Scappa (non da una sfida)' : 'Scappa',
    ]
    // La sfera accanto al nome solo per le specie catturate, non per quelle soltanto sconfitte.
    const giaPreso = !!s.catturati?.includes(nem.sp)
    const palestra = s.allenatore?.palestra

    return (
      <Box flexDirection="column">
        {testa}
        {s.allenatore && (
          <Text mono bold color={COL.centro}>
            {palestra === 'capo' ? 'Palestra · ' : palestra ? `Palestra · sfida ${vinteIn(s, s.mondo) + 1}/${allievi(s.mondo)} · ` : 'Sfida di '}
            {s.allenatore.nome} · gli restano {s.allenatore.squadra.length + 1} Mostrini
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
        ) : s.zaino ? (
          <Box flexDirection="column" marginTop={1}>
            <Text mono bold color={COL.io}>{s.zaino === 'sfere' ? 'Quale sfera lanci?' : `Quale cura usi su ${nome(io!)} (${io!.hp}/${maxHp(io!)} PS)?`} Premi il numero (0 annulla)</Text>
            {righeZaino(s).map(r => (
              <Text mono key={'z' + r.i}>
                <Text mono bold>{r.k + 1}</Text> <Text mono color={r.colore}>●</Text> {r.nome} ×{r.q}{r.dettaglio ? ` · ${r.dettaglio}` : ''}
              </Text>
            ))}
          </Box>
        ) : (
        <Box flexDirection="column" marginTop={1}>
          {grafica && giaPreso && <Text mono dimColor>◓ {dn.nome}: l'hai già catturato</Text>}
          <Text mono dimColor>Bioma {MONDI[s.mondo]!.nome}: {affinita(s.mondo)}</Text>
          {voci.map((v, i) => (
            <Text mono key={'v' + i} inverse={i === s.scelta}>
              {' '}
              {i + 1} {v}{' '}
            </Text>
          ))}
        </Box>
        )}
        {registro}
      </Box>
    )
  }

  if (s.catalogoVista) {
    const cv = s.catalogoVista
    const voci = vociCatalogo(s, cv.mondo)
    const scelta = voci[cv.sel]

    return (
      <Box flexDirection="column">
        {testa}
        <Text mono bold color={COL.io}>
          Catalogo · {cv.mondo + 1}/{MONDI.length} {MONDI[cv.mondo]!.nome} {voci.filter(v => v.preso).length}/{voci.length} · in tutto {s.catalogo.length}/{Object.keys(SPECIE).length}
        </Text>
        {!grafica && (
          <Box flexDirection="column" marginTop={1}>
            {voci.map((v, i) => (
              <Text mono key={'k' + i} inverse={i === cv.sel} dimColor={!v.preso}>
                {' '}{v.preso ? '◓' : v.visto ? '○' : '·'} #{String(v.numero).padStart(2, '0')} {v.noto ? SPECIE[v.sp]!.nome : '???'}
                {v.noto && <Text mono color={COLORE_TIPO[SPECIE[v.sp]!.tipo]}> {SPECIE[v.sp]!.tipo}</Text>}
                {v.preso ? '' : v.visto ? ' · visto' : ' · manca'}{v.raro && v.noto ? ' · raro' : ''}{' '}
              </Text>
            ))}
          </Box>
        )}
        {scelta && (
          <Box marginTop={1}>
            <Text mono wrap="wrap">{descrizione(scelta)}</Text>
          </Box>
        )}
        <Text mono dimColor>Frecce scegli · 1-{MONDI.length} cambia mondo · L o 0 chiude il catalogo</Text>
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
      if (t === 'G') return <Text mono key={'c' + x} bold color={COL.palestra}>G </Text>

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
      ) : s.negozio === 'scelta' ? (
        <Box flexDirection="column" marginTop={1}>
          <Text mono bold color={COL.centro}>Negozio del Centro cure · hai {s.monete} monete</Text>
          <Text mono><Text mono bold>1</Text> Sfere ({SFERE.slice(0, s.mondo + 1).map(a => a.nome).join(', ')})</Text>
          <Text mono><Text mono bold>2</Text> Cure ({CURE.slice(0, s.mondo + 1).map(a => a.nome).join(', ')})</Text>
          <Text mono dimColor>Premi 1 o 2 · M o 0 chiude il negozio · muoviti per uscire</Text>
        </Box>
      ) : s.negozio ? (
        <Box flexDirection="column" marginTop={1}>
          <Text mono bold color={COL.centro}>Negozio · {s.negozio === 'sfere' ? 'Sfere' : 'Cure'} · hai {s.monete} monete</Text>
          {articoli(s, s.negozio).map((a, i) => (
            <Text mono key={'a' + i}>
              <Text mono bold>{i + 1}</Text> <Text mono color={(a.cosa === 'sfere' ? COLORE_SFERA : COLORE_CURA)[i]!}>●</Text> {a.nome} ({a.descr}) · {a.prezzo} monete · ne hai {s[a.cosa][i] ?? 0}/{a.max}
            </Text>
          ))}
          <Text mono dimColor>Premi il numero per comprare · 0 torna indietro · M chiude · muoviti per uscire</Text>
        </Box>
      ) : s.zaino ? (
        <Box flexDirection="column" marginTop={1}>
          <Text mono bold color={COL.io}>Quale cura usi su {nome(s.squadra[0]!)} ({s.squadra[0]!.hp}/{maxHp(s.squadra[0]!)} PS)? Premi il numero (0 annulla)</Text>
          {righeZaino(s).map(r => (
            <Text mono key={'z' + r.i}>
              <Text mono bold>{r.k + 1}</Text> <Text mono color={r.colore}>●</Text> {r.nome} ×{r.q} · {r.dettaglio}
            </Text>
          ))}
        </Box>
      ) : (
        s.box.length > 0 && <Text mono dimColor>Box: {s.box.map(m => nome(m) + ' Lv' + m.lvl).join(', ')}</Text>
      )}
      {alCentro(s) && !s.scambio && !s.negozio && <Text mono color={COL.centro}>Sei al Centro cure: M apre il negozio</Text>}
      {!s.scambio && !s.negozio && !s.zaino && (
        <Text mono dimColor>
          Bioma {MONDI[s.mondo]!.nome}: {affinita(s.mondo)} · Lv {MONDI[s.mondo]!.lvlMin}-{MONDI[s.mondo]!.lvlMax} · Palestra (G){' '}
          {medaglia(s, s.mondo) ? `vinta: ${MONDI[s.mondo]!.palestra.medaglia}` : vinteIn(s, s.mondo) < allievi(s.mondo) ? `${vinteIn(s, s.mondo)}/${allievi(s.mondo)} allievi` : `tocca a ${MONDI[s.mondo]!.palestra.capo}`}
        </Text>
      )}
      {!s.scambio && !s.negozio && !s.zaino && <Text mono dimColor>Frecce/WASD muovi · Q capofila · B box · L catalogo · C cure ({somma(s.cure)}) · P menu{portaleAperto(s) ? ' · portale aperto' : ''}</Text>}
    </Box>
  )
}

export default Gioco

import type { ClientModule, ClientKeyEvent } from 'claude-code'
import type { Tipo, Mostrino, Stato } from '../types'

export type { Tipo, Mostrino, Modo, Stato } from '../types'

// ---------- Dati di gioco ----------

// mondo: 0 la Prateria, 1 le Vette Gelate (si apre col catalogo della Prateria completo).
export type Specie = { nome: string; tipo: Tipo; hp: number; atk: number; mondo: number; arte: [string, string] }

export const SPECIE: Record<string, Specie> = {
  braciotto: { nome: 'Braciotto', tipo: 'fuoco', hp: 19, atk: 7, mondo: 0, arte: [' ,^^, ', '(o.o)~'] },
  fumarello: { nome: 'Fumarello', tipo: 'fuoco', hp: 22, atk: 6, mondo: 0, arte: ['  )) ', '(-_-)'] },
  goccetto: { nome: 'Goccetto', tipo: 'acqua', hp: 21, atk: 6, mondo: 0, arte: ['  ^  ', '(o_o)'] },
  ondina: { nome: 'Ondina', tipo: 'acqua', hp: 18, atk: 7, mondo: 0, arte: [' ~~~ ', '<°_°>'] },
  germoglio: { nome: 'Germoglio', tipo: 'erba', hp: 22, atk: 6, mondo: 0, arte: [' \\|/ ', '(^.^)'] },
  muschietto: { nome: 'Muschietto', tipo: 'erba', hp: 25, atk: 5, mondo: 0, arte: [' .:. ', '{u_u}'] },
  zampetto: { nome: 'Zampetto', tipo: 'normale', hp: 20, atk: 6, mondo: 0, arte: [' /\\_/\\', '( •ᴗ•)'] },
  piumino: { nome: 'Piumino', tipo: 'normale', hp: 17, atk: 7, mondo: 0, arte: ['  __ ', '<(v)>'] },
  scintillo: { nome: 'Scintillo', tipo: 'elettro', hp: 18, atk: 8, mondo: 0, arte: [' /\\/ ', '[*_*]'] },
  gelino: { nome: 'Gelino', tipo: 'ghiaccio', hp: 20, atk: 7, mondo: 1, arte: [' * * ', '(o~o)'] },
  nevischio: { nome: 'Nevischio', tipo: 'ghiaccio', hp: 23, atk: 6, mondo: 1, arte: [' .*. ', '(-.-)'] },
  sassolo: { nome: 'Sassolo', tipo: 'roccia', hp: 26, atk: 6, mondo: 1, arte: ['  __ ', '[o_o]'] },
  macigno: { nome: 'Macigno', tipo: 'roccia', hp: 30, atk: 5, mondo: 1, arte: [' /--\\', '[=_=]'] },
  lavotto: { nome: 'Lavotto', tipo: 'fuoco', hp: 21, atk: 8, mondo: 1, arte: [' ^^^ ', '(>_<)'] },
  brinella: { nome: 'Brinella', tipo: 'acqua', hp: 22, atk: 7, mondo: 1, arte: [' ~*~ ', '(o.o)'] },
  licheno: { nome: 'Licheno', tipo: 'erba', hp: 24, atk: 6, mondo: 1, arte: [' ,., ', '{o_o}'] },
  yetino: { nome: 'Yetino', tipo: 'normale', hp: 27, atk: 6, mondo: 1, arte: [' MMM ', '(o_O)'] },
  tuonello: { nome: 'Tuonello', tipo: 'elettro', hp: 22, atk: 9, mondo: 1, arte: [' >>> ', '[@_@]'] },
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
}

const COLORE_TIPO: Record<Tipo, string> = {
  fuoco: '#ff8a4c',
  acqua: '#4cb4ff',
  erba: '#6fd36f',
  elettro: '#ffd84c',
  normale: '#d6c7b0',
  ghiaccio: '#9fe6ff',
  roccia: '#b89a72',
}

export function efficacia(att: Tipo, dif: Tipo): number {
  const forte: Record<string, Tipo[]> = {
    fuoco: ['erba', 'ghiaccio'],
    acqua: ['fuoco', 'roccia'],
    erba: ['acqua', 'roccia'],
    elettro: ['acqua'],
    ghiaccio: ['erba'],
    roccia: ['fuoco', 'ghiaccio', 'elettro'],
  }
  const debole: Record<string, Tipo[]> = {
    fuoco: ['acqua', 'fuoco', 'roccia'],
    acqua: ['erba', 'acqua'],
    erba: ['fuoco', 'erba'],
    elettro: ['erba', 'elettro', 'roccia'],
    ghiaccio: ['fuoco', 'ghiaccio', 'roccia'],
    roccia: ['roccia'],
  }
  if (forte[att]?.includes(dif)) return 1.5
  if (debole[att]?.includes(dif)) return 0.6

  return 1
}

// Ogni casella occupa due caratteri a schermo.
// # albero  , erba alta  ~ acqua  . sentiero  C centro cure  P portale tra i mondi
export type Mondo = { nome: string; mappa: string[]; raro: string; lvlMin: number }

export const MONDI: Mondo[] = [
  {
    nome: 'Prateria',
    raro: 'scintillo',
    lvlMin: 2,
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
    raro: 'tuonello',
    lvlMin: 8,
    mappa: [
      '####################',
      '#...,,,,,..##,,,,,,#',
      '#.C.,,,,,..##,,,,,,#',
      '#...,,,,,......,,,,#',
      '#.....~~~~...,,,,,,#',
      '#,,,..~~~~..,,,..,,#',
      '#,,,,......,,,,..,,#',
      '#,,,,,,..##..,,,,,,#',
      '#P,,,,,..##.....,,,#',
      '####################',
    ],
  },
]
export const MAPPA = MONDI[0]!.mappa
export const CENTRO = { x: 2, y: 2 }
const SFERE_MAX = 5
export const CURE_MAX = 5
const CURA_PS = 20
export const CURA_PREZZO = 15
// La super cura si vende solo dal secondo mondo in poi.
const SUPER_PS = 50
export const SUPER_PREZZO = 40
export const SQUADRA_MAX = 3

export const maxHp = (m: Mostrino) => SPECIE[m.sp].hp + m.lvl * 3
const atk = (m: Mostrino) => SPECIE[m.sp].atk + m.lvl * 2
const nome = (m: Mostrino) => SPECIE[m.sp].nome

export const specieDel = (mondo: number) => Object.keys(SPECIE).filter(k => SPECIE[k].mondo === mondo)

// Il portale si apre quando il catalogo del mondo precedente è completo.
// Il catalogo di un mondo conta le specie di quel mondo e dei mondi prima: 9 nella Prateria, 18 nelle Vette.
export function catalogoDel(s: Stato): { presi: number; tot: number } {
  const specie = Object.keys(SPECIE).filter(k => SPECIE[k].mondo <= s.mondo)

  return { presi: specie.filter(k => s.catalogo.includes(k)).length, tot: specie.length }
}

export function portaleAperto(s: Stato): boolean {
  return specieDel(0).every(sp => s.catalogo.includes(sp))
}

function nuovo(sp: string, lvl: number): Mostrino {
  const m = { sp, lvl, xp: 0, hp: 0 }
  m.hp = maxHp(m)

  return m
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
    sfere: SFERE_MAX,
    cure: 2,
    cureForti: 0,
    monete: 0,
    log: ['Scegli il tuo primo Mostrino: premi 1, 2 o 3.'],
    nemico: null,
    scelta: 0,
  }
}

// Le partite salvate prima del box e dei mondi: squadra oltre 3 nel box, campi nuovi ai valori iniziali.
export function normalizza(salvato: Partial<Stato>): Stato {
  const s: Stato = { ...statoIniziale(), ...salvato }
  const box = s.box ?? []
  const squadra = s.squadra.slice(0, SQUADRA_MAX)

  return {
    ...s,
    modo: s.modo === 'lotta' ? 'mappa' : s.modo,
    nemico: null,
    lancio: false,
    scambio: null,
    squadra,
    box: [...box, ...s.squadra.slice(SQUADRA_MAX)],
    mondo: MONDI[s.mondo ?? 0] ? (s.mondo ?? 0) : 0,
  }
}

function conLog(s: Stato, ...righe: string[]): Stato {
  return { ...s, log: [...s.log, ...righe].slice(-3) }
}

function curaTutti(s: Stato): Stato {
  return { ...s, sfere: SFERE_MAX, squadra: s.squadra.map(m => ({ ...m, hp: maxHp(m) })) }
}

// Registra una specie nel catalogo e annuncia il portale quando la Prateria è completa.
function registra(s: Stato, sp: string): { s: Stato; righe: string[] } {
  if (s.catalogo.includes(sp)) return { s, righe: [] }
  const n = { ...s, catalogo: [...s.catalogo, sp] }
  const righe = [`Nuovo nel catalogo: ${SPECIE[sp].nome}!`]
  if (!portaleAperto(s) && portaleAperto(n)) righe.push('Catalogo della Prateria completo: si è aperto un portale (P)!')
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
  const media = Math.round(s.squadra.reduce((a, m) => a + m.lvl, 0) / Math.max(1, s.squadra.length))
  const lvl = Math.max(mondo.lvlMin, media - 1 + Math.floor(rnd() * 3))
  const nemico = nuovo(sp, lvl)

  return conLog(
    { ...s, modo: 'lotta', nemico, scelta: 0, lancio: false },
    `Un ${SPECIE[sp].nome} selvatico (Lv ${lvl}) ti sbarra la strada!`,
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
  let n: Stato = { ...s, x: nx, y: ny }
  if (t === 'C') return conLog(curaTutti(n), 'Centro cure: squadra in forma e sfere ricaricate.')
  if (t === 'P') {
    const mondo = s.mondo === 0 ? 1 : 0

    return conLog(
      { ...n, mondo, x: CENTRO.x + 1, y: CENTRO.y },
      `Attraversi il portale: benvenuto nella ${MONDI[mondo]!.nome === 'Prateria' ? 'Prateria' : 'terra delle ' + MONDI[mondo]!.nome}!`,
    )
  }
  if (t === ',' && rnd() < 0.14) n = incontro(n, rnd)

  return n
}

function danno(a: Mostrino, d: Mostrino, potenza: number, tipo: Tipo, rnd: () => number) {
  const eff = efficacia(tipo, SPECIE[d.sp].tipo)
  const val = Math.max(1, Math.round(((atk(a) * potenza) / 10) * eff * (0.85 + rnd() * 0.3)))

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
  const { val, eff } = danno(nem, io, tipoMossa === 'normale' ? 5 : 7, tipoMossa, rnd)
  const hp = Math.max(0, io.hp - val)
  const squadra = [{ ...io, hp }, ...s.squadra.slice(1)]
  let n = conLog({ ...s, squadra }, `${nome(nem)} usa ${nomeMossa}: -${val} PS.${nota(eff)}`)
  if (hp > 0) return n
  const vivo = n.squadra.findIndex(m => m.hp > 0)
  if (vivo === -1) {
    n = curaTutti({ ...n, modo: 'mappa', nemico: null, lancio: false, x: CENTRO.x + 1, y: CENTRO.y })

    return conLog(n, `${nome(io)} è esausto. Corri al Centro cure!`)
  }
  const ordinata = [n.squadra[vivo], ...n.squadra.filter((_, i) => i !== vivo)]

  return conLog({ ...n, squadra: ordinata }, `${nome(io)} è esausto. Vai, ${nome(ordinata[0])}!`)
}

function cresce(m: Mostrino, xp: number, righe: string[]): Mostrino {
  let io = { ...m, xp: m.xp + xp }
  while (io.xp >= io.lvl * 8) {
    io = { ...io, xp: io.xp - io.lvl * 8, lvl: io.lvl + 1 }
    io.hp = Math.min(maxHp(io), io.hp + 4)
    righe.push(`${nome(io)} sale al livello ${io.lvl}!`)
  }

  return io
}

// Chi combatte prende tutta l'esperienza, il resto della squadra in forma la metà.
function vittoria(s: Stato, rnd: () => number): Stato {
  const nem = s.nemico!
  const xp = nem.lvl * 4
  const vinte = nem.lvl * 2
  const righe = [`${nome(nem)} è sconfitto! +${xp} esperienza, +${vinte} monete.`]
  const squadra = s.squadra.map((m, i) =>
    i === 0 ? cresce(m, xp, righe) : m.hp > 0 ? cresce(m, Math.ceil(xp / 2), righe) : m,
  )
  // A volte il Mostrino sconfitto lascia una cura.
  const trovata = s.cure < CURE_MAX && rnd() < 0.25
  if (trovata) righe.push('Hai trovato una cura!')
  const cure = trovata ? s.cure + 1 : s.cure
  const monete = s.monete + vinte
  const r = registra({ ...s, modo: 'mappa', nemico: null, lancio: false, squadra, cure, monete }, nem.sp)

  return conLog(r.s, ...righe, ...r.righe)
}

export function azione(s0: Stato, i: number, rnd: () => number = Math.random): Stato {
  if (s0.modo !== 'lotta' || !s0.nemico) return s0
  const s = { ...s0, lancio: false }
  const io = s.squadra[0]
  const nem = s.nemico!
  if (i === 0 || i === 1) {
    const tipo: Tipo = i === 0 ? 'normale' : SPECIE[io.sp].tipo
    const nomeMossa = i === 0 ? 'Botta' : MOSSA[tipo]
    const { val, eff } = danno(io, nem, i === 0 ? 5 : 7, tipo, rnd)
    const hp = Math.max(0, nem.hp - val)
    const n = conLog({ ...s, nemico: { ...nem, hp } }, `${nome(io)} usa ${nomeMossa}: -${val} PS.${nota(eff)}`)

    return hp === 0 ? vittoria(n, rnd) : turnoNemico(n, rnd)
  }
  if (i === 2) {
    if (s.sfere <= 0) return conLog(s, 'Niente sfere. Passa dal Centro cure (C).')
    const n = { ...s, sfere: s.sfere - 1 }
    const prob = 0.25 + 0.6 * (1 - nem.hp / maxHp(nem))
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

    return turnoNemico(conLog({ ...n, lancio: true }, `${nome(nem)} è uscito dalla sfera!`), rnd)
  }
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
        ? 'Nessuna super cura: comprala al Centro cure delle Vette Gelate (N).'
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

// M compra una cura, N una super cura (solo dalle Vette Gelate in poi), sempre sul Centro cure.
export function compraCura(s: Stato, forte = false): Stato {
  const cosa = forte ? 'super cura' : 'cura'
  if (forte && s.mondo < 1) return conLog(s, 'Le super cure si vendono solo nelle Vette Gelate.')
  if (!alCentro(s)) return conLog(s, `Le ${forte ? 'super cure' : 'cure'} si comprano al Centro cure.`)
  const quante = forte ? s.cureForti : s.cure
  if (quante >= CURE_MAX) return conLog(s, `Hai già ${CURE_MAX} ${forte ? 'super cure' : 'cure'}, il massimo.`)
  const prezzo = forte ? SUPER_PREZZO : CURA_PREZZO
  if (s.monete < prezzo) return conLog(s, `Una ${cosa} costa ${prezzo} monete, ne hai ${s.monete}. Vinci qualche lotta!`)
  const scorte = forte ? { cureForti: s.cureForti + 1 } : { cure: s.cure + 1 }

  return conLog({ ...s, ...scorte, monete: s.monete - prezzo }, `Hai comprato una ${cosa} (-${prezzo} monete).`)
}

export function ruotaSquadra(s: Stato): Stato {
  if (s.squadra.length < 2) return s
  const squadra = [...s.squadra.slice(1), s.squadra[0]]

  return conLog({ ...s, squadra }, `In testa ora c'è ${nome(squadra[0])}.`)
}

// B apre lo scambio col box: prima scegli chi entra (1-9 nel box), poi chi esce dalla squadra (1-3).
// Con la squadra non piena il Mostrino scelto entra senza che nessuno esca.
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

function tastoScambio(s: Stato, key: string): Stato {
  const sc = s.scambio!
  if (key === 'b' || key === '0' || key === 'backspace') return { ...s, scambio: null }
  const n = Number(key)
  if (sc.entra === null) {
    const pagine = Math.ceil(s.box.length / PER_PAGINA)
    if (key === 'down' || key === 's' || key === 'right' || key === 'd') {
      return { ...s, scambio: { ...sc, pagina: (sc.pagina + 1) % pagine } }
    }
    if (key === 'up' || key === 'w' || key === 'left' || key === 'a') {
      return { ...s, scambio: { ...sc, pagina: (sc.pagina + pagine - 1) % pagine } }
    }
    if (!Number.isInteger(n) || n < 1 || n > PER_PAGINA) return s
    const i = sc.pagina * PER_PAGINA + n - 1
    if (!s.box[i]) return s
    // Squadra non piena: entra subito.
    if (s.squadra.length < SQUADRA_MAX) return scambia(s, i, null)

    return { ...s, scambio: { ...sc, entra: i } }
  }
  if (!Number.isInteger(n) || n < 1 || n > s.squadra.length) return s

  return scambia(s, sc.entra, n - 1)
}

export function tasto(s: Stato, k: ClientKeyEvent): Stato {
  const key = k.key.toLowerCase()
  if (s.modo === 'inizio') {
    const i = ['1', '2', '3'].indexOf(key)

    return i >= 0 ? scegliIniziale(s, i) : s
  }
  if (s.modo === 'mappa') {
    if (s.scambio) return tastoScambio(s, key)
    if (key === 'up' || key === 'w') return muovi(s, 0, -1)
    if (key === 'down' || key === 's') return muovi(s, 0, 1)
    if (key === 'left' || key === 'a') return muovi(s, -1, 0)
    if (key === 'right' || key === 'd') return muovi(s, 1, 0)
    if (key === 'tab' || key === 'q') return ruotaSquadra(s)
    if (key === 'b') return apriScambio(s)
    if (key === 'c') return usaCura(s)
    if (key === 'x') return usaCura(s, Math.random, true)
    if (key === 'm') return compraCura(s)
    if (key === 'n') return compraCura(s, true)

    return s
  }
  const n = ['1', '2', '3', '4'].indexOf(key)
  if (n >= 0) return azione(s, n)
  if (key === 'c') return usaCura(s)
  if (key === 'x') return usaCura(s, Math.random, true)
  if (key === 'up' || key === 'w') return { ...s, scelta: (s.scelta + 3) % 4 }
  if (key === 'down' || key === 's') return { ...s, scelta: (s.scelta + 1) % 4 }
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
}

function barra(m: Mostrino, larghezza = 10) {
  const r = m.hp / maxHp(m)
  const pieni = Math.round(r * larghezza)
  const colore = r > 0.5 ? '#6fd36f' : r > 0.2 ? '#ffd84c' : '#ff6b6b'

  return { pieni: '█'.repeat(pieni), vuoti: '░'.repeat(larghezza - pieni), colore }
}

// grafica: il pannello disegna mappa e lotte in pixel art (app desktop),
// qui restano solo menu, squadra e messaggi.
type Props = { save?: Stato | null; grafica?: boolean } | null

// Un solo messaggio per volta arriva al pannello, quindi stato e salvataggio viaggiano insieme.
type Messaggio = { type: 'vista'; stato: Stato; salva: boolean }

let grafica = false

const Gioco: ClientModule<any, Stato> = (props: Props, surface) => {
  const { Box, Text } = surface.elements
  grafica = !!props?.grafica
  const invia = (stato: Stato, salva: boolean) => {
    if (!grafica && !salva) return
    const m: Messaggio = { type: 'vista', stato, salva }
    surface.post(m as any)
  }
  if (surface.state === undefined) {
    surface.onKey(k => {
      const prima = surface.state ?? statoIniziale()
      const dopo = tasto(prima, k)
      if (dopo === prima) return
      surface.setState(dopo)
      const salva =
        dopo.modo !== prima.modo ||
        dopo.squadra !== prima.squadra ||
        dopo.sfere !== prima.sfere ||
        dopo.cure !== prima.cure ||
        dopo.cureForti !== prima.cureForti ||
        dopo.monete !== prima.monete ||
        dopo.catalogo !== prima.catalogo ||
        dopo.box !== prima.box ||
        dopo.mondo !== prima.mondo
      invia(dopo, salva && dopo.modo !== 'lotta')
    })
    const salvato = props?.save
    const inizio: Stato = salvato && salvato.modo ? normalizza(salvato) : statoIniziale()
    surface.setState(inizio)
    invia(inizio, false)
  }
  const s = surface.state ?? statoIniziale()
  const cat = catalogoDel(s)

  const testa = (
    <Box flexDirection="row" justifyContent="space-between">
      <Text mono bold color={COL.io}>MOSTRINI</Text>
      <Text mono dimColor>
        {MONDI[s.mondo]!.nome} · Sfere {s.sfere}/{SFERE_MAX} · Cure {s.cure}{s.mondo >= 1 || s.cureForti > 0 ? ` · Super ${s.cureForti}` : ''} · Monete {s.monete} · Catalogo {cat.presi}/{cat.tot}
      </Text>
    </Box>
  )

  const registro = (
    <Box flexDirection="column" marginTop={1}>
      {s.log.map((r, i) => (
        <Text mono key={'l' + i} dimColor={i < s.log.length - 1} wrap="wrap">
          {r}
        </Text>
      ))}
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
        <Text mono dimColor>Clicca qui sul pannello, poi usa la tastiera.</Text>
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
    const voci = ['Botta', MOSSA[di.tipo], `Sfera (${s.sfere})`, 'Scappa']

    return (
      <Box flexDirection="column">
        {testa}
        {!grafica && (
        <Box flexDirection="column">
        <Box flexDirection="row" justifyContent="space-between" marginTop={1}>
          <Box flexDirection="column">
            <Text mono>
              <Text mono bold>{dn.nome}</Text> Lv {nem.lvl} <Text mono color={COLORE_TIPO[dn.tipo]}>{dn.tipo}</Text>
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
              <Text mono bold>{di.nome}</Text> Lv {io.lvl} <Text mono color={COLORE_TIPO[di.tipo]}>{di.tipo}</Text>
            </Text>
            <Text mono>
              <Text mono color={bi.colore}>{bi.pieni}</Text>
              <Text mono dimColor>{bi.vuoti}</Text> {io.hp}/{maxHp(io)}
            </Text>
          </Box>
        </Box>
        </Box>
        )}
        <Box flexDirection="column" marginTop={1}>
          {voci.map((v, i) => (
            <Text mono key={'v' + i} inverse={i === s.scelta}>
              {' '}
              {i + 1} {v}{' '}
            </Text>
          ))}
          {s.cure > 0 && <Text mono dimColor>C usa una cura ({s.cure})</Text>}
          {s.cureForti > 0 && <Text mono dimColor>X usa una super cura ({s.cureForti})</Text>}
        </Box>
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
              <Text mono color={COLORE_TIPO[d.tipo]}>{d.nome}</Text> Lv{m.lvl} {m.hp}/{maxHp(m)}
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
              <Text mono bold color={COL.io}>
                Box: chi entra in squadra? Premi il numero
                {s.box.length > PER_PAGINA ? ` · pagina ${s.scambio.pagina + 1}/${Math.ceil(s.box.length / PER_PAGINA)} (frecce)` : ''}
              </Text>
              {s.box.slice(s.scambio.pagina * PER_PAGINA, (s.scambio.pagina + 1) * PER_PAGINA).map((m, i) => (
                <Text mono key={'b' + i}>
                  <Text mono bold>{i + 1}</Text> <Text mono color={COLORE_TIPO[SPECIE[m.sp].tipo]}>{SPECIE[m.sp].nome}</Text> Lv{m.lvl} {m.hp}/{maxHp(m)}
                </Text>
              ))}
            </Box>
          ) : (
            <Box flexDirection="column">
              <Text mono bold color={COL.io}>
                Entra {SPECIE[s.box[s.scambio.entra]!.sp].nome}: chi esce dalla squadra? Premi il numero
              </Text>
              {s.squadra.map((m, i) => (
                <Text mono key={'q' + i}>
                  <Text mono bold>{i + 1}</Text> <Text mono color={COLORE_TIPO[SPECIE[m.sp].tipo]}>{SPECIE[m.sp].nome}</Text> Lv{m.lvl} {m.hp}/{maxHp(m)}
                </Text>
              ))}
            </Box>
          )}
          <Text mono dimColor>B o 0 annulla lo scambio</Text>
        </Box>
      ) : (
        s.box.length > 0 && <Text mono dimColor>Box: {s.box.map(m => SPECIE[m.sp].nome + ' Lv' + m.lvl).join(', ')}</Text>
      )}
      {alCentro(s) && !s.scambio && (
        <Text mono color={COL.centro}>
          Negozio: M cura +20 PS ({CURA_PREZZO} monete){s.mondo >= 1 ? ` · N super cura +50 PS (${SUPER_PREZZO} monete)` : ''} · hai {s.monete} monete
        </Text>
      )}
      {!s.scambio && <Text mono dimColor>Frecce/WASD muovi · Q cambia capofila · B scambia col box{s.cure > 0 ? ` · C cura (${s.cure})` : ''}{s.cureForti > 0 ? ` · X super cura (${s.cureForti})` : ''}{portaleAperto(s) ? ' · P portale' : ''}</Text>}
    </Box>
  )
}

export default Gioco

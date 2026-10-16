import type { ClientModule, ClientKeyEvent } from 'claude-code'

// ---------- Dati di gioco ----------

export type Tipo = 'fuoco' | 'acqua' | 'erba' | 'elettro' | 'normale'
export type Specie = { nome: string; tipo: Tipo; hp: number; atk: number; arte: [string, string] }
export type Mostrino = { sp: string; lvl: number; xp: number; hp: number }
export type Modo = 'inizio' | 'mappa' | 'lotta'
export type Stato = {
  modo: Modo
  x: number
  y: number
  squadra: Mostrino[]
  catalogo: string[]
  sfere: number
  log: string[]
  nemico: Mostrino | null
  scelta: number
}

export const SPECIE: Record<string, Specie> = {
  braciotto: { nome: 'Braciotto', tipo: 'fuoco', hp: 19, atk: 7, arte: [' ,^^, ', '(o.o)~'] },
  fumarello: { nome: 'Fumarello', tipo: 'fuoco', hp: 22, atk: 6, arte: ['  )) ', '(-_-)'] },
  goccetto: { nome: 'Goccetto', tipo: 'acqua', hp: 21, atk: 6, arte: ['  ^  ', '(o_o)'] },
  ondina: { nome: 'Ondina', tipo: 'acqua', hp: 18, atk: 7, arte: [' ~~~ ', '<°_°>'] },
  germoglio: { nome: 'Germoglio', tipo: 'erba', hp: 22, atk: 6, arte: [' \\|/ ', '(^.^)'] },
  muschietto: { nome: 'Muschietto', tipo: 'erba', hp: 25, atk: 5, arte: [' .:. ', '{u_u}'] },
  zampetto: { nome: 'Zampetto', tipo: 'normale', hp: 20, atk: 6, arte: [' /\\_/\\', '( •ᴗ•)'] },
  piumino: { nome: 'Piumino', tipo: 'normale', hp: 17, atk: 7, arte: ['  __ ', '<(v)>'] },
  scintillo: { nome: 'Scintillo', tipo: 'elettro', hp: 18, atk: 8, arte: [' /\\/ ', '[*_*]'] },
}

export const INIZIALI = ['braciotto', 'goccetto', 'germoglio']

const MOSSA: Record<Tipo, string> = {
  fuoco: 'Fiammata',
  acqua: 'Spruzzo',
  erba: 'Frustata',
  elettro: 'Scossa',
  normale: 'Rotolone',
}

const COLORE_TIPO: Record<Tipo, string> = {
  fuoco: '#ff8a4c',
  acqua: '#4cb4ff',
  erba: '#6fd36f',
  elettro: '#ffd84c',
  normale: '#d6c7b0',
}

export function efficacia(att: Tipo, dif: Tipo): number {
  const forte: Record<string, Tipo[]> = {
    fuoco: ['erba'],
    acqua: ['fuoco'],
    erba: ['acqua'],
    elettro: ['acqua'],
  }
  const debole: Record<string, Tipo[]> = {
    fuoco: ['acqua', 'fuoco'],
    acqua: ['erba', 'acqua'],
    erba: ['fuoco', 'erba'],
    elettro: ['erba', 'elettro'],
  }
  if (forte[att]?.includes(dif)) return 1.5
  if (debole[att]?.includes(dif)) return 0.6

  return 1
}

// Ogni casella occupa due caratteri a schermo.
// # albero  , erba alta  ~ acqua  . sentiero  C centro cure
export const MAPPA = [
  '####################',
  '#....,,,,,,....~~~~#',
  '#.C..,,,,,,.....~~~#',
  '#....,,,,,,,,.....,#',
  '#..........,,,,..,,#',
  '#,,,,..##.....,,,,,#',
  '#,,,,..##..~~..,,,,#',
  '#,,,,,.....~~..,,,,#',
  '#,,,,,,,,......,,,,#',
  '####################',
]
export const CENTRO = { x: 2, y: 2 }
const SFERE_MAX = 5
const SQUADRA_MAX = 4

export const maxHp = (m: Mostrino) => SPECIE[m.sp].hp + m.lvl * 3
const atk = (m: Mostrino) => SPECIE[m.sp].atk + m.lvl * 2
const nome = (m: Mostrino) => SPECIE[m.sp].nome

function nuovo(sp: string, lvl: number): Mostrino {
  const m = { sp, lvl, xp: 0, hp: 0 }
  m.hp = maxHp(m)

  return m
}

export function statoIniziale(): Stato {
  return {
    modo: 'inizio',
    x: CENTRO.x + 1,
    y: CENTRO.y,
    squadra: [],
    catalogo: [],
    sfere: SFERE_MAX,
    log: ['Scegli il tuo primo Mostrino: premi 1, 2 o 3.'],
    nemico: null,
    scelta: 0,
  }
}

function conLog(s: Stato, ...righe: string[]): Stato {
  return { ...s, log: [...s.log, ...righe].slice(-3) }
}

function curaTutti(s: Stato): Stato {
  return { ...s, sfere: SFERE_MAX, squadra: s.squadra.map(m => ({ ...m, hp: maxHp(m) })) }
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
  const pool = Object.keys(SPECIE).filter(k => k !== 'scintillo')
  const sp = rnd() < 0.08 ? 'scintillo' : pool[Math.floor(rnd() * pool.length)]
  const media = Math.round(s.squadra.reduce((a, m) => a + m.lvl, 0) / Math.max(1, s.squadra.length))
  const lvl = Math.max(2, media - 1 + Math.floor(rnd() * 3))
  const nemico = nuovo(sp, lvl)

  return conLog({ ...s, modo: 'lotta', nemico, scelta: 0 }, `Un ${SPECIE[sp].nome} selvatico (Lv ${lvl}) ti sbarra la strada!`)
}

export function muovi(s: Stato, dx: number, dy: number, rnd: () => number = Math.random): Stato {
  const nx = s.x + dx
  const ny = s.y + dy
  const t = MAPPA[ny]?.[nx]
  if (t === undefined || t === '#' || t === '~') return s
  let n: Stato = { ...s, x: nx, y: ny }
  if (t === 'C') return conLog(curaTutti(n), 'Centro cure: squadra in forma e sfere ricaricate.')
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
    n = curaTutti({ ...n, modo: 'mappa', nemico: null, x: CENTRO.x + 1, y: CENTRO.y })

    return conLog(n, `${nome(io)} è esausto. Corri al Centro cure!`)
  }
  const ordinata = [n.squadra[vivo], ...n.squadra.filter((_, i) => i !== vivo)]

  return conLog({ ...n, squadra: ordinata }, `${nome(io)} è esausto. Vai, ${nome(ordinata[0])}!`)
}

function vittoria(s: Stato): Stato {
  const nem = s.nemico!
  let io = { ...s.squadra[0], xp: s.squadra[0].xp + nem.lvl * 4 }
  const righe = [`${nome(nem)} è sconfitto! +${nem.lvl * 4} esperienza.`]
  while (io.xp >= io.lvl * 8) {
    io = { ...io, xp: io.xp - io.lvl * 8, lvl: io.lvl + 1 }
    io.hp = Math.min(maxHp(io), io.hp + 4)
    righe.push(`${nome(io)} sale al livello ${io.lvl}!`)
  }

  return conLog({ ...s, modo: 'mappa', nemico: null, squadra: [io, ...s.squadra.slice(1)] }, ...righe)
}

export function azione(s: Stato, i: number, rnd: () => number = Math.random): Stato {
  if (s.modo !== 'lotta' || !s.nemico) return s
  const io = s.squadra[0]
  const nem = s.nemico
  if (i === 0 || i === 1) {
    const tipo: Tipo = i === 0 ? 'normale' : SPECIE[io.sp].tipo
    const nomeMossa = i === 0 ? 'Botta' : MOSSA[tipo]
    const { val, eff } = danno(io, nem, i === 0 ? 5 : 7, tipo, rnd)
    const hp = Math.max(0, nem.hp - val)
    const n = conLog({ ...s, nemico: { ...nem, hp } }, `${nome(io)} usa ${nomeMossa}: -${val} PS.${nota(eff)}`)

    return hp === 0 ? vittoria(n) : turnoNemico(n, rnd)
  }
  if (i === 2) {
    if (s.sfere <= 0) return conLog(s, 'Niente sfere. Passa dal Centro cure (C).')
    const n = { ...s, sfere: s.sfere - 1 }
    const prob = 0.25 + 0.6 * (1 - nem.hp / maxHp(nem))
    if (rnd() < prob) {
      const catalogo = n.catalogo.includes(nem.sp) ? n.catalogo : [...n.catalogo, nem.sp]
      const preso = { ...nem, hp: maxHp(nem) }
      const pieno = n.squadra.length >= SQUADRA_MAX
      const squadra = pieno ? n.squadra : [...n.squadra, preso]

      return conLog(
        { ...n, modo: 'mappa', nemico: null, catalogo, squadra },
        `Preso! ${nome(nem)} è tuo.${pieno ? ' Squadra piena: registrato nel catalogo.' : ''}`,
      )
    }

    return turnoNemico(conLog(n, `${nome(nem)} è uscito dalla sfera!`), rnd)
  }
  if (rnd() < 0.8) return conLog({ ...s, modo: 'mappa', nemico: null }, 'Sei scappato.')

  return turnoNemico(conLog(s, 'Fuga fallita!'), rnd)
}

export function ruotaSquadra(s: Stato): Stato {
  if (s.squadra.length < 2) return s
  const squadra = [...s.squadra.slice(1), s.squadra[0]]

  return conLog({ ...s, squadra }, `In testa ora c'è ${nome(squadra[0])}.`)
}

export function tasto(s: Stato, k: ClientKeyEvent): Stato {
  const key = k.key.toLowerCase()
  if (s.modo === 'inizio') {
    const i = ['1', '2', '3'].indexOf(key)

    return i >= 0 ? scegliIniziale(s, i) : s
  }
  if (s.modo === 'mappa') {
    if (key === 'up' || key === 'w') return muovi(s, 0, -1)
    if (key === 'down' || key === 's') return muovi(s, 0, 1)
    if (key === 'left' || key === 'a') return muovi(s, -1, 0)
    if (key === 'right' || key === 'd') return muovi(s, 1, 0)
    if (key === 'tab' || key === 'q') return ruotaSquadra(s)

    return s
  }
  const n = ['1', '2', '3', '4'].indexOf(key)
  if (n >= 0) return azione(s, n)
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
}

function barra(m: Mostrino, larghezza = 10) {
  const r = m.hp / maxHp(m)
  const pieni = Math.round(r * larghezza)
  const colore = r > 0.5 ? '#6fd36f' : r > 0.2 ? '#ffd84c' : '#ff6b6b'

  return { pieni: '█'.repeat(pieni), vuoti: '░'.repeat(larghezza - pieni), colore }
}

type Props = { save?: Stato | null } | null

const Gioco: ClientModule<any, Stato> = (props: Props, surface) => {
  const { Box, Text } = surface.elements
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
        dopo.catalogo !== prima.catalogo
      if (salva && dopo.modo !== 'lotta') surface.post({ type: 'save', save: dopo })
    })
    const salvato = props?.save
    surface.setState(salvato && salvato.modo ? { ...salvato, modo: salvato.modo === 'lotta' ? 'mappa' : salvato.modo, nemico: null } : statoIniziale())
  }
  const s = surface.state ?? statoIniziale()
  const tot = Object.keys(SPECIE).length

  const testa = (
    <Box flexDirection="row" justifyContent="space-between">
      <Text bold color={COL.io}>MOSTRINI</Text>
      <Text dimColor>
        Sfere {s.sfere}/{SFERE_MAX} · Catalogo {s.catalogo.length}/{tot}
      </Text>
    </Box>
  )

  const registro = (
    <Box flexDirection="column" marginTop={1}>
      {s.log.map((r, i) => (
        <Text key={'l' + i} dimColor={i < s.log.length - 1} wrap="wrap">
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
                <Box flexDirection="column" width={9}>
                  <Text color={COLORE_TIPO[d.tipo]}>{d.arte[0]}</Text>
                  <Text color={COLORE_TIPO[d.tipo]}>{d.arte[1]}</Text>
                </Box>
                <Text>
                  <Text bold>{i + 1}</Text> {d.nome} <Text color={COLORE_TIPO[d.tipo]}>({d.tipo})</Text>
                </Text>
              </Box>
            )
          })}
        </Box>
        {registro}
        <Text dimColor>Clicca qui sul pannello, poi usa la tastiera.</Text>
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
        <Box flexDirection="row" justifyContent="space-between" marginTop={1}>
          <Box flexDirection="column">
            <Text>
              <Text bold>{dn.nome}</Text> Lv {nem.lvl} <Text color={COLORE_TIPO[dn.tipo]}>{dn.tipo}</Text>
            </Text>
            <Text>
              <Text color={bn.colore}>{bn.pieni}</Text>
              <Text dimColor>{bn.vuoti}</Text> {nem.hp}/{maxHp(nem)}
            </Text>
          </Box>
          <Box flexDirection="column">
            <Text color={COLORE_TIPO[dn.tipo]}>{dn.arte[0]}</Text>
            <Text color={COLORE_TIPO[dn.tipo]}>{dn.arte[1]}</Text>
          </Box>
        </Box>
        <Box flexDirection="row" justifyContent="space-between" marginTop={1}>
          <Box flexDirection="column">
            <Text color={COLORE_TIPO[di.tipo]}>{di.arte[0]}</Text>
            <Text color={COLORE_TIPO[di.tipo]}>{di.arte[1]}</Text>
          </Box>
          <Box flexDirection="column">
            <Text>
              <Text bold>{di.nome}</Text> Lv {io.lvl} <Text color={COLORE_TIPO[di.tipo]}>{di.tipo}</Text>
            </Text>
            <Text>
              <Text color={bi.colore}>{bi.pieni}</Text>
              <Text dimColor>{bi.vuoti}</Text> {io.hp}/{maxHp(io)}
            </Text>
          </Box>
        </Box>
        <Box flexDirection="column" marginTop={1}>
          {voci.map((v, i) => (
            <Text key={'v' + i} inverse={i === s.scelta}>
              {' '}
              {i + 1} {v}{' '}
            </Text>
          ))}
        </Box>
        {registro}
      </Box>
    )
  }

  const righe = MAPPA.map((riga, y) => {
    const celle = riga.split('').map((t, x) => {
      if (x === s.x && y === s.y) return <Text key={'c' + x} bold color={COL.io}>@ </Text>
      if (t === '#') return <Text key={'c' + x} color={COL.albero}>^^</Text>
      if (t === ',') return <Text key={'c' + x} color={COL.erba}>,,</Text>
      if (t === '~') return <Text key={'c' + x} color={COL.acqua}>~~</Text>
      if (t === 'C') return <Text key={'c' + x} bold color={COL.centro}>C </Text>

      return <Text key={'c' + x} color={COL.sentiero}>· </Text>
    })

    return <Text key={'r' + y}>{celle}</Text>
  })

  return (
    <Box flexDirection="column">
      {testa}
      <Box flexDirection="column" marginTop={1}>
        {righe}
      </Box>
      <Box flexDirection="row" marginTop={1}>
        {s.squadra.map((m, i) => {
          const d = SPECIE[m.sp]

          return (
            <Text key={'s' + i} bold={i === 0} dimColor={m.hp === 0}>
              <Text color={COLORE_TIPO[d.tipo]}>{d.nome}</Text> Lv{m.lvl} {m.hp}/{maxHp(m)}
              {'  '}
            </Text>
          )
        })}
      </Box>
      {registro}
      <Text dimColor>Frecce/WASD muovi · Q cambia capofila · C cura</Text>
    </Box>
  )
}

export default Gioco

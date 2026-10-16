import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Stato } from '../types'
import { svgPer } from './grafica.ts'
import { tasto, normalizza, statoIniziale, alCentro, SPECIE, maxHp } from './gioco.tsx'

const PANE = 'mostrini'
const TITLE = 'Mostrini'
const SAVE_KEY = 'salvataggio'
// Se vale false il pannello non si apre da solo quando mandi un prompt.
const AUTO_KEY = 'apertura-automatica'

// L'ultimo stato del gioco, per disegnarlo in pixel art nell'app desktop.
const vista = atom({ plugin: 'mostrini', key: 'vista' } as const, null)

// Sul telefono non c'è la tastiera: il gioco gira qui e ogni pulsante è un tasto.
// Un tocco su una freccia è un passo.
async function telefono($: any, el: any, save: Stato | null, chiudi?: () => void) {
  const { Box, Text, Svg, Button } = el
  const s: Stato = (await read($, vista)) ?? (save && save.modo ? normalizza(save) : statoIniziale())
  const premi = (key: string) => async () => {
    const prima = (await read($, vista)) ?? s
    const dopo = tasto(prima, { key })
    if (dopo === prima) return
    await update($, vista, () => dopo)
    if (dopo.modo !== 'lotta') await $.store.set(SAVE_KEY, dopo)
  }
  const tasti = (voci: [string, string][]) => (
    <Box flexDirection="row" flexWrap="wrap">
      {voci.map(([key, label]) => (
        <Button key={'t' + key} label={label} onPress={premi(key)} />
      ))}
    </Box>
  )
  const disegno = svgPer(s)
  const io = s.squadra[0]
  let comandi
  if (s.modo === 'inizio') {
    comandi = tasti([['1', '1 Braciotto'], ['2', '2 Goccetto'], ['3', '3 Germoglio']])
  } else if (s.modo === 'lotta') {
    const voci: [string, string][] = [['1', 'Botta'], ['2', 'Mossa'], ['3', `Sfera (${s.sfere})`], ['4', 'Scappa']]
    if (s.cure > 0) voci.push(['c', `Cura (${s.cure})`])
    if (s.cureForti > 0) voci.push(['x', `Super cura (${s.cureForti})`])
    comandi = tasti(voci)
  } else {
    const extra: [string, string][] = [['q', 'Capofila'], ['b', 'Box']]
    if (s.cure > 0) extra.push(['c', `Cura (${s.cure})`])
    if (s.cureForti > 0) extra.push(['x', `Super (${s.cureForti})`])
    if (alCentro(s)) extra.push(['m', 'Compra cura'])
    if (alCentro(s) && s.mondo >= 1) extra.push(['n', 'Compra super'])
    comandi = (
      <Box flexDirection="column">
        {tasti([['up', '↑']])}
        {tasti([['left', '←'], ['down', '↓'], ['right', '→']])}
        {tasti(extra)}
      </Box>
    )
  }

  return (
    <Box flexDirection="column">
      <Svg source={disegno.source} alt={disegno.alt} />
      {comandi}
      {io && s.modo === 'mappa' && (
        <Text dimColor>
          {SPECIE[io.sp]!.nome} Lv{io.lvl} {io.hp}/{maxHp(io)} · Monete {s.monete}
        </Text>
      )}
      {s.log.map((r, i) => (
        <Text key={'l' + i} dimColor={i < s.log.length - 1}>
          {r}
        </Text>
      ))}
      {chiudi && <Button key="chiudi" label="Chiudi Mostrini" onPress={chiudi} />}
    </Box>
  )
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'mostrini',
      description: 'Apri il gioco Mostrini in un pannello mentre aspetti (auto: accende o spegne l\'apertura automatica)',
    })

    return next(e)
  })

  on('command.run', { command: 'mostrini' }, async ($, e) => {
    if (e.args.trim() === 'auto') {
      const attiva = (await $.store.get(AUTO_KEY)) === false
      await $.store.set(AUTO_KEY, attiva)

      return {
        text: attiva
          ? 'Mostrini si aprirà da solo ogni volta che mandi un prompt.'
          : 'Mostrini non si aprirà più da solo: usa /mostrini per aprirlo.',
      }
    }
    // Dal telefono (Remote Control) il pannello non si vede: meglio dirlo subito.
    if (e.origin.kind === 'bridge') {
      return { text: 'Mostrini non si può giocare dal telefono: aprilo dal computer, nel terminale o nell\'app desktop di Claude.' }
    }
    const aperto = await $.ui.open({ id: PANE, title: TITLE, focus: true })
    if (!aperto.isPlaced) {
      return { text: 'Su questo dispositivo il pannello di Mostrini non si può mostrare: aprilo dal terminale o dall\'app desktop di Claude.' }
    }

    return { text: 'Mostrini aperto. Clicca sul pannello per giocare.' }
  })

  // Mentre Claude lavora i comandi aspettano in coda: il pannello si apre da solo
  // appena mandi un prompt, senza togliere il cursore dalla casella.
  on('prompt.submit', async ($, e, next) => {
    const risposta = await next(e)
    if (!e.command && e.origin.kind !== 'bridge' && (await $.store.get(AUTO_KEY)) !== false) {
      void $.ui.open({ id: PANE, title: TITLE })
    }

    return risposta
  })

  // Il gioco salva da solo: la partita resta anche tra una sessione e l'altra.
  on('ui.message', { requestId: PANE }, async ($, e, next) => {
    const data = e.data as { type?: string; stato?: Stato; salva?: boolean } | null
    if (data && data.type === 'vista' && data.stato) {
      const stato = data.stato
      await update($, vista, () => stato)
      if (data.salva) await $.store.set(SAVE_KEY, stato)
    } else if (data && data.type === 'reset') {
      await $.store.delete(SAVE_KEY)
    }

    return next(e)
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const el = $.ui.resolve(e) as any
    const { Box, Text, Svg, Button } = el
    const save = (await $.store.get(SAVE_KEY)) ?? null
    // Il telefono non ha la tastiera: si gioca coi pulsanti.
    if (e.surface === 'mobile') return telefono($, { Box, Text, Svg, Button }, save as Stato | null)
    // Il gioco col pannello gira solo nel terminale e nell'app desktop.
    if (e.surface !== 'terminal' && e.surface !== 'desktop') {
      return (
        <Box flexDirection="column">
          <Text>Mostrini si gioca nel terminale o nell'app desktop di Claude.</Text>
        </Box>
      )
    }
    // Il terminale disegna l'arte ASCII; l'app desktop ha l'SVG per la pixel art.
    const grafica = !!Svg
    const stato = grafica ? await read($, vista) : null
    const disegno = stato ? svgPer(stato) : null

    return (
      <Box flexDirection="column" flexGrow={1}>
        {disegno && <Svg source={disegno.source} alt={disegno.alt} />}
        <el.Client key="gioco" module="./gioco.tsx" props={{ save, grafica }} flexGrow={1} />
      </Box>
    )
  })
}

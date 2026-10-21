import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Salvataggi, Stato } from '../types'
import { svgPer } from './grafica.ts'
import { PARTITE } from './gioco.tsx'

const PANE = 'mostrini'
const TITLE = 'Mostrini'
// Le partite salvate, una per casella. VECCHIO_SALVATAGGIO è la partita unica delle versioni precedenti.
const SAVE_KEY = 'salvataggi'
const VECCHIO_SALVATAGGIO = 'salvataggio'
// Se vale false il pannello non si apre da solo quando mandi un prompt.
const AUTO_KEY = 'apertura-automatica'

// L'ultimo stato del gioco, per disegnarlo in pixel art nell'app desktop.
const vista = atom({ plugin: 'mostrini', key: 'vista' } as const, null)

// Legge le partite salvate; la prima volta porta la vecchia partita unica nella casella 1.
async function leggiSalvataggi($: any): Promise<Salvataggi> {
  const salvati = (await $.store.get(SAVE_KEY)) as Salvataggi | undefined
  if (salvati && Array.isArray(salvati.partite)) return salvati
  const vecchia = ((await $.store.get(VECCHIO_SALVATAGGIO)) as Stato | undefined) ?? null
  const partite: (Stato | null)[] = Array.from({ length: PARTITE }, () => null)
  if (vecchia && vecchia.modo) partite[0] = { ...vecchia, slot: 0 }

  return { partite, attiva: 0 }
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
    await $.ui.open({ id: PANE, title: TITLE, focus: true })

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

  // Il gioco salva da solo nella casella della partita: le partite restano anche tra una sessione e l'altra.
  on('ui.message', { requestId: PANE }, async ($, e, next) => {
    const data = e.data as { type?: string; stato?: Stato; salva?: boolean; partita?: Stato; slot?: number } | null
    if (data && data.stato) {
      const stato = data.stato
      await update($, vista, () => stato)
    }
    // Si salva lo stato mostrato, oppure la partita che il gioco manda a parte (tornando al menu).
    const daSalvare = data && data.type === 'vista' ? (data.partita ?? (data.salva ? data.stato : undefined)) : undefined
    if (daSalvare && daSalvare.slot !== undefined) {
      const salvati = await leggiSalvataggi($)
      salvati.partite[daSalvare.slot] = daSalvare
      salvati.attiva = daSalvare.slot
      await $.store.set(SAVE_KEY, salvati)
    } else if (data && data.type === 'cancella' && data.slot !== undefined) {
      const salvati = await leggiSalvataggi($)
      salvati.partite[data.slot] = null
      await $.store.set(SAVE_KEY, salvati)
    }

    return next(e)
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const el = $.ui.resolve(e) as any
    const { Box, Text, Svg } = el
    // Il gioco col pannello gira solo nel terminale e nell'app desktop.
    if (e.surface !== 'terminal' && e.surface !== 'desktop') {
      return (
        <Box flexDirection="column">
          <Text>Mostrini si gioca nel terminale o nell'app desktop di Claude.</Text>
        </Box>
      )
    }
    const salvati = await leggiSalvataggi($)
    // Il terminale disegna l'arte ASCII; l'app desktop ha l'SVG per la pixel art.
    const grafica = !!Svg
    const stato = grafica ? await read($, vista) : null
    const disegno = stato ? svgPer(stato) : null

    return (
      <Box flexDirection="column" flexGrow={1}>
        {disegno && <Svg source={disegno.source} alt={disegno.alt} />}
        <el.Client key="gioco" module="./gioco.tsx" props={{ partite: salvati.partite, attiva: salvati.attiva, grafica }} flexGrow={1} />
      </Box>
    )
  })
}

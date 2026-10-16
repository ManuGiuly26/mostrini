import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Stato } from '../types'
import { svgPer } from './grafica.ts'

const PANE = 'mostrini'
const TITLE = 'Mostrini'
const SAVE_KEY = 'salvataggio'

// L'ultimo stato del gioco, per disegnarlo in pixel art nell'app desktop.
const vista = atom({ plugin: 'mostrini', key: 'vista' } as const, null)

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'mostrini',
      description: 'Apri il gioco Mostrini in un pannello mentre aspetti',
    })

    return next(e)
  })

  on('command.run', { command: 'mostrini' }, async $ => {
    await $.ui.open({ id: PANE, title: TITLE, focus: true })

    return { text: 'Mostrini aperto. Clicca sul pannello per giocare.' }
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
    const { Box, Text, Client, Svg } = $.ui.resolve(e) as any
    if (!Client) {
      return (
        <Box flexDirection="column">
          <Text>Mostrini si gioca nel terminale o nell'app desktop.</Text>
        </Box>
      )
    }
    const save = (await $.store.get(SAVE_KEY)) ?? null
    // Il terminale disegna l'arte ASCII; l'app desktop ha l'SVG per la pixel art.
    const grafica = !!Svg
    const stato = grafica ? await read($, vista) : null
    const disegno = stato ? svgPer(stato) : null

    return (
      <Box flexDirection="column" flexGrow={1}>
        {disegno && <Svg source={disegno.source} alt={disegno.alt} />}
        <Client key="gioco" module="./gioco.tsx" props={{ save, grafica }} flexGrow={1} />
      </Box>
    )
  })
}
